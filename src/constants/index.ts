export const BUSINESS_CATEGORIES = [
  "Home Services",
  "Automotive",
  "Food & Hospitality",
  "Beauty & Personal Care",
  "Healthcare",
  "Professional Services",
  "Technology",
  "Education",
  "Retail",
  "Manufacturing",
  "Construction",
  "Creative Services",
  "Financial Services",
  "Agriculture",
  "Logistics",
  "Real Estate",
  "Non-Profit & Community",
  "Freelancer",
] as const;

export const PROFILE_COMPLETION_STEPS = [
  "Business Basics",
  "Contact Info",
  "Description",
  "Branding",
  "Services",
  "Business Hours",
  "Social Links",
  "Gallery",
  "Verification",
  "Publish",
] as const;

export const TRUST_SCORE_LEVELS = [
  { min: 0, max: 20, label: "Low Trust" },
  { min: 21, max: 40, label: "Emerging" },
  { min: 41, max: 60, label: "Established" },
  { min: 61, max: 80, label: "Trusted" },
  { min: 81, max: 100, label: "Highly Trusted" },
] as const;

export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  dashboard: "/dashboard",
  onboarding: "/onboarding",
} as const;
