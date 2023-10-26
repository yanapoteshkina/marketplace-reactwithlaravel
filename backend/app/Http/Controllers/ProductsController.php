<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Products::get();
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
            'title' => 'required',
            'price' => 'numeric',
            'img' => 'required',
            'description' => 'nullable',
            'category_id' => 'required',
            'like' => 'numeric',
            'dislike' => 'numeric',
        ]);

        $product = Products::create($validated);
        
        return $product; 

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {


        $data = $request->all();
        $validator = Validator::make($data, [
            'min_price' => 'numeric',
            'max_price' => 'numeric',
            'search_title' => 'string',
            'sort_field' => 'string',
            'order' => 'string',
            'limit' => 'numeric',
            'page' => 'numeric',
            'categories_ids' => 'string',
        ]);

        if ($validator->fails()) {
           return response()->json($validator->errors(), 400);;
        }
        if (!array_key_exists('limit', $data)){
            $data['limit'] = 25;
        }

        if (!array_key_exists('page', $data)){
            $data['page'] = 1;
        }

        $users = DB::table('products');

        if (array_key_exists('min_price', $data)){
            $users->where('price', '>=', $data['min_price']);
        }
        if (array_key_exists('max_price', $data)){
            $users->where('price', '<=', $data['max_price']);
        }
        if (array_key_exists('search_title', $data)){
            $users->whereRaw('LOWER(title) like ' . "'%".trim(strtolower($data['search_title']))."%'");
        }
        if (array_key_exists('categories_ids', $data)){
            $data['categories_ids'] = json_decode($data['categories_ids']);
            if(gettype($data['categories_ids']) === 'array' && count($data['categories_ids'])){
                $users->join('categories', 'products.category_id', '=', 'categories.id')
                ->whereIn('categories.id' , $data['categories_ids']);
            }
        }
        

        $users->limit($data['limit'])->offset(($data['page'] - 1) * $data['limit']);

        if (array_key_exists('order', $data) && array_key_exists('sort_field', $data)){
            $users->orderByRaw($data['sort_field'] ." ". $data['order']);
        }
        

       
        return $users->get();
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $product = Products::find($id);

        $product->update($request->all());

        return  $product;  
    }


    public function single(Request $request, $id)
    {
        $data = [];
        $product = Products::find($id);
        if(!$product){
            return "Product doesn`t exist";
        }
        $data['product'] =  $product;
        
        $products = DB::table('products')
            ->where('price' ,'<', $product->price + 200 )
            ->where('price' ,'>', $product->price - 200 );
        
        if($product->category_id){
            $products->where('category_id', '=', $product->category_id);
        }
        
        $data['related_products'] =  $products->get();
        
        return $data;

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Products::find($id);

        $product->delete();
        return   $product; 
          
    }

    
}
