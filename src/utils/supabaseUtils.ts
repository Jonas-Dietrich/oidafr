import supabase from "@/utils/supabase.tsx";

/**
 * Project: RssFrontend
 * Created by: eibmac20
 * Date: 24.05.24
 */

export const getSupabaseSession = async () => {
    return supabase.auth.getSession();
}
