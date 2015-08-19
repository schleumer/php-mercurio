<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use App\Local\NgTableSupport;
use Illuminate\Database\Eloquent\SoftDeletes;

class Receivable extends Model
{
    use NgTableSupport, SoftDeletes;

    const STATUS_OK = 1;
    const STATUS_PENDING = 2;

    protected $table = 'receivables';

    protected $fillable = [
        'note',
        'price',
        'customer_id',
        'status'
    ];

    protected $hidden = [];

    protected $dates = ['deleted_at'];

    public function customer() {
        return $this->belongsTo(Customer::class);
    }

    public function installments() {
        // TODO: ver por que é preciso declarar a tabela e por que não esta funcionando automaticamente
        return $this->hasMany(ReceivableInstallment::class);
    }
}
