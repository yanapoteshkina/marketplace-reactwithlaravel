<?php

namespace App\Http\Controllers;

use App\Models\Carts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CartsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Carts::get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required',
        ]);
        $validated['user_id'] = auth()->user()->id;
        $carts = Carts::create($validated);
        
        return $carts; 
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Carts  $carts
     * @return \Illuminate\Http\Response
     */
    public function show(Request $reques)
    {
        $cart = DB::table('carts')
        ->join('products', 'carts.product_id', '=', 'products.id')
        ->where('carts.user_id', '=', auth()->user()->id)
        ->get();

        return $cart;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Carts  $carts
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $carts = Carts::find($id);

        $carts->update($request->all());

        return  $carts;  
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Carts  $carts
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $carts = Carts::find($id);

        $carts->delete();
        return   $carts; 
    }
}
