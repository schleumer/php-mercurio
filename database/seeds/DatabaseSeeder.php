<?php

use App\Models\Customer;
use App\Models\Job;
use App\Models\JobOrder;
use App\Models\PayableType;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;


function array_pick_index($array, array $indices){
    $aux = [];
    foreach($indices as $index) {
        $aux[] = $array[$index];
    }
    return $aux;
}

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


        DB::table('payables')->delete();
        DB::table('payable_types')->delete();
        DB::table('job_order_jobs')->delete();
        DB::table('job_orders')->delete();
        DB::table('jobs')->delete();
        DB::table('customer_phones')->delete();
        DB::table('customers')->delete();
        DB::table('users')->delete();



        User::create(['name' => 'Teste', 'email' => 'teste@teste.com.br', 'password' => Hash::make('teste')]);

        $jobs = [];

        foreach(range(0, 15) as $x) {
            $jobs[] = Job::create([
                'name' => "Serviço de teste $x",
                'price' => $x * 100,
                'description' => "Serviço de teste $x"
            ]);
        }

        $customers = [];

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

            $testJobs = array_pick_index($jobs, array_rand($jobs, 5));

            $customerJobOrder = JobOrder::create([
                'customer_id' => $customer->id,
                'note' => "Nota de teste para o cliente $x"
            ]);

            $testJobs = array_map(function($item) { return [
                'job_id' => $item->id,
                'price' => $item->price
            ]; }, $testJobs);

            $customerJobOrder->jobs()->sync($testJobs);

            $customerJobOrder->save();

            $customers[] = $customer;
        }

        $payableTypes = [];

        foreach(range(0, 15) as $i) {
            $payableTypes[] = PayableType::create(['name' => "Conta de Teste $i", 'description' => "Descrição do tipo $i"]);
        }

        $payables = [];

        foreach($customers as $customer) {
            foreach(range(0, rand(1, 5)) as $x) {
                $type = current(array_pick_index($payableTypes, array_rand($payableTypes, 5)));
                $payable = \App\Models\Payable::create([
                    'payable_type_id' => $type->id,
                    'date' => \Carbon\Carbon::now()->addDays(rand(1, 60)),
                    'status' => rand(1, 2),
                    'price' => $x * 100,
                    'description' => "Descrição de uma conta a pagar {$customer->id}/$x"
                ]);

                $payable->save();

                $payables[] = $payable;
            }
        }

        Model::reguard();
    }
}
