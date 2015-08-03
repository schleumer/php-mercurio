<?php

use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        DB::table('users')->delete();
        DB::table('customers')->delete();
        DB::table('customer_phones')->delete();

        User::create(['name' => 'Teste', 'email' => 'teste@teste.com.br', 'password' => Hash::make('teste')]);


        foreach(range(0, 15) as $x) {
            $customer = Customer::create([
                'name' => "Cliente $x",
                'email' => "cliente$x@teste.com.br",
                'cnpj' => '81.748.407/0001-01',
                'ie' => '309.639.790.252',
                'address' => "Endereço de Teste $x",
                'number' => $x,
                'district' => "Bairro de Teste $x",
                'city' => "Cidade de Teste $x",
                'state' => "Teste",
                'zip' => '00000-0' . str_pad($x, 2, '0', STR_PAD_LEFT),
                'contact' => "Pessoa de Teste $x"
            ]);

            foreach(range(0, rand(1, 5)) as $y) {
                $customer->phones()->create(['phone' => "1398765432$y"]);
            }
        }




        Model::reguard();
    }
}
