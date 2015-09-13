<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCustomersTable extends Migration
{

    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email')->nullable();


            // NÃÃÃÃÃÃÃÃÃÃÃÃÃÃÃÃÃÃÃÃÃÃO
            $table->string('cnpj')->nullable();
            $table->string('ie')->nullable();

            /**
             * O certo seria armazenar em linha1 e linha2
             * linha1 endereço, numero
             * linha2 complemento
             */
            $table->string('address')->nullable();
            $table->string('number')->nullable();

            $table->string('district')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('zip')->nullable();

            $table->string('contact')->nullable();

            $table->integer('company_id')
                ->unsigned()
                ->nullable()
                ->default(null);
            $table->foreign('company_id')
                ->references('id')
                ->on('companies');

            $table->timestamps();

            $table->softDeletes();
        });

        Schema::create('customer_phones', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('customer_id')->unsigned();
            $table->foreign('customer_id')
                ->references('id')->on('customers')
                ->onDelete('cascade');
            $table->string('phone');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('customer_phones');
        Schema::drop('customers');
    }
}