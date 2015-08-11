<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use App\Local\NgTableSupport;
use Illuminate\Database\Eloquent\SoftDeletes;

class JobOrder extends Model
{
    use NgTableSupport, SoftDeletes;

    protected $table = 'job_orders';

    protected $fillable = [
        'note',
        'customer_id'
    ];

    protected $hidden = [];

    protected $dates = ['deleted_at'];

    public function customer() {
        return $this->belongsTo(Customer::class);
    }

    public function jobs() {
        // TODO: ver por que � preciso declarar a tabela e por que n�o esta funcionando automaticamente
        return $this->belongsToMany(Job::class, 'job_order_jobs');
    }
}