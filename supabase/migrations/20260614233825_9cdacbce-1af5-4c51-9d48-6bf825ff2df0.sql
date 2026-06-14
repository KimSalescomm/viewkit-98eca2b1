ALTER TABLE public.sales_certifications
  ADD COLUMN IF NOT EXISTS subcategory text,
  ADD COLUMN IF NOT EXISTS memo text;