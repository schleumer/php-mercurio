<?php

namespace App\Http\Middleware;

use App\Local\ApiParcel;
use Closure;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Http\Request;

class CoolResponse
{
    public function handle(Request $request, Closure $next)
    {
        /* @var \Illuminate\Http\Response $response */
        $response = $next($request);

        // TODO: DA PRA MELHORAR, WESLEY, PARA DE SER PREGUIÇOSO
        if($response->original instanceof Jsonable && !($response instanceof ApiParcel)) {
            return new ApiParcel($response->original);
        } else if($response instanceof Jsonable) {
            return new ApiParcel($response);
        }

        return $response;
    }
}