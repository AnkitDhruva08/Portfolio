from django.conf import settings
from django.urls import path, include, re_path
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
# portfolio/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from core.views.service import (
    PersonalInfoViewSet, CoreExpertiseViewSet, SkillViewSet,
    ToolViewSet, ProjectCategoryViewSet, ProjectViewSet,
    ExperienceViewSet, EducationViewSet, TimelineViewSet,
    TestimonialViewSet, ContactMessageView, NewsletterSubscribeView,
    SiteSettingsView, homepage_data, about_page_data,
    skills_page_data, experience_page_data
)

# Create router
router = DefaultRouter()
router.register(r'personal-info', PersonalInfoViewSet, basename='personal-info')
router.register(r'core-expertise', CoreExpertiseViewSet, basename='core-expertise')
router.register(r'skills', SkillViewSet, basename='skills')
router.register(r'tools', ToolViewSet, basename='tools')
router.register(r'project-categories', ProjectCategoryViewSet, basename='project-categories')
router.register(r'projects', ProjectViewSet, basename='projects')
router.register(r'experience', ExperienceViewSet, basename='experience')
router.register(r'education', EducationViewSet, basename='education')
router.register(r'timeline', TimelineViewSet, basename='timeline')
router.register(r'testimonials', TestimonialViewSet, basename='testimonials')

urlpatterns = [
    # Router URLs
    path('', include(router.urls)),
    
    # Custom endpoints
    path('contact/', ContactMessageView.as_view(), name='contact'),
    path('newsletter/subscribe/', NewsletterSubscribeView.as_view(), name='newsletter-subscribe'),
    path('site-settings/', SiteSettingsView.as_view(), name='site-settings'),
    
    # Combined data endpoints
    path('homepage/', homepage_data, name='homepage-data'),
    path('about/', about_page_data, name='about-data'),
    path('skills-page/', skills_page_data, name='skills-page-data'),
    path('experience-page/', experience_page_data, name='experience-page-data'),
]



if settings.DEBUG is True:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)