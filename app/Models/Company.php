<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use App\Local\NgTableSupport;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use NgTableSupport, SoftDeletes;

    protected $table = 'companies';

    protected $fillable = [
        'name',
        'email',
        'cnpj',
        'ie',
        'address',
        'number',
        'district',
        'city',
        'state',
        'zip',
        'contact'
    ];

    protected $hidden = [];

    protected $dates = ['deleted_at'];
}
