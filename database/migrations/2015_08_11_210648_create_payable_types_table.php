<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePayableTypesTable extends Migration
{

    public function up()
    {
        Schema::create('payable_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->text('description')
                ->nullable();

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

    }

    public function down()
    {
        Schema::drop('payable_types');
    }
}