// Supabase Configuration
const SUPABASE_URL = 'https://kdwdrrxfutjvegawunut.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkd2RycnhmdXRqdmVnYXd1bnV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0MDczMTEsImV4cCI6MjA5Mjk4MzMxMX0.e3kSZRM22c6I8-09viaEm7olXg3293Pq4_DQzwKWZZU';

const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Store constants
const STORE_NAME = 'عطارة اليرموك';
const WHATSAPP_NUMBER = '201158221296';
const SHIPPING_COST = 50;
const CURRENCY = 'ج.م';
