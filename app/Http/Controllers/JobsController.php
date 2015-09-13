<?php

namespace App\Http\Controllers;

use App\Local\ApiParcel;
use App\Models\Customer;
use App\Models\Job;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\Local\Helpers;
use Mockery\CountValidator\Exception;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;

class JobsController extends Controller
{
    protected $context = "job";

    private $rules = [

    ];

    public function store(Request $request)
    {
        try {
            $this->validate($request, $this->rules);

            $data = $request->all();


            $job = Job::create($data);
        } catch (Exception $ex) {
            var_export($ex);
        }


        return (new ApiParcel())->addMessage('general', 'Serviço adicionado com sucesso!');
    }

    public function show(Request $request, $id)
    {
        return (new ApiParcel(Job::find($id)));
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, $this->rules);
        $data = $request->all();
        $job = Job::find($id);
        $job->update($data);

        return (new ApiParcel())->addMessage('general', 'Serviço alterado com sucesso!');
    }

    public function destroy(Request $request, $id)
    {
        Job::find($id)->delete();
        return (new ApiParcel())->addMessage('general', 'Serviço removido com sucesso!');
    }

    public function index(Request $request)
    {
        return Job::throughCompany()->ngTable($request, null, ['id', 'name'], ['id', 'name']);
    }
}