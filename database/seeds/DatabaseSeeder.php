<?php

use App\Models\Customer;
use App\Models\Job;
use App\Models\JobOrder;
use App\Models\PayableType;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;


function array_pick_index($array, array $indices)
{
    $aux = [];
    foreach ($indices as $index) {
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
        DB::table('companies')->delete();


        $companies = [];

        foreach (range(0, 2) as $x) {
            $companies[] = \App\Models\Company::create([
                'name' => "Empresa $x",
                'email' => "empresa$x@teste.com.br",
                'cnpj' => '81.748.407/0001-01',
                'ie' => '309.639.790.252',
                'address' => "Endereço da Empresa $x",
                'number' => $x,
                'district' => "Bairro de Teste $x",
                'city' => "Cidade de Teste $x",
                'state' => "Teste",
                'zip' => '00000-0' . str_pad($x, 2, '0', STR_PAD_LEFT),
                'contact' => "Pessoa de Teste $x"
            ]);
        }


        $cid = 0;
        foreach ($companies as $company) {
            $cid += 1;

            User::create(['name' => 'Teste', 'email' => "teste{$cid}@teste.com.br", 'password' => Hash::make('teste')])
                ->company()
                ->associate($company)
                ->save();

            $jobs = [];

            foreach (range(0, 15) as $x) {
                $job = Job::create([
                    'name' => "Serviço de teste $cid/$x",
                    'price' => $x * 100,
                    'description' => "Serviço de teste $x"
                ])->company()
                    ->associate($company);

                $job->save();

                $jobs[] = $job;
            }

            $customers = [];

            foreach (range(0, 15) as $x) {
                $customer = Customer::create([
                    'name' => "Cliente $cid/$x",
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
                ])->company()
                    ->associate($company);

                $customer->save();

                foreach (range(0, rand(1, 5)) as $y) {
                    $customer->phones()->create(['phone' => "1398765432$y"]);
                }

                $testJobs = array_pick_index($jobs, array_rand($jobs, 5));

                $customerJobOrder = JobOrder::create([
                    'customer_id' => $customer->id,
                    'note' => "Nota de teste para o cliente $cid/$x"
                ])->company()
                    ->associate($company);

                $customerJobOrder->save();

                $testJobs = array_map(function ($item) {
                    return [
                        'job_id' => $item->id,
                        'price' => $item->price
                    ];
                }, $testJobs);

                $customerJobOrder->jobs()->sync($testJobs);

                $customerJobOrder->save();

                $customers[] = $customer;
            }

            $payableTypes = [];

            foreach (range(0, 15) as $i) {
                $payableType = PayableType::create(['name' => "Conta de Teste $cid/$i", 'description' => "Descrição do tipo $i"])->company()
                    ->associate($company);

                $payableType->save();

                $payableTypes[] = $payableType;
            }

            $payables = [];

            foreach ($customers as $customer) {
                foreach (range(0, rand(1, 5)) as $x) {
                    $type = current(array_pick_index($payableTypes, array_rand($payableTypes, 5)));
                    $payable = \App\Models\Payable::create([
                        'payable_type_id' => $type->id,
                        'date' => \Carbon\Carbon::now()->addDays(rand(1, 60)),
                        'status' => rand(1, 2),
                        'price' => $x * 100,
                        'description' => "Descrição de uma conta a pagar {$customer->id}/$x"
                    ])->company()
                        ->associate($company);

                    $payable->save();

                    $payables[] = $payable;
                }
            }
        }

        Model::reguard();
    }
}
