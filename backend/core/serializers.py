# portfolio/serializers.py

from rest_framework import serializers
from .models import (
    PersonalInfo, CoreExpertise, Skill, Tool, ProjectCategory,
    Project, Experience, Achievement, Education, Timeline,
    Testimonial, ContactMessage, NewsletterSubscriber, SiteSettings
)


class PersonalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalInfo
        exclude = ['id', 'created_at', 'updated_at', 'is_active']


class CoreExpertiseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreExpertise
        fields = ['id', 'title', 'icon_name', 'order']


class SkillSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    
    class Meta:
        model = Skill
        fields = ['id', 'name', 'category', 'category_display', 'proficiency', 'icon_name', 'order']


class ToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tool
        fields = ['id', 'name', 'order']


class ProjectCategorySerializer(serializers.ModelSerializer):
    project_count = serializers.SerializerMethodField()
    
    class Meta:
        model = ProjectCategory
        fields = ['id', 'name', 'slug', 'order', 'project_count']
    
    def get_project_count(self, obj):
        return obj.projects.filter(is_active=True).count()


class ProjectListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    technologies_list = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'category_name', 'category_slug',
            'short_description', 'thumbnail', 'technologies_list',
            'is_featured', 'live_url', 'github_url', 'case_study_url'
        ]
    
    def get_technologies_list(self, obj):
        return obj.get_technologies_list()


class ProjectDetailSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    technologies_list = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'category_name', 'category_slug',
            'short_description', 'full_description', 'thumbnail',
            'featured_image', 'technologies_list', 'is_featured',
            'live_url', 'github_url', 'case_study_url', 'created_at', 'updated_at'
        ]
    
    def get_technologies_list(self, obj):
        return obj.get_technologies_list()


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = ['id', 'description', 'order']


class ExperienceSerializer(serializers.ModelSerializer):
    achievements = AchievementSerializer(many=True, read_only=True)
    technologies_list = serializers.SerializerMethodField()
    is_current = serializers.BooleanField(read_only=True)
    date_display = serializers.SerializerMethodField()
    
    class Meta:
        model = Experience
        fields = [
            'id', 'title', 'company', 'start_date', 'end_date',
            'is_current', 'date_display', 'description',
            'technologies_list', 'achievements', 'order'
        ]
    
    def get_technologies_list(self, obj):
        return obj.get_technologies_list()
    
    def get_date_display(self, obj):
        start = obj.start_date.strftime('%b %Y')
        end = 'Present' if obj.is_current else obj.end_date.strftime('%b %Y')
        return f"{start} - {end}"


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ['id', 'degree', 'institution', 'year', 'description', 'icon_name', 'order']


class TimelineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timeline
        fields = ['id', 'year', 'title', 'description', 'order']


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = [
            'id', 'client_name', 'client_position', 'client_company',
            'client_photo', 'testimonial', 'rating', 'order'
        ]


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message']


class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ['email']


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        exclude = ['id', 'is_active']


# Combined serializer for homepage data
class HomePageDataSerializer(serializers.Serializer):
    personal_info = PersonalInfoSerializer()
    core_expertise = CoreExpertiseSerializer(many=True)
    featured_projects = ProjectListSerializer(many=True)
    timeline = TimelineSerializer(many=True)
    stats = serializers.DictField()