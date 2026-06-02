export default function EyeSurgeryPage() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">눈 성형 (Eye Surgery)</h1>
        <p className="text-gray-500 text-center mb-12 text-lg">
          가장 자연스럽고 또렷한 눈매, 멤버스만의 독보적인 기술력으로 완성합니다.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-lg h-96 bg-gray-200 relative">
            {/* Background image fetched from public assets */}
            <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('/assets/images/content/eye1.webp')"}}></div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">자연유착 쌍꺼풀</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              절개 없이 미세한 구멍을 통해 실을 엮어 쌍꺼풀을 만드는 방법입니다. 회복이 빠르고 흉터가 거의 없어 가장 선호도가 높은 수술입니다.
            </p>
            <h3 className="text-2xl font-bold mb-4">눈매교정</h3>
            <p className="text-gray-600 leading-relaxed">
              눈을 뜨는 근육의 힘이 약해 졸려 보이는 눈(안검하수)을 교정하여 눈동자가 선명하게 보이도록 만들어줍니다.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
