<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class ReportsController extends Controller {
    public function getCustomers(Request $request) {
        return view("reports/customers", [
            "customers" => Customer::with("phones")->get()
        ])->with('size', 'full');
    }
}