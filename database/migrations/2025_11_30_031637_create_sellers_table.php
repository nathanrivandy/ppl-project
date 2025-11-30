<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sellers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Data Toko
            $table->string('nama_toko');
            $table->text('deskripsi_singkat');
            
            // Data PIC
            $table->string('nama_pic');
            $table->string('no_handphone_pic', 20);
            $table->string('email_pic');
            
            // Alamat
            $table->text('alamat_jalan');
            $table->string('rt', 10);
            $table->string('rw', 10);
            $table->string('kelurahan');
            $table->string('kabupaten_kota');
            $table->string('propinsi');
            
            // Dokumen
            $table->string('no_ktp', 20)->unique();
            $table->string('foto_pic')->nullable();
            $table->string('file_ktp')->nullable();
            
            // Status Verifikasi
            $table->enum('status_verifikasi', ['pending', 'approved', 'rejected'])->default('pending');
            $table->text('alasan_penolakan')->nullable();
            $table->timestamp('tanggal_verifikasi')->nullable();
            $table->foreignId('verified_by')->nullable()->constrained('users')->onDelete('set null');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sellers');
    }
};
