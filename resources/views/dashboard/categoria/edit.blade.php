@extends('layout.layout')
@section('index')
<div class="card">
    @if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif
    <div class="card-body">
      @if (session('success'))
    <div class="alert alert-success">
        {{ session('success') }}
    </div>
  @endif
      <form class="forms-sample" method="post" action="{{url('atualiza-categoria')}}">
        @csrf
        <div class="form-group">
           
                <input type="hidden" name="id" value="{{$categoria->id}}">
           
          <label for="exampleInputName1">Digite o nome da categoria</label>
          <input type="text" name="categoria" class="form-control" id="produto" value="{{$categoria->categoria}}" placeholder="Produto">
        </div>
        <button type="submit" class="btn btn-primary me-2">Atualizar Categoria</button>
        <a href="{{url('categoria-lista')}}" class="btn btn-success mt-2 mt-xl-0">Ver Categorias Cadastradas</a>
      
        </form>


    </div>
  </div>
@endsection