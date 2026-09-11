import { useEffect, type ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '../../services/supabaseClient';
import { useAuthStore } from '../../services/authStore';
import { useAppStore } from '../../services/storage';
import { LoginScreen } from './LoginScreen';

function FullscreenMessage({ text }: { text: string }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-sub)', fontSize: 13 }}>
      {text}
    </div>
  );
}

export function AuthGate({ children }: { children: ReactNode }) {
  const session = useAuthStore((s) => s.session);
  const initialized = useAuthStore((s) => s.initialized);
  const dataStatus = useAppStore((s) => s.status);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      useAuthStore.getState().setInitialized(true);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      useAuthStore.getState().setSession(data.session);
      useAuthStore.getState().setInitialized(true);
      if (data.session) {
        void useAppStore.getState().loadForUser(data.session.user.id);
      }
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      const prevUserId = useAuthStore.getState().session?.user.id ?? null;
      useAuthStore.getState().setSession(newSession);
      if (newSession && newSession.user.id !== prevUserId) {
        void useAppStore.getState().loadForUser(newSession.user.id);
      } else if (!newSession) {
        useAppStore.getState().clearUser();
      }
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  if (!isSupabaseConfigured) return <>{children}</>;
  if (!initialized) return <FullscreenMessage text="불러오는 중..." />;
  if (!session) return <LoginScreen />;
  if (dataStatus === 'loading') return <FullscreenMessage text="데이터를 불러오는 중..." />;

  return <>{children}</>;
}
