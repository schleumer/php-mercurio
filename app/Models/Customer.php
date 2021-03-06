<?php

namespace App\Models;

use App\Local\CompanyModel;
use App\Local\NgTableSupport;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends CompanyModel
{
    use NgTableSupport, SoftDeletes;

    protected $table = 'customers';

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
        'contact',
        'company_id'
    ];

    protected $hidden = [];

    protected $dates = ['deleted_at'];

    public function phones() {
        return $this->hasMany(CustomerPhone::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
