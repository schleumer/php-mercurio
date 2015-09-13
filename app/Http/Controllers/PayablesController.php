<?php

namespace App\Http\Controllers;

use App\Local\ApiParcel;
use App\Models\Customer;
use App\Models\Payable;
use App\Models\PayableType;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\Local\Helpers;
use Mockery\CountValidator\Exception;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;

class PayablesController extends Controller
{
    protected $context = "payable";

    private $rules = [
        'payable_type' => 'required|array'
    ];

    public function store(Request $request)
    {
        try {
            $this->validate($request, $this->rules);

            $data = $request->all();

            $payable = Payable::create($data);

            $type = PayableType::throughCompany()->find($data['payable_type']['id']);

            if ($type) {
                $payable->payableType()->associate($type);
            }

            $payable->save();


        } catch (Exception $ex) {
            var_export($ex);
        }


        return (new ApiParcel())->addMessage('general', 'Serviço adicionado com sucesso!');
    }

    public function show(Request $request, $id)
    {
        $payable = Payable::throughCompany()->with("payableType")->find($id);

        if (!$payable) {
            abort(404);
        }

        return new ApiParcel($payable);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, $this->rules);
        $data = $request->all();
        $payable = Payable::throughCompany()->find($id);

        if (!$payable) {
            abort(404);
        }

        $payable->update($data);

        $type = PayableType::throughCompany()->find($data['payable_type']['id']);

        if ($type) {
            $payable->payableType()->associate($type);
        }

        $payable->save();

        return (new ApiParcel())->addMessage('general', 'Serviço alterado com sucesso!');
    }

    public function destroy(Request $request, $id)
    {
        $payable = Payable::throughCompany()->find($id);

        if (!$payable) {
            abort(404);
        }

        $payable->delete();

        return (new ApiParcel())->addMessage('general', 'Serviço removido com sucesso!');
    }

    public function index(Request $request)
    {
        return Payable::throughCompany()->ngTable($request, function ($query, $params) {
            return $query
                ->leftJoin('payable_types', 'payable_types.id', '=', 'payables.payable_type_id')
                ->orderBy('payables.status', 'desc')
                ->select('payables.*', 'payable_types.name as payable_type');
        }, ['payables.id', 'payables.date'],
            ['payables.id', 'payables.date']);
    }

    public function postSetStatus(Request $request, $id)
    {
        $payable = Payable::throughCompany()->find($id);

        if (!$payable) {
            abort(404);
        }

        $payable->status = $request->input('status') ?: Payable::STATUS_PENDING;
        $payable->save();

        return $payable;
    }
}