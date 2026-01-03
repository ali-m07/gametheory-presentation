import React from 'react'
import { motion } from 'framer-motion'
import './Slide.css'

// Helper function to render text with pseudo-markdown bold support
const renderText = (text) => {
  if (typeof text !== 'string') return text;

  // Split by ** to find bold parts
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Remove asterisk and render bold
      return <strong key={index} style={{ color: '#ffffff', fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const Slide = ({ slide, slideNumber, totalSlides }) => {
  const variants = {
    enter: { opacity: 0, scale: 1.05 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0 }
  }

  const isCover = slide.type === 'cover'

  return (
    <motion.div
      className={`slide-container ${isCover ? 'cover' : ''}`}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background Image - Always render if available, darkened overlay */}
      {slide.image && (
        <>
          <div
            className="slide-background"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="slide-overlay" style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8))',
            zIndex: 0
          }} />
        </>
      )}

      {/* FIXED HEADER: Title & Subtitle at the TOP */}
      <div className="slide-header-top">
        {!isCover && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="slide-meta"
              style={{ marginBottom: '10px', fontSize: '0.9rem', opacity: 0.7 }}
            >
              {slide.concept} <span style={{ margin: '0 10px' }}>|</span> {totalSlides} / {slideNumber}
            </motion.div>
            {slide.subtitle && (
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ fontSize: '1.2rem', fontWeight: 300, margin: '5px 0 0 0', opacity: 0.8 }}
              >
                {renderText(slide.subtitle)}
              </motion.h3>
            )}
          </>
        )}
      </div>


      {/* CENTRAL CONTENT AREA */}
      <div className="slide-content-wrapper" style={{
        display: 'flex',
        justifyContent: isCover ? 'center' : 'center',
        alignItems: 'center',
        height: '100%',
        paddingTop: isCover ? '0' : '100px',
        zIndex: 1
      }}>

        {isCover ? (
          // Cover Slide Layout
          <div style={{ textAlign: 'center', zIndex: 2, maxWidth: '900px' }}>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: '20px', textShadow: '0 4px 20px rgba(0,0,0,0.6)' }}
            >
              {renderText(slide.title)}
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ fontSize: '1.8rem', fontWeight: 300, opacity: 0.9, marginBottom: '40px' }}
            >
              {renderText(slide.subtitle)}
            </motion.h2>

            {/* Render Content for Cover Slide if Exists */}
            {Array.isArray(slide.content) && slide.content.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                style={{ fontSize: '1.2rem', lineHeight: 1.6, opacity: 0.85, background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '15px' }}
              >
                {slide.content.map((line, i) => (
                  <p key={i} style={{ marginBottom: '10px' }}>{renderText(line)}</p>
                ))}
              </motion.div>
            )}
          </div>
        ) : (
          // Standard Slide Layout: Glass Card for Content
          <motion.div
            className="glass-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="slide-body" style={{ fontSize: '1.4rem', lineHeight: 1.8 }}>
              {slide.type === 'logo' && slide.platform === 'X' && (
                <div style={{ fontSize: '80px', fontWeight: 900, marginBottom: '20px', textAlign: 'center' }}>X</div>
              )}

              {Array.isArray(slide.content) && slide.content.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  style={{ marginBottom: '15px' }}
                >
                  {/* Check if line starts with '-' for bullet point parsing */}
                  {line.startsWith('-') ? (
                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                      <span style={{ color: '#00d2ff', marginLeft: '10px' }}>•</span>
                      <span>{renderText(line.substring(1).trim())}</span>
                    </div>
                  ) : (
                    <p style={{ margin: 0 }}>{renderText(line)}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </motion.div>
  )
}

export default Slide
