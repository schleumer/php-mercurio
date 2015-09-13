<?php

namespace App\Models;

use App\Local\CompanyModel;
use App\Local\NgTableSupport;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payable extends CompanyModel
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
        'description',
        'company_id'
    ];

    protected $hidden = [];

    protected $dates = ['deleted_at'];

    public function payableType() {
        return $this->belongsTo(PayableType::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
