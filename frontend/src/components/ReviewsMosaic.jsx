import React, { useEffect, useRef } from "react";
import { Play, Quote, Send } from "lucide-react";
import reviewsContent from "../content/reviews.json";

const REVIEWS = reviewsContent.items;
const CONTENT = reviewsContent.section;

const useReveal = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("in");
      });
    }, { threshold: 0.08 });
    el.querySelectorAll(".reveal").forEach((node) => obs.observe(node));
    return () => obs.disconnect();
  }, []);

  return ref;
};

const ReviewVideo = ({ review }) => (
  <div className={review.circle ? "review-video-circle-wrap" : "review-video-portrait-wrap"}>
    <video
      className={review.circle ? "review-video-circle" : "review-video-portrait"}
      controls
      controlsList="nodownload"
      playsInline
      preload="metadata"
      poster={review.poster}
      aria-label={review.videoLabel}
    >
      <source src={review.video} type="video/mp4" />
      {CONTENT.unsupported_video_text}
    </video>
    {review.circle && (
      <span className="review-video-circle-glow" aria-hidden="true" />
    )}
  </div>
);

const ReviewCard = ({ review, idx }) => {
  const isVideo = Boolean(review.video);

  return (
    <article
      data-testid={`review-${idx}`}
      className={`reveal geniq-card review-card-mosaic review-card-real ${isVideo ? "review-card-with-video" : ""} p-5 sm:p-6`}
    >
      <div className="review-card-topline">
        <div className="review-format-label">
          {review.circle ? <Send size={13} /> : isVideo ? <Play size={13} /> : <Quote size={13} />}
          <span>{review.circle ? CONTENT.circle_review_label : isVideo ? CONTENT.video_review_label : CONTENT.text_review_label}</span>
        </div>
        <span className="review-neurotype">{review.neurotype}</span>
      </div>

      <header className="review-person">
        <div className="review-person-copy">
          <h3>{review.name}</h3>
          {review.role && <p>{review.role}</p>}
          {review.handle && (
            <a href={review.handleUrl} target="_blank" rel="noreferrer">
              {review.handle}
            </a>
          )}
        </div>
        {review.avatar && !isVideo && (
          <img
            className="review-avatar"
            src={review.avatar}
            alt=""
            width="76"
            height="76"
            loading="lazy"
            decoding="async"
            style={{ objectPosition: review.avatarPosition }}
          />
        )}
      </header>

      {isVideo && <ReviewVideo review={review} />}

      {review.request && (
        <div className="review-request">
          <span>{CONTENT.request_label}</span>
          <p>{review.request}</p>
        </div>
      )}

      {review.quote && (
        <blockquote className="review-quote">
          <Quote className="review-quote-opening" size={20} aria-hidden="true" />
          <p>«{review.quote}»</p>
          <Quote className="review-quote-closing" size={20} aria-hidden="true" />
        </blockquote>
      )}

      {review.paragraphs && (
        <div className="review-copy">
          {review.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      )}
    </article>
  );
};

export const ReviewsMosaic = () => {
  const ref = useReveal();

  return (
    <section ref={ref} data-testid="section-reviews" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
      <div className="container-geniq relative z-10">
        <div className="mb-14">
          <div className="reveal text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">{CONTENT.eyebrow}</div>
          <h2 className="reveal text-[32px] sm:text-[42px] lg:text-[48px] font-normal leading-[1.1] text-white mb-5">
            {CONTENT.title} <span className="gradient-text">{CONTENT.accent_title}</span>
          </h2>
          <p className="reveal text-body text-[15px] leading-[1.7] max-w-[640px]">
            {CONTENT.description}
          </p>
        </div>

        <div className="reviews-masonry">
          {REVIEWS.map((review, index) => (
            <div key={`${review.name}-${index}`} className="reviews-masonry-item">
              <ReviewCard review={review} idx={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsMosaic;
