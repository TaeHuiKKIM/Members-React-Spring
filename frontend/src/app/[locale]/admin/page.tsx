'use client';

import { useState, useEffect } from 'react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ totalQuestions: 0, totalUsers: 0, pendingAnswers: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken') || '';
    fetch('http://localhost:8080/api/admin/stats', {
      headers: { 'X-Admin-Token': token }
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => {
        setStats(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load stats', err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">대시보드 개요</h1>
      
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <span className="text-gray-500 font-medium mb-2">답변 대기 중인 문의</span>
            <span className="text-4xl font-bold text-[#A38758]">{stats.pendingAnswers}건</span>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <span className="text-gray-500 font-medium mb-2">총 상담 접수 건수</span>
            <span className="text-4xl font-bold text-gray-900">{stats.totalQuestions}건</span>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <span className="text-gray-500 font-medium mb-2">총 가입 회원 (카카오)</span>
            <span className="text-4xl font-bold text-gray-900">{stats.totalUsers}명</span>
          </div>
        </div>
      )}

      <div className="mt-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">환영합니다!</h2>
        <p className="text-gray-600">
          좌측 메뉴를 통해 환자들의 온라인 상담 내역을 확인하고 직접 답변을 달아줄 수 있습니다.
        </p>
      </div>
    </div>
  );
}
