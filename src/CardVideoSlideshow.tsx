import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface CardVideoSlideshowProps {
  videos: string[];
  title: string;
  fallbackIcon: React.ElementType;
  onPlayClick?: (videoSrc: string, index: number, allVideos: string[]) => void;
}

export default function CardVideoSlideshow({
  videos,
  title,
  fallbackIcon: FallbackIcon,
  onPlayClick,
}: CardVideoSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [validVideos, setValidVideos] = useState<string[]>(videos);
  const [videoLoadError, setVideoLoadError] = useState(false);

  useEffect(() => {
    setValidVideos(videos);
    setCurrentIndex(0);
    setVideoLoadError(false);
  }, [videos]);

  if (!validVideos || validVideos.length === 0) {
    return (
      <>
        <FallbackIcon size={48} strokeWidth={1.2} />
        <div className="visual-rings" />
      </>
    );
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVideoLoadError(false);
    setCurrentIndex((prev) => (prev === 0 ? validVideos.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVideoLoadError(false);
    setCurrentIndex((prev) => (prev === validVideos.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    setVideoLoadError(false);
    setCurrentIndex(idx);
  };

  const currentSrc = validVideos[currentIndex];

  return (
    <div
      className="card-slideshow-wrap is-video"
      onClick={() => onPlayClick?.(currentSrc, currentIndex, validVideos)}
      role="region"
      aria-label={`${title} video manual slideshow`}
    >
      <video
        key={currentSrc}
        src={`${currentSrc}#t=0.1`}
        preload="metadata"
        muted
        playsInline
        className="card-slideshow-video"
        onError={() => setVideoLoadError(true)}
      />

      {/* Fallback Icon behind overlay if video frame hasn't loaded yet */}
      {videoLoadError && (
        <div
          className="card-video-fallback-icon"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255, 255, 255, 0.22)',
            zIndex: 1,
          }}
        >
          <FallbackIcon size={52} strokeWidth={1.2} />
        </div>
      )}

      {/* Video Play Overlay */}
      <div className="card-video-play-center">
        <div className="play-badge-prominent">
          <Play size={20} fill="currentColor" />
        </div>
        <span className="card-play-label">Play</span>
      </div>

      {validVideos.length > 1 && (
        <>
          <button
            type="button"
            className="slideshow-arrow prev"
            onClick={handlePrev}
            aria-label="Previous video"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            type="button"
            className="slideshow-arrow next"
            onClick={handleNext}
            aria-label="Next video"
          >
            <ChevronRight size={16} />
          </button>

          <div className="slideshow-counter">
            Video {currentIndex + 1} / {validVideos.length}
          </div>

          {validVideos.length <= 8 ? (
            <div className="slideshow-dots" onClick={(e) => e.stopPropagation()}>
              {validVideos.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`slideshow-dot ${idx === currentIndex ? 'is-active' : ''}`}
                  onClick={(e) => handleDotClick(e, idx)}
                  aria-label={`Go to video ${idx + 1}`}
                />
              ))}
            </div>
          ) : (
            <div className="slideshow-progress-track" onClick={(e) => e.stopPropagation()}>
              <div
                className="slideshow-progress-fill"
                style={{ width: `${((currentIndex + 1) / validVideos.length) * 100}%` }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
