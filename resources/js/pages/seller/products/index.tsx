import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';

interface Category {
    id: number;
    nama: string;
}

interface Product {
    id: number;
    nama_produk: string;
    category: Category;
    deskripsi: string;
    harga: number;
    stok: number;
    foto_produk: string | null;
    is_active: boolean;
}

interface ProductsIndexProps {
    products: Product[];
}

export default function ProductsIndex({ products }: ProductsIndexProps) {
    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            router.delete(`/seller/products/${id}`);
        }
    };

    return (
        <AppLayout>
            <Head title="Daftar Produk" />

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Daftar Produk
                        </h1>
                        <Link href="/seller/products/create">
                            <Button className="bg-blue-600 text-white hover:bg-blue-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Produk
                            </Button>
                        </Link>
                    </div>

                    {products.length === 0 ? (
                        <Card className="bg-white">
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <div className="text-center">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                        />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-semibold text-gray-900">
                                        Belum ada produk
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Mulai tambahkan produk pertama Anda.
                                    </p>
                                    <div className="mt-6">
                                        <Link href="/seller/products/create">
                                            <Button className="bg-blue-600 text-white hover:bg-blue-700">
                                                <Plus className="mr-2 h-4 w-4" />
                                                Tambah Produk
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {products.map((product) => (
                                <Card
                                    key={product.id}
                                    className="overflow-hidden bg-white"
                                >
                                    <div className="aspect-square overflow-hidden bg-gray-100">
                                        {product.foto_produk ? (
                                            <img
                                                src={product.foto_produk}
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
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <CardTitle className="line-clamp-1 text-lg text-gray-900">
                                                    {product.nama_produk}
                                                </CardTitle>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {product.category.nama}
                                                </p>
                                            </div>
                                            <div
                                                className={`rounded px-2 py-1 text-xs font-semibold ${
                                                    product.is_active
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {product.is_active
                                                    ? 'Aktif'
                                                    : 'Nonaktif'}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <p className="line-clamp-2 text-sm text-gray-600">
                                            {product.deskripsi}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xl font-bold text-gray-900">
                                                    Rp
                                                    {product.harga.toLocaleString(
                                                        'id-ID',
                                                        {
                                                            maximumFractionDigits: 0,
                                                        },
                                                    )}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Stok: {product.stok}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 pt-2">
                                            <Link
                                                href={`/seller/products/${product.id}/edit`}
                                                className="flex-1"
                                            >
                                                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Button
                                                className="bg-red-600 text-white hover:bg-red-700"
                                                onClick={() =>
                                                    handleDelete(product.id)
                                                }
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
