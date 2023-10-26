<?php

namespace App\Http\Controllers;

use App\Models\Products_shops;
use Illuminate\Http\Request;

class ProductsShopsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Products_shops::get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Products_shops  $products_shops
     * @return \Illuminate\Http\Response
     */
    public function show(Products_shops $products_shops)
    {
        $validated = $request->validate([
            'product_id' => 'required',
        ]);

        $products_shops = Products_shops::create($validated);
        
        return $products_shops; 
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Products_shops  $products_shops
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $products_shops = Products_shops::find($id);

        $products_shops->update($request->all());

        return  $products_shops;  
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Products_shops  $products_shops
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $products_shops = Products_shops::find($id);

        $products_shops->delete();
        return   $products_shops; 
    }
}
