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
        Schema::table('reviews', function (Blueprint $table) {
            // Drop unique constraint
            $table->dropUnique(['product_id', 'user_id']);
            
            // Make user_id nullable for guest reviews
            $table->foreignId('user_id')->nullable()->change();
            
            // Add guest reviewer fields
            $table->string('guest_name')->nullable()->after('user_id');
            $table->string('guest_phone')->nullable()->after('guest_name');
            $table->string('guest_email')->nullable()->after('guest_phone');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reviews', function (Blueprint $table) {
            $table->dropColumn(['guest_name', 'guest_phone', 'guest_email']);
            $table->foreignId('user_id')->nullable(false)->change();
            $table->unique(['product_id', 'user_id']);
        });
    }
};
