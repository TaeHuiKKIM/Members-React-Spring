'use client';

import { useTranslations } from 'next-intl';

export default function LiftingSurgeryPage() {
  const t = useTranslations('Lifting');

  return (
    <main className="min-h-screen pt-32 pb-24" style={{ backgroundColor: 'var(--background)' }}>
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-[var(--foreground)] mb-6 tracking-tight">
            {t('title')} <span className="text-[var(--premium-gold)] font-light">| Premium Anti-Aging</span>
          </h1>
          <p className="text-[var(--premium-text-light)] text-lg max-w-2xl mx-auto leading-relaxed font-light">
            {t('subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="rounded-2xl overflow-hidden premium-shadow relative group">
            {/* Placeholder image for lifting */}
            <img src="/assets/images/content/model_main_v5.png" alt="Lifting" className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="space-y-12">
            <div>
              <h3 className="text-xs font-semibold tracking-[0.2em] text-[var(--premium-gold)] uppercase mb-3">{t('tag1')}</h3>
              <h4 className="text-2xl font-light mb-4 text-[#2D2D2D]">{t('title1')}</h4>
              <p className="text-[var(--premium-text-light)] leading-relaxed font-light mb-6">
                {t('desc1')}
              </p>
              
              <div className="bg-[#FAFAF8] border border-[#E8E6E1] rounded-lg p-6 premium-shadow">
                <p className="text-[var(--premium-gold)] font-semibold text-lg mb-4 text-center border-b border-[#E8E6E1] pb-3">
                  {t('highlight1')}
                </p>
                <ul className="space-y-3 text-[var(--premium-text-light)] font-light text-sm">
                  <li className="flex items-center"><span className="w-1 h-1 bg-[var(--premium-gold)] rounded-full mr-3"></span>{t('list1_1')}</li>
                  <li className="flex items-center"><span className="w-1 h-1 bg-[var(--premium-gold)] rounded-full mr-3"></span>{t('list1_2')}</li>
                  <li className="flex items-center"><span className="w-1 h-1 bg-[var(--premium-gold)] rounded-full mr-3"></span>{t('list1_3')}</li>
                  <li className="flex items-center"><span className="w-1 h-1 bg-[var(--premium-gold)] rounded-full mr-3"></span>{t('list1_4')}</li>
                  <li className="flex items-center"><span className="w-1 h-1 bg-[var(--premium-gold)] rounded-full mr-3"></span>{t('list1_5')}</li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold tracking-[0.2em] text-[var(--premium-gold)] uppercase mb-3">{t('tag2')}</h3>
              <h4 className="text-2xl font-light mb-4 text-[var(--foreground)]">{t('title2')}</h4>
              <p className="text-[var(--premium-text-light)] leading-relaxed font-light">
                {t('desc2')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
