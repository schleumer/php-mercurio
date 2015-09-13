<?php

namespace App\Models;

use App\Local\CompanyModel;
use App\Local\NgTableSupport;
use Illuminate\Database\Eloquent\SoftDeletes;

class JobOrder extends CompanyModel
{
    use NgTableSupport, SoftDeletes;

    const STATUS_OK = 1;
    const STATUS_PENDING = 2;


    protected $table = 'job_orders';

    protected $fillable = [
        'note',
        'customer_id',
        'company_id'
    ];

    protected $hidden = [];

    protected $dates = ['deleted_at'];

    public function customer() {
        return $this->belongsTo(Customer::class);
    }

    public function jobs() {
        // TODO: ver por que é preciso declarar a tabela e por que não esta funcionando automaticamente
        return $this->belongsToMany(Job::class, 'job_order_jobs')->withPivot('price');
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
