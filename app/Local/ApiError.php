<?php

namespace App\Local;

class ApiError implements \JsonSerializable {
    const WARNING = 0;
    const ERROR = 1;
    const FATAL = 2;
    const NATURAL_DISASTER = 99;
    const APOCALYPSE = 666;
    const CTHULHU_SUMMONED = 999;
    const TORRENS_SUMMONED = 4251;

    private $field;
    private $message;
    private $level;

    public function __construct($field, $message, $level = self::WARNING) {
        $this->field = $field;
        $this->message = $message;
        $this->level = $level;
    }

    /**
     * @return mixed
     */
    public function getField()
    {
        return $this->field;
    }

    /**
     * @return mixed
     */
    public function getMessage()
    {
        return $this->message;
    }

    /**
     * @return int
     */
    public function getLevel()
    {
        return $this->level;
    }

    function jsonSerialize()
    {
        return [
            "field" => $this->field,
            "message" => $this->message,
            "level" => $this->level
        ];
    }
}