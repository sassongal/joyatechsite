import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedElement({ 
  children, 
  animation = 'fadeIn', 
  delay = 0,
  duration = 0.8,
  className = '',
  once = true
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const animations = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { 
          duration,
          ease: 'easeOut'
        }
      }
    },
    slideUp: {
      hidden: { y: 40, opacity: 0 },
      visible: { 
        y: 0, 
        opacity: 1,
        transition: { 
          duration,
          ease: 'easeOut'
        }
      }
    },
    slideRight: {
      hidden: { x: -40, opacity: 0 },
      visible: { 
        x: 0, 
        opacity: 1,
        transition: { 
          duration,
          ease: 'easeOut'
        }
      }
    },
    slideLeft: {
      hidden: { x: 40, opacity: 0 },
      visible: { 
        x: 0, 
        opacity: 1,
        transition: { 
          duration,
          ease: 'easeOut'
        }
      }
    },
    scale: {
      hidden: { scale: 0.95, opacity: 0 },
      visible: { 
        scale: 1, 
        opacity: 1,
        transition: { 
          duration,
          ease: 'easeOut'
        }
      }
    },
    fadeInUp: {
      hidden: { y: 20, opacity: 0 },
      visible: { 
        y: 0, 
        opacity: 1,
        transition: { 
          duration: duration * 1.2,
          ease: 'easeOut'
        }
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else {
          if (!once) {
            setIsVisible(false);
          }
        }
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [once]);

  const selectedAnimation = animations[animation];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={selectedAnimation}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}