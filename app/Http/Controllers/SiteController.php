<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Produto;
use App\Models\Categoria;
use Illuminate\Support\Facades\DB;

class SiteController extends Controller
{
    public function index()
    {
        $categorias = Categoria::all();
        $produtos = Produto::all();
        $destaques = Produto::where('destaque', '=', 1)->get();
        $data = array(
            'categorias' => $categorias,
            'produtos' => $produtos,
            'destaques' => $destaques
        );
        return view('site.index', ['data' => $data]);
    }
}
