import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, CartItem } from '../types';

interface AppState {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  cartTotal: () => number;
  cartCount: () => number;
  selectedAvatar: 'Male' | 'Female';
  tryOnColor: string;
  tryOnSize: string;
  tryOnWorkflowStep: number;
  setSelectedAvatar: (avatar: 'Male' | 'Female') => void;
  setTryOnColor: (color: string) => void;
  setTryOnSize: (size: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetWorkflow: () => void;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,
      addToCart: (product, size) =>
        set((state) => {
          const existingIndex = state.cart.findIndex(
            (item) => item.id === product.id && item.selectedSize === size
          );
          if (existingIndex > -1) {
            const newCart = [...state.cart];
            newCart[existingIndex].quantity += 1;
            return { cart: newCart, isCartOpen: true };
          }
          return {
            cart: [...state.cart, { ...product, selectedSize: size, quantity: 1 }],
            isCartOpen: true,
          };
        }),
      removeFromCart: (productId, size) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) => !(item.id === productId && item.selectedSize === size)
          ),
        })),
      updateQuantity: (productId, size, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              cart: state.cart.filter(
                (item) => !(item.id === productId && item.selectedSize === size)
              ),
            };
          }
          return {
            cart: state.cart.map((item) =>
              item.id === productId && item.selectedSize === size
                ? { ...item, quantity }
                : item
            ),
          };
        }),
      clearCart: () => set({ cart: [] }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      setCartOpen: (open) => set({ isCartOpen: open }),
      cartTotal: () => {
        const { cart } = get();
        return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
      cartCount: () => {
        const { cart } = get();
        return cart.reduce((sum, item) => sum + item.quantity, 0);
      },
      selectedAvatar: 'Male',
      tryOnColor: '#FFFFFF',
      tryOnSize: 'M',
      tryOnWorkflowStep: 1,
      setSelectedAvatar: (avatar) => set({ selectedAvatar: avatar }),
      setTryOnColor: (color) => set({ tryOnColor: color }),
      setTryOnSize: (size) => set({ tryOnSize: size }),
      nextStep: () =>
        set((state) => ({
          tryOnWorkflowStep: Math.min(state.tryOnWorkflowStep + 1, 4),
        })),
      prevStep: () =>
        set((state) => ({
          tryOnWorkflowStep: Math.max(state.tryOnWorkflowStep - 1, 1),
        })),
      resetWorkflow: () => set({ tryOnWorkflowStep: 1 }),
      isMobileMenuOpen: false,
      toggleMobileMenu: () =>
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
    }),
    {
      name: 'bw-store',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
