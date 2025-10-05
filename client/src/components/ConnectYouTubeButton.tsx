export default function ConnectYouTubeButton({ userId }: { userId: string }) {
  const clientId = import.meta.env.VITE_YOUTUBE_CLIENT_ID;
  const redirectUri = encodeURIComponent(
    "https://<PROJECT-REF>.functions.supabase.co/youtube-oauth-callback"
  );

  const state = encodeURIComponent(JSON.stringify({ userId }));

  const authUrl =
    `https://accounts.google.com/o/oauth2/v2/auth` +
    `?client_id=${clientId}` +
    `&redirect_uri=${redirectUri}` +
    `&response_type=code` +
    `&scope=https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.upload` +
    `&state=${state}` +
    `&access_type=offline` +
    `&prompt=consent`;

  return (
    <button
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
      onClick={() => (window.location.href = authUrl)}
    >
      Connecter YouTube
    </button>
  );
}

