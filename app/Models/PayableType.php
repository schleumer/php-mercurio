<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use App\Local\NgTableSupport;
use Illuminate\Database\Eloquent\SoftDeletes;

class PayableType extends Model
{
    use NgTableSupport, SoftDeletes;

    protected $table = 'payable_types';

    protected $fillable = [
        'name',
        'description'
    ];

    protected $hidden = [];

    protected $dates = ['deleted_at'];
}
