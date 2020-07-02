<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Heart extends Model
{
    protected $table = 'tbr_heart';
    protected $fillable = ['id','music_id','user_id'];
    public $timestamps = false;
}
