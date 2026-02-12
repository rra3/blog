"use client";

export default function SpotifyEmbed({ url }: { url: string }) {
  // Convert open.spotify.com/track/ID to open.spotify.com/embed/track/ID
  const embedUrl = url.replace("open.spotify.com/", "open.spotify.com/embed/");

  return (
    <iframe
      src={embedUrl}
      width="100%"
      height="152"
      frameBorder="0"
      allow="encrypted-media"
      loading="lazy"
      className="mt-6 rounded-xl"
    />
  );
}
