import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CardSlideshowProps {
  images: string[];
  title: string;
  fallbackIcon: React.ElementType;
  onImageClick?: (src: string, index: number, all: string[]) => void;
}

export default function CardSlideshow({
  images,
  title,
  fallbackIcon: FallbackIcon,
  onImageClick,
}: CardSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [validImages, setValidImages] = useState<string[]>(images);

  useEffect(() => {
    setValidImages(images);
    setCurrentIndex(0);
  }, [images]);

  // Preload adjacent images for instantaneous navigation through 100+ images
  useEffect(() => {
    if (!validImages || validImages.length <= 1) return;
    const nextIdx = (currentIndex + 1) % validImages.length;
    const prevIdx = (currentIndex - 1 + validImages.length) % validImages.length;
    const imgNext = new Image();
    imgNext.src = validImages[nextIdx];
    const imgPrev = new Image();
    imgPrev.src = validImages[prevIdx];
  }, [currentIndex, validImages]);

  // If no images or all failed to load, show standard icon + rings
  if (!validImages || validImages.length === 0) {
    return (
      <>
        <FallbackIcon size={48} strokeWidth={1.2} />
        <div className="visual-rings" />
      </>
    );
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    setCurrentIndex(idx);
  };

  const handleImageError = (failedSrc: string) => {
    setValidImages((prev) => {
      const next = prev.filter((s) => s !== failedSrc);
      if (currentIndex >= next.length && next.length > 0) {
        setCurrentIndex(next.length - 1);
      }
      return next;
    });
  };

  const currentSrc = validImages[currentIndex];

  return (
    <div
      className="card-slideshow-wrap"
      onClick={() => onImageClick?.(currentSrc, currentIndex, validImages)}
      role="region"
      aria-label={`${title} image slideshow`}
    >
      <img
        key={currentSrc}
        src={currentSrc}
        alt={`${title} - frame ${currentIndex + 1}`}
        className="card-slideshow-img"
        loading="lazy"
        onError={() => handleImageError(currentSrc)}
      />

      {validImages.length > 1 && (
        <>
          <button
            type="button"
            className="slideshow-arrow prev"
            onClick={handlePrev}
            aria-label="Previous image"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            type="button"
            className="slideshow-arrow next"
            onClick={handleNext}
            aria-label="Next image"
          >
            <ChevronRight size={16} />
          </button>

          <div className="slideshow-counter">
            {currentIndex + 1} / {validImages.length}
          </div>

          {/* If 8 or fewer images, display clickable dots. If 9 to 100+ images, display a smooth progress bar */}
          {validImages.length <= 8 ? (
            <div className="slideshow-dots" onClick={(e) => e.stopPropagation()}>
              {validImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`slideshow-dot ${idx === currentIndex ? 'is-active' : ''}`}
                  onClick={(e) => handleDotClick(e, idx)}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          ) : (
            <div className="slideshow-progress-track" onClick={(e) => e.stopPropagation()}>
              <div
                className="slideshow-progress-fill"
                style={{ width: `${((currentIndex + 1) / validImages.length) * 100}%` }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
