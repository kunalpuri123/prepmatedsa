import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.2";

serve(async (req) => {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state) {
    return new Response("Missing code or state", { status: 400 });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const linkedinClientId = Deno.env.get("LINKEDIN_CLIENT_ID")!;
  const linkedinClientSecret = Deno.env.get("LINKEDIN_CLIENT_SECRET")!;
  const siteUrl = Deno.env.get("SITE_URL")!;

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const { data: stateRow } = await supabase
    .from("user_linkedin_oauth_states")
    .select("user_id, expires_at")
    .eq("state", state)
    .maybeSingle();

  if (!stateRow) {
    return new Response("Invalid state", { status: 400 });
  }

  if (new Date(stateRow.expires_at).getTime() < Date.now()) {
    await supabase.from("user_linkedin_oauth_states").delete().eq("state", state);
    return new Response("State expired", { status: 400 });
  }

  await supabase.from("user_linkedin_oauth_states").delete().eq("state", state);

  const redirectUri = `${siteUrl}/auth/linkedin/callback`;

  const tokenRes = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: linkedinClientId,
      client_secret: linkedinClientSecret,
    }),
  });

  if (!tokenRes.ok) {
    const errorText = await tokenRes.text();
    return new Response(errorText, { status: 400 });
  }

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token as string;
  const refreshToken = tokenData.refresh_token as string | undefined;
  const scope = tokenData.scope as string | undefined;
  const expiresIn = tokenData.expires_in as number | undefined;
  const expiresAt = expiresIn ? new Date(Date.now() + expiresIn * 1000).toISOString() : null;

  const profileRes = await fetch("https://api.linkedin.com/v2/userinfo", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const profile = profileRes.ok ? await profileRes.json() : null;
  const memberId = profile?.sub || profile?.id || null;

  await supabase
    .from("user_linkedin_auth")
    .upsert({
      user_id: stateRow.user_id,
      linkedin_member_id: memberId,
      access_token: accessToken,
      refresh_token: refreshToken ?? null,
      scope,
      expires_at: expiresAt,
    }, { onConflict: "user_id" });

  return Response.redirect(`${siteUrl}/learn?linkedin=connected`, 302);
});
