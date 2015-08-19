<?php

namespace App\Http\Controllers;

use App\Local\ApiParcel;
use App\Models\Customer;
use App\Models\Job;
use App\Models\JobOrder;
use App\Models\Receivable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\Local\Helpers;
use Mockery\CountValidator\Exception;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;

class ReceivablesController extends Controller
{
    protected $context = "receivable";

    private $rules = [
        'customer' => 'required|array',
        'price' => 'required'
    ];

    public function store(Request $request)
    {
        $this->validate($request, $this->rules);
        $data = $request->all();

        /* @var Receivable $receivable */
        $data['customer_id'] = $data['customer']['id'];

        $receivable = Receivable::create($data);

        $customer = Customer::find($data['customer']['id']);

        $receivable->customer()->associate($customer);

        $receivable->save();

//        $jobs = array_map(function ($item) {
//            return [
//                'job_id' => $item['id'],
//                'price' => $item['price']
//            ];
//        }, array_get($data, 'jobs', []));
//
//        $receivable->jobs()->sync($jobs);
//
//        $receivable->save();


        return (new ApiParcel($receivable))->addMessage('general', 'Conta a pagar adicionada com sucesso!');
    }

    public function show(Request $request, $id)
    {
        return (new ApiParcel(Receivable::with(['customer'])->find($id)));
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, $this->rules);
        $data = $request->all();

        /* @var Receivable $receivable */
        $receivable = Receivable::find($id);
        $receivable->update($data);

        $customer = Customer::find($data['customer']['id']);

        $receivable->customer()->associate($customer);

        $receivable->save();

        return (new ApiParcel())->addMessage('general', 'Conta a pagar alterado com sucesso!');
    }

    public function destroy(Request $request, $id)
    {
        Receivable::find($id)->delete();
        return (new ApiParcel())->addMessage('general', 'Conta a pagar removido com sucesso!');
    }

    public function index(Request $request)
    {
        return Receivable::ngTable($request, function ($query, $params) {
            return $query
                ->leftJoin('customers', 'customers.id', '=', 'receivables.customer_id')
                ->orderBy('receivables.status', 'asc')
                ->select('receivables.*', 'customers.name as customer_name');
        }, ['receivables.id', 'customers.name'],
            ['receivables.id', 'customers.name', 'receivables.created_at']);
    }

    public function getPrint(Request $request, $id) {
        return view('jobOrders/print', ['jobOrder' =>
            JobOrder::with(['jobs', 'customer'])->find($id)
        ]);
    }

    public function postSetStatus(Request $request, $id) {
        /** @var Receivable $receivable */
        $receivable = Receivable::find($id);
        $receivable->status = $request->input('status') ?: Receivable::STATUS_PENDING;
        $receivable->save();

        return $receivable;
    }
}