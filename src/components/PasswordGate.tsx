import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const ACCESS_KEY = 'gaggenau-harbor-auth';

// SHA-256 hash of the password, stored as hex string.
// To change password: run in browser console:
//   crypto.subtle.digest('SHA-256', new TextEncoder().encode('YOUR_NEW_PASSWORD'))
//     .then(b => console.log([...new Uint8Array(b)].map(x => x.toString(16).padStart(2,'0')).join('')))
const PASSWORD_HASH = 'cf9c24f874b9a4a7ec53904631926d1f739ac83917cf856baabac51d28459c0f'; // default: "gaggenau2026"

async function hashPassword(pw: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pw));
  return [...new Uint8Array(buf)].map((x) => x.toString(16).padStart(2, '0')).join('');
}

export function isAuthenticated(): boolean {
  return sessionStorage.getItem(ACCESS_KEY) === 'true';
}

export default function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const { i18n } = useTranslation();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);
  const lang = i18n.language as 'en' | 'zh';

  const toggleLang = useCallback(() => {
    const next = lang === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(next);
    localStorage.setItem('gaggenau-lang', next);
  }, [lang, i18n]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setChecking(true);
      setError(false);
      const hash = await hashPassword(password.trim());
      if (hash === PASSWORD_HASH) {
        sessionStorage.setItem(ACCESS_KEY, 'true');
        onSuccess();
      } else {
        setError(true);
        setChecking(false);
      }
    },
    [password, onSuccess]
  );

  const t = {
    en: {
      accessCode: 'Access Code',
      enter: 'Enter',
      invalid: 'Invalid access code',
      disclaimer1: 'This project is for internal communication only.',
      disclaimer2: 'Do not forward to any unauthorized third party.',
      disclaimer3: 'Strictly prohibited from sharing with any supplier teams or individuals.',
      contact: 'For further inquiries, please contact',
    },
    zh: {
      accessCode: '访问密码',
      enter: '进入',
      invalid: '密码错误',
      disclaimer1: '本项目仅作内部沟通之用，请勿转发无关第三方。',
      disclaimer2: '严禁转发任何供应商团队或个人。',
      disclaimer3: '',
      contact: '如有更多问题，请联系',
    },
  }[lang];

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center" style={{ marginBottom: '12px' }}>
          <h1 className="font-display text-gold text-xl tracking-[0.25em] font-semibold mb-3">
            GAGGENAU VCP
          </h1>
          <p className="text-text-secondary text-sm tracking-widest">— HARBOR —</p>
        </div>

        {/* Gate card */}
        <form
          onSubmit={handleSubmit}
          className="bg-card backdrop-blur-xl border border-card-border rounded-lg p-8 text-center"
          style={{ display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'center' }}
        >
          <label className="text-text-secondary text-[11px] uppercase tracking-wider">
            {t.accessCode}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            placeholder="••••••••"
            autoFocus
            className="w-full h-11 px-4 bg-white/5 border border-white/10 rounded-lg text-text-primary text-sm text-center placeholder:text-text-secondary/30 focus:outline-none focus:border-gold/50 transition-colors"
          />
          {error && (
            <p className="text-status-red text-xs animate-[fadeIn_0.2s_ease-out]">
              {t.invalid}
            </p>
          )}
          <button
            type="submit"
            disabled={checking || !password.trim()}
            className="w-full h-11 bg-gold/15 border border-gold/30 rounded-lg text-gold text-sm font-medium hover:bg-gold/25 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {checking ? '...' : t.enter}
          </button>
        </form>

        {/* Disclaimer */}
        <div className="text-center space-y-1.5" style={{ marginTop: '12px' }}>
          <p className="text-text-secondary/40 text-[10px] leading-relaxed">
            {t.disclaimer1}
          </p>
          <p className="text-text-secondary/40 text-[10px] leading-relaxed">
            {t.disclaimer2}
          </p>
          {t.disclaimer3 && (
            <p className="text-text-secondary/40 text-[10px] leading-relaxed">
              {t.disclaimer3}
            </p>
          )}
        </div>

        {/* Contact */}
        <p className="text-center text-text-secondary/30 text-[10px] mt-6">
          {t.contact}{' '}
          <a href="mailto:Bill.zhang@bshg.com" className="text-gold/50 hover:text-gold transition-colors">
            Bill.zhang@bshg.com
          </a>
        </p>

        {/* Language toggle */}
        <div className="flex justify-center" style={{ marginTop: '24px' }}>
          <button
            onClick={toggleLang}
            className="w-8 h-8 flex items-center justify-center text-xs font-semibold border border-gold/20 rounded-full text-text-secondary hover:text-gold hover:border-gold/50 transition-colors"
          >
            {lang === 'en' ? '中' : 'EN'}
          </button>
        </div>
      </div>
    </div>
  );
}
