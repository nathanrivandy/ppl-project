import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import GuestLayout from '@/layouts/guest-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Star } from 'lucide-react';

interface Product {
    id: number;
    nama_produk: string;
    deskripsi: string;
    harga: number;
    stok: number;
    foto_produk: string | null;
    category: {
        id: number;
        nama: string;
    };
    seller: {
        id: number;
        nama_toko: string;
    };
    average_rating: number;
    reviews_count: number;
}

interface Category {
    id: number;
    nama: string;
}

interface Filters {
    search: string | null;
    category: string | null;
    min_price: string | null;
    max_price: string | null;
    sort: string;
}

interface Props {
    products: {
        data: Product[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    categories: Category[];
    filters: Filters;
}

export default function CatalogIndex({ products, categories, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
    const [minPrice, setMinPrice] = useState(filters.min_price || '');
    const [maxPrice, setMaxPrice] = useState(filters.max_price || '');
    const [sortBy, setSortBy] = useState(filters.sort || 'latest');
    const [showFilters, setShowFilters] = useState(false);

    const handleSearch = () => {
        router.get('/catalog', {
            search,
            category: selectedCategory,
            min_price: minPrice,
            max_price: maxPrice,
            sort: sortBy,
        });
    };

    const handleReset = () => {
        setSearch('');
        setSelectedCategory('');
        setMinPrice('');
        setMaxPrice('');
        setSortBy('latest');
        router.get('/catalog');
    };

    const StarRating = ({ rating }: { rating: number }) => {
        return (
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`h-4 w-4 ${
                            star <= rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                        }`}
                    />
                ))}
            </div>
        );
    };

    return (
        <GuestLayout>
            <Head title="Katalog Produk" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Katalog Produk</h1>
                        <p className="mt-2 text-gray-600">
                            Temukan produk yang Anda butuhkan dari berbagai penjual
                        </p>
                    </div>

                    {/* Search and Filter Bar */}
                    <Card className="mb-6 bg-white">
                        <CardContent className="p-4">
                            <div className="flex flex-col gap-4">
                                {/* Search Box */}
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <Input
                                            type="text"
                                            placeholder="Cari produk..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                            className="pl-10 bg-white text-gray-900"
                                        />
                                    </div>
                                    <Button
                                        onClick={() => setShowFilters(!showFilters)}
                                        variant="outline"
                                    >
                                        <Filter className="mr-2 h-4 w-4" />
                                        Filter
                                    </Button>
                                    <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
                                        Cari
                                    </Button>
                                </div>

                                {/* Filter Panel */}
                                {showFilters && (
                                    <div className="grid gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 md:grid-cols-4">
                                        {/* Category Filter */}
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-900">
                                                Kategori
                                            </label>
                                            <select
                                                value={selectedCategory}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
                                            >
                                                <option value="">Semua Kategori</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.nama}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Min Price */}
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-900">
                                                Harga Min
                                            </label>
                                            <Input
                                                type="number"
                                                placeholder="0"
                                                value={minPrice}
                                                onChange={(e) => setMinPrice(e.target.value)}
                                                className="bg-white text-gray-900"
                                            />
                                        </div>

                                        {/* Max Price */}
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-900">
                                                Harga Max
                                            </label>
                                            <Input
                                                type="number"
                                                placeholder="999999999"
                                                value={maxPrice}
                                                onChange={(e) => setMaxPrice(e.target.value)}
                                                className="bg-white text-gray-900"
                                            />
                                        </div>

                                        {/* Sort By */}
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-900">
                                                Urutkan
                                            </label>
                                            <select
                                                value={sortBy}
                                                onChange={(e) => setSortBy(e.target.value)}
                                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
                                            >
                                                <option value="latest">Terbaru</option>
                                                <option value="price_low">Harga Terendah</option>
                                                <option value="price_high">Harga Tertinggi</option>
                                                <option value="name">Nama A-Z</option>
                                            </select>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2 md:col-span-4">
                                            <Button
                                                onClick={handleSearch}
                                                className="bg-blue-600 hover:bg-blue-700"
                                            >
                                                Terapkan Filter
                                            </Button>
                                            <Button onClick={handleReset} variant="outline">
                                                Reset
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Results Info */}
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            Menampilkan {products.data.length} dari {products.total} produk
                        </p>
                    </div>

                    {/* Product Grid */}
                    {products.data.length === 0 ? (
                        <Card className="bg-white">
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <div className="text-center">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                        />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-semibold text-gray-900">
                                        Tidak ada produk ditemukan
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Coba ubah filter pencarian Anda.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {products.data.map((product) => (
                                    <Link key={product.id} href={`/catalog/${product.id}`}>
                                        <Card className="h-full overflow-hidden bg-white transition-shadow hover:shadow-lg">
                                            <div className="aspect-square overflow-hidden bg-gray-100">
                                                {product.foto_produk ? (
                                                    <img
                                                        src={`/storage/${product.foto_produk}`}
                                                        alt={product.nama_produk}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center">
                                                        <svg
                                                            className="h-16 w-16 text-gray-400"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                            />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <CardHeader className="pb-3">
                                                <CardTitle className="line-clamp-2 text-base text-gray-900">
                                                    {product.nama_produk}
                                                </CardTitle>
                                                <Badge variant="outline" className="w-fit border-gray-300 text-gray-700">
                                                    {product.category.nama}
                                                </Badge>
                                            </CardHeader>
                                            <CardContent className="space-y-2">
                                                <p className="text-sm text-gray-600 line-clamp-2">
                                                    {product.deskripsi}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-lg font-bold text-gray-900">
                                                        Rp {product.harga.toLocaleString('id-ID')}
                                                    </p>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <StarRating rating={Math.round(product.average_rating)} />
                                                        <span className="text-sm text-gray-600">
                                                            ({product.reviews_count})
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-500">
                                                        Stok: {product.stok}
                                                    </p>
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                    {product.seller.nama_toko}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            {products.last_page > 1 && (
                                <div className="mt-6 flex justify-center gap-2">
                                    {products.current_page > 1 && (
                                        <Button
                                            onClick={() =>
                                                router.get(`/catalog?page=${products.current_page - 1}`)
                                            }
                                            variant="outline"
                                        >
                                            Previous
                                        </Button>
                                    )}
                                    <span className="flex items-center px-4 text-sm text-gray-700">
                                        Page {products.current_page} of {products.last_page}
                                    </span>
                                    {products.current_page < products.last_page && (
                                        <Button
                                            onClick={() =>
                                                router.get(`/catalog?page=${products.current_page + 1}`)
                                            }
                                            variant="outline"
                                        >
                                            Next
                                        </Button>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
