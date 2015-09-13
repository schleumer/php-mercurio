<?php

namespace App\Models;

use App\Local\CompanyModel;
use App\Local\NgTableSupport;
use Illuminate\Database\Eloquent\SoftDeletes;

class Receivable extends CompanyModel
{
    use NgTableSupport, SoftDeletes;

    const STATUS_OK = 1;
    const STATUS_PENDING = 2;

    protected $table = 'receivables';

    protected $fillable = [
        'note',
        'price',
        'customer_id',
        'status',
        'company_id'
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

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
