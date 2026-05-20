CREATE POLICY "Anyone can delete sales certifications"
ON public.sales_certifications
FOR DELETE
USING (true);