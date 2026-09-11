import { useState } from 'react';
import { sendMagicLink } from '../../services/authService';
import styles from './LoginScreen.module.css';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    const value = email.trim();
    if (!value) return;
    setStatus('sending');
    setError(null);
    const { error: sendError } = await sendMagicLink(value);
    if (sendError) {
      setError(sendError);
      setStatus('idle');
      return;
    }
    setStatus('sent');
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>MY WORK</div>
        <h1 className={styles.title}>로그인</h1>
        <p className={styles.subtitle}>
          이메일로 로그인하면 어느 기기에서든
          <br />
          같은 데이터를 이어서 볼 수 있어요.
        </p>

        {status === 'sent' ? (
          <>
            <p className={styles.message}>
              <strong>{email}</strong>로 로그인 링크를 보냈어요.
              <br />
              메일함에서 링크를 눌러주세요.
            </p>
            <button type="button" className={styles.resendBtn} onClick={() => setStatus('idle')}>
              다른 이메일로 다시 시도
            </button>
          </>
        ) : (
          <div className={styles.form}>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') submit();
              }}
              placeholder="you@example.com"
              disabled={status === 'sending'}
            />
            <button
              type="button"
              className={styles.submitBtn}
              onClick={submit}
              disabled={status === 'sending' || !email.trim()}
            >
              {status === 'sending' ? '보내는 중...' : '로그인 링크 받기'}
            </button>
            {error && <p className={styles.errorMessage}>{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
