<?php


namespace App\Local;

use JsonSerializable;

class ApiMessage implements JsonSerializable
{
    private $message;
    private $code;

    public function __construct($code, $message)
    {
        $this->code = $code;
        $this->message = $message;
    }

    /**
     * @return mixed
     */
    public function getCode()
    {
        return $this->code;
    }

    /**
     * @return mixed
     */
    public function getMessage()
    {
        return $this->message;
    }

    function jsonSerialize()
    {
        return [
            "code" => $this->code,
            "message" => $this->message
        ];
    }
}