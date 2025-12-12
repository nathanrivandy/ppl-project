import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Spinner } from '@/components/ui/spinner';
import { Stepper } from '@/components/ui/stepper';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

interface Location {
    id: string | number;
    code: string;
    name: string;
}

export default function RegisterSeller() {
    const [currentStep, setCurrentStep] = useState(1);
    const [provinces, setProvinces] = useState<Location[]>([]);
    const [cities, setCities] = useState<Location[]>([]);
    const [districts, setDistricts] = useState<Location[]>([]);
    const [villages, setVillages] = useState<Location[]>([]);

    const steps = [
        { id: 1, title: 'Data Toko', description: 'Informasi toko' },
        { id: 2, title: 'Data PIC', description: 'Penanggung jawab' },
        { id: 3, title: 'Alamat', description: 'Lokasi toko' },
        { id: 4, title: 'Dokumen', description: 'Upload & Keamanan' },
    ];

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

    const nextStep = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const validateStep = (step: number): boolean => {
        switch (step) {
            case 1:
                return !!(data.nama_toko && data.deskripsi_singkat);
            case 2:
                return !!(data.nama_pic && data.email_pic && data.no_handphone_pic);
            case 3:
                return !!(
                    data.alamat_jalan &&
                    data.rt &&
                    data.rw &&
                    data.province_id &&
                    data.city_id &&
                    data.district_id &&
                    data.village_id
                );
            case 4:
                return !!(
                    data.no_ktp &&
                    data.foto_pic &&
                    data.file_ktp &&
                    data.password &&
                    data.password_confirmation
                );
            default:
                return false;
        }
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            nextStep();
        }
    };

    return (
        <>
            <Head title="Registrasi Penjual" />
            
            <style>{`
                @keyframes float_0 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-30px) translateX(10px); } }
                @keyframes float_1 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-40px) translateX(-15px); } }
                @keyframes float_2 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-35px) translateX(20px); } }
                @keyframes float_3 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-45px) translateX(-10px); } }
                @keyframes float_4 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-25px) translateX(15px); } }
                @keyframes float_5 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-38px) translateX(-20px); } }
                @keyframes float_6 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-32px) translateX(12px); } }
                @keyframes float_7 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-42px) translateX(-8px); } }
                @keyframes float_8 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-28px) translateX(18px); } }
                @keyframes float_9 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-36px) translateX(-12px); } }
                
                /* Dropdown styling */
                select {
                    accent-color: rgb(37, 99, 235);
                    cursor: pointer;
                }
                
                select option {
                    background: white;
                    color: rgb(17, 24, 39);
                    padding: 10px 8px;
                    margin: 4px 0;
                    border-radius: 4px;
                    line-height: 1.5;
                    font-size: 14px;
                }
                
                select option:hover {
                    background-color: rgb(219, 234, 254);
                    color: rgb(37, 99, 235);
                    box-shadow: inset 0 0 0 2px rgb(147, 197, 253);
                }
                
                select option:checked {
                    background: linear-gradient(rgb(37, 99, 235), rgb(37, 99, 235));
                    background-color: rgb(37, 99, 235) !important;
                    color: white !important;
                    font-weight: 500;
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
                }
                
                select:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    background-color: rgb(243, 244, 246);
                }
                
                .bubble {
                    background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2));
                    box-shadow: 
                        0 8px 32px 0 rgba(31, 38, 135, 0.37),
                        inset -1px -1px 3px 0 rgba(0, 0, 0, 0.2),
                        inset 1px 1px 3px 0 rgba(255, 255, 255, 0.5);
                }
            `}</style>
            
            <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 py-12 relative overflow-hidden">
                {/* Decorative blur shapes */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
                
                {/* Floating bubbles */}
                <div className="absolute top-10 left-16 w-8 h-8 rounded-full bubble" style={{ animation: 'float_0 4s ease-in-out infinite' }}></div>
                <div className="absolute top-32 right-24 w-6 h-6 rounded-full bubble" style={{ animation: 'float_1 5s ease-in-out infinite 0.5s' }}></div>
                <div className="absolute top-1/4 left-1/3 w-5 h-5 rounded-full bubble" style={{ animation: 'float_2 6s ease-in-out infinite 1s' }}></div>
                <div className="absolute top-1/3 right-20 w-7 h-7 rounded-full bubble" style={{ animation: 'float_3 5.5s ease-in-out infinite 0.2s' }}></div>
                <div className="absolute bottom-40 left-1/4 w-6 h-6 rounded-full bubble" style={{ animation: 'float_4 4.5s ease-in-out infinite 0.8s' }}></div>
                <div className="absolute bottom-20 right-1/4 w-7 h-7 rounded-full bubble" style={{ animation: 'float_5 5.5s ease-in-out infinite 0.3s' }}></div>
                <div className="absolute bottom-32 left-20 w-5 h-5 rounded-full bubble" style={{ animation: 'float_6 6s ease-in-out infinite 1.2s' }}></div>
                <div className="absolute top-2/3 right-1/3 w-6 h-6 rounded-full bubble" style={{ animation: 'float_7 4.8s ease-in-out infinite 0.6s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bubble" style={{ animation: 'float_8 5.2s ease-in-out infinite 0.9s' }}></div>
                <div className="absolute bottom-10 right-32 w-5 h-5 rounded-full bubble" style={{ animation: 'float_9 5.8s ease-in-out infinite 0.4s' }}></div>
                
                <div className="container mx-auto px-4 max-w-4xl relative z-10">
                    {/* Logo */}
                    <div className="mb-6 flex justify-center">
                        <Link href="/">
                            <div className="bg-white rounded-lg px-3 py-2 shadow-lg hover:shadow-xl transition-all duration-200">
                                <img src="/LogoAKD.png" alt="AKD Market" className="h-10 w-auto" />
                            </div>
                        </Link>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-lg border border-white/20 p-8">
                        {/* Stepper */}
                        <div className="mb-12 flex justify-center">
                            <Stepper steps={steps} currentStep={currentStep} />
                        </div>

                        <form onSubmit={submit} className="flex flex-col gap-6">
                            {/* Step 1: Data Toko */}
                            {currentStep === 1 && (
                                <div className="space-y-4 animate-in fade-in duration-300">
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
                                            rows={4}
                                            className="bg-white border-gray-300"
                                            placeholder="Deskripsikan toko Anda secara singkat"
                                        />
                                        <InputError message={errors.deskripsi_singkat} />
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Data PIC */}
                            {currentStep === 2 && (
                                <div className="space-y-4 animate-in fade-in duration-300">
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
                            )}

                            {/* Step 3: Alamat */}
                            {currentStep === 3 && (
                                <div className="space-y-4 animate-in fade-in duration-300">
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
                                        <Select
                                            value={data.province_id}
                                            onValueChange={(value) => setData('province_id', value)}
                                            required
                                        >
                                            <SelectTrigger className="bg-white text-gray-900 border border-gray-300 focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-gray-300 hover:border-gray-400 transition-colors rounded-md h-10 px-3 py-2 text-sm">
                                                <SelectValue placeholder="Pilih Provinsi" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border border-gray-200">
                                                {provinces.map((province) => (
                                                    <SelectItem
                                                        key={province.id}
                                                        value={province.id.toString()}
                                                        className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 hover:text-gray-900 focus:text-gray-900"
                                                    >
                                                        {province.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.province_id} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="city_id" className="text-gray-700">
                                            Kabupaten/Kota <span className="text-red-500">*</span>
                                        </Label>
                                        <Select
                                            value={data.city_id}
                                            onValueChange={(value) => setData('city_id', value)}
                                            required
                                            disabled={!data.province_id}
                                        >
                                            <SelectTrigger className="bg-white text-gray-900 border border-gray-300 focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-gray-300 hover:border-gray-400 transition-colors rounded-md h-10 px-3 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                                                <SelectValue placeholder="Pilih Kabupaten/Kota" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border border-gray-200">
                                                {cities.map((city) => (
                                                    <SelectItem
                                                        key={city.id}
                                                        value={city.id.toString()}
                                                        className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 hover:text-gray-900 focus:text-gray-900"
                                                    >
                                                        {city.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.city_id} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="district_id" className="text-gray-700">
                                            Kecamatan <span className="text-red-500">*</span>
                                        </Label>
                                        <Select
                                            value={data.district_id}
                                            onValueChange={(value) => setData('district_id', value)}
                                            required
                                            disabled={!data.city_id}
                                        >
                                            <SelectTrigger className="bg-white text-gray-900 border border-gray-300 focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-gray-300 hover:border-gray-400 transition-colors rounded-md h-10 px-3 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                                                <SelectValue placeholder="Pilih Kecamatan" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border border-gray-200">
                                                {districts.map((district) => (
                                                    <SelectItem
                                                        key={district.id}
                                                        value={district.id.toString()}
                                                        className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 hover:text-gray-900 focus:text-gray-900"
                                                    >
                                                        {district.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.district_id} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="village_id" className="text-gray-700">
                                            Kelurahan <span className="text-red-500">*</span>
                                        </Label>
                                        <Select
                                            value={data.village_id}
                                            onValueChange={(value) => setData('village_id', value)}
                                            required
                                            disabled={!data.district_id}
                                        >
                                            <SelectTrigger className="bg-white text-gray-900 border border-gray-300 focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-gray-300 hover:border-gray-400 transition-colors rounded-md h-10 px-3 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                                                <SelectValue placeholder="Pilih Kelurahan" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border border-gray-200">
                                                {villages.map((village) => (
                                                    <SelectItem
                                                        key={village.id}
                                                        value={village.id.toString()}
                                                        className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 hover:text-gray-900 focus:text-gray-900"
                                                    >
                                                        {village.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.village_id} />
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Dokumen & Keamanan */}
                            {currentStep === 4 && (
                                <div className="space-y-4 animate-in fade-in duration-300">
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
                                                    <p className="mb-1 text-sm text-gray-500"><span className="font-semibold">Klik untuk upload</span></p>
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
                                            <p className="text-sm text-green-600">✓ {data.foto_pic.name}</p>
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
                                                    <p className="mb-1 text-sm text-gray-500"><span className="font-semibold">Klik untuk upload</span></p>
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
                                            <p className="text-sm text-green-600">✓ {data.file_ktp.name}</p>
                                        )}
                                        <InputError message={errors.file_ktp} />
                                    </div>

                                    <div className="pt-4 border-t">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Keamanan Akun</h4>
                                        
                                        <div className="grid gap-2 mb-4">
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
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between items-center pt-6">
                                {currentStep > 1 ? (
                                    <Button
                                        type="button"
                                        onClick={prevStep}
                                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        Sebelumnya
                                    </Button>
                                ) : (
                                    <div></div>
                                )}

                                {currentStep < steps.length ? (
                                    <Button
                                        type="button"
                                        onClick={handleNext}
                                        disabled={!validateStep(currentStep)}
                                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 hover:scale-105"
                                    >
                                        Selanjutnya
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        disabled={processing || !validateStep(currentStep)}
                                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white transition-all duration-200 hover:scale-105"
                                    >
                                        {processing && <Spinner />}
                                        Daftar Sekarang
                                    </Button>
                                )}
                            </div>

                            {/* Login Link */}
                            <div className="text-center text-sm text-gray-600 pt-4">
                                Sudah punya akun?{' '}
                                <TextLink href="/login" className="text-blue-600 hover:text-blue-700">
                                    Login di sini
                                </TextLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
