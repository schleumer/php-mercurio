<?php

namespace App\Http\Middleware;

use App\Local\ApiParcel;
use App\Local\ApiParcelContent;
use Closure;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CoolResponse
{
    public function handle(Request $request, Closure $next)
    {
        /* @var \Illuminate\Http\Response $response */
        $response = $next($request);

        // TODO: DA PRA MELHORAR, WESLEY, PARA DE SER PREGUIÇOSO
        if ($response instanceof Response) {
            if($response->original instanceof Jsonable && !($response instanceof ApiParcel)) {
                return new ApiParcel($response->original);
            }
        } else if($response instanceof Jsonable || $response instanceof ApiParcelContent) {
            return new ApiParcel($response);
        }

        return $response;
    }
}