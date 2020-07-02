// PRESS THE MENU BUTTON TO TRIGGER ANIMATION
// PRESS PLAY BUTTON TO LISTEN THE DEMO SONG

// As seen on: "https://dribbble.com/shots/2144866-Day-5-Music-Player-Rebound/"

// THANK YOU!
var myApi = new RestResource();

Vue.component('player',{
  template : '<div class="screen">'+
                '<div class="alert" v-if="alert.show">'+
                  '<span class="closebtn">&times;</span>'+
                  '<strong>Info!</strong> '+
                  '{{alert.message}}'+
                '</div>'+
                '<div class="login" v-if="!isLogin">'+
                  '<img src="gif/logo.png">'+
                  '<div style="    position: absolute;bottom: 290px;width: 100%;display: block;">'+
                    '<h1 style="text-align:center;color:white;">Login Form</h1>'+
                    '<input type="text" placeholder="Input Username" v-model="formLogin.username"/>'+
                    '<br>'+
                    '<input type="password" placeholder="Input Password" v-model="formLogin.password" style="margin-top:10px;"/>'+
                    '<button class="buttonAll" v-on:click="doLogin">Login</button>'+
                  '</div>'+
                  '<div style="    position: absolute;bottom: 50px;width: 100%;display: block;">'+
                    '<h1 style="text-align:center;color:white;">Register Form</h1>'+
                    '<input type="text" placeholder="Input Username" v-model="formRegister.username"/>'+
                    '<br>'+
                    '<input type="password" placeholder="Input Password" v-model="formRegister.password" style="margin-top:10px;"/>'+
                    '<button class="buttonAll" v-on:click="doRegister">Register</button>'+
                  '</div>'+
                '</div>'+
                '<div class="music" v-if="isLogin">'+
                  '<input type="checkbox" value="None" v-model="music.list" id="magicButton" name="check" />'+
                  '<label class="main" v-on:click="listMusic"></label>'+
                  '<div class="coverImage"></div>'+
                  '<div class="sign-out" v-on:click="doLogout"></div>'+
                  '<div class="search" v-on:click="searchMusic"></div>'+
                  '<div class="bodyPlayer"></div>'+
                  '<table class="list">'+
                    '<tr v-if="music.isSearch" id="searchMusic">'+
                      '<td colspan="4">'+
                        '<input type="text" v-model="music.textSearch" v-on:keyup="onSearchMusic" placeholder="Search Music ...">'+
                      '</td>'+
                    '</tr>'+
                    '<list-song v-for="item,index in musics" v-bind:item="item" v-bind:keys="index" v-bind:onMusic="music" v-on:selectMusic="selectMusic" v-on:selectHeart="selectListHeart" v-on:removeMusic="removeMusic" v-on:addMusic="addMusic"></list-song>'+
                    '<list-playlist v-for="item,index in playlist" v-bind:item="item" v-bind:keys="index" v-bind:onMusic="music" v-on:selectPlaylist="selectPlaylist"></list-playlist>'+
                  '</table>'+
                  '<div class="shadow"></div>'+
                  '<div class="bar"></div>'+
                  '<div class="info">'+
                      '<h4>{{music.audio.name}}</h4>'+
                      '<h3>{{music.audio.sing}}</h3>'+
                  '</div>'+
                  '<audio id="audio" ref="audio" controls>'+
                      '<source v-bind:src="music.audio.src"/>'+
                  '</audio>'+
                  '<table class="player">'+
                      '<tr>'+
                          '<td>'+
                              '<input type="checkbox" id="backward"/>'+
                              '<label class="backward" for="backward" v-on:click="prevMusic"></label>'+
                          '</td>'+
                          '<td>'+
                              '<input type="checkbox" id="play" v-model="music.play" v-on:click="togglePlayPause()"/>'+
                              '<label class="play" for="play"></label>'+
                          '</td>'+
                          '<td>'+
                              '<input type="checkbox" id="forward"/>'+
                              '<label class="forward" for="forward" v-on:click="nextMusic"></label>'+
                          '</td>'+
                      '</tr>'+
                      '<tr id="seekbar"><td colspan="3"><input type="range" v-model="music.seekbar" v-on:input="slidingSeek" v-on:change="changeSeek" id="seek" value="0" max="100"/></td></tr>'+
                  '</table>'+
                  '<table class="footer">'+
                      '<tr>'+
                          '<td>'+
                              '<input type="checkbox" v-model="music.audio.heart" id="love" v-on:change="selectHeart"/>'+
                              '<label class="love" for="love"></label>'+
                          '</td>'+
                          '<td>'+
                              '<input type="checkbox" v-model="music.shuffle" id="shuffle"/>'+
                              '<label class="shuffle" for="shuffle"></label>'+
                          '</td>'+
                          '<td>'+
                              '<input type="checkbox" v-model="music.repeat" id="repeat"/>'+
                              '<label class="repeat" for="repeat"></label>'+
                          '</td>'+
                          '<td>'+
                              '<input style="display:none" type="checkbox" id="options"/>'+
                              '<label style="display:none" class="options" for="options"></label>'+
                              '<p style="text-align:center">{{music.audio.time}}</p>'+
                          '</td>'+
                      '</tr>'+
                  '</table>'+
                  '<div class="current">'+
                      '<h2>{{music.audio.name}}</h2>'+
                  '</div>'+
                '</div>'+
              '</div>',
  data: function () {
    return {
      result:undefined,
      isLogin:false,
      formLogin:{username:'',password:''},
      formRegister:{username:'',password:''},
      dataLogin:{},
      musicsTemp : [],
      musics : [],
      playlistTemp : [],
      playlist : [],
      alert:{show:false,message:''},
      music: {
        play:true,
        list:false,
        seekbar:0,
        idxPlay:0,
        playing:'',
        shuffle:false,
        repeat:false,
        textSearch:'',
        isSearch:false,
        isSong:false,
        audio:{
          src:''
        }
      }
    }
  },
  methods : {
    setCookie(username, user_id, exdays = 7) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = "username="+username+";"+expires+";path=/";
      document.cookie = "user_id="+user_id+";"+expires+";path=/";
    },
    deleteCookie(){
      document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    },
    getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    showAlert(message = ''){
      this.alert.message = message;
      this.alert.show = true;
      setTimeout(()=>
        this.alert.show = false
      , 1000);
    },
    doLogin(){
      var dataNya = this;
      myApi.doLogin(this.formLogin).then(function(data){
        dataNya.showAlert(data.message);
        if (data.status == 'ok') {
          dataNya.isLogin = true;
          console.log(data.values);
          dataNya.setCookie(data.values.username,data.values.id);
          setTimeout(()=>
            dataNya.getRekomendasi()
          , 1000);
        }
      });
    },
    doLogout(){
      this.deleteCookie();
      this.isLogin = false;
      this.pauseMusic();
    },
    doRegister(){
      var dataNya = this;
      myApi.doRegister(this.formRegister).then(function(data){
        dataNya.showAlert(data.message);
      });
    },
    searchMusic(){
      this.music.textSearch = "";
      this.openList('search');
    },
    listMusic(){
      this.openList('list');
    },
    txtToJSON(data){
      return JSON.parse(data);
    },
    onSearchMusic(event){
      if(event.key == "Enter")
      {
        var dataNya = this;
        if (this.music.textSearch != '') {
          myApi.getMusic(this.music.textSearch).then(function(data){
            if (data.message != 'Empty!') {
              dataNya.musics = data.values;
              console.log(dataNya.musics);
            }
          });
        }
      }
    },
    checkTempMusic(){
      if (this.musicsTemp.length>0) {
        this.musics = this.musicsTemp;
        this.musicsTemp = [];
      }
    },
    selectHeart(){
      this.musics[this.music.idxPlay].heart = this.music.audio.heart;
      myApi.heart(this.music.audio.id,this.getCookie('user_id')).then(function(data){
        
      });
    },
    addMusic(music){
      idxTmp = this.musicsTemp.findIndex(x => x.id ===music.id);
      if (idxTmp == -1) {
        this.musicsTemp.push(music);
      }

      // sementara
      index = this.musics.findIndex(x => x.id ===music.id);
      this.musics.splice(index,1);
    },
    removeMusic(music){
      index = this.musics.findIndex(x => x.id ===music.id);
      this.musics.splice(index,1);
    },
    openList(target=''){
      this.music.isSearch = false;
      this.checkTempMusic();
      if (this.music.list) {
        this.music.list = false;
        // this.music.isSong = true;
        if (target == 'search') {
          this.musicsTemp = this.musics;
          this.musics = [];
          this.music.isSearch = true;
          this.music.list = true;
          // this.music.isSong = true;
        }
      }else{
        if (target == 'search') {
          this.musicsTemp = this.musics;
          this.musics = [];
          this.music.isSearch = true;
          // this.music.isSong = true;
        }
        this.music.list = true;
      }
      // console.log(this.music.list);
    },
    nextMusic(){
      this.checkTempMusic();
      var jumlahMusic = this.musics.length;
      if (this.music.idxPlay+1 > jumlahMusic-1) {
        this.music.idxPlay = 0;
      }else{
        this.music.idxPlay++;
      }
      this.selectMusic(this.musics[this.music.idxPlay]);
      this.playMusic();
    },
    prevMusic(){
      this.checkTempMusic();
      var jumlahMusic = this.musics.length;
      if (this.music.idxPlay-1 < 0) {
        this.music.idxPlay = jumlahMusic-1;
      }else{
        this.music.idxPlay--;
      }
      this.selectMusic(this.musics[this.music.idxPlay]);
      this.playMusic();
    },
    playMusic(){
      audio.play();
      this.music.play = true;
      this.music.playing = setInterval(() => {
        this.music.seekbar = (audio.currentTime/audio.duration)*100;
        if (this.music.seekbar == 100) {
          this.pauseMusic();
          if (this.music.repeat) {
            this.playMusic();
          }
          if (!this.music.repeat && this.music.shuffle) {
            var jumlahMusic = this.musics.length;
            var idxNext = this.music.idxPlay + Math.floor((Math.random() * 3) + 1);
            if (idxNext > jumlahMusic-1) {
              this.music.idxPlay = 0;
            }else{
              this.music.idxPlay = idxNext
            }
            this.selectMusic(this.musics[this.music.idxPlay]);
            this.playMusic();
          }else{
            if (this.musics.length > 1) {
              var jumlahMusic = this.musics.length;
              var idxNext = this.music.idxPlay+1;
              console.log(idxNext,jumlahMusic-1);
              if (idxNext > jumlahMusic-1) {
                this.music.idxPlay = 0;
                this.selectMusic(this.musics[this.music.idxPlay]);
                this.pauseMusic();
              }else{
                this.music.idxPlay = idxNext;
                this.selectMusic(this.musics[this.music.idxPlay]);
                this.playMusic();
              }
            }
          }
        }
      }, 100);
      var coverImage = document.getElementsByClassName('coverImage')[0];
      coverImage.style.background = 'url(gif/gitar.gif) no-repeat';
      coverImage.style.backgroundPosition = 'center';
      coverImage.style.backgroundSize = 'cover';
      // console.log(coverImage.style.background = 'black');
    },
    pauseMusic(image = ''){
      audio.pause();
      clearInterval(this.music.playing);
      if (image == '') {
        var coverImage = document.getElementsByClassName('coverImage')[0];
        coverImage.style.background = 'black'; 
      }
      // console.log(coverImage.style.background = 'black');
    },
    togglePlayPause(){
      if (audio.paused || audio.ended) {
        this.playMusic();
        this.music.play = false;
      } else {
        this.pauseMusic();
        this.music.play = true;
      }
      // console.log(audio.currentTime);
      // console.log(audio.duration);
      // console.log(audio.currentTime/audio.duration);
    },
    selectMusic(music,isFirst = ''){
      this.music.audio = music;
      this.music.play = false;
      this.music.seekbar = 0;
      audio.load();
      clearInterval(this.music.playing);
      // console.log(audio.currentTime);
      console.log(this.music);
      if (isFirst == '') {
        this.playMusic();
      }else{
        this.pauseMusic();
        var coverImage = document.getElementsByClassName('coverImage')[0];
        coverImage.style.background = 'url(gif/gitar.gif) no-repeat';
        coverImage.style.backgroundPosition = 'center';
        coverImage.style.backgroundSize = 'cover';
      }
    },
    slidingSeek(){
      if (audio.paused || audio.ended) {
      }else{
        this.pauseMusic('no');
      }
      audio.currentTime = (this.music.seekbar/100)*audio.duration;
      // console.log('seek');
    },
    changeSeek(){
      this.playMusic();
    },
    selectListHeart(music){
      console.log(this.musics);
      if(this.music.audio.id == music.id){
        this.music.audio.heart = !music.heart;
      }
      myApi.heart(music.id,this.getCookie('user_id')).then(function(data){
      });
    },
    selectPlaylist(playlist){
      var dataNya = this;
      myApi.getPlaylistMusic(playlist).then(function(data){
        if (data.message != 'Empty!') {
          dataNya.musics = data.values;
          dataNya.music.isSong = true;
          console.log(dataNya);
        }
      });
    },
    getPlaylist(){
      console.log('ini nyala bro');
      var dataNya = this;
      myApi.getPlaylist().then(function(data){
        if (data.message != 'Empty!') {
          dataNya.playlist = data.values;
        }
      });
    },
    getRekomendasi(){
      console.log('ini nyala bro');
      this.music.isSong = true;
      this.music.play = false;
      var dataNya = this;
      if (this.getCookie('username')!= '') {
        this.isLogin = true;
        myApi.getRekomendasi(this.getCookie('user_id')).then(function(data){
          if (data.message != 'Empty!') {
            dataNya.musics = data.values;
            dataNya.selectMusic(dataNya.musics[0],'first');
          }
        });
      }
    }
  },
  beforeMount(){
    this.getRekomendasi();
  }
})
Vue.component('list-song',{
  props: ['item','keys','onMusic','isSearch'],
  template :'<tr class="song" v-if="onMusic.isSong" v-bind:class="[item.id == onMusic.audio.id ? songSelect : null]">'+
                '<td class="nr" v-on:click="selectMusic">'+
                    '<h5>{{ keys+1 }}</h5>'+
                '</td>'+
                '<td class="title" v-on:click="selectMusic">'+
                    '<h6>{{item.name}}</h6>'+
                '</td>'+
                '<td class="length" v-on:click="selectMusic">'+
                    '<h5>{{item.time}}</h5>'+
                '</td>'+
                '<td>'+
                    '<div class="optionMusics" v-if="!onMusic.isSearch">'+
                    '<i class="fa fa-times" v-on:click="removeMusic"></i>'+
                    '<input type="checkbox" v-model="item.heart" :id="item.id"/>'+
                    '<label class="zmr" :for="item.id" v-on:click="selectHeart"></label>'+
                    '</div>'+
                    '<div class="optionAddMusics" v-if="onMusic.isSearch">'+
                    '<i class="fa fa-plus" v-on:click="addMusic"></i>'+
                    '</div>'+
                '</td>'+
            '</tr>',
  methods : {
    selectMusic(){
      this.$emit('selectMusic',this.item)
    },
    selectHeart(){
      this.$emit('selectHeart',this.item)
    },
    addMusic(){
      this.$emit('addMusic',this.item)
    },
    removeMusic(){
      this.$emit('removeMusic',this.item)
    }
  },
  data:function(){
    return {
      songSelect:'songSelect'
    }
  }
})

Vue.component('list-playlist',{
  props: ['item','keys','onMusic','isSearch'],
  template :'<tr class="playlist" v-if="!onMusic.isSong">'+
                '<td class="nr" v-on:click="selectPlaylist">'+
                    '<h5>{{ keys+1 }}</h5>'+
                '</td>'+
                '<td class="title" v-on:click="selectPlaylist">'+
                    '<h6>{{item.playlist_name}}</h6>'+
                '</td>'+
                '<td>'+
                    '<div class="optionMusics">'+
                    '<i class="fa fa-pencil" style="color:blue" v-on:click="removeMusic"></i>'+
                    '<i class="fa fa-times" v-on:click="removeMusic"></i>'+
                    '</div>'+
                '</td>'+
            '</tr>',
  methods : {
    selectPlaylist(){
      this.$emit('selectPlaylist',this.item)
    },
    selectHeart(){
      this.$emit('selectHeart',this.item)
    },
    addMusic(){
      this.$emit('addMusic',this.item)
    },
    removeMusic(){
      this.$emit('removeMusic',this.item)
    }
  },
  data:function(){
    return {
      songSelect:'songSelect'
    }
  }
})
var app = new Vue({
  el: '#app',
  data: {
    'message': 'X'
  },
});