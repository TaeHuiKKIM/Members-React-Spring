'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ReservationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', phone: '', date: '', procedureType: '눈 성형' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8080/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('예약이 접수되었습니다! 담당자가 확인 후 해피콜을 통해 예약 시간을 확정해 드립니다.');
        router.push('/');
      } else {
        alert('예약 접수에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('서버 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-24" style={{ backgroundColor: 'var(--background)' }}>
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-4 tracking-tight">Reservation</h1>
          <div className="w-10 h-[1px] bg-[#b39b82] mx-auto mb-6"></div>
          <p className="text-[#7A7A7A] text-sm tracking-wide">
            가장 아름다운 순간을 위한 첫 걸음,<br/>
            멤버스가 함께하겠습니다.
          </p>
        </div>

        <div className="bg-white p-10 md:p-14 rounded-xl premium-shadow border border-[#E8E6E1]">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-3 tracking-widest uppercase">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full premium-input" 
                  placeholder="성함을 입력해주세요" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-3 tracking-widest uppercase">Phone</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full premium-input" 
                  placeholder="010-0000-0000" 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-3 tracking-widest uppercase">Procedure</label>
                <select 
                  name="procedureType"
                  value={formData.procedureType}
                  onChange={handleChange}
                  className="w-full premium-input"
                >
                  <option value="눈 성형">Eye Surgery (눈)</option>
                  <option value="코 성형">Rhinoplasty (코)</option>
                  <option value="리프팅/안티에이징">Anti-aging (리프팅)</option>
                  <option value="쁘띠 (보톡스/필러)">Petit (보톡스/필러)</option>
                  <option value="기타 상담">기타 상담</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-3 tracking-widest uppercase">Date</label>
                <input 
                  type="date" 
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full premium-input" 
                />
              </div>
            </div>

            <div className="bg-[#FAFAF8] p-6 rounded-lg border border-[#E8E6E1] mt-8">
              <h4 className="text-xs font-semibold text-gray-800 mb-3 tracking-widest">NOTICE</h4>
              <ul className="text-[13px] text-[#7A7A7A] space-y-2 leading-relaxed">
                <li>• 예약 신청 후, 병원에서 전화를 드려 구체적인 예약 일시를 확정해 드립니다.</li>
                <li>• 당일 예약이나 급한 일정은 대표번호로 문의 바랍니다.</li>
              </ul>
            </div>

            <div className="pt-6">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full premium-button"
              >
                {isSubmitting ? '접수 중...' : '예약 접수하기'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
