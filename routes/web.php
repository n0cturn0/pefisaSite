<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Template
Route::get('/template', [\App\Http\Controllers\templateController::class,'index'])->name('template');
//Site Capa
Route::get('/index', [\App\Http\Controllers\SiteController::class,'index'])->name('index');

Route::get('/', function () {
    return view('welcome');
});
