'use client';

export default function QnaPage() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">온라인 상담 (Q&A)</h1>
        <p className="text-gray-500 text-center mb-10">회원가입 없이 간편하게 질문을 남겨주시면, 전문의가 직접 답변해 드립니다.</p>

        {/* Q&A Board Placeholder (Will connect to Spring Boot API) */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                <th className="p-4 font-semibold w-16 text-center">번호</th>
                <th className="p-4 font-semibold">제목</th>
                <th className="p-4 font-semibold w-24 text-center">작성자</th>
                <th className="p-4 font-semibold w-24 text-center">상태</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                <td className="p-4 text-center text-gray-500">2</td>
                <td className="p-4 font-medium flex items-center space-x-2">
                  <span>🔒 자연유착 쌍꺼풀 비용 문의드립니다.</span>
                </td>
                <td className="p-4 text-center text-gray-500 text-sm">김*지</td>
                <td className="p-4 text-center"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">답변완료</span></td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                <td className="p-4 text-center text-gray-500">1</td>
                <td className="p-4 font-medium flex items-center space-x-2">
                  <span>🔒 코끝 붓기 언제쯤 빠지나요?</span>
                </td>
                <td className="p-4 text-center text-gray-500 text-sm">이*훈</td>
                <td className="p-4 text-center"><span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold">대기중</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button className="bg-gray-900 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-800 transition-colors">
            문의글 작성
          </button>
        </div>
      </div>
    </main>
  );
}
