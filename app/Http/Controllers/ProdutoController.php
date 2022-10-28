<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use App\Models\Categoria;
use Illuminate\Http\Request;


class ProdutoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('dashboard.categoria.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categorias = Categoria::all();
        return view('dashboard.produto.create', ['categorias' => $categorias]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'produto' => 'required|max:255|min:4',
            'imagem' =>'required|mimes:jpeg,png,jpg,gif',
            'categoria' =>'required',
            'descricao' =>'required|max:255|min:4'
        ]);
        $file = $request->file()['imagem'];
        $filename = $file->hashName();
        $file->storeAs('produtos', $filename);
        $produto = new Produto();
        $produto->produto = $request->produto;
        $produto->imagem = $filename;
        $produto->idcategoria = $request->categoria;
        $produto->descricao = $request->descricao;
        if($produto->save())
        {
            return back()->with('success', 'Produto cadastrado com sucesso!');
        }

       
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Produto  $produto
     * @return \Illuminate\Http\Response
     */
    public function show(Produto $produto)
    {
        $produtos = Produto::all();
        return view('dashboard.produto.list', ['produtos' => $produtos]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Produto  $produto
     * @return \Illuminate\Http\Response
     */
    public function edit(Produto $produto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Produto  $produto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Produto $produto)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Produto  $produto
     * @return \Illuminate\Http\Response
     */
    public function destroy($id=NULL)
    {
        $produto = Produto::find($id);
        if($produto->delete())
        {
            return back()->with('success', 'Produto excluído com sucesso!');
        }
    }

    public function destaque(Request $request)
    {
       $id = $request->id;
       $produto = Produto::find($id);
      if($produto->destaque == 1)
      {
        $produto->destaque = 0;
        $produto->save();
        return back()->with('success', 'Produto não é mais destaque no site!');
      }else{
        $produto->destaque = 1;
        $produto->save();
        return back()->with('success', 'Produto colocado como destaque no site!');
      }
      
    }
}
