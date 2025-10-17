# portfolio/views.py

from rest_framework import viewsets, status, generics
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db.models import Q
from core.models import (
    PersonalInfo, CoreExpertise, Skill, Tool, ProjectCategory,
    Project, Experience, Education, Timeline, Testimonial,
    ContactMessage, NewsletterSubscriber, SiteSettings
)
from core.serializers import (
    PersonalInfoSerializer, CoreExpertiseSerializer, SkillSerializer,
    ToolSerializer, ProjectCategorySerializer, ProjectListSerializer,
    ProjectDetailSerializer, ExperienceSerializer, EducationSerializer,
    TimelineSerializer, TestimonialSerializer, ContactMessageSerializer,
    NewsletterSubscriberSerializer, SiteSettingsSerializer, HomePageDataSerializer
)


class PersonalInfoViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Retrieve personal information
    GET /api/personal-info/
    """
    queryset = PersonalInfo.objects.filter(is_active=True)
    serializer_class = PersonalInfoSerializer
    permission_classes = [AllowAny]
    
    def list(self, request, *args, **kwargs):
        try:
            instance = PersonalInfo.objects.get(is_active=True)
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except PersonalInfo.DoesNotExist:
            return Response({'detail': 'Personal information not found'}, status=status.HTTP_404_NOT_FOUND)


class CoreExpertiseViewSet(viewsets.ReadOnlyModelViewSet):
    """
    List all core expertise items
    GET /api/core-expertise/
    """
    queryset = CoreExpertise.objects.filter(is_active=True).order_by('order')
    serializer_class = CoreExpertiseSerializer
    permission_classes = [AllowAny]


class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    """
    List all skills, optionally filter by category
    GET /api/skills/
    GET /api/skills/?category=frontend
    GET /api/skills/by_category/ - Get skills grouped by category
    """
    queryset = Skill.objects.filter(is_active=True).order_by('category', 'order')
    serializer_class = SkillSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category=category)
        return queryset
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Group skills by category"""
        categories = dict(Skill.CATEGORY_CHOICES)
        result = {}
        
        for category_key, category_name in categories.items():
            skills = Skill.objects.filter(
                is_active=True,
                category=category_key
            ).order_by('order')
            result[category_key] = {
                'name': category_name,
                'skills': SkillSerializer(skills, many=True).data
            }
        
        return Response(result)


class ToolViewSet(viewsets.ReadOnlyModelViewSet):
    """
    List all tools
    GET /api/tools/
    """
    queryset = Tool.objects.filter(is_active=True).order_by('order')
    serializer_class = ToolSerializer
    permission_classes = [AllowAny]


class ProjectCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    List all project categories
    GET /api/project-categories/
    """
    queryset = ProjectCategory.objects.filter(is_active=True).order_by('order')
    serializer_class = ProjectCategorySerializer
    permission_classes = [AllowAny]


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    List and retrieve projects
    GET /api/projects/ - List all projects
    GET /api/projects/?category=web-design - Filter by category slug
    GET /api/projects/?featured=true - Get featured projects only
    GET /api/projects/?search=react - Search projects
    GET /api/projects/{slug}/ - Get project detail
    GET /api/projects/featured/ - Get featured projects
    """
    queryset = Project.objects.filter(is_active=True).order_by('order', '-created_at')
    permission_classes = [AllowAny]
    lookup_field = 'slug'
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProjectDetailSerializer
        return ProjectListSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by category
        category_slug = self.request.query_params.get('category', None)
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        
        # Filter featured
        featured = self.request.query_params.get('featured', None)
        if featured and featured.lower() == 'true':
            queryset = queryset.filter(is_featured=True)
        
        # Search
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(short_description__icontains=search) |
                Q(technologies__icontains=search)
            )
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured projects only"""
        projects = self.get_queryset().filter(is_featured=True)
        serializer = ProjectListSerializer(projects, many=True, context={'request': request})
        return Response(serializer.data)


class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    """
    List all experience entries
    GET /api/experience/
    """
    queryset = Experience.objects.filter(is_active=True).order_by('-start_date')
    serializer_class = ExperienceSerializer
    permission_classes = [AllowAny]


class EducationViewSet(viewsets.ReadOnlyModelViewSet):
    """
    List all education entries
    GET /api/education/
    """
    queryset = Education.objects.filter(is_active=True).order_by('-year', 'order')
    serializer_class = EducationSerializer
    permission_classes = [AllowAny]


class TimelineViewSet(viewsets.ReadOnlyModelViewSet):
    """
    List all timeline entries
    GET /api/timeline/
    """
    queryset = Timeline.objects.filter(is_active=True).order_by('-year', 'order')
    serializer_class = TimelineSerializer
    permission_classes = [AllowAny]


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    """
    List all testimonials
    GET /api/testimonials/
    """
    queryset = Testimonial.objects.filter(is_active=True).order_by('order', '-created_at')
    serializer_class = TestimonialSerializer
    permission_classes = [AllowAny]


class ContactMessageView(generics.CreateAPIView):
    """
    Submit a contact message
    POST /api/contact/
    Body: {
        "name": "John Doe",
        "email": "john@example.com",
        "subject": "Project Inquiry",
        "message": "I would like to discuss..."
    }
    """
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        return Response({
            'success': True,
            'message': 'Thank you for your message! I will get back to you soon.'
        }, status=status.HTTP_201_CREATED)


class NewsletterSubscribeView(generics.CreateAPIView):
    """
    Subscribe to newsletter
    POST /api/newsletter/subscribe/
    Body: {
        "email": "john@example.com"
    }
    """
    serializer_class = NewsletterSubscriberSerializer
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            email = serializer.validated_data['email']
            
            # Check if already subscribed
            if NewsletterSubscriber.objects.filter(email=email, is_active=True).exists():
                return Response({
                    'success': False,
                    'message': 'You are already subscribed to our newsletter.'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Reactivate if previously unsubscribed
            subscriber, created = NewsletterSubscriber.objects.get_or_create(
                email=email,
                defaults={'is_active': True}
            )
            
            if not created:
                subscriber.is_active = True
                subscriber.save()
            
            return Response({
                'success': True,
                'message': 'Successfully subscribed to the newsletter!'
            }, status=status.HTTP_201_CREATED)
        
        return Response({
            'success': False,
            'message': 'Invalid email address.',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class SiteSettingsView(generics.RetrieveAPIView):
    """
    Get site settings
    GET /api/site-settings/
    """
    serializer_class = SiteSettingsSerializer
    permission_classes = [AllowAny]
    
    def get_object(self):
        try:
            return SiteSettings.objects.get(is_active=True)
        except SiteSettings.DoesNotExist:
            return None
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance is None:
            return Response({'detail': 'Site settings not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


@api_view(['GET'])
def homepage_data(request):
    """
    Get all data needed for homepage in a single request
    GET /api/homepage/
    """
    try:
        personal_info = PersonalInfo.objects.get(is_active=True)
        core_expertise = CoreExpertise.objects.filter(is_active=True).order_by('order')
        featured_projects = Project.objects.filter(is_active=True, is_featured=True).order_by('order')[:6]
        timeline = Timeline.objects.filter(is_active=True).order_by('-year', 'order')[:5]
        
        data = {
            'personal_info': PersonalInfoSerializer(personal_info).data,
            'core_expertise': CoreExpertiseSerializer(core_expertise, many=True).data,
            'featured_projects': ProjectListSerializer(featured_projects, many=True, context={'request': request}).data,
            'timeline': TimelineSerializer(timeline, many=True).data,
            'stats': {
                'years_experience': personal_info.years_experience,
                'projects_completed': personal_info.projects_completed,
                'awards_won': personal_info.awards_won,
                'happy_clients': personal_info.happy_clients,
            }
        }
        
        return Response(data)
    except PersonalInfo.DoesNotExist:
        return Response({'detail': 'Homepage data not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def about_page_data(request):
    """
    Get all data needed for about page
    GET /api/about/
    """
    try:
        personal_info = PersonalInfo.objects.get(is_active=True)
        core_expertise = CoreExpertise.objects.filter(is_active=True).order_by('order')
        timeline = Timeline.objects.filter(is_active=True).order_by('-year', 'order')
        
        data = {
            'personal_info': PersonalInfoSerializer(personal_info).data,
            'core_expertise': CoreExpertiseSerializer(core_expertise, many=True).data,
            'timeline': TimelineSerializer(timeline, many=True).data,
            'stats': {
                'years_experience': personal_info.years_experience,
                'projects_completed': personal_info.projects_completed,
                'awards_won': personal_info.awards_won,
                'happy_clients': personal_info.happy_clients,
            }
        }
        
        return Response(data)
    except PersonalInfo.DoesNotExist:
        return Response({'detail': 'About page data not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def skills_page_data(request):
    """
    Get all data needed for skills page
    GET /api/skills-page/
    """
    categories = dict(Skill.CATEGORY_CHOICES)
    skills_by_category = {}
    
    for category_key, category_name in categories.items():
        skills = Skill.objects.filter(
            is_active=True,
            category=category_key
        ).order_by('order')
        
        if skills.exists():
            skills_by_category[category_key] = {
                'name': category_name,
                'skills': SkillSerializer(skills, many=True).data
            }
    
    tools = Tool.objects.filter(is_active=True).order_by('order')
    
    data = {
        'skills_by_category': skills_by_category,
        'tools': ToolSerializer(tools, many=True).data
    }
    
    return Response(data)


@api_view(['GET'])
def experience_page_data(request):
    """
    Get all data needed for experience page
    GET /api/experience-page/
    """
    experience = Experience.objects.filter(is_active=True).order_by('-start_date', 'order')
    education = Education.objects.filter(is_active=True).order_by('-year', 'order')
    timeline = Timeline.objects.filter(is_active=True).order_by('-year', 'order')
    
    data = {
        'experience': ExperienceSerializer(experience, many=True).data,
        'education': EducationSerializer(education, many=True).data,
        'timeline': TimelineSerializer(timeline, many=True).data
    }
    
    return Response(data)