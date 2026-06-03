'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function HeroBanner() {
  const t = useTranslations('Hero');

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/images/content/model_main_v5.png')",
        }}
      />
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 mt-16">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-medium tracking-widest mb-6"
        >
          {t('title')}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-2xl font-light mb-10 drop-shadow-md"
        >
          {t('subtitle')}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <a href="/reservation" className="inline-block border border-white px-8 py-4 text-sm md:text-base font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-300">
            {t('button')}
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <span className="text-white text-xs tracking-widest mb-2 opacity-70">{t('scroll')}</span>
        <div className="w-[1px] h-12 bg-white/50" />
      </motion.div>
    </section>
  );
}
