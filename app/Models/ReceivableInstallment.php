<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use App\Local\NgTableSupport;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReceivableInstallment extends Model
{
    use NgTableSupport, SoftDeletes;

    const STATUS_OK = 1;
    const STATUS_PENDING = 2;

    protected $table = 'receivable_installments';

    protected $fillable = [
        'receivable_id',
        'price',
        'status'
    ];

    protected $hidden = [];

    protected $dates = ['deleted_at'];

    public function receivable() {
        return $this->belongsTo(Receivable::class);
    }
}
