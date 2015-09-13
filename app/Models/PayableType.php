<?php

namespace App\Models;

use App\Local\CompanyModel;
use App\Local\NgTableSupport;
use Illuminate\Database\Eloquent\SoftDeletes;

class PayableType extends CompanyModel
{
    use NgTableSupport, SoftDeletes;

    protected $table = 'payable_types';

    protected $fillable = [
        'name',
        'description',
        'company_id'
    ];

    protected $hidden = [];

    protected $dates = ['deleted_at'];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
