@extends('layout.layout')
@section('index')
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
              <table class="table table-dark">
                <thead>
                  <tr>
                    <th>
                      #
                    </th>
                    <th>
                      Categoria
                    </th>
                    <th>
                     
                    </th>           
                  </tr>
                </thead>
                <tbody>
                    @foreach ($categorias as $item)
                        
                  
                  <tr>
                    <td>
                      {{$item->id}}
                    </td>
                    <td>
                      {{$item->categoria}}
                    </td>
                    <td>
                      <a href="{{url('categoria-edita/'.$item->id)}}" class="btn btn-outline-primary btn-fw">Editar</a>
                      <a href="{{url('categoria-apaga/'.$item->id)}}" class="btn btn-outline-danger btn-fw">Apagar</a>
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