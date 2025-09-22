export default function ConnectCalendlyButton({ userId }: { userId: string }) {
  const clientId = import.meta.env.VITE_CALENDLY_CLIENT_ID;
  const redirectUri = encodeURIComponent(
    "https://<PROJECT-REF>.functions.supabase.co/calendly-oauth-callback"
  );

  const state = encodeURIComponent(JSON.stringify({ userId }));

  const authUrl =
    `https://auth.calendly.com/oauth/authorize` +
    `?client_id=${clientId}` +
    `&response_type=code` +
    `&redirect_uri=${redirectUri}` +
    `&state=${state}`;

  return (
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
      onClick={() => (window.location.href = authUrl)}
    >
      Connecter Calendly
    </button>
  );
}
