import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ✅ Base URL for Django API
const BASE_URL = "http://localhost:8000/api";

export const fetchPersonalInfo = async () => {
  const response = await fetch(`${BASE_URL}/personal-info/`);
  if (!response.ok) {
    throw new Error("Failed to fetch personal info");
  }
  return response.json();
};

export const fetchSiteSettings = async () => {
  const response = await fetch(`${BASE_URL}/site-settings/`);
  if (!response.ok) {
    throw new Error("Failed to fetch site settings");
  }
  return response.json();
};

export const fetchProjects = async () => {
  const response = await fetch(`${BASE_URL}/projects/`);
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  return response.json();
};

export const fetchSkills = async () => {
  const response = await fetch(`${BASE_URL}/skills/`);
  if (!response.ok) {
    throw new Error("Failed to fetch skills");
  }
  return response.json();
};

export const fetchExperiences = async () => {
  const response = await fetch(`${BASE_URL}/experience/`);
  if (!response.ok) {
    throw new Error("Failed to fetch experiences");
  }
  return response.json();
};

export const fetchEducation = async () => {
  const response = await fetch(`${BASE_URL}/education/`);
  if (!response.ok) {
    throw new Error("Failed to fetch education");
  }
  return response.json();
};

export const fetchTestimonials = async () => {
  const response = await fetch(`${BASE_URL}/testimonials/`);
  if (!response.ok) {
    throw new Error("Failed to fetch testimonials");
  }
  return response.json();
};

export const fetchTimeline = async () => {
  const response = await fetch(`${BASE_URL}/timeline/`);
  if (!response.ok) {
    throw new Error("Failed to fetch timeline");
  }
  return response.json();
};

export const fetchCoreExpertise = async () => {
  const response = await fetch(`${BASE_URL}/core-expertise/`);
  if (!response.ok) {
    throw new Error("Failed to fetch core expertise");
  }
  return response.json();
};

export const fetchTools = async () => {
  const response = await fetch(`${BASE_URL}/tools/`);
  if (!response.ok) {
    throw new Error("Failed to fetch tools");
  }
  return response.json();
};

export const fetchProjectCategories = async () => {
  const response = await fetch(`${BASE_URL}/project-categories/`);
  if (!response.ok) {
    throw new Error("Failed to fetch project categories");
  }
  return response.json();
};

export const fetchExperiencePageData = async () => {
  const response = await fetch(`${BASE_URL}/experience-page/`);
  if (!response.ok) {
    throw new Error("Failed to fetch experience page data");
  }
  return response.json();
};
