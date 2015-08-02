<?php

namespace App\Exceptions;

use App\Local\ApiParcel;
use App\Local\ApiParcelException;
use Exception;
use Illuminate\Contracts\Validation\ValidationException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        HttpException::class,
    ];


    public function report(Exception $e)
    {
        return parent::report($e);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $e
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e)
    {
        if($request->isJson()) {
            if ($e instanceof ApiParcelException) {
                return (new ApiParcel())->addParcelException($e);
            } else {
                return (new ApiParcel())->addGenericException($e);
            }
        } else {
            return parent::render($request, $e);
        }
    }
}
