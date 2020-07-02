<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Playlist extends Model
{
    protected $table = 'tbr_playlist';
    protected $fillable = ['id','user_id','playlist_name'];
    public $timestamps = false;
}
