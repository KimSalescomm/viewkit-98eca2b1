ALTER TABLE public.sales_certifications DROP CONSTRAINT IF EXISTS sales_certifications_memo_length;

CREATE OR REPLACE FUNCTION public.validate_sales_cert_memo()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.memo IS NOT NULL AND (char_length(NEW.memo) < 20 OR char_length(NEW.memo) > 200) THEN
    RAISE EXCEPTION 'memo must be between 20 and 200 characters';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS validate_sales_cert_memo_insert ON public.sales_certifications;
CREATE TRIGGER validate_sales_cert_memo_insert
BEFORE INSERT ON public.sales_certifications
FOR EACH ROW EXECUTE FUNCTION public.validate_sales_cert_memo();