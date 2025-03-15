import { createClient } from "@supabase/supabase-js";

export const SUPABASE_URL = "https://viwmxpuuzmkvaapnrkpy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpd214cHV1em1rdmFhcG5ya3B5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwNjI5MDksImV4cCI6MjA1NjYzODkwOX0.uWrKW97WQqd219AQyH_3KuaPvYC-QJCyco8n7Pb0QnQ";
const supabase = createClient(SUPABASE_URL, supabaseKey);

export default supabase;
