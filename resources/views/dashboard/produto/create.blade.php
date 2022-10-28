@extends('layout.layout')
@section('index')
<div class="card">
<div class="card-body">
    @if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
    @endif
    @if (session('success'))
    <div class="alert alert-success">
        {{ session('success') }}
    </div>
  @endif


<form class="forms-sample" method="POST" action="{{url('produto-insere')}}" enctype="multipart/form-data" >
@csrf
    <div class="form-group">
      <label for="exampleFormControlSelect2">Selecione a categoria</label>
      <select name="categoria" class="form-control" id="exampleFormControlSelect2">
        <option>Selecione</option>
        @foreach ($categorias as $item)
        <option value="{{$item->id}}">{{$item->categoria}}</option>  
        @endforeach
        
       
      </select>
    </div>
    
    <div class="form-group">
      <label for="exampleInputName1">Digite o nome do produto</label>
      <input type="text" name="produto" class="form-control" id="produto" placeholder="Produto">
    </div>
    
    <div class="form-group">
      <label>Imagem do produto</label>
      {{-- <input type="file" name="imagem"> --}}
      <div class="input-group col-xs-12">
        <input type="file" name="imagem" class="form-control file-upload-info"  placeholder="Enviar Imagem para o produto">
        
      </div>
    </div>

    <div class="form-group">
        <label>Breve descrição</label>
        {{-- <input type="file" name="imagem"> --}}
        <div class="input-group col-xs-12">
        <textarea name="descricao" class="form-control" id="exampleTextarea1" rows="4"></textarea>
          
        </div>
      </div>
    
    <button type="submit" class="btn btn-primary me-2">Inserir produto</button>
    <a href="{{url('produto-lista')}}" class="btn btn-success mt-2 mt-xl-0">Ver Produtos Cadastrados</a>
    </form>
</div>
</div>
@endsection