import type { DashboardSummary, Member, MembershipPackage, Transaction, VisitTariff } from '@/types/gym';
export interface GymRepository {
  getDashboardSummary(): Promise<DashboardSummary>;
  getMembers(): Promise<Member[]>;
  getPackages(): Promise<MembershipPackage[]>;
  getVisitTariffs(): Promise<VisitTariff[]>;
  getTransactions(): Promise<Transaction[]>;
}
