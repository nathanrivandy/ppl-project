import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function CreateCategory() {
    const { data, setData, post, processing, errors } = useForm({
        nama: '',
        deskripsi: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/platform/categories');
    };

    return (
        <AppLayout>
            <Head title="Tambah Kategori" />

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
                                <h1 className="text-3xl font-bold text-gray-900">Tambah Kategori</h1>
                                <p className="mt-2 text-gray-600">
                                    Tambahkan kategori produk baru
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

                            {/* Buttons */}
                            <div className="flex items-center gap-3 pt-4">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Kategori'}
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
                                    <strong>Catatan:</strong> Nama kategori harus unik. Kategori yang sudah dibuat dapat digunakan oleh penjual saat menambahkan produk baru.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
