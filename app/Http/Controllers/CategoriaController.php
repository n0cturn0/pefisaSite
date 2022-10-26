<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoriaController extends Controller
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
        return view('dashboard.categoria.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

       $request->validate([
            'categoria' => 'required|max:255|min:4'
        ]);

        $categoria = new Categoria();
        $categoria->categoria = $request->categoria;
        if($categoria->save())
        {
            return back()->with('success', 'Categoria cadastrada com sucesso!');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Categoria  $categoria
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $categorias = Categoria::all();
        return view('dashboard.categoria.list',['categorias'=>$categorias]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Categoria  $categoria
     * @return \Illuminate\Http\Response
     */
    public function edit($id=NULL)
    {

        $categoria = DB::table('categorias')->where('id', $id)->first();
         return view('dashboard.categoria.edit',['categoria'=>$categoria]);
      
       
    
    
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Categoria  $categoria
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $request->validate([
            'categoria' => 'required|max:255|min:4'
        ]);
        $categoria = Categoria::find($request->id);
        $categoria->categoria = $request->categoria;
        if($categoria->save())
        {
            return back()->with('success', 'Categoria atualizado com sucesso!');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Categoria  $categoria
     * @return \Illuminate\Http\Response
     */
    public function destroy($id = NULL)
    {
        $categoria = Categoria::find($id);
        if($categoria->delete())
        {
            return back()->with('success', 'Categoria excluída com sucesso!');
        }
    }
}
