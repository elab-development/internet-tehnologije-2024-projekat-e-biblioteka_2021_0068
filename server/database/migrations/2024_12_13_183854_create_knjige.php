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
        Schema::create('knjige', function (Blueprint $table) {
            $table->id();
            $table->string('nazivKnjige');
            $table->string('autor');
            $table->unsignedBigInteger('zanrId');
            $table->foreign('zanrId')->references('id')->on('zanrovi')->onDelete('cascade');
            $table->string('urlKnjige');
            $table->text('uvidKnjige');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('knjige');
    }
};
