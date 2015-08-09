<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use App\Local\NgTableSupport;
use Illuminate\Database\Eloquent\SoftDeletes;

class Job extends Model
{
    use NgTableSupport, SoftDeletes;

    protected $table = 'jobs';

    protected $fillable = [
        'name',
        'price',
        'description'
    ];

    protected $hidden = [];

    protected $dates = ['deleted_at'];
}
