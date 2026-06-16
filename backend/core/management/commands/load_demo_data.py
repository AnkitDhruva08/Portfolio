"""
Management command to load demo data for Ankit's portfolio.
Place this file at: backend/core/management/commands/load_demo_data.py
"""

from django.core.management.base import BaseCommand
from core.models import (
    PersonalInfo, Skill, ProjectCategory, Project,
    Experience, Achievement, Education, Timeline,
    CoreExpertise, SiteSettings
)


class Command(BaseCommand):
    help = 'Load demo data for Ankit portfolio'

    def handle(self, *args, **kwargs):

        # ── 1. Site Settings ──────────────────────────────────────────
        if not SiteSettings.objects.exists():
            SiteSettings.objects.create(
                site_title="Ankit Mishra | Full Stack Python Developer",
                site_description="Full Stack Python Developer specializing in Django, FastAPI, React and AI-driven platforms.",
                meta_keywords="Python, Django, FastAPI, React, AI, Full Stack Developer",
                primary_color="#D4AF37",
                is_active=True,
            )
            self.stdout.write(self.style.SUCCESS('✅ SiteSettings created'))

        # ── 2. Personal Info ──────────────────────────────────────────
        if not PersonalInfo.objects.exists():
            PersonalInfo.objects.create(
                name="Ankit Mishra",
                title="Full Stack Python Developer | AI & Agentic Systems",
                tagline="Crafting scalable solutions with precision, passion, and purpose.",
                hero_description="Full Stack Python Developer with 3+ years of experience building scalable web applications and AI-driven platforms. Strong expertise in Django, FastAPI, and modern frontend frameworks.",
                about_heading="Building Tomorrow's Solutions Today",
                about_description="I'm a Full Stack Python Developer passionate about creating intelligent, scalable systems that solve real-world problems.",
                about_detail="With hands-on experience in LLM integration, NLP, and agentic AI workflows, I bring both technical depth and creative thinking to every project.",
                email="ankit.mishra10021997@gmail.com",
                phone="+91-9098821587",
                location="Udaipur, Rajasthan",
                availability_status="Available for Freelance",
                years_experience=3,
                projects_completed=15,
                awards_won=2,
                happy_clients=10,
                linkedin_url="https://linkedin.com/in/ankit-mishra1001",
                github_url="https://github.com/AnkitDhruva08",
                footer_tagline="Building scalable solutions with passion and purpose.",
                copyright_text="© 2024 Ankit Mishra. All rights reserved.",
                is_active=True,
            )
            self.stdout.write(self.style.SUCCESS('✅ PersonalInfo created'))

        # ── 3. Core Expertise ─────────────────────────────────────────
        expertise_data = [
            ("Backend Development", "code", 1),
            ("AI & ML Integration", "brain", 2),
            ("Frontend Development", "layers", 3),
            ("API Design", "api", 4),
            ("Database Design", "database", 5),
            ("DevOps & CI/CD", "settings", 6),
        ]
        for title, icon, order in expertise_data:
            CoreExpertise.objects.get_or_create(title=title, defaults={"icon_name": icon, "order": order})
        self.stdout.write(self.style.SUCCESS('✅ Core Expertise created'))

        # ── 4. Skills ─────────────────────────────────────────────────
        skills_data = [
            ("Python", "backend", 5, "python", 1),
            ("Django", "backend", 5, "django", 2),
            ("FastAPI", "backend", 4, "fastapi", 3),
            ("REST APIs", "backend", 5, "api", 4),
            ("Celery", "backend", 4, "celery", 5),
            ("React.js", "frontend", 4, "react", 1),
            ("Next.js", "frontend", 3, "nextjs", 2),
            ("JavaScript", "frontend", 4, "js", 3),
            ("TypeScript", "frontend", 3, "ts", 4),
            ("Tailwind CSS", "frontend", 4, "tailwind", 5),
            ("PostgreSQL", "tools", 5, "postgres", 1),
            ("MongoDB", "tools", 4, "mongo", 2),
            ("Redis", "tools", 4, "redis", 3),
            ("Docker", "tools", 4, "docker", 4),
            ("GitHub Actions", "tools", 3, "github", 5),
            ("LLM Integration", "backend", 4, "ai", 1),
            ("NLP", "backend", 4, "nlp", 2),
            ("Agentic AI", "backend", 3, "agent", 3),
        ]
        for name, category, proficiency, icon, order in skills_data:
            Skill.objects.get_or_create(name=name, defaults={
                "category": category,
                "proficiency": proficiency,
                "icon_name": icon,
                "order": order,
            })
        self.stdout.write(self.style.SUCCESS('✅ Skills created'))

        # ── 5. Project Categories ─────────────────────────────────────
        categories = [
            ("AI & Machine Learning", "ai-ml", 1),
            ("Full Stack Web", "full-stack-web", 2),
            ("Backend API", "backend-api", 3),
            ("Frontend", "frontend", 4),
        ]
        cat_objs = {}
        for name, slug, order in categories:
            obj, _ = ProjectCategory.objects.get_or_create(slug=slug, defaults={"name": name, "order": order})
            cat_objs[slug] = obj
        self.stdout.write(self.style.SUCCESS('✅ Project Categories created'))

        # ── 6. Projects ───────────────────────────────────────────────
        projects_data = [
            {
                "title": "Bridge AI – Agent Readiness Platform",
                "slug": "bridge-ai",
                "category": cat_objs["ai-ml"],
                "short_description": "A system to evaluate whether websites are ready for AI agent access and interaction.",
                "full_description": "Developed a platform that analyzes websites across multiple pillars including API readiness, automation capability, and semantic structure. Built backend services and workflows for AI-driven assessment and insights generation using FastAPI and React.",
                "technologies": "FastAPI, React, PostgreSQL, Redis, OpenAI, Docker",
                "live_url": "",
                "github_url": "https://github.com/AnkitDhruva08",
                "is_featured": True,
                "order": 1,
            },
            {
                "title": "NoMinnows – AI-Powered B2B Marketplace",
                "slug": "nominnows",
                "category": cat_objs["ai-ml"],
                "short_description": "A B2B platform using FastAPI and Next.js with AI for onboarding and smart matching.",
                "full_description": "Built a complete B2B marketplace platform integrating AI for automated onboarding, proposal generation, and intelligent matching between buyers and sellers. Designed scalable architecture using Redis and Docker.",
                "technologies": "FastAPI, Next.js, PostgreSQL, Redis, Docker, OpenAI",
                "live_url": "",
                "github_url": "https://github.com/AnkitDhruva08",
                "is_featured": True,
                "order": 2,
            },
            {
                "title": "Employee Management System",
                "slug": "employee-management",
                "category": cat_objs["full-stack-web"],
                "short_description": "HRMS with role-based access, task tracking, notifications and async processing.",
                "full_description": "Developed a comprehensive Human Resource Management System featuring role-based access control, task tracking, real-time notifications, and asynchronous processing using Celery and Kafka for background jobs.",
                "technologies": "Django, React, PostgreSQL, Celery, Kafka, Redis",
                "live_url": "",
                "github_url": "https://github.com/AnkitDhruva08",
                "is_featured": True,
                "order": 3,
            },
            {
                "title": "Advertisement Booking System",
                "slug": "ad-booking-system",
                "category": cat_objs["full-stack-web"],
                "short_description": "A platform for booking and managing advertisements with optimized backend processing.",
                "full_description": "Built a full-featured advertisement booking system that significantly reduced processing time through backend optimization. Includes campaign management, scheduling, and reporting features.",
                "technologies": "Django, React, PostgreSQL, Celery",
                "live_url": "",
                "github_url": "https://github.com/AnkitDhruva08",
                "is_featured": False,
                "order": 4,
            },
            {
                "title": "E-Commerce Platform",
                "slug": "ecommerce-platform",
                "category": cat_objs["full-stack-web"],
                "short_description": "A full-featured e-commerce platform built with Django and React.",
                "full_description": "Developed a complete e-commerce solution with product management, cart, checkout, order tracking, and payment integration. Built during internship training period.",
                "technologies": "Django, React, PostgreSQL, Stripe",
                "live_url": "",
                "github_url": "https://github.com/AnkitDhruva08",
                "is_featured": False,
                "order": 5,
            },
        ]
        for data in projects_data:
            Project.objects.get_or_create(slug=data["slug"], defaults=data)
        self.stdout.write(self.style.SUCCESS('✅ Projects created'))

        # ── 7. Experience ─────────────────────────────────────────────
        from datetime import date
        exp_data = [
            {
                "title": "Python Developer",
                "company": "Atlantick Solutions Pvt. Ltd.",
                "start_date": date(2025, 4, 1),
                "end_date": None,
                "description": "Developing enterprise platforms using FastAPI, Django, Kafka, and Redis. Improved system performance by 30% through optimized architecture. Built AI-driven modules and real-time analytics dashboards.",
                "technologies": "FastAPI, Django, Kafka, Redis, React, PostgreSQL, Docker",
                "order": 1,
                "achievements": [
                    "Improved system performance by 30% through optimized architecture",
                    "Built AI-driven modules and real-time analytics dashboards",
                    "Implemented containerized deployments and CI/CD pipelines",
                ],
            },
            {
                "title": "Python Developer",
                "company": "Audix Consulting Software Solutions Pvt. Ltd.",
                "start_date": date(2023, 8, 1),
                "end_date": date(2025, 2, 28),
                "description": "Built scalable APIs and dynamic web applications. Automated workflows reducing manual effort by 70%. Optimized database performance and integrated external services.",
                "technologies": "Django, FastAPI, React, PostgreSQL, REST APIs",
                "order": 2,
                "achievements": [
                    "Built scalable APIs and dynamic web applications",
                    "Automated workflows reducing manual effort by 70%",
                    "Optimized database performance and integrated external services",
                ],
            },
            {
                "title": "Python Full Stack Developer",
                "company": "Sun Bright Software Solutions",
                "start_date": date(2023, 4, 1),
                "end_date": date(2023, 8, 31),
                "description": "Developed advertisement booking system. Reduced processing time through backend optimization.",
                "technologies": "Django, React, PostgreSQL",
                "order": 3,
                "achievements": [
                    "Developed advertisement booking system",
                    "Reduced processing time through backend optimization",
                ],
            },
        ]
        for data in exp_data:
            achievements = data.pop("achievements")
            exp, created = Experience.objects.get_or_create(
                title=data["title"], company=data["company"], defaults=data
            )
            if created:
                for i, ach in enumerate(achievements):
                    Achievement.objects.create(experience=exp, description=ach, order=i+1)
        self.stdout.write(self.style.SUCCESS('✅ Experience created'))

        # ── 8. Education ──────────────────────────────────────────────
        edu_data = [
            ("Master of Computer Applications (MCA)", "University", 2022, "CGPA: 8.2", "graduation-cap", 1),
            ("Bachelor of Science (Computer Science)", "University", 2020, "Computer Science graduate", "book", 2),
        ]
        for degree, institution, year, description, icon, order in edu_data:
            Education.objects.get_or_create(degree=degree, defaults={
                "institution": institution, "year": year,
                "description": description, "icon_name": icon, "order": order,
            })
        self.stdout.write(self.style.SUCCESS('✅ Education created'))

        # ── 9. Timeline ───────────────────────────────────────────────
        timeline_data = [
            (2022, "Started Career", "Began internship at Naresh IT / Vector India building e-commerce and MCQ platforms.", 1),
            (2023, "First Full-Time Role", "Joined Sun Bright Software Solutions as Python Full Stack Developer.", 2),
            (2023, "Joined Audix Consulting", "Built scalable APIs and automated workflows reducing manual effort by 70%.", 3),
            (2025, "Joined Atlantick Solutions", "Working on enterprise AI platforms, improving performance by 30%.", 4),
        ]
        for year, title, description, order in timeline_data:
            Timeline.objects.get_or_create(year=year, title=title, defaults={"description": description, "order": order})
        self.stdout.write(self.style.SUCCESS('✅ Timeline created'))

        self.stdout.write(self.style.SUCCESS('\n🎉 All demo data loaded successfully!'))
