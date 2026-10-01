export type MemberStatus = 'active' | 'expiring' | 'expired';
export type TransactionType = 'membership' | 'walk-in';
export type PaymentMethod = 'cash' | 'transfer' | 'qris';
export interface Member { id: string; name: string; phone: string; packageName: string; expiresAt: string; status: MemberStatus; }
export interface MembershipPackage { id: string; name: string; durationMonths: number; price: number; activeMembers: number; active: boolean; }
export interface VisitTariff { id: string; name: string; price: number; active: boolean; }
export interface Transaction { id: string; customerName: string; type: TransactionType; itemName: string; amount: number; paymentMethod: PaymentMethod; createdAt: string; }
export interface DashboardSummary { revenueToday: number; transactionsToday: number; activeMembers: number; expiringMembers: number; }
