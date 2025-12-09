import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CardSwap = ({
  cards,
  autoPlay = true,
  autoPlayInterval = 4000,
  showDots = true,
  showArrows = true,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);

  const nextCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToCard = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  useEffect(() => {
    if (autoPlay && cards.length > 1) {
      intervalRef.current = setInterval(() => {
        nextCard();
      }, autoPlayInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, cards.length]);

  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (autoPlay && cards.length > 1) {
      intervalRef.current = setInterval(() => {
        nextCard();
      }, autoPlayInterval);
    }
  };

  return (
    <div
      className={`card-swap-container ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl">
        {/* Cards Container */}
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="absolute inset-0"
            >
              <div className="h-full bg-gradient-to-br from-primary-50 via-white to-secondary-50 rounded-2xl shadow-2xl overflow-hidden border border-neutral-200">
                <div className="h-full flex flex-col justify-center items-center text-neutral-800 p-8 relative">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-primary-200 rounded-full blur-xl"></div>
                    <div className="absolute bottom-10 right-10 w-16 h-16 bg-secondary-200 rounded-full blur-lg"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent-100 rounded-full blur-2xl"></div>
                  </div>

                  {/* Card Content */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-center relative z-10"
                  >
                    {cards[currentIndex].icon && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.5, type: "spring", stiffness: 200 }}
                        className="mb-6"
                      >
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/90 border border-neutral-200 text-primary-500 rounded-full mb-4 shadow-md">
                          {cards[currentIndex].icon}
                        </div>
                      </motion.div>
                    )}

                    <motion.h3
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="text-2xl md:text-3xl font-bold mb-4 text-neutral-900"
                    >
                      {cards[currentIndex].title}
                    </motion.h3>

                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="text-lg text-neutral-700 max-w-2xl"
                    >
                      {cards[currentIndex].description}
                    </motion.p>

                    {cards[currentIndex].features && (
                      <motion.ul
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="mt-6 space-y-2 text-left max-w-lg mx-auto text-neutral-700"
                      >
                        {cards[currentIndex].features.map((feature, index) => (
                          <motion.li
                            key={index}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                            className="flex items-center"
                          >
                            <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 flex-shrink-0"></div>
                            <span className="text-sm">{feature}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        {showArrows && cards.length > 1 && (
          <>
            <button
              onClick={prevCard}
              disabled={isAnimating}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-primary-500 hover:bg-primary-600 rounded-full flex items-center justify-center text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextCard}
              disabled={isAnimating}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-primary-500 hover:bg-primary-600 rounded-full flex items-center justify-center text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10 shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {showDots && cards.length > 1 && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => goToCard(index)}
                disabled={isAnimating}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary-500 scale-125'
                    : 'bg-neutral-400/70 hover:bg-neutral-500/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardSwap;
