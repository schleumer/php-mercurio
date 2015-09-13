<?php

namespace App\Local;

use Illuminate\Auth\EloquentUserProvider;
use Illuminate\Support\Str;

class LocalEloquentUserProvider extends EloquentUserProvider
{
    public function retrieveById($identifier)
    {
        return $this->createModel()->newQuery()->with('company')->find($identifier);
    }

    public function retrieveByCredentials(array $credentials)
    {
        $query = $this->createModel()->newQuery()->with('company');
        foreach ($credentials as $key => $value) {
            if (!Str::contains($key, 'password')) {
                $query->where($key, $value);
            }
        }
        return $query->first();
    }
}