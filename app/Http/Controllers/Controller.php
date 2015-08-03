<?php

namespace App\Http\Controllers;

use App\Local\ApiError;
use App\Local\ApiParcel;
use App\Local\ApiParcelException;
use Illuminate\Http\Exception\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Symfony\Component\HttpKernel\Exception\HttpException;

abstract class Controller extends BaseController
{
    use ValidatesRequests;

    protected $context = "default";

    public function generalException($message, $level = ApiError::ERROR) {
        return new ApiParcelException($message, $this->context, $level);
    }

    public function validate(Request $request, array $rules, array $messages = [], array $customAttributes = [])
    {
        $validator = $this->getValidationFactory()->make($request->all(), $rules, $messages, $customAttributes);

        if ($validator->fails()) {
            $parcel = new ApiParcel();
            foreach($validator->getMessageBag()->toArray() as $field => $messages) {
                foreach($messages as $message) {
                    $parcel->addError("{$this->context}.{$field}", $message);
                }
            }
            throw new HttpResponseException($parcel);
        }
    }
}
