"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  large?: boolean;
};

type GalleryGridProps = {
  images: GalleryImage[];
  variant?: "default" | "project";
};

export function GalleryGrid({ images, variant = "default" }: GalleryGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);

  const step = useCallback(
    (direction: number) => {
      setOpenIndex((current) =>
        current === null ? current : (current + direction + images.length) % images.length
      );
    },
    [images.length]
  );

  useEffect(() => {
    if (openIndex === null) {
      return;
    }

    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openIndex, close, step]);

  const current = openIndex === null ? null : images[openIndex];

  return (
    <>
      <div className={`gallery-grid ${variant === "project" ? "gallery-grid--project" : ""}`}>
        {images.map((image, index) => (
          <figure
            key={`${image.src}-${index}`}
            className={image.large ? "gallery-item gallery-item--large" : "gallery-item"}
          >
            <button
              className="gallery-item__button"
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`View ${image.caption} image in full size`}
            >
              <Image src={image.src} alt={image.alt} fill sizes="(max-width: 900px) 100vw, 33vw" />
              <span className="gallery-item__overlay" aria-hidden="true">
                <span className="gallery-item__expand">
                  <Expand size={17} />
                </span>
                <span className="gallery-item__meta">
                  <strong>{image.caption}</strong>
                  <small>Click to enlarge</small>
                </span>
              </span>
            </button>
          </figure>
        ))}
      </div>

      {current ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${current.caption} image viewer`}
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <button className="lightbox__close" type="button" onClick={close} aria-label="Close image viewer">
            <X size={22} />
          </button>
          <button
            className="lightbox__nav lightbox__nav--prev"
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous image"
          >
            <ChevronLeft size={26} />
          </button>
          <figure className="lightbox__figure">
            <Image src={current.src} alt={current.alt} fill sizes="92vw" priority />
          </figure>
          <button
            className="lightbox__nav lightbox__nav--next"
            type="button"
            onClick={() => step(1)}
            aria-label="Next image"
          >
            <ChevronRight size={26} />
          </button>
          <p className="lightbox__caption">
            <strong>{current.caption}</strong>
            <span>
              {(openIndex ?? 0) + 1} / {images.length}
            </span>
          </p>
        </div>
      ) : null}
    </>
  );
}
