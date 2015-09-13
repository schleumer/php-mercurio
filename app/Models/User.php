<?php

namespace App\Models;

use App\Local\CompanyModel;
use App\Local\NgTableSupport;
use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends CompanyModel implements AuthenticatableContract, CanResetPasswordContract
{
    use Authenticatable, CanResetPassword, NgTableSupport;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'company_id'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function retrieveById($identifier) {
        echo "LAMO";
        return $this->createModel()->newQuery()->with('company')->find($identifier);
    }

    public function retrieveByToken($identifier, $token) {
        echo "LAMO";
        // your code with join added here
    }

    public function retrieveByCredentials(array $credentials) {
        echo "LAMO";
        // your code with join added here
    }
}
