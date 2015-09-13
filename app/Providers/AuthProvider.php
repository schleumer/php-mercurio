<?php

namespace App\Providers;

use App\Models\User;
use App\Local\LocalEloquentUserProvider;
use Illuminate\Contracts\Hashing\Hasher;
use Illuminate\Hashing\BcryptHasher;
use Illuminate\Support\ServiceProvider;

class AuthProvider extends ServiceProvider
{

    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app['auth']->extend('eloquent', function () {
            return new LocalEloquentUserProvider(new BcryptHasher(), $this->app['config']['auth.model']);
        });
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

}