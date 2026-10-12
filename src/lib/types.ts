export type Branch = {
  id: number;
  name: string;
  slug: string;
  address: string;
  landmark: string;
  map_url: string;
  operating_hours: string;
  primary_phone: string;
  secondary_phone: string;
  email: string;
  classes_available_note: string;
  is_active: boolean;
};

export type Course = {
  id: number;
  name: string;
  slug: string;
  summary: string;
  description: string;
  licence_class: string;
  licence_class_label: string;
  transmission: string;
  transmission_label: string;
  level: string;
  level_label: string;
  duration_days: number | null;
  min_age: number | null;
  max_gvm_kg: number | null;
  lesson_count: number | null;
  lesson_unit_minutes: number | null;
  price_amount: string | null;
  currency: string;
  show_price: boolean;
  inclusions: string;
  exclusions: string;
  price_updated_at: string | null;
  branch_details: { id: number; name: string; slug: string }[];
  status?: string;
  status_label?: string;
};

export type FAQ = {
  id: number;
  question: string;
  answer: string;
  category: string;
  category_label?: string;
  display_order: number;
  status?: string;
  status_label?: string;
};

export type RTSAItem = {
  id: number;
  title: string;
  slug: string;
  body: string;
  fee_amount: string | null;
  currency: string;
  source_url: string;
  effective_date: string | null;
  last_reviewed_at: string | null;
  display_order: number;
  status?: string;
  status_label?: string;
};

export type Vehicle = {
  id: number;
  name: string;
  make_model: string;
  vehicle_type: string;
  vehicle_type_label: string;
  licence_class: string;
  licence_class_label: string;
  transmission: string;
  transmission_label: string;
  branch_name: string | null;
  status: string;
  status_label: string;
  public_description: string;
  /** Absolute URL of uploaded cutout photo — empty shows the icon placeholder. */
  photo?: string;
  registration_number?: string;
  show_on_public_page?: boolean;
  branch?: number | null;
};

export type Instructor = {
  id: number;
  display_name: string;
  branch_name: string | null;
  licence_classes: string;
  transmission: string;
  transmission_label: string;
  credentials_note: string;
  public_bio: string;
  /** Absolute URL of uploaded profile photo — empty shows the placeholder. */
  photo?: string;
  /** Crop focus for public cards: center | top | bottom */
  photo_focus?: "center" | "top" | "bottom" | string;
  show_on_public_page?: boolean;
  status?: string;
  home_branch?: number | null;
  user?: number;
};

export type Testimonial = {
  id: number;
  quote: string;
  author_name: string;
  author_role: string;
  rating: number | null;
};

export type AuthTokens = {
  access: string;
  refresh: string;
};

export type MeUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  roles?: { role: string; role_label: string }[];
  is_staff?: boolean;
  is_superuser?: boolean;
};
