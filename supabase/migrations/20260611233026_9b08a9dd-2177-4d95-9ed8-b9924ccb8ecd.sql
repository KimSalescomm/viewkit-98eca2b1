CREATE POLICY "Anyone can delete sales certifications"
ON public.sales_certifications
FOR DELETE
TO public
USING (true);

GRANT DELETE ON public.sales_certifications TO anon, authenticated;