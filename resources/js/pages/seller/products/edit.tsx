import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Spinner } from '@/components/ui/spinner';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface Category {
    id: number;
    nama: string;
}

interface Product {
    id: number;
    nama_produk: string;
    category_id: number;
    deskripsi: string;
    harga: number;
    stok: number;
    foto_produk: string | null;
    is_active: boolean;
}

interface EditProductProps {
    product: Product;
    categories: Category[];
}

export default function EditProduct({ product, categories }: EditProductProps) {
    const { data, setData, post, processing, errors } = useForm({
        nama_produk: product.nama_produk,
        category_id: product.category_id.toString(),
        deskripsi: product.deskripsi,
        harga: product.harga.toString(),
        stok: product.stok.toString(),
        foto_produk: null as File | null,
        is_active: product.is_active,
        _method: 'PUT',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/seller/products/${product.id}`);
    };

    return (
        <AppLayout>
            <Head title="Edit Produk" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link href="/seller/products">
                            <Button variant="ghost" className="mb-4">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali ke Daftar Produk
                            </Button>
                        </Link>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Edit Produk</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid gap-4">
                                    {/* Nama Produk */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="nama_produk">
                                            Nama Produk <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="nama_produk"
                                            type="text"
                                            value={data.nama_produk}
                                            onChange={(e) => setData('nama_produk', e.target.value)}
                                            required
                                            placeholder="Masukkan nama produk"
                                        />
                                        <InputError message={errors.nama_produk} />
                                    </div>

                                    {/* Kategori */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="category_id">
                                            Kategori <span className="text-red-500">*</span>
                                        </Label>
                                        <select
                                            id="category_id"
                                            value={data.category_id}
                                            onChange={(e) => setData('category_id', e.target.value)}
                                            required
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        >
                                            <option value="">Pilih Kategori</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.nama}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError message={errors.category_id} />
                                    </div>

                                    {/* Deskripsi */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="deskripsi">
                                            Deskripsi <span className="text-red-500">*</span>
                                        </Label>
                                        <Textarea
                                            id="deskripsi"
                                            value={data.deskripsi}
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                                setData('deskripsi', e.target.value)
                                            }
                                            required
                                            rows={4}
                                            placeholder="Deskripsikan produk Anda"
                                        />
                                        <InputError message={errors.deskripsi} />
                                    </div>

                                    {/* Harga dan Stok */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="harga">
                                                Harga (Rp) <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="harga"
                                                type="number"
                                                value={data.harga}
                                                onChange={(e) => setData('harga', e.target.value)}
                                                required
                                                min="0"
                                                step="0.01"
                                                placeholder="0"
                                            />
                                            <InputError message={errors.harga} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="stok">
                                                Stok <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="stok"
                                                type="number"
                                                value={data.stok}
                                                onChange={(e) => setData('stok', e.target.value)}
                                                required
                                                min="0"
                                                placeholder="0"
                                            />
                                            <InputError message={errors.stok} />
                                        </div>
                                    </div>

                                    {/* Status Aktif */}
                                    <div className="flex items-center gap-2">
                                        <input
                                            id="is_active"
                                            type="checkbox"
                                            checked={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        <Label htmlFor="is_active" className="cursor-pointer">
                                            Produk Aktif
                                        </Label>
                                    </div>

                                    {/* Foto Produk */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="foto_produk">Foto Produk</Label>
                                        {product.foto_produk && !data.foto_produk && (
                                            <div className="mb-2">
                                                <img
                                                    src={`/storage/${product.foto_produk}`}
                                                    alt="Current product"
                                                    className="h-32 w-32 object-cover rounded"
                                                />
                                                <p className="text-sm text-gray-500 mt-1">Foto saat ini</p>
                                            </div>
                                        )}
                                        <div className="flex items-center justify-center w-full">
                                            <label
                                                htmlFor="foto_produk"
                                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                            >
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg
                                                        className="w-8 h-8 mb-2 text-gray-500"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 20 16"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                        />
                                                    </svg>
                                                    <p className="mb-1 text-sm text-gray-500">
                                                        <span className="font-semibold">
                                                            Klik untuk upload foto baru
                                                        </span>
                                                    </p>
                                                    <p className="text-xs text-gray-500">JPG atau PNG (MAX. 2MB)</p>
                                                </div>
                                                <input
                                                    id="foto_produk"
                                                    type="file"
                                                    onChange={(e) =>
                                                        setData('foto_produk', e.target.files?.[0] || null)
                                                    }
                                                    accept="image/*"
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                        {data.foto_produk && (
                                            <p className="text-sm text-green-600">✓ {data.foto_produk.name}</p>
                                        )}
                                        <InputError message={errors.foto_produk} />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end gap-4 pt-4">
                                    <Link href="/seller/products">
                                        <Button type="button" variant="outline">
                                            Batal
                                        </Button>
                                    </Link>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        {processing && <Spinner />}
                                        Simpan Perubahan
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
