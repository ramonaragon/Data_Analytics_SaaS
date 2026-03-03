'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const translations: Record<string, Record<string, string>> = {
    es: {
        title: 'Bienvenido de nuevo',
        subtitle: 'Accede a tu panel de Data Analytics Sénior',
        emailLabel: 'Email corporativo',
        emailPlaceholder: 'admin@empresa.com',
        passLabel: 'Contraseña segura',
        passPlaceholder: 'Tu contraseña',
        submit: 'Ingresar al Panel',
        loading: 'Verificando...',
        error: 'Credenciales incorrectas. Verifica tu email y contraseña.',
        footer: 'Conexión Encriptada de Grado Militar (AES-256)',
        lang: 'Idioma',
    },
    en: {
        title: 'Welcome back',
        subtitle: 'Access your Data Analytics Sénior panel',
        emailLabel: 'Corporate email',
        emailPlaceholder: 'admin@company.com',
        passLabel: 'Secure password',
        passPlaceholder: 'Your password',
        submit: 'Enter Dashboard',
        loading: 'Verifying...',
        error: 'Wrong credentials. Please check your email and password.',
        footer: 'Military-Grade Encrypted Connection (AES-256)',
        lang: 'Language',
    },
    fr: {
        title: 'Bon retour',
        subtitle: 'Accédez à votre tableau de bord Data Analytics Sénior',
        emailLabel: 'Email professionnel',
        emailPlaceholder: 'admin@entreprise.com',
        passLabel: 'Mot de passe sécurisé',
        passPlaceholder: 'Votre mot de passe',
        submit: 'Accéder au Tableau de Bord',
        loading: 'Vérification...',
        error: 'Identifiants incorrects. Vérifiez votre email et mot de passe.',
        footer: 'Connexion Cryptée Militaire (AES-256)',
        lang: 'Langue',
    },
    de: {
        title: 'Willkommen zurück',
        subtitle: 'Zugang zu Ihrem Data Analytics Sénior Panel',
        emailLabel: 'Geschäftliche E-Mail',
        emailPlaceholder: 'admin@unternehmen.com',
        passLabel: 'Sicheres Passwort',
        passPlaceholder: 'Ihr Passwort',
        submit: 'Dashboard aufrufen',
        loading: 'Überprüfen...',
        error: 'Falsche Anmeldedaten. Überprüfen Sie E-Mail und Passwort.',
        footer: 'Militärverschlüsselte Verbindung (AES-256)',
        lang: 'Sprache',
    },
};

const languages = [
    { code: 'es', flag: '🇪🇸', name: 'Español' },
    { code: 'en', flag: '🇬🇧', name: 'English' },
    { code: 'fr', flag: '🇫🇷', name: 'Français' },
    { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
];

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [lang, setLang] = useState('es');
    const router = useRouter();

    const t = translations[lang];

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const ADMIN_EMAIL = 'ramonmaragontrujillo@gmail.com';
        const ADMIN_PASS = 'TRECE1313R@#ramon';

        setTimeout(() => {
            if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
                router.push('/dashboard');
            } else {
                setError(t.error);
                setLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                {/* Language Switcher */}
                <div className="flex justify-center gap-2 mb-8">
                    {languages.map((l) => (
                        <button
                            key={l.code}
                            onClick={() => setLang(l.code)}
                            title={l.name}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${lang === l.code
                                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                                }`}
                        >
                            <span>{l.flag}</span>
                            <span className="hidden sm:inline">{l.name}</span>
                        </button>
                    ))}
                </div>

                {/* Card */}
                <div className="p-10 bg-[#0A0A0A] border border-white/5 rounded-3xl shadow-2xl">
                    {/* Logo */}
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/20 mx-auto mb-6">
                            <span className="font-bold text-3xl text-white">D</span>
                        </div>
                        <h1 className="text-3xl font-black mb-2 text-white">{t.title}</h1>
                        <p className="text-gray-500 text-sm italic">{t.subtitle}</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="text-xs text-gray-400 block mb-2 uppercase font-bold tracking-widest pl-1">
                                {t.emailLabel}
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t.emailPlaceholder}
                                className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all placeholder:text-gray-600"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-xs text-gray-400 block mb-2 uppercase font-bold tracking-widest pl-1">
                                {t.passLabel}
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder={t.passPlaceholder}
                                    className="w-full bg-black border border-white/10 rounded-2xl p-4 pr-12 text-sm text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all placeholder:text-gray-600"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                    title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                >
                                    {showPassword ? (
                                        /* Eye-off SVG */
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    ) : (
                                        /* Eye SVG */
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-4 rounded-xl font-medium">
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl font-black text-base transition-all shadow-xl shadow-purple-600/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    {t.loading}
                                </>
                            ) : (
                                t.submit
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center text-gray-600 text-[10px] uppercase font-bold tracking-tighter flex items-center justify-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2a5 5 0 0 0-5 5v3H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-2V7a5 5 0 0 0-5-5zm0 2a3 3 0 0 1 3 3v3H9V7a3 3 0 0 1 3-3z" />
                        </svg>
                        {t.footer}
                    </div>
                </div>
            </div>
        </div>
    );
}
