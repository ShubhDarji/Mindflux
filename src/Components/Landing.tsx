import React, { useRef, useEffect, useMemo, useState } from "react";
import "./Landing.css";
import {
  motion,
  useMotionValue,
  animate,
  useInView,
  useAnimation,
  delay,
  useScroll,
  useTransform,
} from "framer-motion";
import { start } from "repl";
import { once } from "events";

const Landing = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleDragEnd = () => {
    animate(x, 0, { type: "spring", stiffness: 300, damping: 20 });
    animate(y, 0, { type: "spring", stiffness: 300, damping: 20 });
  };

  const capsuleRef = useRef(null);

  const inView = useInView(capsuleRef, { amount: 0.6 });
  const controls = useAnimation();

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const v = useTransform(scrollYProgress, [0, 1], ["0%", "-400%"]);

  useEffect(() => {
    v.on("change", (latest) => {
      console.log("x transform: ", latest);
    });
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("expanded");
    } else {
      controls.start("collapsed");
    }
  }, [inView, controls]);
  const [placeholder, setPlaceholder] = useState("");

  const [hoverText, setHoverText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleHover = (label) => {
    const data = hoverData[label];
    if (data) {
      setHoverText(data.description);
      setSelectedCategory(data.category);
      setPlaceholder(data.description); // 👈 Set directly in input
    }
  };

  const hoverData = {
    "🧠 Cognitive Workspace": {
      description: "Plan your tasks smartly with AI suggestions.",
      category: "Tasks",
    },
    "🗂️ Memory Vault": {
      description: "Store and retrieve memories, ideas, and dreams.",
      category: "Memory",
    },
    "📊 Insight Stream": {
      description: "Generate insights from logs and patterns.",
      category: "AI Actions",
    },
    "🎯 Focus Zone": {
      description: "Silence distractions and enter a flow state.",
      category: "Focus",
    },
    "🧘 Emotion Center": {
      description: "Track emotions and visualize mental health.",
      category: "AI Actions",
    },
  };

  // Generate random positions for each image only when inView becomes true

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
        transition={{ duration: 1.4, ease: "easeOut" }}
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
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
        >
          <div className="title">MindFlux AI</div>
          <div className="subtitle">
            Your <br />
            AI-Augmented <br />
            Brain for the Future
          </div>
          <div className="minitext">
            Control tasks, thoughts, memories, and focus — all in one
            intelligent dashboard.
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
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <svg
            width="300"
            height="300"
            viewBox="0 0 120 120"
            xmlns="http://www.w3.org/2000/svg"
          >
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
              <animate
                attributeName="r"
                from="40"
                to="50"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                from="1"
                to="0"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Inner glowing orb */}
            <circle
              cx="60"
              cy="60"
              r="20"
              fill="url(#orbGradient)"
              filter="url(#glow)"
            />
          </svg>
        </motion.div>
      </div>

      <div className="capsule-wrapper" ref={containerRef}>
        <motion.section
          ref={capsuleRef}
          className="capsule"
          animate={controls}
          variants={{
            initial: {
              color: "#fff",
              height: "300px",
              borderRadius: "100px",
            },
            expanded: {
              height: "100vh",
              borderRadius: "0px",
              color: "#000000",
              transition: {
                default: {
                  stiffness: 100,
                  ease: "easeInOut",
                },
                duration: 1,
              },
            },
          }}
        >
          <motion.div
            className="capsule-text"
            initial={{ y: "50%", scale: 0.3, opacity: 0 }}
            animate={inView ? { y: "0%", scale: 1.2, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            MINDFLUX is your Personal <br />
            <span>AI Assistant</span>
          </motion.div>{" "}
          <div className="carousel">
            <motion.div style={{ x: v }} className="scroll-container">

                <div
                 
                  className="card"

                >
                  <h2>Card </h2>
                </div>
                 <div
                 
                  className="card"

                >
                  <h2>Card </h2>
                </div>
                 <div
                 
                  className="card"

                >
                  <h2>Card </h2>
                </div> <div
                 
                  className="card"

                >
                  <h2>Card </h2>
                </div>
         
            </motion.div>
          </div>
          {/* Horizontal Scroll Cards */}
        </motion.section>
      </div>

      {/* <div className="contain">
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
      </div> */}

      <div className="container2">
        <div className="golden-sub">
          <div className="golden-sub1">
            <div className="hover-group">
              {Object.keys(hoverData).map((key, idx) => (
                <div
                  key={idx}
                  className={`hover-item${idx === 4 ? "01" : ""}`}
                  onMouseEnter={() => handleHover(key)}
                  onMouseLeave={() => {
                    setHoverText("");
                    setSelectedCategory("All");
                  }}
                >
                  <div className="hover-text">{key}</div>
                </div>
              ))}
            </div>
          </div>
       
            <div className="golden-sub2">
  <a href="#capsule" className="try-now-link">
    Try Now →
  </a>
</div>

          
        </div>

        <div className="golden-main">
          <div className="abovetext">
            The AI that can think, remember, and act for you
          </div>

          <div className="search-wrapper">
            <div className="searchl1">MindFlux</div>

            <div className="searchcenter">
              <div className="search-bar">
                <input
                  type="text"
                  className="search-input"
                  placeholder={placeholder}
                  readOnly
                />
              </div>
            </div>

            <div className="searchr1">
              <div className="icon-wrapper">
                <i className="fas fa-filter"></i>
              </div>
              <select
                className="category-dropdown"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>All</option>
                <option>Tasks</option>
                <option>Memory</option>
                <option>Focus</option>
                <option>AI Actions</option>
              </select>
              <div className="icon-wrapper">
                <i className="fas fa-microphone"></i>
              </div>
              <button className="search-button">→</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
