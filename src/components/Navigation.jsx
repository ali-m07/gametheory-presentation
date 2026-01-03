import React from 'react'
import { motion } from 'framer-motion'
import './Navigation.css'

const Navigation = ({ currentSlide, totalSlides, nextSlide, prevSlide, goToSlide }) => {
  const canGoNext = currentSlide < totalSlides - 1
  const canGoPrev = currentSlide > 0

  return (
    <div className="navigation">
      <button
        className={`nav-button next ${!canGoNext ? 'disabled' : ''}`}
        onClick={nextSlide}
        disabled={!canGoNext}
      >
        بعدی →
      </button>

      <div className="slide-dots">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`برو به اسلاید ${index + 1}`}
          />
        ))}
      </div>

      <button
        className={`nav-button prev ${!canGoPrev ? 'disabled' : ''}`}
        onClick={prevSlide}
        disabled={!canGoPrev}
      >
        ← قبلی
      </button>
    </div>
  )
}

export default Navigation
