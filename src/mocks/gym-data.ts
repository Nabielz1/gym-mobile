import type { Member, MembershipPackage, Transaction, VisitTariff } from '@/types/gym';

export const mockMembers: Member[] = [
  { id: 'MBR-001', name: 'Andi Pratama', phone: '0812-3456-7890', packageName: 'Bulanan', expiresAt: '2026-10-03', status: 'expiring' },
  { id: 'MBR-002', name: 'Siti Rahma', phone: '0813-2211-9087', packageName: '3 Bulan', expiresAt: '2026-12-18', status: 'active' },
  { id: 'MBR-003', name: 'Budi Santoso', phone: '0857-7654-1200', packageName: 'Bulanan', expiresAt: '2026-09-28', status: 'expired' },
  { id: 'MBR-004', name: 'Nadia Putri', phone: '0821-9087-1122', packageName: 'Tahunan', expiresAt: '2027-06-12', status: 'active' },
];
export const mockPackages: MembershipPackage[] = [
  { id: 'PKG-001', name: 'Bulanan', durationMonths: 1, price: 250000, activeMembers: 48, active: true },
  { id: 'PKG-002', name: '3 Bulan', durationMonths: 3, price: 650000, activeMembers: 31, active: true },
  { id: 'PKG-003', name: 'Tahunan', durationMonths: 12, price: 2200000, activeMembers: 18, active: true },
];
export const mockVisitTariffs: VisitTariff[] = [
  { id: 'TRF-001', name: 'Kunjungan Reguler', price: 35000, active: true },
  { id: 'TRF-002', name: 'Kunjungan Akhir Pekan', price: 45000, active: true },
];
export const mockTransactions: Transaction[] = [
  { id: 'TRX-2401', customerName: 'Andi Pratama', type: 'membership', itemName: 'Bulanan', amount: 250000, paymentMethod: 'qris', createdAt: '2026-09-30T09:15:00+07:00' },
  { id: 'TRX-2402', customerName: 'Walk-in #104', type: 'walk-in', itemName: 'Kunjungan Reguler', amount: 35000, paymentMethod: 'cash', createdAt: '2026-09-30T10:42:00+07:00' },
  { id: 'TRX-2403', customerName: 'Siti Rahma', type: 'membership', itemName: '3 Bulan', amount: 650000, paymentMethod: 'transfer', createdAt: '2026-09-30T11:08:00+07:00' },
  { id: 'TRX-2404', customerName: 'Walk-in #105', type: 'walk-in', itemName: 'Kunjungan Reguler', amount: 35000, paymentMethod: 'qris', createdAt: '2026-09-30T13:20:00+07:00' },
];
