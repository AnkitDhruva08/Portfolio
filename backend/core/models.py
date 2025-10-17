# core/models.py

from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.text import slugify


class PersonalInfo(models.Model):
    """Main personal information - Only one instance should exist"""
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    tagline = models.CharField(max_length=500)
    hero_description = models.TextField()
    about_heading = models.CharField(max_length=200)
    about_description = models.TextField()
    about_detail = models.TextField()
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    location = models.CharField(max_length=100)
    availability_status = models.CharField(max_length=100)
    
    # Hero Stats
    years_experience = models.IntegerField()
    projects_completed = models.IntegerField()
    awards_won = models.IntegerField()
    happy_clients = models.IntegerField()
    
    # Social Links
    linkedin_url = models.URLField(blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)
    twitter_url = models.URLField(blank=True, null=True)
    dribbble_url = models.URLField(blank=True, null=True)
    
    # Resume
    resume_pdf = models.FileField(upload_to='resume/', blank=True, null=True)
    
    # Footer
    footer_tagline = models.CharField(max_length=200)
    copyright_text = models.CharField(max_length=200)
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'core_personalinfo'
        verbose_name = "Personal Information"
        verbose_name_plural = "Personal Information"
    
    def __str__(self):
        return f"{self.name} - {self.title}"
    
    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        if not self.pk and PersonalInfo.objects.exists():
            raise ValueError('Only one PersonalInfo instance is allowed')
        return super().save(*args, **kwargs)


class CoreExpertise(models.Model):
    """Core expertise items shown in about section"""
    title = models.CharField(max_length=100)
    icon_name = models.CharField(max_length=50, help_text="Icon identifier (e.g., 'code', 'palette', 'layers')")
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'core_coreexpertise'
        ordering = ['order']
        verbose_name = "Core Expertise"
        verbose_name_plural = "Core Expertise"
    
    def __str__(self):
        return self.title


class Skill(models.Model):
    """Skills with proficiency levels"""
    CATEGORY_CHOICES = [
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('design', 'Design'),
        ('mobile', 'Mobile'),
        ('uiux', 'UI/UX'),
        ('tools', 'Tools'),
    ]
    
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    proficiency = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        help_text="Proficiency level from 1 to 5"
    )
    icon_name = models.CharField(max_length=50, blank=True, help_text="Icon identifier for the skill")
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'core_skill'
        ordering = ['category', 'order']
        verbose_name = "Skill"
        verbose_name_plural = "Skills"
    
    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"


class Tool(models.Model):
    """Tools and software"""
    name = models.CharField(max_length=100)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'core_tool'
        ordering = ['order']
        verbose_name = "Tool"
        verbose_name_plural = "Tools"
    
    def __str__(self):
        return self.name


class ProjectCategory(models.Model):
    """Project categories for filtering"""
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'core_projectcategory'
        ordering = ['order']
        verbose_name = "Project Category"
        verbose_name_plural = "Project Categories"
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Project(models.Model):
    """Portfolio projects"""
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    category = models.ForeignKey(ProjectCategory, on_delete=models.CASCADE, related_name='projects')
    short_description = models.CharField(max_length=300)
    full_description = models.TextField(blank=True)
    
    # Images
    thumbnail = models.ImageField(upload_to='projects/thumbnails/', blank=True, null=True)
    featured_image = models.ImageField(upload_to='projects/featured/', blank=True, null=True)
    
    # Technologies used (comma-separated for simplicity)
    technologies = models.CharField(
        max_length=500,
        help_text="Comma-separated list of technologies (e.g., React, Node.js, Tailwind)"
    )
    
    # Links
    live_url = models.URLField(blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)
    case_study_url = models.URLField(blank=True, null=True)
    
    # Metadata
    is_featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'core_project'
        ordering = ['order', '-created_at']
        verbose_name = "Project"
        verbose_name_plural = "Projects"
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    def get_technologies_list(self):
        """Return technologies as a list"""
        return [tech.strip() for tech in self.technologies.split(',') if tech.strip()]


class Experience(models.Model):
    """Professional experience timeline"""
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True, help_text="Leave empty for current position")
    description = models.TextField()
    
    # Technologies/skills used (comma-separated)
    technologies = models.CharField(
        max_length=500,
        help_text="Comma-separated list of technologies/skills"
    )
    
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'core_experience'
        ordering = ['-start_date', 'order']
        verbose_name = "Experience"
        verbose_name_plural = "Experience"
    
    def __str__(self):
        return f"{self.title} at {self.company}"
    
    @property
    def is_current(self):
        return self.end_date is None
    
    def get_technologies_list(self):
        """Return technologies as a list"""
        return [tech.strip() for tech in self.technologies.split(',') if tech.strip()]


class Achievement(models.Model):
    """Key achievements for experience entries"""
    experience = models.ForeignKey(Experience, on_delete=models.CASCADE, related_name='achievements')
    description = models.TextField()
    order = models.IntegerField(default=0)
    
    class Meta:
        db_table = 'core_achievement'
        ordering = ['order']
        verbose_name = "Achievement"
        verbose_name_plural = "Achievements"
    
    def __str__(self):
        return f"{self.experience.title} - Achievement {self.order}"


class Education(models.Model):
    """Education and certifications"""
    degree = models.CharField(max_length=200)
    institution = models.CharField(max_length=200)
    year = models.IntegerField()
    description = models.TextField(blank=True)
    icon_name = models.CharField(max_length=50, default="graduation-cap", help_text="Icon identifier")
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'core_education'
        ordering = ['-year', 'order']
        verbose_name = "Education"
        verbose_name_plural = "Education"
    
    def __str__(self):
        return f"{self.degree} - {self.institution}"


class Timeline(models.Model):
    """Career timeline milestones"""
    year = models.IntegerField()
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'core_timeline'
        ordering = ['-year', 'order']
        verbose_name = "Timeline"
        verbose_name_plural = "Timeline"
    
    def __str__(self):
        return f"{self.year} - {self.title}"


class Testimonial(models.Model):
    """Client testimonials"""
    client_name = models.CharField(max_length=100)
    client_position = models.CharField(max_length=200)
    client_company = models.CharField(max_length=200)
    client_photo = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    testimonial = models.TextField()
    rating = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        default=5
    )
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'core_testimonial'
        ordering = ['order', '-created_at']
        verbose_name = "Testimonial"
        verbose_name_plural = "Testimonials"
    
    def __str__(self):
        return f"{self.client_name} - {self.client_company}"


class ContactMessage(models.Model):
    """Contact form submissions"""
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'core_contactmessage'
        ordering = ['-created_at']
        verbose_name = "Contact Message"
        verbose_name_plural = "Contact Messages"
    
    def __str__(self):
        return f"{self.name} - {self.subject}"


class NewsletterSubscriber(models.Model):
    """Newsletter subscribers"""
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'core_newslettersubscriber'
        ordering = ['-subscribed_at']
        verbose_name = "Newsletter Subscriber"
        verbose_name_plural = "Newsletter Subscribers"
    
    def __str__(self):
        return self.email


class SiteSettings(models.Model):
    """General site settings"""
    site_title = models.CharField(max_length=200)
    site_description = models.TextField()
    favicon = models.ImageField(upload_to='site/', blank=True, null=True)
    logo = models.ImageField(upload_to='site/', blank=True, null=True)
    
    # SEO
    meta_keywords = models.CharField(max_length=500, blank=True)
    google_analytics_id = models.CharField(max_length=50, blank=True)
    
    # Theme
    primary_color = models.CharField(max_length=7, default="#D4AF37", help_text="Hex color code")
    
    is_active = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'core_sitesettings'
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"
    
    def __str__(self):
        return self.site_title
    
    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        if not self.pk and SiteSettings.objects.exists():
            raise ValueError('Only one SiteSettings instance is allowed')
        return super().save(*args, **kwargs)