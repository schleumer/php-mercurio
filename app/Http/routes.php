<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('app');
});

Route::post('auth/login', 'AuthController@postLogin');
Route::get('auth/login', 'AuthController@getLogin');
Route::delete('auth/login', 'AuthController@deleteLogin');
Route::get('job-orders/print/{id}', 'JobOrdersController@getPrint');
Route::get('reports/customers', 'ReportsController@getCustomers');

Route::post('payables/set-status/{id}', 'PayablesController@postSetStatus');

Route::resource('users', 'UsersController');
Route::resource('customers', 'CustomersController');
Route::resource('jobs', 'JobsController');
Route::resource('job-orders', 'JobOrdersController');
Route::resource('payable-types', 'PayableTypesController');
Route::resource('payables', 'PayablesController');