<?php

namespace App\Http\Controllers;

use App\Local\ApiParcel;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;

class UsersController extends Controller
{
    protected $context = "job";

    private $rules = [

    ];

    public function store(Request $request)
    {
        try {
            $this->validate($request, $this->rules);

            $data = $request->all();


            $job = User::create($data);
        } catch (Exception $ex) {
            var_export($ex);
        }


        return (new ApiParcel())->addMessage('general', 'Usuário adicionado com sucesso!');
    }

    public function show(Request $request, $id)
    {
        return (new ApiParcel(User::find($id)));
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, $this->rules);
        $data = $request->all();
        $job = User::find($id);
        $job->update($data);

        return (new ApiParcel())->addMessage('general', 'Usuário alterado com sucesso!');
    }

    public function destroy(Request $request, $id)
    {
        User::find($id)->delete();
        return (new ApiParcel())->addMessage('general', 'Usuário removido com sucesso!');
    }

    public function index(Request $request)
    {
        return User::ngTable($request, null, ['id', 'name'], ['id', 'name']);
    }
}