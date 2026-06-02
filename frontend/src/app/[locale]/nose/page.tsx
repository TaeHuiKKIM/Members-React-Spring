export default function NoseSurgeryPage() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">코 성형 (Nose Surgery)</h1>
        <p className="text-gray-500 text-center mb-12 text-lg">
          얼굴의 중심, 입체감을 살려주는 멤버스 맞춤형 코 성형
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center flex-row-reverse">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold mb-4">3D 맞춤 코성형</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              개인의 얼굴 비율과 이목구비의 조화를 고려하여 가장 이상적인 각도와 높이를 디자인합니다. 자가 연골을 사용하여 부작용을 최소화합니다.
            </p>
            <h3 className="text-2xl font-bold mb-4">매부리/복코 교정</h3>
            <p className="text-gray-600 leading-relaxed">
              튀어나온 뼈를 정교하게 다듬고 뭉툭한 코끝을 슬림하게 교정하여 세련된 인상으로 변화시켜 줍니다.
            </p>
          </div>
          <div className="order-1 md:order-2 rounded-2xl overflow-hidden shadow-lg h-96 bg-gray-200 relative">
            <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('/assets/images/content/nose1.webp')"}}></div>
          </div>
        </div>
      </div>
    </main>
  );
}
