import { create } from 'zustand';
import apiRequest from './apiRequest';

const useNotificationStore = create((set) => ({
	number: 0,
	fetch: async () => {
		const res = await apiRequest.get('/users/notifications');
		set({ number: res.data });
	},
	decrease: () => {
		set((prev) => ({ number: prev.number - 1 }));
	},
	reset: () => set({ number: 0 }),
}));

export default useNotificationStore;
