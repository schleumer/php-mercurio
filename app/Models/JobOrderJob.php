<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use App\Local\NgTableSupport;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * What a name
 */
class JobOrderJob extends Model
{
    use NgTableSupport, SoftDeletes;

    protected $table = 'job_order_orders';

    protected $fillable = [
        'price',
        'job_id',
        'job_order_id'
    ];

    protected $hidden = [];

    protected $dates = ['deleted_at'];

    public function job() {
        return $this->belongsTo(Job::class);
    }

    public function jobOrder() {
        return $this->belongsTo(JobOrder::class);
    }
}
