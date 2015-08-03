<?php

namespace App\Local;


class NgTableParcel extends ApiParcel
{

    public function __construct($total, $result)
    {
        parent::__construct(["total" => $total, "result" => $result]);
    }
}