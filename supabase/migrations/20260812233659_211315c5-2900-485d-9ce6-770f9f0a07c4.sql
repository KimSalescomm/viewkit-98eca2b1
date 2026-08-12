ALTER TABLE public.sales_certifications
  ADD CONSTRAINT sales_certifications_memo_length
  CHECK (memo IS NOT NULL AND char_length(btrim(memo)) BETWEEN 20 AND 200)
  NOT VALID;