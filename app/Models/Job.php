<?php

namespace App\Models;

use App\Local\CompanyModel;
use App\Local\NgTableSupport;
use Illuminate\Database\Eloquent\SoftDeletes;

class Job extends CompanyModel
{
    use NgTableSupport, SoftDeletes;

    protected $table = 'jobs';

    protected $fillable = [
        'name',
        'price',
        'description',
        'company_id'
    ];

    protected $hidden = [];

    protected $dates = ['deleted_at'];

    public function jobOrders() {
        // TODO: ver por que é preciso declarar a tabela e por que não esta funcionando automaticamente
        return $this->belongsToMany(JobOrder::class, 'job_order_jobs');
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
