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
        //update users
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('gradId')->after('id');
            $table->foreign('gradId')->references('id')->on('gradovi')->onDelete('cascade');
            $table->string('uloga')->after('email');
            $table->string('brojTelefona')->after('uloga');
            $table->string('adresa')->after('gradId');

        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('gradId');
            $table->dropColumn('uloga');
            $table->dropColumn('brojTelefona');
            $table->dropColumn('adresa');
        });
    }
};
