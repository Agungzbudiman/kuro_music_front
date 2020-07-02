<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Music extends Model
{
    protected $table = 'tbm_music';
    public $incrementing = false;
    protected $fillable = ['id','name','time','sing','name_file'];
    public $timestamps = false;
}
