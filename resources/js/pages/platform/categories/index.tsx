import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Category {
    id: number;
    nama: string;
    deskripsi: string | null;
    products_count: number;
    created_at: string;
    updated_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    categories: {
        data: Category[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: PaginationLink[];
    };
}

export default function CategoriesIndex({ categories }: Props) {
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        router.delete(`/platform/categories/${id}`, {
            onSuccess: () => {
                setDeleteId(null);
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Kelola Kategori" />

            <div className="min-h-screen bg-white">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 py-6 mb-6">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Kelola Kategori</h1>
                                <p className="mt-2 text-gray-600">
                                    Kelola semua kategori produk di platform
                                </p>
                            </div>
                            <Link href="/platform/categories/create">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Tambah Kategori
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
                    {/* Table */}
                    <div className="bg-white rounded-lg shadow-md border border-gray-200">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]">No</TableHead>
                                    <TableHead>Nama Kategori</TableHead>
                                    <TableHead className="text-center">Jumlah Produk</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                            Belum ada kategori. Tambahkan kategori baru untuk memulai.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    categories.data.map((category, index) => (
                                        <TableRow key={category.id}>
                                            <TableCell className="font-medium">
                                                {(categories.current_page - 1) * categories.per_page + index + 1}
                                            </TableCell>
                                            <TableCell className="font-semibold">{category.nama}</TableCell>
                                            <TableCell className="text-center">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {category.products_count}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/platform/categories/${category.id}/edit`}>
                                                        <Button
                                                            size="sm"
                                                            className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                                                        >
                                                            <Pencil className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        size="sm"
                                                        className="bg-red-600 hover:bg-red-700 text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                                        onClick={() => setDeleteId(category.id)}
                                                        disabled={category.products_count > 0}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        {categories.last_page > 1 && (
                            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                                <div className="flex flex-1 justify-between sm:hidden">
                                    {categories.links[0].url && (
                                        <Link
                                            href={categories.links[0].url}
                                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                        >
                                            Previous
                                        </Link>
                                    )}
                                    {categories.links[categories.links.length - 1].url && (
                                        <Link
                                            href={categories.links[categories.links.length - 1].url || '#'}
                                            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                        >
                                            Next
                                        </Link>
                                    )}
                                </div>
                                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Menampilkan{' '}
                                            <span className="font-medium">
                                                {(categories.current_page - 1) * categories.per_page + 1}
                                            </span>{' '}
                                            hingga{' '}
                                            <span className="font-medium">
                                                {Math.min(
                                                    categories.current_page * categories.per_page,
                                                    categories.total
                                                )}
                                            </span>{' '}
                                            dari <span className="font-medium">{categories.total}</span> kategori
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                                            {categories.links.map((link, index) => (
                                                <Link
                                                    key={index}
                                                    href={link.url || '#'}
                                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                                                        link.active
                                                            ? 'z-10 bg-blue-600 text-white'
                                                            : 'bg-white text-gray-700 hover:bg-gray-50'
                                                    } ${
                                                        index === 0
                                                            ? 'rounded-l-md'
                                                            : index === categories.links.length - 1
                                                            ? 'rounded-r-md'
                                                            : ''
                                                    } border border-gray-300`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Info Notice */}
                    {categories.data.some(cat => cat.products_count > 0) && (
                        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-yellow-700">
                                        <strong>Catatan:</strong> Kategori yang memiliki produk tidak dapat dihapus. Hapus atau pindahkan produk terlebih dahulu sebelum menghapus kategori.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Hapus Kategori?</DialogTitle>
                        <DialogDescription>
                            Tindakan ini tidak dapat dibatalkan. Kategori ini akan dihapus secara permanen dari sistem.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteId(null)}
                            className="border-gray-300 text-gray-700 hover:bg-gray-100"
                        >
                            Batal
                        </Button>
                        <Button
                            onClick={() => deleteId && handleDelete(deleteId)}
                            className="bg-red-600 hover:bg-red-700 text-white shadow-sm"
                        >
                            Hapus
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
