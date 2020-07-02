<!DOCTYPE html>
<html lang="en">
<head>
@include('layout.head') 
</head>
<body>
	<div class="wrapper">
		<!--
			Tip 1: You can change the background color of the main header using: data-background-color="blue | purple | light-blue | green | orange | red"
		-->

		@include('layout.header') 
		

		@include('layout.sidebar') 
		<!-- End Sidebar -->
		@yield('content')
		

		@include('layout.costume') 
	</div>
</div>
@include('layout.script') 
</body>
</html>