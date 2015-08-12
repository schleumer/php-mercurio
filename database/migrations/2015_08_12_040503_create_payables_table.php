<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePayablesTable extends Migration
{

    public function up()
    {
        Schema::create('payables', function (Blueprint $table) {
            $table->increments('id');
//            $table->integer('customer_id')
//                ->unsigned();
//            $table->foreign('customer_id')
//                ->references('id')
//                ->on('customers');

            $table->integer('payable_type_id')
                ->unsigned()
                ->nullable();
            $table->foreign('payable_type_id')
                ->references('id')
                ->on('payable_types');

            $table->dateTime('date')
                ->nullable();
            $table->tinyInteger('status')
                ->nullable();
            $table->decimal('price', 20, 2);
            $table->text('description')
                ->nullable();

            $table->timestamps();
            $table->softDeletes();


        });

    }

    public function down()
    {
        Schema::drop('payables');
    }
}