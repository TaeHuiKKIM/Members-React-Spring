'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Reservation {
  id: number;
  name: string;
  phone: string;
  date: string;
  procedureType: string;
}

export default function AdminReservationsPage() {
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/ko/admin/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/api/admin/reservations', {
          headers: {
            'X-Admin-Token': token
          }
        });

        if (response.ok) {
          const data = await response.json();
          // Sort by ID descending (newest first)
          data.sort((a: Reservation, b: Reservation) => b.id - a.id);
          setReservations(data);
        } else if (response.status === 401) {
          localStorage.removeItem('adminToken');
          router.push('/ko/admin/login');
        } else {
          console.error('Failed to fetch reservations');
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, [router]);

  if (isLoading) {
    return <div className="text-gray-500">Loading reservations...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">온라인 예약 관리</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
                <th className="p-4 font-semibold">예약 번호</th>
                <th className="p-4 font-semibold">고객명</th>
                <th className="p-4 font-semibold">연락처</th>
                <th className="p-4 font-semibold">희망 날짜</th>
                <th className="p-4 font-semibold">관심 시술</th>
                <th className="p-4 font-semibold">상태</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    접수된 예약이 없습니다.
                  </td>
                </tr>
              ) : (
                reservations.map((reservation) => (
                  <tr key={reservation.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-gray-500">#{reservation.id}</td>
                    <td className="p-4 font-medium text-gray-900">{reservation.name}</td>
                    <td className="p-4 text-gray-700">{reservation.phone}</td>
                    <td className="p-4 text-gray-900 font-medium">{reservation.date}</td>
                    <td className="p-4">
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-100">
                        {reservation.procedureType}
                      </span>
                    </td>
                    <td className="p-4">
                      <select className="border border-gray-300 rounded-lg px-2 py-1 text-sm bg-white focus:ring-2 focus:ring-gray-900 outline-none">
                        <option value="접수완료">접수완료</option>
                        <option value="해피콜완료">해피콜 완료</option>
                        <option value="예약확정">예약 확정</option>
                        <option value="취소됨">취소됨</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
