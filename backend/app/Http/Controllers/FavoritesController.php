<?php

namespace App\Http\Controllers;

use App\Models\Favorites;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FavoritesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Favorites::get();
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

        $favorites = Favorites::create($validated);
        
        return $favorites; 
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Favorites  $favorites
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        
        $favorites = DB::table('favorites')
        ->join('products', 'favorites.product_id', '=', 'products.id')
        ->where('favorites.user_id', '=', auth()->user()->id)
        ->get();

        return $favorites;

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Favorites  $favorites
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $favorites = Favorites::find($id);

        $favorites->update($request->all());

        return  $favorites;  
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Favorites  $favorites
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $favorites = Favorites::find($id);

        $favorites->delete();
        return   $favorites; 
    }
}
