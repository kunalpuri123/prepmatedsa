import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const linkedinClientId = Deno.env.get("LINKEDIN_CLIENT_ID")!;
  const siteUrl = Deno.env.get("SITE_URL")!;

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: req.headers.get("Authorization")!,
      },
    },
  });

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const state = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

  const { error: stateError } = await supabase
    .from("user_linkedin_oauth_states")
    .insert({ state, user_id: user.id, expires_at: expiresAt });

  if (stateError) {
    return new Response(JSON.stringify({ error: "Failed to create state" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const redirectUri = `${siteUrl}/auth/linkedin/callback`;
  const params = new URLSearchParams({
    response_type: "code",
    client_id: linkedinClientId,
    redirect_uri: redirectUri,
    scope: "openid profile email w_member_social",
    state,
  });

  return new Response(JSON.stringify({ url: `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}` }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
