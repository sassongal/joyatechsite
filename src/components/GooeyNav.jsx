import { useRef, useEffect, useState } from 'react';
import './GooeyNav.css';

const GooeyNav = ({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0
}) => {
  const containerRef = useRef(null);

  // Determine active index based on current URL
  const getActiveIndexFromUrl = () => {
    const currentPath = window.location.pathname;
    return items.findIndex(item => {
      try {
        const itemUrl = new URL(item.href, window.location.origin);
        return itemUrl.pathname === currentPath;
      } catch {
        return false;
      }
    });
  };

  const [activeIndex, setActiveIndex] = useState(getActiveIndexFromUrl() >= 0 ? getActiveIndexFromUrl() : initialActiveIndex);
  const [isAnimating, setIsAnimating] = useState(false);

  // Update active index when URL changes
  useEffect(() => {
    const handleLocationChange = () => {
      const newActiveIndex = getActiveIndexFromUrl();
      if (newActiveIndex >= 0) {
        setActiveIndex(newActiveIndex);
      }
    };

    // Listen for navigation events
    window.addEventListener('popstate', handleLocationChange);

    // Also check on mount
    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, [items]);

  const handleItemClick = (index, href) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setActiveIndex(index);

    // Navigate after animation
    setTimeout(() => {
      setIsAnimating(false);
      if (href) {
        window.location.href = href;
      }
    }, animationTime);

    // Keep the active state after navigation
    setTimeout(() => {
      setActiveIndex(index);
    }, animationTime + 100);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let particles = [];

    const createParticles = (x, y) => {
      particles.forEach(p => p.remove());
      particles = [];

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'gooey-particle';

        const angle = (Math.PI * 2 * i) / particleCount;
        const distance = particleDistances[0] + Math.random() * (particleDistances[1] - particleDistances[0]);
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.setProperty('--r', `${Math.random() * particleR}deg`);
        particle.style.setProperty('--delay', `${Math.random() * timeVariance}ms`);
        particle.style.setProperty('--color-index', colors[Math.floor(Math.random() * colors.length)]);

        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        container.appendChild(particle);
        particles.push(particle);

        // Remove particle after animation
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, animationTime + timeVariance);
      }
    };

    const handleClick = (e) => {
      if (isAnimating) return;

      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      createParticles(x, y);
    };

    container.addEventListener('click', handleClick);

    return () => {
      container.removeEventListener('click', handleClick);
      particles.forEach(p => p.remove());
    };
  }, [particleCount, particleDistances, particleR, timeVariance, colors, animationTime, isAnimating]);

  return (
    <div ref={containerRef} className="gooey-nav">
      {items.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className={`gooey-nav-item ${activeIndex === index ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            handleItemClick(index, item.href);
          }}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
};

export default GooeyNav;