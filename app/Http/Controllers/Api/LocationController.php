<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravolt\Indonesia\Models\Province;
use Laravolt\Indonesia\Models\City;
use Laravolt\Indonesia\Models\District;
use Laravolt\Indonesia\Models\Village;

class LocationController extends Controller
{
    public function provinces()
    {
        $provinces = Province::orderBy('name')->get(['id', 'code', 'name']);
        return response()->json($provinces);
    }

    public function cities($provinceCode)
    {
        $cities = City::where('province_code', $provinceCode)
            ->orderBy('name')
            ->get(['id', 'code', 'name']);
        return response()->json($cities);
    }

    public function districts($cityCode)
    {
        $districts = District::where('city_code', $cityCode)
            ->orderBy('name')
            ->get(['id', 'code', 'name']);
        return response()->json($districts);
    }

    public function villages($districtCode)
    {
        $villages = Village::where('district_code', $districtCode)
            ->orderBy('name')
            ->get(['id', 'code', 'name']);
        return response()->json($villages);
    }
}
