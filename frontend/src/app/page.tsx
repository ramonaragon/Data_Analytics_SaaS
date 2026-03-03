'use client';
import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">
      {/* Dynamic Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-600/10 blur-[120px] rounded-full -z-10"></div>

      {/* Navbar */}
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <span className="font-bold text-xl">D</span>
            </div>
            <span className="font-bold text-2xl tracking-tight">Data Analytics <span className="text-purple-500 text-sm align-top leading-none">Sénior</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Características</a>
            <a href="#solutions" className="hover:text-white transition-colors">Soluciones</a>
            <a href="#pricing" className="hover:text-white transition-colors">Precios</a>
            <Link href="/login" className="bg-white text-black px-6 py-2.5 rounded-full font-bold hover:bg-gray-200 transition-all active:scale-95 shadow-lg shadow-white/5">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400">Impulsado por IA de Próxima Generación</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent">
            Tus Datos Financieros, <br />
            <span className="text-purple-500">Inteligencia Pura.</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Elimina la gestión manual de facturas. Nuestra IA detecta, extrae y sincroniza cada gasto con tu ERP en segundos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-purple-600/20 active:scale-95">
              Empezar Gratis Ahora
            </Link>
            <button className="w-full sm:w-auto bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all">
              Ver Demo Interactiva
            </button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "OCR de Alta Precisión",
                desc: "Captura cada detalle de tus facturas, incluso fotos mal iluminadas, con nuestra IA optimizada.",
                icon: "👁️‍🗨️"
              },
              {
                title: "Multi-tenant Seguro",
                desc: "Tus datos financieros están blindados y aislados, con total cumplimiento de privacidad.",
                icon: "🔒"
              },
              {
                title: "Sincronización ERP",
                desc: "Conecta con SAP, Sage o Microsoft Dynamics con un solo clic. Sin fricciones.",
                icon: "⚡"
              }
            ].map((f, i) => (
              <div key={i} className="group bg-[#0A0A0A] border border-white/5 p-8 rounded-3xl hover:border-purple-500/30 transition-all">
                <div className="text-4xl mb-6">{f.icon}</div>
                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 mt-24 bg-black/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-gray-500 text-sm">
            © 2026 Data Analytics Sénior. Todos los derechos reservados.
          </div>
          <div className="flex gap-8 text-gray-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
