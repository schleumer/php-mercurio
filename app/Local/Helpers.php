<?php

namespace App\Local;


class Helpers {
    public static function batchSync($model, array $data) {

        print_r($data);

        $idsToCheck = array_filter(array_map(function($item) {
            return array_get($item, 'id', null);
        }, $data), function($item) {
            return $item;
        });

        $model->select()->whereNotIn('id', $idsToCheck)->delete();

        foreach($data as $item) {
            if(array_get($item, 'id', null)) {
                $model->update(['id' => $item['id']], $item);
            } else {
                $model->create($item);
            }
        }
    }
}