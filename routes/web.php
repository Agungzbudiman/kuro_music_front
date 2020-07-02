<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('login/login');
});
Route::post('/login/login','LoginController@login');
Route::get('/login/','LoginController@index');
Route::get('/login/log','LoginController@log');

Route::get('/music/index','MusicController@index');
Route::get('/music/tambah','MusicController@tambah');
Route::post('/music/doAdd','MusicController@doAdd');
Route::post('/music/doUpdate','MusicController@doUpdate');
Route::get('/music/delete/{id}','MusicController@delete');
Route::get('/music/edit/{id}','MusicController@edit');


Route::post('/api/getMusic','ApiController@getMusic');
Route::post('/api/getPlaylist','ApiController@getPlaylist');
Route::post('/api/getPlaylistMusic','ApiController@getPlaylistMusic');
Route::post('/api/getRekomendasi','ApiController@getRekomendasi');
Route::post('/api/heart','ApiController@heart');
Route::post('/api/doLogin','ApiController@doLogin');
Route::post('/api/doRegister','ApiController@doRegister');
