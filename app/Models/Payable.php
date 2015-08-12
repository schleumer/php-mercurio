<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use App\Local\NgTableSupport;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payable extends Model
{
    use NgTableSupport, SoftDeletes;

    const STATUS_OK = 1;
    const STATUS_PENDING = 2;

    protected $table = 'payables';

    protected $fillable = [
        'name',
        'price',
        'date',
        'payable_type_id',
        'status',
        'description'
    ];

    protected $hidden = [];

    protected $dates = ['deleted_at'];

    public function payableType() {
        return $this->belongsTo(PayableType::class);
    }

}
