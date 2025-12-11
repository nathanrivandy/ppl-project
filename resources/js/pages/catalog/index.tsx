import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
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

interface Province {
    id: number;
    name: string;
}

interface City {
    id: number;
    name: string;
}

interface Filters {
    search: string | null;
    category: string | null;
    city: string | null;
    province: string | null;
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

    // Auto-search with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            router.get('/catalog', {
                search,
            }, {
                preserveState: true,
                preserveScroll: true,
            });
        }, 200);

        return () => clearTimeout(timer);
    }, [search]);

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

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <GuestLayout 
            categories={categories}
            filters={filters}
            onFilterChange={(filters) => {
                setSearch(filters.search);
            }}
        >
            <Head title="Katalog Produk" />

            <div className="py-6 pb-12 min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
                <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-white drop-shadow-lg">Katalog Produk</h1>
                        <p className="mt-2 text-blue-50">
                            Temukan produk yang anda inginkan dari berbagai penjual
                        </p>
                    </div>


                    {/* Results Info */}
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm text-white">
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
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {products.data.map((product) => (
                                    <Link key={product.id} href={`/catalog/${product.id}`}>
                                        <Card className="h-full overflow-hidden bg-white/95 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-2 hover:border-blue-500 border-2 border-blue-100 rounded-lg group p-1">
                                            <div className="aspect-[5/4] overflow-hidden bg-gradient-to-br from-blue-100 via-blue-50 to-white relative rounded-sm">
                                                {/* Gradient Overlay on Hover */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                                                
                                                {product.foto_produk ? (
                                                    <img
                                                        src={`/storage/${product.foto_produk}`}
                                                        alt={product.nama_produk}
                                                        className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50">
                                                        <svg
                                                            className="h-16 w-16 text-blue-300 group-hover:text-blue-400 transition-colors"
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
                                            <CardHeader className="pb-0.5 bg-gradient-to-b from-white to-blue-50/50 px-1.5 pt-1.5">
                                                <CardTitle className="line-clamp-1 text-xs text-gray-900 font-bold group-hover:text-blue-700 transition-colors mb-0.5">
                                                    {product.nama_produk}
                                                </CardTitle>
                                                <Badge variant="outline" className="w-fit border-blue-300 text-blue-700 bg-blue-50 font-semibold text-[10px] px-1 py-0">
                                                    {product.category.nama}
                                                </Badge>
                                            </CardHeader>
                                            <CardContent className="space-y-1 bg-gradient-to-b from-blue-50/50 to-white pb-1.5 px-1.5">
                                                <div className="flex items-center justify-between border-t border-blue-100 pt-0.5">
                                                    <p className="text-base font-extrabold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                                                        {formatPrice(product.harga)}
                                                    </p>
                                                </div>
                                                <div className="flex items-center justify-between bg-blue-50/60 rounded-sm p-1 border border-blue-100 gap-1">
                                                    <div className="flex items-center gap-0.5">
                                                        <StarRating rating={Math.round(product.average_rating)} />
                                                        <span className="text-[10px] text-gray-700 font-medium">
                                                            ({product.reviews_count})
                                                        </span>
                                                    </div>
                                                    <p className="text-[10px] text-blue-700 font-semibold bg-blue-100 px-1.5 py-0.5 rounded ml-auto">
                                                        Stok: {product.stok}
                                                    </p>
                                                </div>
                                                <p className="text-xs text-blue-700 font-bold mb-0 pt-0.5 border-t border-blue-100">
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
                                            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
                                        >
                                            Previous
                                        </Button>
                                    )}
                                    <span className="flex items-center px-4 text-sm text-white font-medium">
                                        Page {products.current_page} of {products.last_page}
                                    </span>
                                    {products.current_page < products.last_page && (
                                        <Button
                                            onClick={() =>
                                                router.get(`/catalog?page=${products.current_page + 1}`)
                                            }
                                            variant="outline"
                                            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
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
