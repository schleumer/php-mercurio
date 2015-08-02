<!DOCTYPE html>
<html>
<head>
    <title>{{ config('app.name') }}</title>

    <meta charset="utf-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="description" content="">
    <meta name="author" content="">

    {{-- pra evitar flickering --}}
    <style>
        html {
            display: none;
        }

        #anti-flickering-loading {
            display: block;
            position: absolute;
            font-family: sans-serif;
            font-size: 40px;
            width: 200px;
            height: 200px;
            left: 50%;
            top: 50%;
            margin-left: -100px;
            margin-top: -100px;
        }

        .spinner {
            width: 40px;
            height: 40px;
            margin-top: -20px;
            margin-left: -20px;
            left: 50%;
            top: 50%;
            position: relative;
            text-align: center;

            -webkit-animation: sk-rotate 2.0s infinite linear;
            animation: sk-rotate 2.0s infinite linear;
        }

        .dot1, .dot2 {
            width: 60%;
            height: 60%;
            display: inline-block;
            position: absolute;
            top: 0;
            background-color: #333;
            border-radius: 100%;

            -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
            animation: sk-bounce 2.0s infinite ease-in-out;
        }

        .dot2 {
            top: auto;
            bottom: 0;
            -webkit-animation-delay: -1.0s;
            animation-delay: -1.0s;
        }

        @-webkit-keyframes sk-rotate { 100% { -webkit-transform: rotate(360deg) }}
        @keyframes sk-rotate { 100% { transform: rotate(360deg); -webkit-transform: rotate(360deg) }}

        @-webkit-keyframes sk-bounce {
            0%, 100% { -webkit-transform: scale(0.0) }
            50% { -webkit-transform: scale(1.0) }
        }

        @keyframes sk-bounce {
            0%, 100% {
                transform: scale(0.0);
                -webkit-transform: scale(0.0);
            } 50% {
                  transform: scale(1.0);
                  -webkit-transform: scale(1.0);
              }
        }

        #app {
            display: none;
        }
    </style>
</head>
<body>
<div ng-app="Horae">
    <div id="anti-flickering-loading">
        {{-- trans('home.loading') --}}
        <div class="spinner">
            <div class="dot1"></div>
            <div class="dot2"></div>
        </div>
    </div>

    {{-- gambiarra para eye candy --}}
    <app-loading></app-loading>

    <div class="container" id="app" ng-class="appLoadingClass">
        <div class="ui-blocker"></div>
        <div class="essa-div-nao-e-uma-gambiarra" ng-show="!isUserPresent()"></div>
        <nav class="navbar navbar-inverse" id="app-navbar" ng-class="getAppBarNavClass()">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-4" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">
                        <img src="images/logo.png" />
                        <span class="pull-left">{{ config('app.short_name') }}</span>
                    </a>
                </div>
                <div class="collapse navbar-collapse pull-right" id="bs-example-navbar-collapse-4">
                    <p class="navbar-text" ng-bind="user.name"></p>
                 </div>
            </div>
        </nav>
        <div class="container-fluid" id="app-container-holder">
            <div id="app-left-nav" ng-class="getLeftNavClass()">
                <app-left-nav></app-left-nav>
            </div>
            <div id="app-container" ng-class="getContainerClass()">
                <div ng-view></div>
            </div>
        </div>
    </div>
</div>

<!-- -->
<script type="text/javascript" src="{{ asset("js/vendor.js") }}"></script>
<script type="text/javascript" src="{{ asset("js/app.js") }}"></script>
<link rel="stylesheet" href="{{ asset("css/app.css") }}">
</body>
</html>