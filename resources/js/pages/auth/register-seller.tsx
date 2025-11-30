import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Spinner } from '@/components/ui/spinner';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';
import axios from 'axios';

interface Location {
    id: string | number;
    code: string;
    name: string;
}

export default function RegisterSeller() {
    const [provinces, setProvinces] = useState<Location[]>([]);
    const [cities, setCities] = useState<Location[]>([]);
    const [districts, setDistricts] = useState<Location[]>([]);
    const [villages, setVillages] = useState<Location[]>([]);

    const { data, setData, post, processing, errors } = useForm({
        nama_toko: '',
        deskripsi_singkat: '',
        nama_pic: '',
        no_handphone_pic: '',
        email_pic: '',
        alamat_jalan: '',
        rt: '',
        rw: '',
        village_id: '',
        district_id: '',
        city_id: '',
        province_id: '',
        no_ktp: '',
        foto_pic: null as File | null,
        file_ktp: null as File | null,
        password: '',
        password_confirmation: '',
    });

    // Load provinces on mount
    useEffect(() => {
        axios.get('/api/provinces').then(response => {
            setProvinces(response.data);
        });
    }, []);

    // Load cities when province changes
    useEffect(() => {
        if (data.province_id) {
            const province = provinces.find(p => p.id.toString() === data.province_id);
            if (province) {
                axios.get(`/api/cities/${province.code}`).then(response => {
                    setCities(response.data);
                    setDistricts([]);
                    setVillages([]);
                });
            }
        } else {
            setCities([]);
            setDistricts([]);
            setVillages([]);
        }
    }, [data.province_id, provinces]);

    // Load districts when city changes
    useEffect(() => {
        if (data.city_id) {
            const city = cities.find(c => c.id.toString() === data.city_id);
            if (city) {
                axios.get(`/api/districts/${city.code}`).then(response => {
                    setDistricts(response.data);
                    setVillages([]);
                });
            }
        } else {
            setDistricts([]);
            setVillages([]);
        }
    }, [data.city_id, cities]);

    // Load villages when district changes
    useEffect(() => {
        if (data.district_id) {
            const district = districts.find(d => d.id.toString() === data.district_id);
            if (district) {
                axios.get(`/api/villages/${district.code}`).then(response => {
                    setVillages(response.data);
                });
            }
        } else {
            setVillages([]);
        }
    }, [data.district_id, districts]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/register-seller');
    };

    return (
        <>
            <Head title="Registrasi Penjual" />
            
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900">Registrasi Penjual</h1>
                            <p className="text-gray-600 mt-2">Daftar sebagai penjual di marketplace</p>
                        </div>

                        <form onSubmit={submit} className="flex flex-col gap-8">
                            {/* Data Toko */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Data Toko</h3>
                                
                                <div className="grid gap-2">
                                    <Label htmlFor="nama_toko" className="text-gray-700">
                                        Nama Toko <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="nama_toko"
                                        type="text"
                                        value={data.nama_toko}
                                        onChange={(e) => setData('nama_toko', e.target.value)}
                                        required
                                        className="bg-white border-gray-300"
                                        placeholder="Masukkan nama toko"
                                    />
                                    <InputError message={errors.nama_toko} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="deskripsi_singkat" className="text-gray-700">
                                        Deskripsi Singkat <span className="text-red-500">*</span>
                                    </Label>
                                    <Textarea
                                        id="deskripsi_singkat"
                                        value={data.deskripsi_singkat}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('deskripsi_singkat', e.target.value)}
                                        required
                                        rows={3}
                                        className="bg-white border-gray-300"
                                        placeholder="Deskripsikan toko Anda"
                                    />
                                    <InputError message={errors.deskripsi_singkat} />
                                </div>
                            </div>

                            {/* Data PIC */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Data Penanggung Jawab (PIC)</h3>
                                
                                <div className="grid gap-2">
                                    <Label htmlFor="nama_pic" className="text-gray-700">
                                        Nama PIC <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="nama_pic"
                                        type="text"
                                        value={data.nama_pic}
                                        onChange={(e) => setData('nama_pic', e.target.value)}
                                        required
                                        className="bg-white border-gray-300"
                                        placeholder="Nama lengkap penanggung jawab"
                                    />
                                    <InputError message={errors.nama_pic} />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email_pic" className="text-gray-700">
                                            Email PIC <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="email_pic"
                                            type="email"
                                            value={data.email_pic}
                                            onChange={(e) => setData('email_pic', e.target.value)}
                                            required
                                            className="bg-white border-gray-300"
                                            placeholder="email@example.com"
                                        />
                                        <InputError message={errors.email_pic} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="no_handphone_pic" className="text-gray-700">
                                            No. Handphone <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="no_handphone_pic"
                                            type="tel"
                                            value={data.no_handphone_pic}
                                            onChange={(e) => setData('no_handphone_pic', e.target.value)}
                                            required
                                            className="bg-white border-gray-300"
                                            placeholder="08xxxxxxxxxx"
                                        />
                                        <InputError message={errors.no_handphone_pic} />
                                    </div>
                                </div>
                            </div>

                            {/* Alamat */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Alamat</h3>
                                
                                <div className="grid gap-2">
                                    <Label htmlFor="alamat_jalan" className="text-gray-700">
                                        Alamat (Nama Jalan) <span className="text-red-500">*</span>
                                    </Label>
                                    <Textarea
                                        id="alamat_jalan"
                                        value={data.alamat_jalan}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('alamat_jalan', e.target.value)}
                                        required
                                        rows={2}
                                        className="bg-white border-gray-300"
                                        placeholder="Jalan, nomor, dan detail alamat"
                                    />
                                    <InputError message={errors.alamat_jalan} />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="rt" className="text-gray-700">
                                            RT <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="rt"
                                            type="text"
                                            value={data.rt}
                                            onChange={(e) => setData('rt', e.target.value)}
                                            required
                                            className="bg-white border-gray-300"
                                            placeholder="001"
                                        />
                                        <InputError message={errors.rt} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="rw" className="text-gray-700">
                                            RW <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="rw"
                                            type="text"
                                            value={data.rw}
                                            onChange={(e) => setData('rw', e.target.value)}
                                            required
                                            className="bg-white border-gray-300"
                                            placeholder="001"
                                        />
                                        <InputError message={errors.rw} />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="province_id" className="text-gray-700">
                                        Provinsi <span className="text-red-500">*</span>
                                    </Label>
                                    <select
                                        id="province_id"
                                        value={data.province_id}
                                        onChange={(e) => setData('province_id', e.target.value)}
                                        required
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                    >
                                        <option value="" className="text-gray-900">Pilih Provinsi</option>
                                        {provinces.map(province => (
                                            <option key={province.id} value={province.id} className="text-gray-900">{province.name}</option>
                                        ))}
                                    </select>
                                    <InputError message={errors.province_id} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="city_id" className="text-gray-700">
                                        Kabupaten/Kota <span className="text-red-500">*</span>
                                    </Label>
                                    <select
                                        id="city_id"
                                        value={data.city_id}
                                        onChange={(e) => setData('city_id', e.target.value)}
                                        required
                                        disabled={!data.province_id}
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <option value="" className="text-gray-900">Pilih Kabupaten/Kota</option>
                                        {cities.map(city => (
                                            <option key={city.id} value={city.id} className="text-gray-900">{city.name}</option>
                                        ))}
                                    </select>
                                    <InputError message={errors.city_id} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="district_id" className="text-gray-700">
                                        Kecamatan <span className="text-red-500">*</span>
                                    </Label>
                                    <select
                                        id="district_id"
                                        value={data.district_id}
                                        onChange={(e) => setData('district_id', e.target.value)}
                                        required
                                        disabled={!data.city_id}
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <option value="" className="text-gray-900">Pilih Kecamatan</option>
                                        {districts.map(district => (
                                            <option key={district.id} value={district.id} className="text-gray-900">{district.name}</option>
                                        ))}
                                    </select>
                                    <InputError message={errors.district_id} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="village_id" className="text-gray-700">
                                        Kelurahan <span className="text-red-500">*</span>
                                    </Label>
                                    <select
                                        id="village_id"
                                        value={data.village_id}
                                        onChange={(e) => setData('village_id', e.target.value)}
                                        required
                                        disabled={!data.district_id}
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <option value="" className="text-gray-900">Pilih Kelurahan</option>
                                        {villages.map(village => (
                                            <option key={village.id} value={village.id} className="text-gray-900">{village.name}</option>
                                        ))}
                                    </select>
                                    <InputError message={errors.village_id} />
                                </div>
                            </div>

                            {/* Dokumen */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Dokumen</h3>
                                
                                <div className="grid gap-2">
                                    <Label htmlFor="no_ktp" className="text-gray-700">
                                        No. KTP PIC <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="no_ktp"
                                        type="text"
                                        value={data.no_ktp}
                                        onChange={(e) => setData('no_ktp', e.target.value)}
                                        required
                                        maxLength={16}
                                        className="bg-white border-gray-300"
                                        placeholder="16 digit nomor KTP"
                                    />
                                    <InputError message={errors.no_ktp} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="foto_pic" className="text-gray-700">
                                        Foto PIC <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="flex items-center justify-center w-full">
                                        <label htmlFor="foto_pic" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                </svg>
                                                <p className="mb-1 text-sm text-gray-500"><span className="font-semibold">Klik untuk upload</span> atau drag & drop</p>
                                                <p className="text-xs text-gray-500">JPG atau PNG (MAX. 2MB)</p>
                                            </div>
                                            <input
                                                id="foto_pic"
                                                type="file"
                                                onChange={(e) => setData('foto_pic', e.target.files?.[0] || null)}
                                                required
                                                accept="image/*"
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                    {data.foto_pic && (
                                        <p className="text-sm text-green-600">✓ File dipilih: {data.foto_pic.name}</p>
                                    )}
                                    <InputError message={errors.foto_pic} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="file_ktp" className="text-gray-700">
                                        File Upload KTP PIC <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="flex items-center justify-center w-full">
                                        <label htmlFor="file_ktp" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                </svg>
                                                <p className="mb-1 text-sm text-gray-500"><span className="font-semibold">Klik untuk upload</span> atau drag & drop</p>
                                                <p className="text-xs text-gray-500">JPG, PNG atau PDF (MAX. 2MB)</p>
                                            </div>
                                            <input
                                                id="file_ktp"
                                                type="file"
                                                onChange={(e) => setData('file_ktp', e.target.files?.[0] || null)}
                                                required
                                                accept="image/*,application/pdf"
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                    {data.file_ktp && (
                                        <p className="text-sm text-green-600">✓ File dipilih: {data.file_ktp.name}</p>
                                    )}
                                    <InputError message={errors.file_ktp} />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Keamanan Akun</h3>
                                
                                <div className="grid gap-2">
                                    <Label htmlFor="password" className="text-gray-700">
                                        Password <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                        autoComplete="new-password"
                                        className="bg-white border-gray-300"
                                        placeholder="Minimal 8 karakter"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation" className="text-gray-700">
                                        Konfirmasi Password <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                        autoComplete="new-password"
                                        className="bg-white border-gray-300"
                                        placeholder="Ulangi password"
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 pt-4 border-t">
                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                    disabled={processing}
                                >
                                    {processing && <Spinner />}
                                    Daftar Sebagai Penjual
                                </Button>

                                <div className="text-center text-sm text-gray-600">
                                    Sudah punya akun?{' '}
                                    <TextLink href="/login" className="text-blue-600 hover:text-blue-700">
                                        Login di sini
                                    </TextLink>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
