<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PlaylistMusic extends Model
{
    protected $table = 'tbr_playlist_music';
    protected $fillable = ['id','music_id','playlist_id'];
    public $timestamps = false;
}
