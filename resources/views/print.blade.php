<!DOCTYPE html>
<html>
<head>
    <title>{{ config('app.name') }}</title>

    <meta charset="utf-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="description" content="">
    <meta name="author" content="">
</head>
<body>
<div>
    <div id="device-message" class="container">
        <div class="row">
            <div class="alert alert-info">
                {{ trans('A versão para mobiles ainda não está disponível') }}
            </div>
        </div>
    </div>

    <div class="{{ isset($size) && $size == "full" ? "container-fluid" : "container" }}" id="app-container-holder">
        <div class="col-xs-12">
            @yield('content')
        </div>
    </div>
</div>

<link rel="stylesheet" href="{{ asset("css/app.css") }}">
</body>
</html>