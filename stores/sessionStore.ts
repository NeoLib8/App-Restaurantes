// stores/sessionStore.ts

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Session, User } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { supabase } from '@/lib/supabase'

type SessionState = {
  session: Session | null
  user: User | null
  loading: boolean
  setSession: (session: Session | null) => void
  clearSession: () => void
  initialize: () => Promise<void>
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      session: null,
      user: null,
      loading: true,

      setSession: (session) =>
        set({
          session,
          user: session?.user ?? null,
          loading: false
        }),

      clearSession: () =>
        set({ session: null, user: null, loading: false }),

      initialize: async () => {
        const { data, error } = await supabase.auth.getSession()
        if (!error) {
          set({
            session: data.session,
            user: data.session?.user ?? null,
            loading: false
          })
        } else {
          set({ session: null, user: null, loading: false })
        }
      }
    }),
    {
      name: 'session-storage',
      partialize: (state) => ({
        session: state.session,
        user: state.user
      }),
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name)
          return value ? JSON.parse(value) : null
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value))
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name)
        }
      }
    }
  )
)
