<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Users;

class LoginController extends Controller
{
    public function index()
    {
    	// mengirim data musics ke view index
    	return view('login/login');
 
    }

    public function login(Request $request)
    {
    	// echo json_encode($request->all());
    	// die;
        $dataLogin = Users::where('username',$request->username)->where('password',md5($request->password))->where('user_type','4')->first();
        if (!empty($dataLogin)) {
            $request->session()->put('dataLogin', []);
            return redirect()->action('MusicController@index');
        }else{
            return redirect()->back();
        }

    }

    public function log(Request $request)
    {
        
        $request->session()->flush();
        // return $next($request);
        return redirect()->action('LoginController@index');
    }
}
