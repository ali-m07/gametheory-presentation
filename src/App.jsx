import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Slide from './components/Slide'
import Navigation from './components/Navigation'
import slidesData from './data/slides'

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = slidesData.length

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextSlide()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevSlide()
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentSlide])

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        <Slide
          key={currentSlide}
          slide={slidesData[currentSlide]}
          slideNumber={currentSlide + 1}
          totalSlides={totalSlides}
        />
      </AnimatePresence>
      
      <Navigation
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        goToSlide={goToSlide}
      />
    </div>
  )
}

export default App
