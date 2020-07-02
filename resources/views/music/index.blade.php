@extends('template')
@section('content')
<div class="main-panel">
	<div class="content">
		<div class="page-inner">
			<div class="page-header">
				<h4 class="page-title">Tables</h4>
				<ul class="breadcrumbs">
					<li class="nav-home">
						<a href="#">
							<i class="flaticon-home"></i>
						</a>
					</li>
					<li class="separator">
						<i class="flaticon-right-arrow"></i>
					</li>
					<li class="nav-item">
						<a href="#">Tables</a>
					</li>
					<li class="separator">
						<i class="flaticon-right-arrow"></i>
					</li>
					<li class="nav-item">
						<a href="#">Musics Tables</a>
					</li>
				</ul>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="card">
						@if (\Session::has('status'))
						    <div class="alert alert-default">
						        <ul>
						            <li>{!! \Session::get('status') !!}</li>
						        </ul>
						    </div>
						@endif
						<div class="card-header">
							<div class="card-title">Musics Table <a href="{{url('music/tambah')}}" style="color: white;" class="btn btn-primary pull-right">Add</a></div>
						</div>
						<div class="card-body">
							<table class="table mt-3">
								<thead>
									<tr>
										<th scope="col">#</th>
										<th scope="col">Nama</th>
										<th scope="col">Penyanyi</th>
										<th scope="col">Lama Lagu</th>
										<th scope="col" style="text-align: center;">#</th>
									</tr>
								</thead>
								<tbody>
									<?php $no=1; ?>
									@foreach ($musics as $music)
									<tr>
										<td>{{$no++}}</td>
										<td>{{$music->name}}</td>
										<td>{{$music->sing}}</td>
										<td>{{$music->time}}</td>
										<td>
											<a href="{{url('music/edit/'.$music->id)}}" class="btn btn-primary" style="margin-left: 10px;">Edit</a>
											<a href="{{url('music/delete/'.$music->id)}}" class="btn btn-danger" style="margin-left: 10px;">Delete</a>
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
</div>
@endsection