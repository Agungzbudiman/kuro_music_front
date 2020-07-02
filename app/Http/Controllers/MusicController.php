<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Music;
use App\Http\MP3File;
use File;

class MusicController extends Controller
{

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if ($request->session()->has('dataLogin')) {
                return $next($request);
            }else{
                return redirect()->action('LoginController@index')->with('status', 'Login Terlebih dahulu');
            }
        });
    }

    public function index()
    {
        // mengambil data dari table pegawai
        $musics = DB::table('tbm_music')->get();
        // mengirim data musics ke view index
        return view('music.index',['musics' => $musics]);
    }

    public function tambah()
    {
    	return view('music.tambah');
    }

    public function doAdd(Request $request)
    {
        $this->validate($request, [
            'name_file' => 'required|file',
            'name' => 'required',
            'sing' => 'required',
        ]);

        if (empty($_FILES['name_file']['tmp_name'])) {
            return redirect()->back()->with('status', 'File Kosong!');
        }else{
            $permitted_chars = 'abcdefghijklmnopqrstuvwxyz';
            $id = substr(str_shuffle($permitted_chars), 0, 5).time();
     
            $path = $_FILES['name_file']['name'];
            $ext = pathinfo($path, PATHINFO_EXTENSION);
            $name_file = $id.".".$ext;
            // menyimpan data file yang diupload ke variabel $file
            $file = $request->file('name_file');
            $mp3 = new MP3File($_FILES['name_file']['tmp_name']);
            $time = $mp3->getDuration();
            // isi dengan nama folder tempat kemana file diupload
            $tujuan_upload = 'music';
            $file->move($tujuan_upload,$name_file);
     
            Music::create([
                'id'    => $id,
                'name_file'  => $name_file,
                'time' => gmdate("i:s", $time),
                'name'  => $request->name,
                'sing'  => $request->sing,
            ]);
            return redirect()->action('MusicController@index')->with('status', 'Berhasil Di Upload!');;
        }
        // echo json_encode($request->all());
        // die;
    }

    public function doUpdate(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'sing' => 'required',
        ]);
        if (empty($_FILES['name_file']['tmp_name'])) {
            Music::where('id',$request->id)->update([
                'name'  => $request->name,
                'sing'  => $request->sing,
            ]);
            return redirect()->action('MusicController@index')->with('status', 'Berhasil Di Update!');
        }else{
            $permitted_chars = 'abcdefghijklmnopqrstuvwxyz';
            $id = substr(str_shuffle($permitted_chars), 0, 5).time();
     
            $path = $_FILES['name_file']['name'];
            $ext = pathinfo($path, PATHINFO_EXTENSION);
            $name_file = $id.".".$ext;
            // menyimpan data file yang diupload ke variabel $file
            $file = $request->file('name_file');
            $mp3 = new MP3File($_FILES['name_file']['tmp_name']);
            $time = $mp3->getDuration();
            // isi dengan nama folder tempat kemana file diupload
            $tujuan_upload = 'music';
            $file->move($tujuan_upload,$name_file);
     
            Music::where('id',$request->id)->update([
                'name_file'  => $name_file,
                'time' => gmdate("i:s", $time),
                'name'  => $request->name,
                'sing'  => $request->sing,
            ]);
            return redirect()->action('MusicController@index')->with('status', 'Berhasil Di Update!');
        }
    }

    public function edit($id)
    {
        $music = Music::where('id',$id)->first();
        $music->id_music = $id;
        return view('music.edit',['music'=>$music]);
    }

    public function delete($id)
    {
        File::delete('music/'.$id.'.mp3');
        $deletedRows = Music::where('id', $id)->delete();
        return redirect()->action('MusicController@index')->with('status', 'Berhasil Di Delete!');;
    }
}
