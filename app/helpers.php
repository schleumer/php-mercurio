<?php

if(!function_exists('vasset')) {
    function vasset($asset) {
        if(!config('app.debug')) {
            $asset = preg_replace('/(.*?)\.(js|css)$/', '$1.min.$2', $asset);
        }
        return asset($asset);
    }
}