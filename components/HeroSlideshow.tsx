"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Slide = {
  src: string;
  alt: string;
};

type HeroSlideshowProps = {
  slides: Slide[];
  interval?: number;
};

export function HeroSlideshow({ slides, interval = 6000 }: HeroSlideshowProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = setInterval(() => {
      setActive((index) => (index + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [slides.length, interval]);

  return (
    <>
      <div className="hero-slides">
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={`hero-slide ${index === active ? "hero-slide--active" : ""}`}
            aria-hidden={index !== active}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>
      <div className="hero-slides__dots" role="tablist" aria-label="Hero images">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-label={`Show image ${index + 1}: ${slide.alt}`}
            className={index === active ? "is-active" : ""}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </>
  );
}
