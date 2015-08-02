<?php

namespace App\Http\Controllers;

use App\Local\ApiError;
use App\Local\ApiParcel;
use App\Local\ApiParcelException;
use Auth;
use Illuminate\Contracts\Validation\UnauthorizedException;
use Illuminate\Http\Request;
use Mockery\CountValidator\Exception;

class AuthController extends Controller
{
    protected $context = "auth";

    public function postLogin(Request $request)
    {
        if (Auth::attempt($request->all())) {
            return Auth::user();
        } else {
            throw $this->generalException("Usuário ou senha inválidos");
        }
    }

    public function getLogin(Request $request) {
        return Auth::user();
    }
}