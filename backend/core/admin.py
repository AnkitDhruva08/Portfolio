# portfolio/admin.py

from django.contrib import admin
from django.utils.html import format_html
from django.db.models import Count
from .models import (
    PersonalInfo, CoreExpertise, Skill, Tool, ProjectCategory, 
    Project, Experience, Achievement, Education, Timeline, 
    Testimonial, ContactMessage, NewsletterSubscriber, SiteSettings
)

# ==============================
# 🌐 Admin Site Branding
# ==============================
admin.site.site_header = "Portfolio Admin Panel"
admin.site.site_title = "Portfolio Admin"
admin.site.index_title = "Welcome to Your Portfolio Dashboard"


# ==============================
# 👤 Personal Information
# ==============================
@admin.register(PersonalInfo)
class PersonalInfoAdmin(admin.ModelAdmin):
    """Admin interface for Personal Information"""

    fieldsets = (
        ('👤 Basic Information', {
            'fields': ('name', 'title', 'tagline', 'hero_description'),
            'description': 'Main profile info displayed on homepage'
        }),
        ('📝 About Section', {
            'fields': ('about_heading', 'about_description', 'about_detail'),
        }),
        ('📧 Contact Information', {
            'fields': ('email', 'phone', 'location', 'availability_status'),
        }),
        ('📊 Statistics', {
            'fields': ('years_experience', 'projects_completed', 'awards_won', 'happy_clients'),
        }),
        ('🔗 Social Media Links', {
            'fields': ('linkedin_url', 'github_url', 'twitter_url', 'dribbble_url'),
        }),
        ('📄 Resume', {
            'fields': ('resume_pdf',),
        }),
        ('🦶 Footer Content', {
            'fields': ('footer_tagline', 'copyright_text'),
        }),
        ('⚙️ Settings', {
            'fields': ('is_active',),
            'classes': ('collapse',)
        }),
    )

    list_display = ['name', 'title', 'email', 'phone', 'is_active', 'last_updated']
    readonly_fields = ['created_at', 'updated_at']

    def last_updated(self, obj):
        return obj.updated_at.strftime('%Y-%m-%d %H:%M')
    last_updated.short_description = 'Last Updated'

    def has_add_permission(self, request):
        return not PersonalInfo.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

    class Meta:
        verbose_name = 'Personal Information'
        verbose_name_plural = 'Personal Information'


# ==============================
# 🧠 Core Expertise
# ==============================
@admin.register(CoreExpertise)
class CoreExpertiseAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon_name', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    list_filter = ['is_active']
    search_fields = ['title']
    ordering = ['order']


# ==============================
# 🛠️ Skills
# ==============================
@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'proficiency_display', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    list_filter = ['category', 'proficiency', 'is_active']
    search_fields = ['name']
    ordering = ['category', 'order']

    def proficiency_display(self, obj):
        stars = '⭐' * obj.proficiency
        empty_stars = '☆' * (5 - obj.proficiency)
        return format_html(
            '<span style="font-size: 16px; letter-spacing: 2px;">{}{}</span>',
            stars, empty_stars
        )
    proficiency_display.short_description = 'Proficiency Level'

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(skill_count=Count('id'))


# ==============================
# 🧰 Tools
# ==============================
@admin.register(Tool)
class ToolAdmin(admin.ModelAdmin):
    list_display = ['name', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    list_filter = ['is_active']
    search_fields = ['name']
    ordering = ['order']


# ==============================
# 📂 Project Categories
# ==============================
@admin.register(ProjectCategory)
class ProjectCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'order', 'project_count', 'is_active']
    list_editable = ['order', 'is_active']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name', 'slug']
    ordering = ['order']

    def project_count(self, obj):
        count = obj.projects.filter(is_active=True).count()
        color = 'green' if count > 0 else 'gray'
        return format_html(
            '<span style="color: {}; font-weight: bold;">{} project(s)</span>',
            color, count
        )
    project_count.short_description = 'Active Projects'


# ==============================
# 🚀 Projects
# ==============================
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    fieldsets = (
        ('📋 Basic Information', {'fields': ('title', 'slug', 'category', 'short_description')}),
        ('📝 Description', {'fields': ('full_description', 'technologies')}),
        ('🖼️ Images', {'fields': ('thumbnail', 'thumbnail_preview', 'featured_image', 'featured_preview')}),
        ('🔗 Links', {'fields': ('live_url', 'github_url', 'case_study_url')}),
        ('⚙️ Display Settings', {'fields': ('is_featured', 'order', 'is_active')}),
    )

    list_display = ['title', 'category', 'thumbnail_small', 'featured_badge', 'order', 'is_active', 'date_added']
    list_editable = ['order', 'is_active']
    list_filter = ['category', 'is_featured', 'is_active', 'created_at']
    search_fields = ['title', 'short_description', 'full_description', 'technologies']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['thumbnail_preview', 'featured_preview', 'created_at', 'updated_at']
    ordering = ['order', '-created_at']
    date_hierarchy = 'created_at'

    def thumbnail_preview(self, obj):
        if obj.thumbnail:
            return format_html('<img src="{}" style="max-height:250px;max-width:400px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);" />', obj.thumbnail.url)
        return format_html('<p style="color: #999;">No thumbnail uploaded</p>')

    def featured_preview(self, obj):
        if obj.featured_image:
            return format_html('<img src="{}" style="max-height:250px;max-width:400px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);" />', obj.featured_image.url)
        return format_html('<p style="color: #999;">No featured image uploaded</p>')

    def thumbnail_small(self, obj):
        if obj.thumbnail:
            return format_html('<img src="{}" style="height:50px;width:auto;border-radius:4px;" />', obj.thumbnail.url)
        return '📷'

    def featured_badge(self, obj):
        return format_html('<span style="background:#4CAF50;color:white;padding:3px 8px;border-radius:4px;font-size:11px;font-weight:bold;">⭐ FEATURED</span>') if obj.is_featured else format_html('<span style="color:#999;">—</span>')

    def date_added(self, obj):
        return obj.created_at.strftime('%Y-%m-%d')
    date_added.short_description = 'Added'

    actions = ['mark_as_featured', 'remove_featured', 'activate_projects', 'deactivate_projects']

    def mark_as_featured(self, request, queryset):
        updated = queryset.update(is_featured=True)
        self.message_user(request, f'{updated} project(s) marked as featured.')

    def remove_featured(self, request, queryset):
        updated = queryset.update(is_featured=False)
        self.message_user(request, f'{updated} project(s) removed from featured.')

    def activate_projects(self, request, queryset):
        updated = queryset.update(is_active=True)
        self.message_user(request, f'{updated} project(s) activated.')

    def deactivate_projects(self, request, queryset):
        updated = queryset.update(is_active=False)
        self.message_user(request, f'{updated} project(s) deactivated.')


# ==============================
# 🏆 Experience & Achievements
# ==============================
class AchievementInline(admin.TabularInline):
    model = Achievement
    extra = 1
    fields = ['description', 'order']
    ordering = ['order']


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    fieldsets = (
        ('💼 Position Information', {'fields': ('title', 'company', 'start_date', 'end_date')}),
        ('📝 Description', {'fields': ('description', 'technologies')}),
        ('⚙️ Display', {'fields': ('order', 'is_active'), 'classes': ('collapse',)}),
    )

    list_display = ['title', 'company', 'date_range', 'current_badge', 'achievement_count', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    list_filter = ['is_active', 'start_date', 'company']
    search_fields = ['title', 'company', 'description', 'technologies']
    ordering = ['-start_date', 'order']
    inlines = [AchievementInline]
    date_hierarchy = 'start_date'

    def date_range(self, obj):
        start = obj.start_date.strftime('%b %Y')
        end = 'Present' if obj.is_current else obj.end_date.strftime('%b %Y')
        return f"{start} - {end}"

    def current_badge(self, obj):
        return format_html('<span style="background:#2196F3;color:white;padding:3px 8px;border-radius:4px;font-size:11px;font-weight:bold;">▶ CURRENT</span>') if obj.is_current else '—'

    def achievement_count(self, obj):
        return format_html('<span style="color:#4CAF50;font-weight:bold;">{} achievements</span>', obj.achievements.count())


# ==============================
# 🏅 Achievements
# ==============================
@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ['experience', 'description_preview', 'order']
    list_filter = ['experience']
    search_fields = ['description', 'experience__title', 'experience__company']
    ordering = ['experience', 'order']

    def description_preview(self, obj):
        return obj.description[:80] + '...' if len(obj.description) > 80 else obj.description


# ==============================
# 🎓 Education
# ==============================
@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['degree', 'institution', 'year', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    list_filter = ['year', 'is_active']
    search_fields = ['degree', 'institution', 'description']
    ordering = ['-year', 'order']


# ==============================
# 🕰️ Timeline
# ==============================
@admin.register(Timeline)
class TimelineAdmin(admin.ModelAdmin):
    list_display = ['year', 'title', 'description_preview', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    list_filter = ['year', 'is_active']
    search_fields = ['title', 'description']
    ordering = ['-year', 'order']

    def description_preview(self, obj):
        return obj.description[:50] + '...' if obj.description and len(obj.description) > 50 else (obj.description or '—')


# ==============================
# 💬 Testimonials
# ==============================
@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['client_name', 'client_company', 'rating_display', 'photo_thumb', 'order', 'is_active', 'date_added']
    list_editable = ['order', 'is_active']
    list_filter = ['rating', 'is_active', 'created_at']
    search_fields = ['client_name', 'client_company', 'client_position', 'testimonial']
    readonly_fields = ['photo_display', 'created_at']
    ordering = ['order', '-created_at']
    date_hierarchy = 'created_at'

    def rating_display(self, obj):
        stars = '⭐' * obj.rating
        empty_stars = '☆' * (5 - obj.rating)
        return format_html('<span style="font-size:16px;letter-spacing:2px;">{}{}</span>', stars, empty_stars)

    def photo_display(self, obj):
        if obj.client_photo:
            return format_html('<img src="{}" style="height:120px;width:120px;border-radius:50%;object-fit:cover;box-shadow:0 2px 8px rgba(0,0,0,0.1);" />', obj.client_photo.url)
        return format_html('<p style="color:#999;">No photo uploaded</p>')

    def photo_thumb(self, obj):
        if obj.client_photo:
            return format_html('<img src="{}" style="height:40px;width:40px;border-radius:50%;object-fit:cover;" />', obj.client_photo.url)
        return '👤'

    def date_added(self, obj):
        return obj.created_at.strftime('%Y-%m-%d')


# ==============================
# ✉️ Contact Messages
# ==============================
@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject_preview', 'read_badge', 'date_received']
    list_filter = ['is_read', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['name', 'email', 'subject', 'message', 'created_at']
    ordering = ['-created_at']
    date_hierarchy = 'created_at'

    def subject_preview(self, obj):
        return obj.subject[:40] + '...' if len(obj.subject) > 40 else obj.subject

    def read_badge(self, obj):
        if obj.is_read:
            return format_html('<span style="color:green;font-weight:bold;">✓ Read</span>')
        return format_html('<span style="background:#FF9800;color:white;padding:3px 8px;border-radius:4px;font-size:11px;font-weight:bold;">● NEW</span>')

    def date_received(self, obj):
        return obj.created_at.strftime('%Y-%m-%d %H:%M')

    def has_add_permission(self, request):
        return False

    actions = ['mark_as_read', 'mark_as_unread']

    def mark_as_read(self, request, queryset):
        updated = queryset.update(is_read=True)
        self.message_user(request, f'{updated} message(s) marked as read.')

    def mark_as_unread(self, request, queryset):
        updated = queryset.update(is_read=False)
        self.message_user(request, f'{updated} message(s) marked as unread.')


# ==============================
# 📨 Newsletter Subscribers
# ==============================
@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ['email', 'status_badge', 'subscription_date']
    list_filter = ['is_active', 'subscribed_at']
    search_fields = ['email']
    ordering = ['-subscribed_at']
    date_hierarchy = 'subscribed_at'
    readonly_fields = ['subscribed_at']

    def status_badge(self, obj):
        if obj.is_active:
            return format_html('<span style="background:#4CAF50;color:white;padding:3px 8px;border-radius:4px;font-size:11px;font-weight:bold;">✓ ACTIVE</span>')
        return format_html('<span style="background:#999;color:white;padding:3px 8px;border-radius:4px;font-size:11px;">✗ INACTIVE</span>')

    def subscription_date(self, obj):
        return obj.subscribed_at.strftime('%Y-%m-%d %H:%M')

    actions = ['activate_subscribers', 'deactivate_subscribers']

    def activate_subscribers(self, request, queryset):
        updated = queryset.update(is_active=True)
        self.message_user(request, f'{updated} subscriber(s) activated.')

    def deactivate_subscribers(self, request, queryset):
        updated = queryset.update(is_active=False)
        self.message_user(request, f'{updated} subscriber(s) deactivated.')


# ==============================
# ⚙️ Site Settings
# ==============================
@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        ('🌐 Basic Information', {'fields': ('site_title', 'site_description')}),
        ('🎨 Branding', {'fields': ('favicon', 'favicon_display', 'logo', 'logo_display')}),
        ('🔍 SEO Settings', {'fields': ('meta_keywords', 'google_analytics_id')}),
        ('🎨 Theme', {'fields': ('primary_color',)}),
        ('⚙️ Settings', {'fields': ('is_active',)}),
    )

    readonly_fields = ['favicon_display', 'logo_display']

    def favicon_display(self, obj):
        if obj.favicon:
            return format_html('<img src="{}" style="height:48px;width:48px;" />', obj.favicon.url)
        return format_html('<p style="color:#999;">No favicon uploaded</p>')

    def logo_display(self, obj):
        if obj.logo:
            return format_html('<img src="{}" style="max-height:100px;max-width:250px;" />', obj.logo.url)
        return format_html('<p style="color:#999;">No logo uploaded</p>')

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

    class Meta:
        verbose_name = 'Site Settings'
        verbose_name_plural = 'Site Settings'
