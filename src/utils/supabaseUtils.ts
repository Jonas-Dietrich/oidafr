import supabase from "@/utils/supabase.tsx";

export const getSupabaseSession = async () => {
    return supabase.auth.getSession();
}
