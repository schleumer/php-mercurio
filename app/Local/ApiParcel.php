<?php

namespace App\Local;

use Illuminate\Http\JsonResponse;

class ApiParcel extends JsonResponse implements \JsonSerializable
{
    private $errors;
    private $messages;
    protected $parcel;

    public function __construct($parcel = null)
    {
        parent::__construct();
        $this->setParcel($parcel);
    }

    public function addMessage($code, $message)
    {
        $this->messages[] = new ApiMessage($code, $message);
        $this->update();
        return $this;
    }

    public function addError($code, $message, $level = 0)
    {
        $this->errors[] = new ApiError($code, $message, $level);
        $this->update();
        return $this;
    }

    public function addParcelException(ApiParcelException $ex)
    {
        return $this->addError($ex->getField(), $ex->getMessage(), $ex->getCode());
    }

    public function addGenericException(\Exception $ex)
    {
        return $this->addError("general", $ex->getMessage(), $ex->getCode());
    }

    public function setParcel($parcel = array())
    {
        $this->parcel = $parcel;
        return $this->update();
    }

    public function getParcel()
    {
        return $this->parcel;
    }

    protected function update() {
        $this->headers->set('Content-Type', 'text/javascript');
        $this->setStatusCode($this->errors ? 500 : 200);
        $this->setContent(json_encode($this));
        return $this;
    }

    function jsonSerialize()
    {
        return [
            "errors" => $this->errors,
            "messages" => $this->messages,
            "parcel" => $this->parcel
        ];
    }
}