import React, { useRef, useEffect } from 'react';
import './Landing.css';
import { motion, useMotionValue, animate, useInView, useAnimation } from 'framer-motion';

const Landing = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleDragEnd = () => {
    animate(x, 0, { type: 'spring', stiffness: 300, damping: 20 });
    animate(y, 0, { type: 'spring', stiffness: 300, damping: 20 });
  };

  const capsuleRef = useRef(null);
  const inView = useInView(capsuleRef, { threshold: 0.6 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('expanded');
    } else {
      controls.start('initial');
    }
  }, [inView, controls]);

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

      <motion.section
        ref={capsuleRef}
        className="capsule"
        animate={controls}
        variants={{
          initial: {
            height: "300px",
            borderRadius: "100px",
            backgroundColor: "#fff",
          },
          expanded: {
            height: "100vh",
            borderRadius: "0px",
            backgroundColor: "#fff",
            transition: {
              duration: 1.2,
              ease: "easeInOut"
            },
          },
        }}
      >
        <motion.div
          className="capsule-text"
          initial={{
            y: 100,
            scale: 1,
            opacity: 0
          }}
          animate={inView ? { y: 0, scale: 1, opacity: 1 } : {}}
          transition={{duration:1,delay:2}}
        >
            this is the text
        </motion.div>
       {inView && (
  <motion.div className="images-wrapper">
    {[...Array(6)].map((_, idx) => (
      <motion.img
        key={idx}
        src={`https://source.unsplash.com/random/300x300?ai&sig=${idx}`}
        className="ai-image"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: idx * 0.2 }}
      />
    ))}
  </motion.div>
)}

        
      </motion.section>

      <div className="contain">
        <div className="left">
          <div className="l1">
            <div className="ctitle">Cognitive Workspace </div>
            <div className="csubtitle">Plan and think smarter. AI suggests what matters next.</div>
          </div>
        </div>
        <div className="right">
          <div className="r1">
            <div className="ctitle"> Memory  Vault</div>
            <div className="csubtitle">Store your thoughts, voice notes, and dreams in a timeline.</div>
          </div>
        </div>
        <div className="left">
          <div className="l2">
            <div className="ctitle">Emotion  Center</div>
            <div className="csubtitle">Track your mind. Visualize your feelings.</div>
          </div>
        </div>
        <div className="right">
          <div className="r2">
            <div className="ctitle"> Focus  Zone </div>
            <div className="csubtitle">Silence the noise. Enter deep flow.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
