import React, { useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useDramaticSound } from '@/hooks/useDramaticSound';

interface OnboardingPageProps {
  onContinue: () => void;
}

// Couleurs bleues seulement
const COLORS_BLUE = ["#1E67C6", "#3B82F6", "#0EA5E9", "#06B6D4"];

export function OnboardingPage({ onContinue }: OnboardingPageProps) {
  const color = useMotionValue(COLORS_BLUE[0]);
  const { playDramaticSound } = useDramaticSound();

  useEffect(() => {
    animate(color, COLORS_BLUE, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  const handleDashboardClick = () => {
    playDramaticSound();
    onContinue();
  };

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;

  return (
    <>
      <style jsx>{`
        .styled-button {
          --white: #e7f4ff;
          --blue-100: #b1d4fd;
          --blue-200: #90c3ff;
          --blue-300: #89b4f2;
          --blue-400: #2686e2;
          --blue-500: #2b5f83;
          --radius: 18px;

          border-radius: var(--radius);
          outline: none;
          cursor: pointer;
          font-size: 23px;
          font-family: Arial;
          background: transparent;
          letter-spacing: 0px;
          border: 0;
          position: relative;
          width: 300px;
          height: 80px;
          transform: rotate(353deg) skewX(4deg);
        }

        .bg {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          filter: blur(1px);
        }
        .bg::before,
        .bg::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: calc(var(--radius) * 1.1);
          background: var(--blue-500);
        }
        .bg::before {
          filter: blur(5px);
          transition: all 0.3s ease;
          box-shadow:
            -7px 6px 0 0 rgb(75 130 155 / 40%),
            -14px 12px 0 0 rgb(75 130 155 / 30%),
            -21px 18px 4px 0 rgb(75 130 155 / 25%),
            -28px 24px 8px 0 rgb(75 130 155 / 15%),
            -35px 30px 12px 0 rgb(75 130 155 / 12%),
            -42px 36px 16px 0 rgb(75 130 155 / 8%),
            -56px 42px 20px 0 rgb(75 130 155 / 5%);
        }

        .wrap {
          border-radius: inherit;
          overflow: hidden;
          height: 100%;
          transform: translate(6px, -6px);
          padding: 3px;
          background: linear-gradient(
            to bottom,
            var(--blue-100) 0%,
            var(--blue-400) 100%
          );
          position: relative;
          transition: all 0.3s ease;
        }

        .outline {
          position: absolute;
          overflow: hidden;
          inset: 0;
          opacity: 0;
          outline: none;
          border-radius: inherit;
          transition: all 0.4s ease;
        }
        .outline::before {
          content: "";
          position: absolute;
          inset: 2px;
          width: 120px;
          height: 300px;
          margin: auto;
          background: linear-gradient(
            to right,
            transparent 0%,
            white 50%,
            transparent 100%
          );
          animation: spin 3s linear infinite;
          animation-play-state: paused;
        }

        .content {
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          position: relative;
          height: 100%;
          gap: 16px;
          border-radius: calc(var(--radius) * 0.85);
          font-weight: 600;
          transition: all 0.3s ease;
          background: linear-gradient(
            to bottom,
            var(--blue-300) 0%,
            var(--blue-400) 100%
          );
          box-shadow:
            inset -2px 12px 11px -5px var(--blue-200),
            inset 1px -3px 11px 0px rgb(0 0 0 / 35%);
        }
        .content::before {
          content: "";
          inset: 0;
          position: absolute;
          z-index: 10;
          width: 80%;
          top: 45%;
          bottom: 35%;
          opacity: 0.7;
          margin: auto;
          background: linear-gradient(to bottom, transparent, var(--blue-400));
          filter: brightness(1.3) blur(5px);
        }

        .char {
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .char span {
          display: block;
          color: transparent;
          position: relative;
        }
        .char span:nth-child(5) {
          margin-left: 0.5px;
        }
        .char.state-1 span:nth-child(5) {
          margin-right: 0px;
        }
        .char.state-1 span {
          animation: charAppear 1.2s ease backwards calc(var(--i) * 0.03s);
        }
        .char.state-1 span::before,
        .char span::after {
          content: attr(data-label);
          position: absolute;
          color: var(--white);
          text-shadow: -1px 1px 2px var(--blue-500);
          left: 0;
        }
        .char span::before {
          opacity: 0;
          transform: translateY(-100%);
        }
        .char.state-2 {
          position: absolute;
          left: 85px;
        }
        .char.state-2 span::after {
          opacity: 1;
        }

        .icon {
          animation: resetArrow 0.8s cubic-bezier(0.7, -0.5, 0.3, 1.2) forwards;
          z-index: 10;
        }
        .icon div,
        .icon div::before,
        .icon div::after {
          height: 3px;
          border-radius: 1px;
          background-color: var(--white);
        }
        .icon div::before,
        .icon div::after {
          content: "";
          position: absolute;
          right: 0;
          transform-origin: center right;
          width: 14px;
          border-radius: 15px;
          transition: all 0.3s ease;
        }
        .icon div {
          position: relative;
          width: 24px;
          box-shadow: -2px 2px 5px var(--blue-400);
          transform: scale(0.9);
          background: linear-gradient(to bottom, var(--white), var(--blue-100));
          animation: swingArrow 1s ease-in-out infinite;
          animation-play-state: paused;
        }
        .icon div::before {
          transform: rotate(44deg);
          top: 1px;
          box-shadow: 1px -2px 3px -1px var(--blue-400);
          animation: rotateArrowLine 1s linear infinite;
          animation-play-state: paused;
        }
        .icon div::after {
          bottom: 1px;
          transform: rotate(316deg);
          box-shadow: -2px 2px 3px 0 var(--blue-400);
          background: linear-gradient(200deg, var(--white), var(--blue-100));
          animation: rotateArrowLine2 1s linear infinite;
          animation-play-state: paused;
        }

        .path {
          position: absolute;
          z-index: 12;
          bottom: 0;
          left: 0;
          right: 0;
          stroke-dasharray: 150 480;
          stroke-dashoffset: 150;
          pointer-events: none;
        }

        .splash {
          position: absolute;
          top: 0;
          left: 0;
          pointer-events: none;
          stroke-dasharray: 60 60;
          stroke-dashoffset: 60;
          transform: translate(-17%, -31%);
          stroke: var(--blue-300);
        }

        .styled-button:hover .char.state-1 span::before {
          animation: charAppear 0.7s ease calc(var(--i) * 0.03s);
        }

        .styled-button:hover .char.state-1 span::after {
          opacity: 1;
          animation: charDisappear 0.7s ease calc(var(--i) * 0.03s);
        }

        .styled-button:hover .wrap {
          transform: translate(8px, -8px);
        }

        .styled-button:hover .outline {
          opacity: 1;
        }

        .styled-button:hover .outline::before,
        .styled-button:hover .icon div::before,
        .styled-button:hover .icon div::after,
        .styled-button:hover .icon div {
          animation-play-state: running;
        }

        .styled-button:active .bg::before {
          filter: blur(5px);
          opacity: 0.7;
          box-shadow:
            -7px 6px 0 0 rgb(75 130 155 / 40%),
            -14px 12px 0 0 rgb(75 130 155 / 25%),
            -21px 18px 4px 0 rgb(75 130 155 / 15%);
        }
        .styled-button:active .content {
          box-shadow:
            inset -1px 12px 8px -5px rgba(0, 71, 137, 0.4),
            inset 0px -3px 8px 0px var(--blue-200);
        }

        .styled-button:active .outline {
          opacity: 0;
        }

        .styled-button:active .wrap {
          transform: translate(3px, -3px);
        }

        .styled-button:active .splash {
          animation: splash 0.8s cubic-bezier(0.3, 0, 0, 1) forwards 0.05s;
        }

        .styled-button:focus .path {
          animation: path 1.6s ease forwards 0.2s;
        }

        .styled-button:focus .icon {
          animation: arrow 1s cubic-bezier(0.7, -0.5, 0.3, 1.5) forwards;
        }

        .char.state-2 span::after,
        .styled-button:focus .char.state-1 span {
          animation: charDisappear 0.5s ease forwards calc(var(--i) * 0.03s);
        }

        .styled-button:focus .char.state-2 span::after {
          animation: charAppear 1s ease backwards calc(var(--i) * 0.03s);
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes charAppear {
          0% {
            transform: translateY(50%);
            opacity: 0;
            filter: blur(20px);
          }
          20% {
            transform: translateY(70%);
            opacity: 1;
          }
          50% {
            transform: translateY(-15%);
            opacity: 1;
            filter: blur(0);
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes charDisappear {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-70%);
            opacity: 0;
            filter: blur(3px);
          }
        }

        @keyframes arrow {
          0% {
            opacity: 1;
          }
          50% {
            transform: translateX(60px);
            opacity: 0;
          }
          51% {
            transform: translateX(-200px);
            opacity: 0;
          }
          100% {
            transform: translateX(-128px);
            opacity: 1;
          }
        }

        @keyframes swingArrow {
          50% {
            transform: translateX(5px) scale(0.9);
          }
        }

        @keyframes rotateArrowLine {
          50% {
            transform: rotate(30deg);
          }
          80% {
            transform: rotate(55deg);
          }
        }

        @keyframes rotateArrowLine2 {
          50% {
            transform: rotate(330deg);
          }
          80% {
            transform: rotate(300deg);
          }
        }

        @keyframes resetArrow {
          0% {
            transform: translateX(-128px);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes path {
          from {
            stroke: white;
          }
          to {
            stroke-dashoffset: -480;
            stroke: #c6e7f9;
          }
        }

        @keyframes splash {
          to {
            stroke-dasharray: 2 60;
            stroke-dashoffset: -60;
          }
        }
      `}</style>
      <motion.div 
        style={{ backgroundImage }}
        className="min-h-screen w-full relative overflow-hidden bg-gray-950"
      >
        {/* Étoiles animées */}
        <div className="absolute inset-0 z-0">
          <div className="stars-container">
            {Array.from({ length: 100 }).map((_, i) => (
              <motion.div
                key={i}
                className="star"
                style={{
                  position: 'absolute',
                  width: Math.random() * 3 + 1 + 'px',
                  height: Math.random() * 3 + 1 + 'px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen grid place-content-center px-4 py-24">
        <div className="relative z-10 flex flex-col items-center">
          
          {/* Badge Version MVP */}
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-1.5 inline-block rounded-full bg-gray-600/50 px-3 py-1.5 text-sm text-gray-200"
          >
            Version MVP
          </motion.span>

          {/* Welcome Text with Custom Animation */}
          <div className="text-center mb-6">
            {/* Première ligne - "Bienvenue !" */}
            <motion.h1
              initial={{ 
                opacity: 0, 
                y: 50, 
                scale: 0.8,
                rotateX: -20
              }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                rotateX: 0
              }}
              transition={{ 
                duration: 1.2, 
                delay: 0.4,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="bg-gradient-to-br from-white to-gray-400 bg-clip-text text-4xl font-medium leading-tight text-transparent sm:text-6xl md:text-8xl mb-2"
              style={{ perspective: "1000px" }}
            >
              {"Bienvenue !".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.6 + index * 0.05,
                    ease: "easeOut"
                  }}
                  className={char === " " ? "inline" : "inline-block"}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Deuxième ligne - "dans ta house" */}
            <motion.h2
              initial={{ 
                opacity: 0, 
                y: 30
              }}
              animate={{ 
                opacity: 1, 
                y: 0
              }}
              transition={{ 
                duration: 0.8, 
                delay: 1.2,
                ease: "easeOut"
              }}
              className="bg-gradient-to-br from-white to-gray-400 bg-clip-text text-3xl font-medium leading-tight text-transparent sm:text-5xl md:text-7xl"
            >
              {"dans ta house".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 1.4 + index * 0.03,
                    ease: "easeOut"
                  }}
                  className={char === " " ? "inline" : "inline-block"}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h2>
          </div>



          {/* Styled Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 200 }}
            className="relative mt-10"
          >
            <button className="styled-button" onClick={handleDashboardClick}>
              <div className="bg"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 342 208"
                height="208"
                width="342"
                className="splash"
              >
                <path
                  strokeLinecap="round"
                  strokeWidth="3"
                  d="M54.1054 99.7837C54.1054 99.7837 40.0984 90.7874 26.6893 97.6362C13.2802 104.485 1.5 97.6362 1.5 97.6362"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeWidth="3"
                  d="M285.273 99.7841C285.273 99.7841 299.28 90.7879 312.689 97.6367C326.098 104.486 340.105 95.4893 340.105 95.4893"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeWidth="3"
                  strokeOpacity="0.3"
                  d="M281.133 64.9917C281.133 64.9917 287.96 49.8089 302.934 48.2295C317.908 46.6501 319.712 36.5272 319.712 36.5272"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeWidth="3"
                  strokeOpacity="0.3"
                  d="M281.133 138.984C281.133 138.984 287.96 154.167 302.934 155.746C317.908 157.326 319.712 167.449 319.712 167.449"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeWidth="3"
                  d="M230.578 57.4476C230.578 57.4476 225.785 41.5051 236.061 30.4998C246.337 19.4945 244.686 12.9998 244.686 12.9998"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeWidth="3"
                  d="M230.578 150.528C230.578 150.528 225.785 166.471 236.061 177.476C246.337 188.481 244.686 194.976 244.686 194.976"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeWidth="3"
                  strokeOpacity="0.3"
                  d="M170.392 57.0278C170.392 57.0278 173.89 42.1322 169.571 29.54C165.252 16.9478 168.751 2.05227 168.751 2.05227"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeWidth="3"
                  strokeOpacity="0.3"
                  d="M170.392 150.948C170.392 150.948 173.89 165.844 169.571 178.436C165.252 191.028 168.751 205.924 168.751 205.924"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeWidth="3"
                  d="M112.609 57.4476C112.609 57.4476 117.401 41.5051 107.125 30.4998C96.8492 19.4945 98.5 12.9998 98.5 12.9998"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeWidth="3"
                  d="M112.609 150.528C112.609 150.528 117.401 166.471 107.125 177.476C96.8492 188.481 98.5 194.976 98.5 194.976"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeWidth="3"
                  strokeOpacity="0.3"
                  d="M62.2941 64.9917C62.2941 64.9917 55.4671 49.8089 40.4932 48.2295C25.5194 46.6501 23.7159 36.5272 23.7159 36.5272"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeWidth="3"
                  strokeOpacity="0.3"
                  d="M62.2941 145.984C62.2941 145.984 55.4671 161.167 40.4932 162.746C25.5194 164.326 23.7159 174.449 23.7159 174.449"
                ></path>
              </svg>

              <div className="wrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 221 42"
                  height="42"
                  width="221"
                  className="path"
                >
                  <path
                    strokeLinecap="round"
                    strokeWidth="3"
                    d="M182.674 2H203C211.837 2 219 9.16344 219 18V24C219 32.8366 211.837 40 203 40H18C9.16345 40 2 32.8366 2 24V18C2 9.16344 9.16344 2 18 2H47.8855"
                  ></path>
                </svg>

                <div className="outline"></div>
                <div className="content">
                  <span className="char state-1">
                    <span data-label="D" style={{'--i': 1} as React.CSSProperties}>D</span>
                    <span data-label="a" style={{'--i': 2} as React.CSSProperties}>a</span>
                    <span data-label="s" style={{'--i': 3} as React.CSSProperties}>s</span>
                    <span data-label="h" style={{'--i': 4} as React.CSSProperties}>h</span>
                    <span data-label="b" style={{'--i': 5} as React.CSSProperties}>b</span>
                    <span data-label="o" style={{'--i': 6} as React.CSSProperties}>o</span>
                    <span data-label="a" style={{'--i': 7} as React.CSSProperties}>a</span>
                    <span data-label="r" style={{'--i': 8} as React.CSSProperties}>r</span>
                    <span data-label="d" style={{'--i': 9} as React.CSSProperties}>d</span>
                  </span>

                  <div className="icon">
                    <div></div>
                  </div>

                  <span className="char state-2">
                    <span data-label="D" style={{'--i': 1} as React.CSSProperties}>D</span>
                    <span data-label="a" style={{'--i': 2} as React.CSSProperties}>a</span>
                    <span data-label="s" style={{'--i': 3} as React.CSSProperties}>s</span>
                    <span data-label="h" style={{'--i': 4} as React.CSSProperties}>h</span>
                    <span data-label="b" style={{'--i': 5} as React.CSSProperties}>b</span>
                    <span data-label="o" style={{'--i': 6} as React.CSSProperties}>o</span>
                    <span data-label="a" style={{'--i': 7} as React.CSSProperties}>a</span>
                    <span data-label="r" style={{'--i': 8} as React.CSSProperties}>r</span>
                    <span data-label="d" style={{'--i': 9} as React.CSSProperties}>d</span>
                  </span>
                </div>
              </div>
            </button>
          </motion.div>

        </div>
      </div>
      </motion.div>
    </>
  );
}
