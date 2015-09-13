<?php

namespace App\Local;


use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Builder;

class CompanyModel extends Model {
    public static function boot() {
        parent::boot();
        
        static::creating(function ($self) {
            if(\Auth::check()) {
                $self->company_id = \Auth::user()->company_id;
            }
        });
    }

    public function scopeThroughCompany($query) {
        if(\Auth::check()) {
            $currentUser = \Auth::user();
            if($currentUser->company_id)
                return $query->where("{$this->table}.company_id", '=', $currentUser->company_id);
        }
        return $query;
    }
}