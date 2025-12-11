import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import GuestLayout from '@/layouts/guest-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, MapPin, Package, Star, Store } from 'lucide-react';
import { useState } from 'react';

interface Review {
    id: number;
    rating: number;
    comment: string | null;
    created_at: string;
    user: {
        id: number;
        name: string;
    } | null;
    guest_name: string | null;
    guest_phone: string | null;
    guest_email: string | null;
    guest_province_id: number | null;
}

interface Province {
    id: number;
    name: string;
}

interface Product {
    id: number;
    nama_produk: string;
    deskripsi: string;
    harga: number;
    stok: number;
    foto_produk: string | null;
    is_active: boolean;
    category: {
        id: number;
        nama: string;
    };
    seller: {
        id: number;
        nama_toko: string;
        kota: string;
        provinsi: string;
    };
    reviews: Review[];
}

interface Props {
    product: Product;
    averageRating: number;
    totalReviews: number;
    ratingDistribution: {
        [key: number]: number;
    };
    relatedProducts: Product[];
    provinces: Province[];
    categories: Array<{ id: number; nama: string }>;
}

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
};

const StarRating = ({
    rating,
    size = 'md',
}: {
    rating: number;
    size?: 'sm' | 'md' | 'lg';
}) => {
    const sizeClass = {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-6 w-6',
    }[size];

    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`${sizeClass} ${
                        star <= rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                    }`}
                />
            ))}
        </div>
    );
};

export default function CatalogShow({
    product,
    averageRating,
    totalReviews,
    ratingDistribution,
    relatedProducts,
    provinces,
    categories,
}: Props) {
    const [selectedRating, setSelectedRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [submittedUser, setSubmittedUser] = useState({ name: '', email: '' });

    const { data, setData, post, processing, errors, reset } = useForm({
        rating: 5,
        comment: '',
        guest_name: '',
        guest_phone: '',
        guest_email: '',
        guest_province_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(`/products/${product.id}/reviews`, {
            onSuccess: () => {
                setSubmittedUser({
                    name: data.guest_name,
                    email: data.guest_email,
                });
                setShowNotification(true);
                reset();
                setShowReviewForm(false);
                setSelectedRating(0);

                // Auto-dismiss notification after 5 seconds
                setTimeout(() => {
                    setShowNotification(false);
                }, 5000);
            },
        });
    };

    return (
        <GuestLayout categories={categories}>
            <Head title={product.nama_produk} />

            {/* Notification Popup */}
            {showNotification && (
                <div className="fixed top-4 right-4 z-50 animate-in duration-300 fade-in slide-in-from-top-2">
                    <Card className="w-96 rounded-lg border-2 border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 shadow-2xl">
                        <CardContent className="p-6">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <svg
                                        className="h-6 w-6 text-green-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="mb-1 text-lg font-bold text-green-800">
                                        Terima Kasih!
                                    </h3>
                                    <p className="mb-2 text-sm text-green-700">
                                        Anda telah memberi komentar dan rating
                                        produk ini.
                                    </p>
                                    <div className="inline-block rounded bg-green-100 px-2 py-1 text-xs text-green-600">
                                        {submittedUser.email}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowNotification(false)}
                                    className="flex-shrink-0 text-green-600 hover:text-green-800"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <Link href="/catalog">
                        <Button
                            variant="outline"
                            className="mb-6 border-blue-300 bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali ke Katalog
                        </Button>
                    </Link>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Main Product Info */}
                        <div className="lg:col-span-2">
                            <Card className="bg-white">
                                <CardContent className="p-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        {/* Product Image */}
                                        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                                            {product.foto_produk ? (
                                                <img
                                                    src={`/storage/${product.foto_produk}`}
                                                    alt={product.nama_produk}
                                                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <Package className="h-24 w-24 text-gray-400" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Product Details */}
                                        <div className="space-y-4">
                                            <div>
                                                <h1 className="text-3xl font-bold text-gray-900">
                                                    {product.nama_produk}
                                                </h1>
                                                <Badge
                                                    variant="outline"
                                                    className="mt-2 border-gray-300 text-gray-700"
                                                >
                                                    {product.category.nama}
                                                </Badge>
                                            </div>

                                            {/* Rating */}
                                            <div className="flex items-center gap-2">
                                                <StarRating
                                                    rating={Math.round(
                                                        averageRating,
                                                    )}
                                                    size="lg"
                                                />
                                                <span className="text-lg font-semibold text-gray-900">
                                                    {averageRating.toFixed(1)}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    ({totalReviews} review
                                                    {totalReviews !== 1
                                                        ? 's'
                                                        : ''}
                                                    )
                                                </span>
                                            </div>

                                            {/* Price */}
                                            <div className="border-y border-gray-200 py-4">
                                                <p className="text-4xl font-bold text-blue-600">
                                                    {formatPrice(product.harga)}
                                                </p>
                                            </div>

                                            {/* Stock */}
                                            <div className="flex items-center gap-2">
                                                <Package className="h-5 w-5 text-gray-400" />
                                                <span className="text-gray-600">
                                                    Stok: {product.stok}
                                                </span>
                                                {product.stok > 0 ? (
                                                    <Badge className="bg-green-100 text-green-800">
                                                        Tersedia
                                                    </Badge>
                                                ) : (
                                                    <Badge className="bg-red-100 text-red-800">
                                                        Habis
                                                    </Badge>
                                                )}
                                            </div>

                                            {/* Description */}
                                            <div>
                                                <h3 className="mb-2 font-semibold text-gray-900">
                                                    Deskripsi
                                                </h3>
                                                <p className="text-gray-600">
                                                    {product.deskripsi}
                                                </p>
                                            </div>

                                            {/* Seller Info */}
                                            <div className="border-t border-blue-100 pt-4">
                                                <h3 className="mb-3 flex items-center gap-2 font-semibold text-gray-900">
                                                    <Store className="h-5 w-5 text-blue-600" />
                                                    Informasi Penjual
                                                </h3>
                                                <div className="space-y-2">
                                                    <p className="text-lg font-semibold text-gray-900">
                                                        {product.seller.nama_toko}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <MapPin className="h-4 w-4 text-blue-600" />
                                                        <span>
                                                            {product.seller.kota},{' '}
                                                            {product.seller.provinsi}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                            {/* Reviews Section */}
                            <Card className="mt-6 bg-white">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-gray-900">
                                            Review Produk ({totalReviews})
                                        </CardTitle>
                                        <Button
                                            onClick={() =>
                                                setShowReviewForm(
                                                    !showReviewForm,
                                                )
                                            }
                                            className="bg-blue-600 text-white hover:bg-blue-700"
                                        >
                                            Tulis Review
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Rating Summary */}
                                    <div className="rounded-lg bg-gray-50 p-4">
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="text-center">
                                                <p className="text-5xl font-bold text-gray-900">
                                                    {averageRating.toFixed(1)}
                                                </p>
                                                <StarRating
                                                    rating={Math.round(
                                                        averageRating,
                                                    )}
                                                    size="lg"
                                                />
                                                <p className="mt-2 text-sm text-gray-600">
                                                    {totalReviews} review
                                                    {totalReviews !== 1
                                                        ? 's'
                                                        : ''}
                                                </p>
                                            </div>
                                            <div className="space-y-2">
                                                {[5, 4, 3, 2, 1].map(
                                                    (rating) => {
                                                        const count =
                                                            ratingDistribution[
                                                                rating
                                                            ] || 0;
                                                        const percentage =
                                                            totalReviews > 0
                                                                ? (count /
                                                                      totalReviews) *
                                                                  100
                                                                : 0;
                                                        return (
                                                            <div
                                                                key={rating}
                                                                className="flex items-center gap-2"
                                                            >
                                                                <span className="w-12 text-sm text-gray-600">
                                                                    {rating}{' '}
                                                                    star
                                                                </span>
                                                                <div className="h-2 flex-1 rounded-full bg-gray-200">
                                                                    <div
                                                                        className="h-full rounded-full bg-yellow-400"
                                                                        style={{
                                                                            width: `${percentage}%`,
                                                                        }}
                                                                    />
                                                                </div>
                                                                <span className="w-12 text-sm text-gray-600">
                                                                    {count}
                                                                </span>
                                                            </div>
                                                        );
                                                    },
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Review Form */}
                                    {showReviewForm && (
                                        <Card className="border-2 border-blue-200 bg-blue-50">
                                            <CardContent className="p-4">
                                                <form
                                                    onSubmit={handleSubmit}
                                                    className="space-y-4"
                                                >
                                                    {/* Guest review fields - as per SRS-06 */}
                                                    {errors.guest_email && (
                                                        <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                                                            <p className="text-sm font-medium text-red-800">
                                                                ⚠️{' '}
                                                                {
                                                                    errors.guest_email
                                                                }
                                                            </p>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <Label
                                                            htmlFor="guest_name"
                                                            className="text-gray-900"
                                                        >
                                                            Nama Lengkap{' '}
                                                            <span className="text-red-500">
                                                                *
                                                            </span>
                                                        </Label>
                                                        <Input
                                                            id="guest_name"
                                                            type="text"
                                                            value={
                                                                data.guest_name
                                                            }
                                                            onChange={(
                                                                e: React.ChangeEvent<HTMLInputElement>,
                                                            ) =>
                                                                setData(
                                                                    'guest_name',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            required
                                                            placeholder="Masukkan nama lengkap Anda"
                                                            className="bg-white text-gray-900"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.guest_name
                                                            }
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label
                                                            htmlFor="guest_phone"
                                                            className="text-gray-900"
                                                        >
                                                            Nomor HP{' '}
                                                            <span className="text-red-500">
                                                                *
                                                            </span>
                                                        </Label>
                                                        <Input
                                                            id="guest_phone"
                                                            type="tel"
                                                            value={
                                                                data.guest_phone
                                                            }
                                                            onChange={(
                                                                e: React.ChangeEvent<HTMLInputElement>,
                                                            ) =>
                                                                setData(
                                                                    'guest_phone',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            required
                                                            placeholder="08123456789"
                                                            className="bg-white text-gray-900"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.guest_phone
                                                            }
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label
                                                            htmlFor="guest_email"
                                                            className="text-gray-900"
                                                        >
                                                            Email{' '}
                                                            <span className="text-red-500">
                                                                *
                                                            </span>
                                                        </Label>
                                                        <Input
                                                            id="guest_email"
                                                            type="email"
                                                            value={
                                                                data.guest_email
                                                            }
                                                            onChange={(
                                                                e: React.ChangeEvent<HTMLInputElement>,
                                                            ) =>
                                                                setData(
                                                                    'guest_email',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            required
                                                            placeholder="email@contoh.com"
                                                            className="bg-white text-gray-900"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.guest_email
                                                            }
                                                        />
                                                        <p className="mt-1 text-xs text-gray-600">
                                                            Email akan digunakan
                                                            untuk mengirimkan
                                                            konfirmasi review
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <Label
                                                            htmlFor="guest_province_id"
                                                            className="text-gray-900"
                                                        >
                                                            Provinsi{' '}
                                                            <span className="text-red-500">
                                                                *
                                                            </span>
                                                        </Label>
                                                        <Select
                                                            value={
                                                                data.guest_province_id
                                                            }
                                                            onValueChange={(
                                                                value,
                                                            ) =>
                                                                setData(
                                                                    'guest_province_id',
                                                                    value,
                                                                )
                                                            }
                                                            required
                                                        >
                                                            <SelectTrigger className="bg-white text-gray-900">
                                                                <SelectValue placeholder="Pilih provinsi Anda" />
                                                            </SelectTrigger>
                                                            <SelectContent className="bg-white">
                                                                {provinces.map(
                                                                    (
                                                                        province,
                                                                    ) => (
                                                                        <SelectItem
                                                                            key={
                                                                                province.id
                                                                            }
                                                                            value={province.id.toString()}
                                                                            className="text-gray-900"
                                                                        >
                                                                            {
                                                                                province.name
                                                                            }
                                                                        </SelectItem>
                                                                    ),
                                                                )}
                                                            </SelectContent>
                                                        </Select>
                                                        <InputError
                                                            message={
                                                                errors.guest_province_id
                                                            }
                                                        />
                                                        <p className="mt-1 text-xs text-gray-600">
                                                            Data provinsi untuk
                                                            analisis penjual
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <Label className="text-gray-900">
                                                            Rating{' '}
                                                            <span className="text-red-500">
                                                                *
                                                            </span>
                                                        </Label>
                                                        <div className="flex items-center gap-1">
                                                            {[
                                                                1, 2, 3, 4, 5,
                                                            ].map((star) => (
                                                                <Star
                                                                    key={star}
                                                                    className={`h-8 w-8 cursor-pointer transition-colors ${
                                                                        star <=
                                                                        (hoveredRating ||
                                                                            selectedRating)
                                                                            ? 'fill-yellow-400 text-yellow-400'
                                                                            : 'text-gray-300'
                                                                    }`}
                                                                    onMouseEnter={() =>
                                                                        setHoveredRating(
                                                                            star,
                                                                        )
                                                                    }
                                                                    onMouseLeave={() =>
                                                                        setHoveredRating(
                                                                            0,
                                                                        )
                                                                    }
                                                                    onClick={() => {
                                                                        setSelectedRating(
                                                                            star,
                                                                        );
                                                                        setData(
                                                                            'rating',
                                                                            star,
                                                                        );
                                                                    }}
                                                                />
                                                            ))}
                                                            <span className="ml-2 text-sm text-gray-600">
                                                                {hoveredRating ||
                                                                    selectedRating ||
                                                                    'Pilih rating'}
                                                            </span>
                                                        </div>
                                                        <InputError
                                                            message={
                                                                errors.rating
                                                            }
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label
                                                            htmlFor="comment"
                                                            className="text-gray-900"
                                                        >
                                                            Komentar (Opsional)
                                                        </Label>
                                                        <Textarea
                                                            id="comment"
                                                            value={data.comment}
                                                            onChange={(e) =>
                                                                setData(
                                                                    'comment',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            rows={4}
                                                            placeholder="Bagikan pengalaman Anda dengan produk ini..."
                                                            className="bg-white text-gray-900"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.comment
                                                            }
                                                        />
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            type="submit"
                                                            disabled={
                                                                processing
                                                            }
                                                            className="bg-blue-600 hover:bg-blue-700"
                                                        >
                                                            Kirim Review
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            onClick={() =>
                                                                setShowReviewForm(
                                                                    false,
                                                                )
                                                            }
                                                        >
                                                            Batal
                                                        </Button>
                                                    </div>
                                                </form>
                                            </CardContent>
                                        </Card>
                                    )}

                                    {/* Note: As per SRS-06, all reviews are guest reviews. No edit/delete functionality */}

                                    {/* All Reviews */}
                                    <div className="space-y-4">
                                        {product.reviews.length === 0 ? (
                                            <p className="text-center text-gray-500">
                                                Belum ada review untuk produk
                                                ini
                                            </p>
                                        ) : (
                                            product.reviews.map((review) => (
                                                <Card
                                                    key={review.id}
                                                    className="bg-gray-50"
                                                >
                                                    <CardContent className="p-4">
                                                        <div className="flex items-start justify-between">
                                                            <div>
                                                                <p className="font-semibold text-gray-900">
                                                                    {
                                                                        review.guest_name
                                                                    }
                                                                </p>
                                                                <StarRating
                                                                    rating={
                                                                        review.rating
                                                                    }
                                                                />
                                                            </div>
                                                            <span className="text-sm text-gray-500">
                                                                {new Date(
                                                                    review.created_at,
                                                                ).toLocaleDateString(
                                                                    'id-ID',
                                                                )}
                                                            </span>
                                                        </div>
                                                        {review.comment && (
                                                            <p className="mt-2 text-gray-700">
                                                                {review.comment}
                                                            </p>
                                                        )}
                                                    </CardContent>
                                                </Card>
                                            ))
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar - Related Products */}
                        <div>
                            <Card className="bg-white shadow-md">
                                <CardHeader>
                                    <CardTitle className="text-gray-900">
                                        Produk Terkait
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {relatedProducts.length === 0 ? (
                                        <p className="text-sm text-gray-500">
                                            Tidak ada produk terkait
                                        </p>
                                    ) : (
                                        relatedProducts.map(
                                            (relatedProduct) => (
                                                <Link
                                                    key={relatedProduct.id}
                                                    href={`/catalog/${relatedProduct.id}`}
                                                >
                                                    <Card className="overflow-hidden border-gray-200 bg-white transition-shadow hover:shadow-md">
                                                        <div className="flex gap-3 p-3">
                                                            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded border border-gray-200 bg-white">
                                                                {relatedProduct.foto_produk ? (
                                                                    <img
                                                                        src={`/storage/${relatedProduct.foto_produk}`}
                                                                        alt={
                                                                            relatedProduct.nama_produk
                                                                        }
                                                                        className="h-full w-full object-contain transition-transform hover:scale-105"
                                                                    />
                                                                ) : (
                                                                    <div className="flex h-full w-full items-center justify-center">
                                                                        <Package className="h-8 w-8 text-gray-400" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="flex-1">
                                                                <h4 className="line-clamp-2 text-sm font-semibold text-gray-900">
                                                                    {
                                                                        relatedProduct.nama_produk
                                                                    }
                                                                </h4>
                                                                <p className="mt-1 font-bold text-blue-600">
                                                                    {formatPrice(
                                                                        relatedProduct.harga,
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </Link>
                                            ),
                                        )
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
