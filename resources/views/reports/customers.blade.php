@extends("../print")

@section("content")
    <h2>
        Relatório de Clientes
    </h2>

    <div class="row">
        <div class="col-xs-12">
            <table class="table table-striped" style="width: auto">
                <thead>
                <tr>
                    <th>Identificação</th>
                    <th>Nome Fantasia</th>
                    <th>CNPJ</th>
                    <th>Inscrição Estadual</th>
                    <th>Endereço</th>
                    <th>Numero</th>
                    <th>Bairro</th>
                    <th>CEP</th>
                    <th>Cidade</th>
                    <th>Estado</th>
                    <th>Telefone</th>
                    <th>E-mail</th>
                    <th>Nome Contato</th>
                    <th>Data Cadastro</th>
                    <th>Hist. Cliente</th>
                </tr>
                </thead>
                <tbod>
                    @foreach($customers as $customer)
                        <tr>
                            <td>{{ $customer->id }}</td>
                            <td>{{ $customer->name }}</td>
                            <td>{{ $customer->cnpj }}</td>
                            <td>{{ $customer->ie }}</td>
                            <td>{{ $customer->address }}</td>
                            <td>{{ $customer->number }}</td>
                            <td>{{ $customer->district }}</td>
                            <td>{{ $customer->zipcode }}</td>
                            <td>{{ $customer->city }}</td>
                            <td>{{ $customer->state }}</td>
                            <td>{{ current(array_map(function($p) { return $p->phone; }, $customer->phones->all())) }}</td>
                            <td>{{ $customer->email }}</td>
                            <td>{{ $customer->contact }}</td>
                            <td>{{ $customer->created_at }}</td>
                            <td></td>
                        </tr>
                    @endforeach
                </tbod>
            </table>
        </div>
    </div>
@endsection