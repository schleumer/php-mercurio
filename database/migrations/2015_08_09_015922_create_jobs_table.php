<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJobsTable extends Migration
{

    public function up()
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('price', 20, 2)->nullable();

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
        Schema::drop('jobs');
    }
}