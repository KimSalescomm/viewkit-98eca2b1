CREATE TABLE public.sales_certifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  branch TEXT NOT NULL,
  product TEXT NOT NULL,
  sold_at DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.sales_certifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert sales certifications"
ON public.sales_certifications
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can read sales certifications"
ON public.sales_certifications
FOR SELECT
USING (true);

CREATE INDEX idx_sales_cert_created_at ON public.sales_certifications (created_at DESC);
CREATE INDEX idx_sales_cert_branch ON public.sales_certifications (branch);
CREATE INDEX idx_sales_cert_product ON public.sales_certifications (product);