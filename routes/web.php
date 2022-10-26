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



//Categoria
Route::get('/categoria', [\App\Http\Controllers\CategoriaController::class,'index'])->name('categoria');
Route::get('/categoria-create', [\App\Http\Controllers\CategoriaController::class,'create'])->name('categoria-create');
Route::get('/categoria-lista', [\App\Http\Controllers\CategoriaController::class,'show'])->name('categoria-lista');
Route::get('/categoria-apaga/{id}', [\App\Http\Controllers\CategoriaController::class,'destroy'])->name('categoria-apaga');
Route::get('/categoria-edita/{id}', [\App\Http\Controllers\CategoriaController::class,'edit'])->name('categoria-edita');
Route::post('/insere-categoria', [\App\Http\Controllers\CategoriaController::class,'store'])->name('insere-categoria');
Route::post('/atualiza-categoria/', [\App\Http\Controllers\CategoriaController::class,'update'])->name('atualiza-categoria');
Route::get('/', function () {
    return view('welcome');
});
