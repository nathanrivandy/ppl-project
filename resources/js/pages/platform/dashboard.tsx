import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';

interface DashboardData {
    name: string;
    value: number;
    [key: string]: string | number;
}

interface RatingData {
    name: string;
    rating: number;
}

interface Stats {
    total_sellers: number;
    active_sellers: number;
    pending_verification: number;
    total_visitors: number;
}

interface Props {
    productsByCategory: DashboardData[];
    sellersByProvince: DashboardData[];
    sellerStatus: DashboardData[];
    commentRatingStats: DashboardData[];
    stats: Stats;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

export default function PlatformDashboard({
    productsByCategory,
    sellersByProvince,
    sellerStatus,
    commentRatingStats,
    stats,
}: Props) {
    return (
        <AppLayout>
            <Head title="Dashboard Platform" />

            <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
                {/* Header - Full Width */}
                <div className="bg-gradient-to-r from-white/20 via-white/10 to-transparent backdrop-blur-sm border-b border-white/30 py-6 mb-6">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-white drop-shadow-lg">Dashboard Platform</h1>
                        <p className="mt-2 text-white">Selamat datang di dashboard administrasi platform</p>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                        <div className="bg-white rounded-lg shadow-md border border-blue-100 p-6 hover:shadow-lg transition-shadow duration-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Penjual</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total_sellers}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md border border-blue-100 p-6 hover:shadow-lg transition-shadow duration-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Penjual Aktif</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.active_sellers}</p>
                                </div>
                            </div>
                        </div>

                        <Link href="/platform/sellers/verification" className="bg-white rounded-lg shadow-md border border-blue-100 p-6 hover:shadow-lg transition-shadow duration-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                                    <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Menunggu Verifikasi</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.pending_verification}</p>
                                </div>
                            </div>
                        </Link>

                        <div className="bg-white rounded-lg shadow-md border border-blue-100 p-6 hover:shadow-lg transition-shadow duration-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                                    <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Pengunjung</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total_visitors}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Produk Berdasarkan Kategori */}
                        <div className="bg-white rounded-lg shadow-md border border-blue-100 p-6 hover:shadow-lg transition-shadow duration-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Produk Berdasarkan Kategori</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={productsByCategory}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="name" stroke="#374151" style={{ fontSize: '12px', fill: '#374151' }} />
                                    <YAxis stroke="#374151" style={{ fontSize: '12px', fill: '#374151' }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
                                    <Bar dataKey="value" fill="#3b82f6" name="Jumlah Produk" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Toko Berdasarkan Provinsi */}
                        <div className="bg-white rounded-lg shadow-md border border-blue-100 p-6 hover:shadow-lg transition-shadow duration-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sebaran Toko Berdasarkan Provinsi</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={sellersByProvince}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} stroke="#374151" style={{ fontSize: '11px', fill: '#374151' }} />
                                    <YAxis stroke="#374151" style={{ fontSize: '12px', fill: '#374151' }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
                                    <Bar dataKey="value" fill="#10b981" name="Jumlah Toko" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Status Penjual */}
                        <div className="bg-white rounded-lg shadow-md border border-blue-100 p-6 hover:shadow-lg transition-shadow duration-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status User Penjual</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={sellerStatus}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        style={{ fontSize: '12px', fill: '#374151' }}
                                    >
                                        {sellerStatus.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Pengunjung dengan Komentar & Rating */}
                        <div className="bg-white rounded-lg shadow-md border border-blue-100 p-6 hover:shadow-lg transition-shadow duration-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pengunjung Memberikan Komentar & Rating</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={commentRatingStats}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        style={{ fontSize: '12px', fill: '#374151' }}
                                    >
                                        {commentRatingStats.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index + 2]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Report Buttons */}
                    <div className="mt-8 bg-white rounded-lg shadow-md border border-blue-100 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Unduh Laporan</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Laporan Status Penjual */}
                            <a
                                href="/platform/reports/seller-status"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 hover:scale-105">
                                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    PDF Laporan Status Penjual
                                </Button>
                            </a>

                            {/* Laporan Penjual per Provinsi */}
                            <a
                                href="/platform/reports/seller-by-province"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white transition-all duration-200 hover:scale-105">
                                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    PDF Laporan Per Provinsi
                                </Button>
                            </a>

                            {/* Laporan Rating Produk */}
                            <a
                                href="/platform/reports/product-rating"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white transition-all duration-200 hover:scale-105">
                                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    PDF Laporan Rating Produk
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
