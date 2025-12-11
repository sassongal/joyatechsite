import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ClientsLogosSlider = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Load clients from localStorage (in production, this would be an API call)
    const loadClients = () => {
      try {
        const savedClients = localStorage.getItem('joyatech_clients');
        if (savedClients) {
          const parsedClients = JSON.parse(savedClients);
          // Duplicate the array to create seamless infinite scroll
          setClients([...parsedClients, ...parsedClients]);
        }
      } catch (error) {
        console.error('Error loading clients:', error);
      }
    };

    loadClients();

    // Listen for storage changes (when admin updates clients)
    const handleStorageChange = (e) => {
      if (e.key === 'joyatech_clients') {
        loadClients();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (clients.length === 0) {
    return null; // Don't render if no clients
  }

  return (
    <section dir="ltr" className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Clients
          </h2>
          <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
            Trusted by leading companies and innovative startups
          </p>
        </motion.div>

        <div className="relative w-full overflow-hidden py-8">
          {/* Gradient overlays */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex items-center"
            animate={{
              x: ['0%', '-100%'],
              transition: {
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 30,
                  ease: 'linear',
                },
              },
            }}
          >
            {clients.map((client, index) => (
              <motion.div
                key={`${client.id}-${index}`}
                className="flex-shrink-0 w-48 h-24 flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <img
                  src={client.src}
                  alt={client.name}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats or additional info (optional) */}
        <div className="text-center mt-8 text-sm text-neutral-500">
          מעל {clients.length / 2} לקוחות מרוצים ✨
        </div>
      </div>
    </section>
  );
};

export default ClientsLogosSlider;
