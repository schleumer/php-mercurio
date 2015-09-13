<?php

namespace App\Http\Controllers;

use App\Local\ApiParcel;
use App\Models\PayableType;
use Illuminate\Http\Request;
use Mockery\CountValidator\Exception;


class PayableTypesController extends Controller
{
    protected $context = "payable_type";

    private $rules = [];

    public function store(Request $request)
    {
        try {
            $this->validate($request, $this->rules);
            $data = $request->all();
            $payableType = PayableType::create($data);
        } catch (Exception $ex) {
            var_export($ex);
        }


        return (new ApiParcel())->addMessage('general', 'Serviço adicionado com sucesso!');
    }

    public function show(Request $request, $id)
    {
        $payableType = PayableType::throughCompany()->find($id);

        if (!$payableType) {
            abort(404);
        }

        return (new ApiParcel($payableType));
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, $this->rules);
        $data = $request->all();
        $payableType = PayableType::throughCompany()->find($id);

        if (!$payableType) {
            abort(404);
        }

        $payableType->update($data);

        return (new ApiParcel())->addMessage('general', 'Serviço alterado com sucesso!');
    }

    public function destroy(Request $request, $id)
    {
        $payableType = PayableType::throughCompany()->find($id);

        if (!$payableType) {
            abort(404);
        }

        $payableType->delete();
        return (new ApiParcel())->addMessage('general', 'Serviço removido com sucesso!');
    }

    public function index(Request $request)
    {
        return PayableType::throughCompany()->ngTable($request, null, ['id', 'name'], ['id', 'name']);
    }
}