@extends('template')
@section('content')
<div class="main-panel">
	<div class="content">
		<div class="page-inner">
			<div class="page-header">
				<h4 class="page-title">Forms</h4>
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
						<a href="#">Forms</a>
					</li>
					<li class="separator">
						<i class="flaticon-right-arrow"></i>
					</li>
					<li class="nav-item">
						<a href="#">Musics Form</a>
					</li>
				</ul>
			</div>
			<div class="row">
				<div class="col-md-12">
					@if (\Session::has('status'))
					    <div class="alert alert-default">
					        <ul>
					            <li>{!! \Session::get('status') !!}</li>
					        </ul>
					    </div>
					@endif
					<form class="card" method="post" action="{{url('music/doAdd')}}" enctype="multipart/form-data">
						{{ csrf_field() }}
						<div class="card-header">
							<div class="card-title">Form Musics</div>
						</div>
						<div class="card-body">
							<div class="form-group">
								<label for="email2">Name</label>
								<input type="text" class="form-control" name="name" id="email2" placeholder="Enter Name">
							</div>
							<div class="form-group">
								<label for="password">Penyanyi</label>
								<input type="text" class="form-control" name="sing" id="password" placeholder="Penyanyi">
							</div>
							<div class="form-group">
								<label for="exampleFormControlFile1">file music</label>
								<input type="file" class="form-control-file" name="name_file" id="exampleFormControlFile1">
							</div>
						</div>
						<div class="card-action">
							<button class="btn btn-success">Submit</button>
							<button class="btn btn-danger">Cancel</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection