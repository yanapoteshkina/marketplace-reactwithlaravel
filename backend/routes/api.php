<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'middleware' => 'api',
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
});

Route::group(['middleware' => ['jwt.verify']], function() {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']); 
// Route::get('/products', 'App\Http\Controllers\ProductsController@index');
    Route::post('/products', 'App\Http\Controllers\ProductsController@show');
    Route::put('/products/{id}', 'App\Http\Controllers\ProductsController@update');
    Route::delete('/products/{id}', 'App\Http\Controllers\ProductsController@destroy');

    // Route::get('/carts', 'App\Http\Controllers\CartsController@index');
    Route::get('/carts', 'App\Http\Controllers\CartsController@show');
    Route::post('/carts', 'App\Http\Controllers\CartsController@store');
    Route::put('/carts/{id}', 'App\Http\Controllers\CartsController@update');
    Route::delete('/carts/{id}', 'App\Http\Controllers\CartsController@destroy');

    Route::get('/categories', 'App\Http\Controllers\CategoriesController@show');
    Route::post('/categories', 'App\Http\Controllers\CategoriesController@store');
    Route::put('/categories/{id}', 'App\Http\Controllers\CategoriesController@update');
    Route::delete('/categories/{id}', 'App\Http\Controllers\CategoriesController@destroy');

    Route::get('/favorites', 'App\Http\Controllers\FavoritesController@show');
    Route::post('/favorites', 'App\Http\Controllers\FavoritesController@store');
    Route::put('/favorites/{id}', 'App\Http\Controllers\FavoritesController@update');
    Route::delete('/favorites/{id}', 'App\Http\Controllers\FavoritesController@destroy');

    Route::get('/comments', 'App\Http\Controllers\CommentsController@index');
    Route::post('/comments', 'App\Http\Controllers\CommentsController@store');
    Route::put('/comments/{id}', 'App\Http\Controllers\CommentsController@update');
    Route::delete('/comments/{id}', 'App\Http\Controllers\CommentsController@destroy');

    Route::get('/shops/{product_id}', 'App\Http\Controllers\ShopsController@show');
    Route::post('/shops', 'App\Http\Controllers\ShopsController@store');
    Route::put('/shops/{id}', 'App\Http\Controllers\ShopsController@update');
    Route::delete('/shops/{id}', 'App\Http\Controllers\ShopsController@destroy');
});


Route::get('/products', 'App\Http\Controllers\ProductsController@show');

Route::get('/products/{id}', 'App\Http\Controllers\ProductsController@single');

Route::get('/comments/{product_id}', 'App\Http\Controllers\CommentsController@show');
