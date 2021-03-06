<?php

namespace App\Http\Controllers;

use App\Local\ApiParcel;
use App\Models\Customer;
use App\Models\Job;
use App\Models\JobOrder;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\Local\Helpers;
use Mockery\CountValidator\Exception;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;

class JobOrdersController extends Controller
{
    protected $context = "job_order";

    private $rules = [
        'customer' => 'required|array',
        'jobs' => 'required|array'
    ];

    public function store(Request $request)
    {
        $this->validate($request, $this->rules);
        $data = $request->all();

        /* @var JobOrder $jobOrder */
        $data['customer_id'] = $data['customer']['id'];
        $jobOrder = JobOrder::create($data);

        $customer = Customer::throughCompany()->find($data['customer']['id']);

        if ($customer) {
            $jobOrder->customer()->associate($customer);
        }

        $jobOrder->save();

        $jobs = array_map(function ($item) {
            return [
                'job_id' => $item['id'],
                'price' => $item['price']
            ];
        }, array_get($data, 'jobs', []));

        $jobOrder->jobs()->sync($jobs);

        $jobOrder->save();


        return (new ApiParcel($jobOrder))->addMessage('general', 'Ordem de Serviço adicionado com sucesso!');
    }

    public function show(Request $request, $id)
    {
        return (new ApiParcel(JobOrder::throughCompany()
            ->with(['customer', 'jobs' => function ($query) {
                $query->select('job_order_jobs.*', 'jobs.name', 'jobs.id');
            }])->find($id)));
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, $this->rules);
        $data = $request->all();

        /* @var JobOrder $jobOrder */
        $jobOrder = JobOrder::throughCompany()->find($id);

        if (!$jobOrder) {
            abort(404);
        }

        $jobOrder->update($data);

        $customer = Customer::throughCompany()->find($data['customer']['id']);

        if ($customer) {
            $jobOrder->customer()->associate($customer);
        }

        $jobs = array_map(function ($item) {
            return [
                'job_id' => $item['id'],
                'price' => $item['price']
            ];
        }, array_get($data, 'jobs', []));

        $jobOrder->jobs()->sync($jobs);

        $jobOrder->save();


        return (new ApiParcel())->addMessage('general', 'Ordem de Serviço alterado com sucesso!');
    }

    public function destroy(Request $request, $id)
    {
        $jobOrder = JobOrder::throughCompany()->find($id);

        if (!$jobOrder) {
            abort(404);
        }

        $jobOrder->delete();

        return (new ApiParcel())->addMessage('general', 'Ordem de Serviço removido com sucesso!');
    }

    public function index(Request $request)
    {
        return JobOrder::throughCompany()->ngTable($request, function ($query, $params) {
            return $query
                ->leftJoin('customers', 'customers.id', '=', 'job_orders.customer_id')
                ->leftJoin('job_order_jobs', 'job_order_jobs.job_order_id', '=', 'job_orders.id', 'outer')
                ->leftJoin('jobs', 'job_order_jobs.job_id', '=', 'jobs.id')
                ->groupBy('job_orders.id')
                ->orderBy('job_orders.status', 'desc')
                ->select('job_orders.*', 'customers.name as customer_name', 'jobs.name as job_name');
        }, ['job_orders.id', 'customers.name'],
            ['job_orders.id', 'customers.name', 'job_orders.created_at']);
    }

    public function getPrint(Request $request, $id)
    {
        $jobOrder = JobOrder::throughCompany()->with(['jobs', 'customer'])->find($id);

        if (!$jobOrder) {
            abort(404);
        }

        return view('jobOrders/print', ['jobOrder' =>
            $jobOrder
        ]);
    }

    public function postSetStatus(Request $request, $id)
    {
        /** @var JobOrder $jobOrder */
        $jobOrder = JobOrder::throughCompany()->find($id);

        if (!$jobOrder) {
            abort(404);
        }

        $jobOrder->status = $request->input('status') ?: JobOrder::STATUS_PENDING;

        $jobOrder->save();

        return $jobOrder;
    }
}