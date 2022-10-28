@extends('layout.layout')
@section('index')
<style>
   .table td img {
    width: 100px;
    height: 100px;
    border-radius: 100%
   }
    </style>
<div class="card">
<div class="card-body">
    @if (session('success'))
    <div class="alert alert-success">
        {{ session('success') }}
    </div>
  @endif
    <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body"> 
            <div class="table-responsive pt-3">
             


                <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>
                          User
                        </th>
                        <th>
                         Produto
                        </th>
                        <th>
                          Descrição
                        </th>
                        <th>
                           
                        </th>
                        <th>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                        @foreach ($produtos as $item)
                            
                       
                      <tr>
                        <td class="py-1">
                          <img src="{{asset('storage/produtos/'.$item->imagem)}}" alt="image"/>
                        </td>
                        <td>
                          {{$item->produto}}
                        </td>
                        <td>
                            <textarea name="descricao" class="form-control" id="exampleTextarea1" rows="4">{{$item->descricao}}</textarea>
                        </td>
                        <td>
                            <a href="{{url('produto-apaga/'.$item->id)}}" class="btn btn-outline-danger btn-fw">Apagar</a>
                            
                            
                        </td>
                        <td>
                            @if($item->destaque == 0) 
                            <form method="post" action="{{url('produto-destaque')}}">
                            @csrf
                            <button type="submit" class="btn btn-success btn-rounded btn-icon">
                            <input type="hidden" name="id" value="{{$item->id}}">
                            <i class="mdi mdi-home-outline"></i>
                            </button>
                            </form>
                            @endif
                            @if($item->destaque == 1) 
                            <form method="post" action="{{url('produto-destaque')}}">
                            @csrf
                            <button type="submit" class="btn btn-primary btn-rounded btn-icon">
                            <input type="hidden" name="id" value="{{$item->id}}">
                            <i class="mdi mdi-star"></i>
                            </button>
                            </form>
                            @endif
                        
                        
                        
                        
                        
                        </td>
                        
                        
                      </tr>
                      @endforeach
                    </tbody>
                  </table>








            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
@endsection