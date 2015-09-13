<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReceivablesTable extends Migration
{
    public function up()
    {
        Schema::create('receivables', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('customer_id')->unsigned();
            $table->decimal('price', 20, 2)->nullable();
            $table->dateTime('paid_at')->nullable();
            $table->text('note')->nullable();

            $table->integer('company_id')
                ->unsigned()
                ->nullable()
                ->default(null);
            $table->foreign('company_id')
                ->references('id')
                ->on('companies');

            $table->tinyInteger('status')
                ->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('customer_id')->references('id')->on('customers');
        });

        Schema::create('receivable_installments', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('receivable_id')->unsigned();
            $table->decimal('price', 20, 2);
            $table->tinyInteger('status')
                ->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('receivable_id')->references('id')->on('receivables');
        });

    }

    public function down()
    {
        Schema::drop('receivable_installments');
        Schema::drop('receivables');
    }
}
