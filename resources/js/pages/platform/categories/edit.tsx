import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import { FormEventHandler } from 'react';

interface Category {
    id: number;
    nama: string;
    deskripsi: string | null;
    products_count: number;
}

interface Props {
    category: Category;
}

export default function EditCategory({ category }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        nama: category.nama,
        deskripsi: category.deskripsi || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/platform/categories/${category.id}`);
    };

    return (
        <AppLayout>
            <Head title="Edit Kategori" />

            <div className="min-h-screen bg-white">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 py-6 mb-6">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-4">
                            <Link href="/platform/categories">
                                <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-100">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Kembali
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Edit Kategori</h1>
                                <p className="mt-2 text-gray-600">
                                    Perbarui informasi kategori
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-12">
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Nama Kategori */}
                            <div className="space-y-2">
                                <Label htmlFor="nama">
                                    Nama Kategori <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="nama"
                                    type="text"
                                    value={data.nama}
                                    onChange={(e) => setData('nama', e.target.value)}
                                    className={errors.nama ? 'border-red-500' : ''}
                                    placeholder="Contoh: Elektronik, Fashion, Makanan"
                                    required
                                />
                                {errors.nama && (
                                    <p className="text-sm text-red-500">{errors.nama}</p>
                                )}
                            </div>

                            {/* Deskripsi */}
                            <div className="space-y-2">
                                <Label htmlFor="deskripsi">Deskripsi (Opsional)</Label>
                                <Textarea
                                    id="deskripsi"
                                    value={data.deskripsi}
                                    onChange={(e) => setData('deskripsi', e.target.value)}
                                    className={errors.deskripsi ? 'border-red-500' : ''}
                                    placeholder="Deskripsi singkat tentang kategori ini..."
                                    rows={4}
                                />
                                {errors.deskripsi && (
                                    <p className="text-sm text-red-500">{errors.deskripsi}</p>
                                )}
                            </div>

                            {/* Product Count Info */}
                            {category.products_count > 0 && (
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                    <p className="text-sm text-gray-700">
                                        Kategori ini digunakan oleh{' '}
                                        <span className="font-semibold">{category.products_count}</span>{' '}
                                        produk
                                    </p>
                                </div>
                            )}

                            {/* Buttons */}
                            <div className="flex items-center gap-3 pt-4">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </Button>
                                <Link href="/platform/categories">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        disabled={processing}
                                        className="border-gray-300 text-gray-700 hover:bg-gray-100"
                                    >
                                        Batal
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </div>

                    {/* Warning Notice */}
                    {category.products_count > 0 && (
                        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-yellow-700">
                                        <strong>Perhatian:</strong> Mengubah nama kategori akan mempengaruhi semua produk yang menggunakan kategori ini.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
