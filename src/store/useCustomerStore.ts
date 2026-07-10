import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CustomerState {
  name: string;
  phone: string;
  isIdentified: boolean;
  identifyCustomer: (name: string, phone: string) => void;
  clearCustomer: () => void;
}

export const useCustomerStore = create<CustomerState>()(
  persist(
    (set) => ({
      name: '',
      phone: '',
      isIdentified: false,
      identifyCustomer: (name, phone) => 
        set({ name, phone, isIdentified: true }),
      clearCustomer: () => 
        set({ name: '', phone: '', isIdentified: false }),
    }),
    {
      name: 'bella-glow-customer',
    }
  )
);
