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
        $customer = Customer::throughCompany()->with('phones')->find($id);

        if(!$customer) {
            abort(404);
        }

        return new ApiParcel($customer);
    }

    public function update(Request $request, $id) {
        $this->validate($request, $this->rules);
        $data = $request->all();

        $customer = Customer::throughCompany()->find($id);

        if(!$customer) {
            abort(404);
        }

        $customer->update($data);

        Helpers::batchSync($customer->phones(), array_get($data, 'phones', []));

        return (new ApiParcel())->addMessage('general', 'Cliente alterado com sucesso!');
    }

    public function destroy(Request $request, $id) {
        $customer = Customer::throughCompany()->find($id);

        if(!$customer) {
            abort(404);
        }

        $customer->delete();

        return (new ApiParcel())->addMessage('general', 'Cliente removido com sucesso!');
    }

    public function index(Request $request) {
        return Customer::throughCompany()
            ->ngTable($request, null, ['id', 'name', 'cnpj'], ['name', 'id', 'created_at']);
    }
}