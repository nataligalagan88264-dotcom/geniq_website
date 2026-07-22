import React from "react";

const VIDEO_PATTERN = /\.(mp4|webm|mov)(\?.*)?$/i;

export default function EditableMedia({ src, alt = "", className = "" }) {
  if (!src) return null;

  if (VIDEO_PATTERN.test(src)) {
    return (
      <video
        className={className}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={alt || undefined}
      />
    );
  }

  return <img className={className} src={src} alt={alt} loading="lazy" />;
}
