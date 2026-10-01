import { mockMembers, mockPackages, mockTransactions, mockVisitTariffs } from '@/mocks/gym-data';
import type { GymRepository } from './gym-repository';
const copy = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;
export const mockGymRepository: GymRepository = {
  async getDashboardSummary() { return { revenueToday: 1955000, transactionsToday: 5, activeMembers: 4, expiringMembers: 3 }; },
  async getMembers() { return copy(mockMembers); },
  async getPackages() { return copy(mockPackages); },
  async getVisitTariffs() { return copy(mockVisitTariffs); },
  async getTransactions() { return copy(mockTransactions); },
};
