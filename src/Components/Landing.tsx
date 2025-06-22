import React from 'react';
import './Landing.css';
import { motion, useMotionValue, animate } from 'framer-motion';

const Landing = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleDragEnd = () => {
    animate(x, 0, { type: 'spring', stiffness: 300, damping: 20 });
    animate(y, 0, { type: 'spring', stiffness: 300, damping: 20 });
  };

  return (
    <div className="landing-container">
      {/* Background Circles */}
      <div className="circles-background">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`strip-${i}`} className="circle-strip">
            <div className="circle blue" />
            <div className="circle green" />
            <div className="circle red" />
          </div>
        ))}
      </div>

      {/* Navbar */}
      <motion.div
        className="navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      >
        <div className="logo">MindFlux</div>
        <div className="login">Login</div>
      </motion.div>

      {/* Hero Section */}
      <div className="hero-section">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.4 }}
        >
          <div className="title">MindFlux AI</div>
          <div className="subtitle">
            Your <br />
            AI-Augmented <br />
            Brain for the Future
          </div>
          <div className="minitext">
            Control tasks, thoughts, memories, and focus — all in one intelligent dashboard.
          </div>
        </motion.div>

        {/* AI Avatar with draggable + return to center */}
        <motion.div
          className="avatar-wrapper"
          drag
          dragElastic={0.3}
          style={{ x, y }}
          onDragEnd={handleDragEnd}
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <svg width="300" height="300" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="orbGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </radialGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Outer pulse ring */}
            <circle
              cx="60"
              cy="60"
              r="40"
              stroke="#38bdf880"
              strokeWidth="2"
              fill="none"
            >
              <animate attributeName="r" from="40" to="50" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="1" to="0" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Inner glowing orb */}
            <circle cx="60" cy="60" r="20" fill="url(#orbGradient)" filter="url(#glow)" />
          </svg>
        </motion.div>
      </div>
      <div className='contain'>
        <div className='left'>
            <div className='l1'>
                   <div className='ctitle'>Cognitive Workspace </div>
                <div className='csubtitle'>Plan and think smarter. AI suggests what matters next.</div>
            </div>
        </div>
        <div className='right'>
              <div className='r1'>
              <div className='ctitle'> Memory  Vault</div>
                <div className='csubtitle'>Store your thoughts, voice notes, and dreams in a timeline.</div>
            </div>
        </div>
        <div className='left'>
              <div className='l2'>
                <div className='ctitle'>Emotion  Center</div>
                <div className='csubtitle'>Track your mind. Visualize your feelings.</div>
            </div>
        </div>
        <div className='right'>
              <div className='r2'>
              <div className='ctitle'> Focus  Zone </div>
                <div className='csubtitle'>Silence the noise. Enter deep flow.</div>
            </div>
        </div></div>
      </div>
    
  );
};

export default Landing;
