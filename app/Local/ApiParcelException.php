<?php

namespace App\Local;

class ApiParcelException extends \Exception {
    private $field;

    public function __construct($message, $field = "global", $code = ApiError::ERROR) {
        $this->message = $message;
        $this->field = $field;
        $this->code = $code;
    }

    public function getField()
    {
        return $this->field;
    }
}