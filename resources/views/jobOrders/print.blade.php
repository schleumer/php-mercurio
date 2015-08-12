@extends("../print")

@section("content")
    <h2>
        Ordem de Serviço numero <b>{{ $jobOrder->id }}</b>
    </h2>

    <div class="row">
        <div class="col-xs-12">
            <h3>{{  $jobOrder->customer->name }}</h3>
        </div>
        <div class="col-xs-12">
            <p style="font-size: 20px">
                {{ $jobOrder->note }}
            </p>
        </div>
        <div class="col-xs-12">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th>Identificação</th>
                    <th>Serviço</th>
                    <th width="200">Preço</th>
                </tr>
                </thead>
                <tbod>
                    @foreach($jobOrder->jobs as $job)
                        <tr>
                            <td>{{ $job->id }}</td>
                            <td>{{ $job->name }}</td>
                            <td>R$ {{ number_format($job->pivot->price, 2, ',', '.') }}</td>
                        </tr>
                    @endforeach
                </tbod>
                <tfoot>
                <tr>
                    <td></td>
                    <td style="text-align: right; font-size: 25px; vertical-align: bottom">Total:</td>
                    <td style="text-align: left; font-size: 25px; vertical-align: bottom">
                        R$ {{
                            number_format(array_sum(
                                array_map(
                                    function($x) { return floatval($x->pivot->price); },
                                    $jobOrder->jobs->all()
                                )
                            ), 2, ',', '.')
                        }}
                    </td>
                </tr>
                </tfoot>
            </table>
        </div>
    </div>
@endsection