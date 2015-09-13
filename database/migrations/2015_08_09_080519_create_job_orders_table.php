<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJobOrdersTable extends Migration
{

    public function up()
    {
        Schema::create('job_orders', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('customer_id')->unsigned();
            $table->text('note')->nullable();
            $table->tinyInteger('status')
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


            $table->foreign('customer_id')->references('id')->on('customers');
        });

        Schema::create('job_order_jobs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('job_order_id')->unsigned();
            $table->integer('job_id')->unsigned();
            $table->decimal('price', 20, 2);

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('job_order_id')->references('id')->on('job_orders');
            $table->foreign('job_id')->references('id')->on('jobs');
        });

    }

    public function down()
    {
        Schema::drop('job_order_jobs');
        Schema::drop('job_orders');
    }
}