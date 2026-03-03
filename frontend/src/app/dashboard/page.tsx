'use client';
import React, { useState, useEffect } from 'react';
import FileUpload from '../../components/FileUpload';

const TENANT_ID = 'ac93a157-9394-4b01-9a5e-c77619d3b19c';

export default function Dashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:8000/analytics/summary', {
                    headers: { 'X-Tenant-ID': TENANT_ID }
                });
                const json = await res.json();
                setData(json);
            } catch (err) {
                console.error("Error fetching summary:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-purple-500 font-bold animate-pulse text-2xl">Cargando Analytics Sénior...</div>;

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30">
            {/* Navbar */}
            <nav className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <span className="font-bold text-xl">D</span>
                        </div>
                        <span className="font-bold text-2xl tracking-tight">Data Analytics <span className="text-purple-500">Sénior</span></span>
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Documentation</button>
                        <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-sm shadow-green-500/50"></div>
                            <span className="text-xs font-bold text-gray-300">Admin</span>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">Dashboard General</h1>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${data?.plan === 'Pro' ? 'border-purple-500/50 text-purple-400 bg-purple-500/10' : 'border-gray-500/50 text-gray-400 bg-gray-500/10'}`}>
                                Plan {data?.plan}
                            </span>
                        </div>
                        <p className="text-gray-400">Bienvenido, aquí tienes el resumen de gastos de <span className="text-white font-semibold italic">Empresa Demo</span>.</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={async () => {
                                const res = await fetch('http://localhost:8000/erp/sync', {
                                    method: 'POST',
                                    headers: { 'X-Tenant-ID': TENANT_ID }
                                });
                                if (res.ok) alert("Sincronizado con ERP con éxito.");
                            }}
                            className="bg-white/5 border border-white/10 px-5 py-2.5 rounded-xl hover:bg-white/10 transition-all flex items-center gap-2"
                        >
                            <span>Sincronizar ERP</span>
                        </button>
                        <FileUpload />
                    </div>
                </div>

                {/* Dynamic KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Gasto Total (Mes)', value: `${data?.total_expenditure?.toLocaleString('es-ES')}€`, trend: '+12%', color: 'border-purple-500/30' },
                        { label: 'Facturas Procesadas', value: data?.invoice_count, trend: '+5', color: 'border-blue-500/30' },
                        { label: 'Gasto Medio', value: `${data?.avg_invoice_value?.toLocaleString('es-ES')}€`, trend: '-2%', color: 'border-green-500/30' },
                        { label: 'Top Proveedor', value: data?.top_vendor || 'N/A', trend: 'Líder', color: 'border-orange-500/30' },
                    ].map((kpi, i) => (
                        <div key={i} className={`bg-[#0A0A0A] border ${kpi.color} p-6 rounded-2xl`}>
                            <p className="text-sm text-gray-500 font-medium mb-1">{kpi.label}</p>
                            <div className="flex items-end justify-between gap-2 overflow-hidden">
                                <h3 className="text-xl font-bold truncate">{kpi.value}</h3>
                                <span className={`text-[10px] whitespace-nowrap font-bold px-2 py-1 rounded-full ${kpi.trend.startsWith('+') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                    {kpi.trend}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Invoices Table (2/3) */}
                    <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden">
                        <div className="p-6 border-b border-white/5 flex items-center justify-between">
                            <h2 className="font-bold text-lg">Facturas Recientes</h2>
                            <button
                                onClick={() => window.location.reload()}
                                className="text-sm text-purple-500 hover:underline"
                            >
                                Refrescar
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Proveedor</th>
                                        <th className="px-6 py-4">Fecha</th>
                                        <th className="px-6 py-4">Importe</th>
                                        <th className="px-6 py-4">Estado</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-sm">
                                    {data?.recent_invoices?.map((row: any, i: number) => (
                                        <tr key={i} className="hover:bg-white/[0.02] transition-colors cursor-pointer group">
                                            <td className="px-6 py-4 font-medium group-hover:text-purple-400 transition-colors">{row.vendor_name}</td>
                                            <td className="px-6 py-4 text-gray-400">{row.invoice_date}</td>
                                            <td className="px-6 py-4 font-bold">{row.total_amount?.toLocaleString('es-ES')}€</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-tighter ${row.status === 'processed' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                                                    {row.status === 'processed' ? 'Procesado' : 'Procesando...'}
                                                </span>
                                                {row.synced && <span className="ml-2 text-[8px] text-blue-400 font-bold border border-blue-400/30 px-1 rounded">ERP</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Activity/Filters (1/3) */}
                    <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6">
                        <h2 className="font-bold text-lg mb-6">Filtros de Análisis</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="text-xs text-gray-500 block mb-2 uppercase font-bold tracking-widest" htmlFor="timeRange">Rango de Tiempo</label>
                                <select
                                    id="timeRange"
                                    title="Seleccionar periodo"
                                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                >
                                    <option>Últimos 30 días</option>
                                    <option>Este Trimestre</option>
                                    <option>Año 2026</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 block mb-2 uppercase font-bold tracking-widest">Categoría de Gasto</label>
                                <div className="space-y-2">
                                    {['SaaS', 'Marketing', 'Dietas', 'Viajes'].map((cat, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl text-sm hover:bg-white/10 transition-all cursor-pointer">
                                            <span>{cat}</span>
                                            <div className="w-2 h-2 rounded-full bg-purple-500 shadow-sm shadow-purple-500/50"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="pt-4">
                                <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-6">
                                    <p className="text-xs font-bold text-purple-400 uppercase mb-2">Sugerencia AI</p>
                                    <p className="text-sm text-gray-300 italic">"Has gastado un 15% más en suscripciones SaaS que el mes pasado. ¿Revisamos las licencias?"</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
