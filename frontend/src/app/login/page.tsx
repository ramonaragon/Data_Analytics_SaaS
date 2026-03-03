'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Admin Credentials as requested
        const ADMIN_EMAIL = 'ramonmaragontrujillo@gmail.com';
        const ADMIN_PASS = 'TRECE1313R@#ramon';

        setTimeout(() => {
            if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
                // Redirigir al dashboard
                router.push('/dashboard');
            } else {
                setError('Credenciales incorrectas. Verifica tu email y contraseña.');
                setLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full"></div>

            <div className="w-full max-w-md p-10 bg-[#0A0A0A] border border-white/5 rounded-3xl shadow-2xl relative z-10">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/20 mx-auto mb-6">
                        <span className="font-bold text-3xl">D</span>
                    </div>
                    <h1 className="text-3xl font-black mb-2">Bienvenido de nuevo</h1>
                    <p className="text-gray-500 text-sm italic">Accede a tu panel de Data Analytics Sénior</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="text-xs text-gray-400 block mb-2 uppercase font-bold tracking-widest pl-1">Email corporativo</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@empresa.com"
                            className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all placeholder:text-gray-700"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 block mb-2 uppercase font-bold tracking-widest pl-1">Contraseña segura</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••••••"
                            className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all placeholder:text-gray-700"
                        />
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-4 rounded-xl font-medium animate-shake">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-black py-4 rounded-2xl font-black hover:bg-gray-200 transition-all shadow-xl shadow-white/5 active:scale-95 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                            'Ingresar al Panel'
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center text-gray-600 text-[10px] uppercase font-bold tracking-tighter">
                    Conexión Encriptada de Grado Militar (AES-256)
                </div>
            </div>
        </div>
    );
}
