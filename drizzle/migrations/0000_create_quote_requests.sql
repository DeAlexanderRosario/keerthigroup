CREATE TABLE public.quote_requests (
 id uuid PRIMARY KEY,
 created_at timestamptz NOT NULL DEFAULT now(),
 category text NOT NULL CHECK (char_length(category) BETWEEN 1 AND 100),
 requirement text NOT NULL CHECK (char_length(requirement) BETWEEN 3 AND 2000),
 quantity text NOT NULL DEFAULT '' CHECK (char_length(quantity) <= 100),
 project_type text NOT NULL DEFAULT '' CHECK (char_length(project_type) <= 100),
 details text NOT NULL DEFAULT '' CHECK (char_length(details) <= 2000),
 name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
 company text NOT NULL DEFAULT '' CHECK (char_length(company) <= 150),
 phone text NOT NULL CHECK (phone ~ '^[+0-9 ()-]{7,20}$'),
 whatsapp text NOT NULL DEFAULT '' CHECK (char_length(whatsapp) <= 20),
 email text NOT NULL DEFAULT '' CHECK (char_length(email) <= 254),
 location text NOT NULL CHECK (char_length(location) BETWEEN 2 AND 150),
 status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','reviewing','quoted','closed'))
);
GRANT INSERT ON public.quote_requests TO anon;
GRANT ALL ON public.quote_requests TO service_role;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors may submit new quote requests" ON public.quote_requests FOR INSERT TO anon WITH CHECK (status = 'new');
COMMENT ON TABLE public.quote_requests IS 'Private incoming quotations. Public insert only; no visitor read, update or delete access.';