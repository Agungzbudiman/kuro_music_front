<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Music;
use App\Heart;
use App\Playlist;
use App\PlaylistMusic;
use App\Users;
use File;
use URL;

class ApiController extends Controller
{

    public function getMusic(Request $request)
    {
        $ip =  (!empty($request->id)) ?$request->id: gethostbyaddr($_SERVER["SERVER_ADDR"]);
        if (!empty($request->name)) {
            $data = DB::table('tbm_music AS m')
            ->select('m.id','m.name','m.sing','m.name_file','m.time',"h.id as heart")
            ->leftJoin('tbr_heart AS h',function($join)use($ip){
                $join->on('m.id','=','h.music_id')
                ->where('h.user_id',$ip);
            })
            ->where('name', 'like', '%'.$request->name.'%')
            ->orWhere('sing', 'like', '%'.$request->name.'%')
            ->get();
        }else{
            $data = DB::table('tbm_music AS m')
            ->select('m.id','m.name','m.sing','m.name_file','m.time',"h.id as heart")
            ->leftJoin('tbr_heart AS h',function($join)use($ip){
                $join->on('m.id','=','h.music_id')
                ->where('h.user_id',$ip);
            })
            ->get();
        }
        if(count($data) > 0){ //mengecek apakah data kosong atau tidak
            $res['message'] = "Success!";
            foreach ($data as $key => $value) {
                $value->src = URL::to('/music/').'/'.$value->name_file;
            }
            $res['values'] = $data;
            return response($res);
        }
        else{
            $res['message'] = "Empty!";
            return response($res);
        }
    }

    public function getRekomendasi(Request $request)
    {
        $ip =  (!empty($request->user_id)) ?$request->user_id: gethostbyaddr($_SERVER["SERVER_ADDR"]);
        $count = $data = DB::table('tbr_heart AS h')
        ->where('user_id',$ip)
        ->get();
        $data = DB::table('tbm_music AS m')
        ->select('m.id','m.name','m.sing','m.name_file','m.time',"h.id as heart")
        ->leftJoin('tbr_heart AS h',function($join)use($ip){
            $join->on('m.id','=','h.music_id')
            ->where('h.user_id',$ip);
        })
        ->limit((count($count)>10)?count($count):10)
        ->get();
        if(count($data) > 0){ //mengecek apakah data kosong atau tidak
            $res['message'] = "Success!";
            foreach ($data as $key => $value) {
                $value->src = URL::to('/music/').'/'.$value->name_file;
            }
            $res['values'] = $data;
            return response($res);
        }
        else{
            $res['message'] = "Empty!";
            return response($res);
        }
    }

    public function doLogin(Request $request)
    {
        $data = Users::where('username',$request->username)->where('password',md5($request->password))->first();
        if(!empty($data)){ //mengecek apakah data kosong atau tidak
            $res['message'] = "Berhasil Login";
            unset($data->password);
            $res['status'] = "ok";
            $res['values'] = $data;
            return response($res);
        }
        else{
            $res['message'] = "Empty!";
            $res['status'] = "not_ok";
            $res['values'] = [];
            return response($res);
        }
    }

    public function doRegister(Request $request)
    {
        if (empty($request->username) || empty($request->password)) {
            $res['message'] = "Empty!";
            $res['status'] = "not_ok";
            $res['values'] = [];
            return response($res);
        }else{
            $data = Users::where('username',$request->username)->first();
            if(!empty($data)){ //mengecek apakah data kosong atau tidak
                $res['message'] = "Username Sudah dipakai";
                $res['status'] = "not_ok";
                $res['values'] = [];
                return response($res);
            }else{
                Users::create([
                    'username'  => $request->username,
                    'password'  => md5($request->password),
                ]);
                $res['message'] = "Berhasil Registrasi";
                $res['status'] = "ok";
                $res['values'] = [];
                return response($res);
            }
        }
    }

    public function getPlaylist(Request $request)
    {
        $ip =  $_SERVER["SERVER_ADDR"] ?: gethostbyaddr($_SERVER["SERVER_ADDR"]);
        $data = Playlist::where('user_id',$ip)->get();
        if(count($data) > 0){ //mengecek apakah data kosong atau tidak
            $res['message'] = "Success!";
            $res['values'] = $data;
            return response($res);
        }
        else{
            $res['message'] = "Empty!";
            $res['values'] = [];
            return response($res);
        }
    }

    public function heart(Request $request)
    {
        if (!empty($request->id)) {
            $ip =  (!empty($request->user_id)) ?$request->user_id: gethostbyaddr($_SERVER["SERVER_ADDR"]);
            $data = DB::table('tbr_heart AS h')
            ->where('user_id',$ip)
            ->where('music_id',$request->id)
            ->first();
            if(!empty($data)){ //mengecek apakah data kosong atau tidak
                Heart::where('id', $data->id)->delete();
                $res['message'] = "Success!";
                $res['values'] = [];
                return response($res);
            }
            else{
                Heart::create([
                    'user_id'    => $ip,
                    'music_id'    => $request->id,
                ]);
                $res['message'] = "Success!";
                $res['values'] = [];
                return response($res);
            }
        }else{
            $res['message'] = "Id Not Found";
            $res['values'] = [];
            return response($res);
        }
    }

    public function getPlaylistMusic(Request $request)
    {
        $ip =  $_SERVER["SERVER_ADDR"] ?: gethostbyaddr($_SERVER["SERVER_ADDR"]);
        $data = DB::table('tbr_playlist_music AS pm')
        ->select('m.id','m.name','m.sing','m.name_file','m.time',"h.id as heart")
        ->join('tbm_music AS m','m.id','=','pm.music_id')
        ->leftJoin('tbr_heart AS h',function($join)use($ip){
            $join->on('m.id','=','h.music_id')
            ->where('h.user_id',$ip);
        })
        ->where('playlist_id',$request->playlist_id)
        ->get();
        if(count($data) > 0){ //mengecek apakah data kosong atau tidak
            $res['message'] = "Success!";
            foreach ($data as $key => $value) {
                $value->src = URL::to('/music/').'/'.$value->name_file;
            }
            $res['values'] = $data;
            return response($res);
        }
        else{
            $res['message'] = "Empty!";
            $res['values'] = [];
            return response($res);
        }
    }

}
