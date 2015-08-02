<?php

namespace App\Http\Controllers;

use App\Local\ApiError;
use App\Local\ApiParcelException;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;

abstract class Controller extends BaseController
{
    use ValidatesRequests;

    protected $context = "default";

    public function generalException($message, $level = ApiError::ERROR) {
        return new ApiParcelException($message, $this->context, $level);
    }
}
