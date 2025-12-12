import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';

interface DashboardData {
    name: string;
    value: number;
}

interface RatingData {
    name: string;
    rating: number;
}

interface Stats {
    total_products: number;
    total_stock: number;
    average_rating: number;
    total_reviews: number;
}

interface Seller {
    id: number;
    nama_toko: string;
    deskripsi_singkat: string;
}

interface Props {
    seller: Seller;
    productStock: DashboardData[];
    productRatings: RatingData[];
    ratingsByProvince: DashboardData[];
    stats: Stats;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function SellerDashboard({
    seller,
    productStock,
    productRatings,
    ratingsByProvince,
    stats,
}: Props) {
    return (
        <AppLayout>
            <Head title="Dashboard Penjual" />

            <div className="min-h-screen bg-white">
                {/* Header - Full Width */}
                <div className="bg-white border-b border-gray-200 py-6 mb-6">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">Dashboard Penjual</h1>
                        <p className="mt-2 text-gray-600">
                            Selamat datang, {seller.nama_toko}
                        </p>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                        <div className="bg-white rounded-lg shadow-md border border-blue-100 p-6 hover:shadow-lg transition-shadow duration-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Produk</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total_products}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md border border-blue-100 p-6 hover:shadow-lg transition-shadow duration-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Stok</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total_stock}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md border border-blue-100 p-6 hover:shadow-lg transition-shadow duration-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                                    <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Rating Rata-rata</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.average_rating.toFixed(1)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md border border-blue-100 p-6 hover:shadow-lg transition-shadow duration-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                                    <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Ulasan</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total_reviews}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Stok Produk */}
                        <div className="bg-white rounded-lg shadow-md border border-blue-100 p-6 hover:shadow-lg transition-shadow duration-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Stok Setiap Produk</h3>
                            {productStock.length > 0 ? (
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={productStock}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="value" name="Stok" fill="#3b82f6" />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center h-[300px] text-gray-500">
                                    <div className="text-center">
                                        <p>Belum ada produk</p>
                                        <p className="text-sm mt-2">Tambahkan produk untuk melihat data stok</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Rating per Produk */}
                        <div className="bg-white rounded-lg shadow-md border border-blue-100 p-6 hover:shadow-lg transition-shadow duration-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating per Produk</h3>
                            {productRatings.length > 0 ? (
                                <ResponsiveContainer width="100%" height={300}>
                                    <RadarChart data={productRatings}>
                                        <PolarGrid />
                                        <PolarAngleAxis dataKey="name" />
                                        <PolarRadiusAxis angle={90} domain={[0, 5]} />
                                        <Radar name="Rating" dataKey="rating" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                                        <Tooltip />
                                        <Legend />
                                    </RadarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center h-[300px] text-gray-500">
                                    <div className="text-center">
                                        <p>Belum ada rating</p>
                                        <p className="text-sm mt-2">Rating akan muncul setelah produk Anda mendapat ulasan</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Pemberi Rating Berdasarkan Provinsi */}
                        <div className="bg-white rounded-lg shadow-md border border-blue-100 p-6 lg:col-span-2 hover:shadow-lg transition-shadow duration-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pemberi Rating Berdasarkan Provinsi</h3>
                            {ratingsByProvince.length > 0 ? (
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={ratingsByProvince}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="value" name="Jumlah Rating" fill="#f59e0b" />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center h-[300px] text-gray-500">
                                    <div className="text-center">
                                        <p>Belum ada data pemberi rating</p>
                                        <p className="text-sm mt-2">Data akan muncul setelah pengguna terdaftar memberikan rating</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Report Buttons */}
                    <div className="mt-8 bg-white rounded-lg shadow-md border border-blue-100 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Unduh Laporan</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Laporan stok produk (SRS-12) */}
                            <a
                                href="/seller/reports/stock-desc"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 hover:scale-105">
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    PDF Laporan Stok Produk
                                </Button>
                            </a>

                            {/* Laporan rating produk (SRS-13) */}
                            <a
                                href="/seller/reports/rating-desc"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white transition-all duration-200 hover:scale-105">
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    PDF Laporan Rating Produk
                                </Button>
                            </a>

                            {/* Laporan stok hampir habis (SRS-14) */}
                            <a
                                href="/seller/reports/low-stock"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white transition-all duration-200 hover:scale-105">
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    PDF Laporan Produk Segera Dipesan
                                </Button>
                            </a>
                        </div>
                    </div>

                    {/* Info Notice */}
                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-blue-700">
                                    <strong>Catatan:</strong> Data di dashboard ini akan otomatis diperbarui setelah Anda menambahkan produk dan menerima rating dari pelanggan.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
