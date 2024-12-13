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
        Schema::create('user_knjige', function (Blueprint $table) {
            $table->id();
            //'userId', 'knjigaId', 'vreme'
            $table->unsignedBigInteger('userId');
            $table->foreign('userId')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('knjigaId');
            $table->foreign('knjigaId')->references('id')->on('knjige')->onDelete('cascade');
            $table->dateTime('vreme');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_knjige');
    }
};
