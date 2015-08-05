<?php

namespace App\Http\Controllers;

use App\Local\ApiParcel;
use App\Models\Customer;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\Local\Helpers;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;

class CustomersController extends Controller
{
    protected $context = "customer";

    private $rules =  [
        'name' => 'required',
        'email' => 'required|email',
    ];

    public function store(Request $request)
    {
        $this->validate($request, $this->rules);

        $data = $request->all();

        $customer = Customer::create($data);
        $customer->phones()->createMany($data['phones']);


        return (new ApiParcel())->addMessage('general', 'Cliente adicionado com sucesso!');
    }

    public function show(Request $request, $id){
        return (new ApiParcel(Customer::with('phones')->find($id)));
    }

    public function index(Request $request) {
        return Customer::ngTable($request);
    }

    public function update(Request $request, $id) {
        $this->validate($request, $this->rules);
        $data = $request->all();
        $customer = Customer::find($id);
        $customer->update($data);

        Helpers::batchSync($customer->phones(), array_get($data, 'phones', []));

        return (new ApiParcel())->addMessage('general', 'Cliente alterado com sucesso!');


    }
}