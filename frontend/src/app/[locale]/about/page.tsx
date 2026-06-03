'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('About');

  const renderBroadcastImages = () => {
    const images = [];
    for (let i = 1; i <= 69; i++) {
      images.push(
        <div key={i} className="aspect-video relative overflow-hidden rounded-md border border-[var(--premium-border)] bg-gray-50 hover:shadow-md transition-shadow">
          <Image 
            src={`/assets/images/content/broadcast_${i}.webp`} 
            fill 
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain bg-black/5 hover:scale-105 transition-transform duration-500" 
            alt={`매체 출연 ${i}`} 
          />
        </div>
      );
    }
    return images;
  };

  const renderWorkshopImages = () => {
    const images = [];
    for (let i = 1; i <= 6; i++) {
      images.push(
        <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden premium-shadow">
          <Image
            src={`/assets/images/workshop/workshop${i}.webp`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            alt={`Workshop ${i}`}
          />
        </div>
      );
    }
    return images;
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Intro Section */}
      <section className="pt-32 pb-20 px-6 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-[var(--foreground)] mb-6">
          {t('title')}
        </h1>
        <p className="text-xl text-[var(--premium-text-light)] font-light leading-relaxed mb-12">
          {t('subtitle')}
        </p>
      </section>

      {/* Clinic Departments Section */}
      <section className="py-20 px-6 border-t border-[var(--premium-border)]" style={{ backgroundColor: 'var(--premium-surface)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs tracking-[0.2em] text-[var(--premium-gold)] font-semibold mb-3 uppercase">CLINIC DEPARTMENTS</h2>
            <h3 className="text-3xl font-light text-[var(--foreground)]">{t('dept_title')}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { title: t('dept_eye'), list: t('dept_eye_list') },
              { title: t('dept_nose'), list: t('dept_nose_list') },
              { title: t('dept_anti'), list: t('dept_anti_list') },
              { title: t('dept_special'), list: t('dept_special_list') },
            ].map((dept, idx) => (
              <div key={idx} className="flex flex-col">
                <h4 className="text-lg font-medium text-[var(--foreground)] mb-4 border-b border-[var(--premium-border)] pb-2">{dept.title}</h4>
                <ul className="space-y-2 text-[var(--premium-text-light)] text-sm font-light">
                  {dept.list.split(' | ').map((item, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-1 h-1 bg-[var(--premium-gold)] rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Director Profile Section */}
      <section className="py-24 px-6 border-t border-[var(--premium-border)]">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-5/12 relative h-[700px] rounded-2xl overflow-hidden premium-shadow">
            {/* Using a placeholder for Director Photo, assuming model_main_v5 or an icon profile */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/content/model_main_v5.png')" }}></div>
          </div>
          <div className="w-full lg:w-7/12">
            <h2 className="text-xs tracking-[0.2em] text-[var(--premium-gold)] font-semibold mb-3 uppercase">{t('director_title')}</h2>
            <h3 className="text-3xl font-light text-[var(--foreground)] mb-2">{t('director')}</h3>
            <h4 className="text-xl font-light text-[var(--premium-text-light)] mb-6 italic">{t('quote')}</h4>
            <p className="text-[var(--premium-text-light)] font-light mb-10 leading-relaxed">
              {t('desc')}
            </p>
            
            {/* Extended 12-item list organized in two columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                <div key={num} className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-[var(--premium-gold)] rounded-full mr-4 mt-2 flex-shrink-0"></span>
                  <span className="text-[var(--premium-text-light)] text-sm font-light leading-relaxed">{t(`list${num}` as any)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-24 px-6 border-t border-[var(--premium-border)]" style={{ backgroundColor: 'var(--premium-surface)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs tracking-[0.2em] text-[var(--premium-gold)] font-semibold mb-3 uppercase">HOSPITAL INTERIOR</h2>
            <h3 className="text-3xl font-light tracking-tight text-[var(--foreground)]">{t('fac_title')}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="h-72 rounded-xl overflow-hidden bg-gray-200 relative premium-shadow group">
               <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/assets/images/workshop/workshop1.webp')" }}></div>
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               <div className="absolute bottom-6 left-6 text-white font-light tracking-wide">{t('fac1')}</div>
            </div>
            <div className="h-72 rounded-xl overflow-hidden bg-gray-200 relative premium-shadow group">
               <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/assets/images/workshop/workshop2.webp')" }}></div>
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               <div className="absolute bottom-6 left-6 text-white font-light tracking-wide">{t('fac2')}</div>
            </div>
            <div className="h-72 rounded-xl overflow-hidden bg-gray-200 relative premium-shadow group">
               <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/assets/images/workshop/workshop3.webp')" }}></div>
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               <div className="absolute bottom-6 left-6 text-white font-light tracking-wide">{t('fac3')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Activities Section */}
      <section className="py-24 px-6 border-t border-[var(--premium-border)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs tracking-[0.2em] text-[var(--premium-gold)] font-semibold mb-3 uppercase">ACADEMIC ACTIVITIES</h2>
            <h3 className="text-3xl font-light text-[var(--foreground)]">{t('academic_title')}</h3>
          </div>

          <div className="space-y-24">
            {/* 2019 Activity */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/4">
                <div className="text-2xl font-light text-[var(--premium-gold)] mb-2">2019</div>
                <div className="text-sm text-[var(--premium-text-light)]">{t('ac_2019_date')}</div>
              </div>
              <div className="md:w-3/4 border-l border-[var(--premium-border)] pl-8 py-2">
                <h4 className="text-xl font-medium text-[var(--foreground)] mb-4 whitespace-pre-line leading-relaxed">{t('ac_2019_title1')}</h4>
                <div className="bg-[var(--premium-surface)] p-6 rounded-lg border border-[var(--premium-border)]">
                  <h5 className="font-medium text-[var(--foreground)] mb-2">{t('ac_2019_title2')}</h5>
                  <p className="text-sm text-[var(--premium-text-light)] mb-4">{t('ac_2019_desc')}</p>
                  <p className="text-xs text-[var(--premium-gold)]">{t('ac_2019_time')}</p>
                </div>
              </div>
            </div>

            {/* 2014 Live Surgery Workshop */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/4">
                <div className="text-2xl font-light text-[var(--premium-gold)] mb-2">2014</div>
                <div className="text-sm text-[var(--premium-text-light)] whitespace-pre-line">{t('ac_2014_date')}</div>
              </div>
              <div className="md:w-3/4 border-l border-[var(--premium-border)] pl-8 py-2">
                <h4 className="text-xl font-medium text-[var(--foreground)] mb-6 uppercase tracking-wide">{t('ac_2014_title')}</h4>
                <p className="text-[var(--premium-text-light)] font-light mb-8">{t('ac_2014_desc1')}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {renderWorkshopImages()}
                </div>
                
                <div className="space-y-4 text-sm text-[var(--premium-text-light)] font-light leading-relaxed">
                  <p>{t('ac_2014_desc2')}</p>
                  <p>{t('ac_2014_desc3')}</p>
                  <p>{t('ac_2014_desc4')}</p>
                  <p className="pt-4 mt-4 border-t border-[var(--premium-border)]">{t('ac_2014_desc5')}</p>
                  <p>{t('ac_2014_desc6')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Appearances Section */}
      <section className="py-24 px-6 border-t border-[var(--premium-border)]" style={{ backgroundColor: 'var(--premium-surface)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs tracking-[0.2em] text-[var(--premium-gold)] font-semibold mb-3 uppercase">MEDIA APPEARANCES</h2>
            <h3 className="text-3xl font-light text-[var(--foreground)]">{t('media_title')}</h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {renderBroadcastImages()}
          </div>
        </div>
      </section>
    </main>
  );
}
