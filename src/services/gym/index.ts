import { mockGymRepository } from './mock-gym-repository';
// Replace only this binding with an API repository when the backend is ready.
export const gymRepository = mockGymRepository;
export type { GymRepository } from './gym-repository';
