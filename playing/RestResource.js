class RestResource {
	constructor(name ='') {
	    this.location = 'http://localhost/kuro/kuro_music/severside/public/';
	}

	async doLogin(data){
    	// Use vue-resource or any other http library to send your request
	    var responseData = await axios
	    .post(this.location+'api/doLogin',{username:data.username,password:data.password})
	    .then(function(response){
	      return response.data;
	    });
	    return responseData;		
	}

	async doRegister(data){
    	// Use vue-resource or any other http library to send your request
	    var responseData = await axios
	    .post(this.location+'api/doRegister',{username:data.username,password:data.password})
	    .then(function(response){
	      return response.data;
	    });
	    return responseData;		
	}

  	async getMusic(data = '',user_id ='') {
    	// Use vue-resource or any other http library to send your request
	    var responseData = await axios
	    .post(this.location+'api/getMusic',{name:data,user_id:user_id})
	    .then(function(response){
	      return response.data;
	    });
	    return responseData;
  	}

  	async getPlaylist() {
    	// Use vue-resource or any other http library to send your request
	    var responseData = await axios
	    .post(this.location+'api/getPlaylist',{})
	    .then(function(response){
	      return response.data;
	    });
	    return responseData;
  	}

  	async getPlaylistMusic(playlist){
		var responseData = await axios
	    .post(this.location+'api/getPlaylistMusic',{playlist_id:playlist.id})
	    .then(function(response){
	      return response.data;
	    });
	    return responseData;
  	}

  	async getRekomendasi(user_id=''){
		var responseData = await axios
	    .post(this.location+'api/getRekomendasi',{user_id:user_id})
	    .then(function(response){
	      return response.data;
	    });
	    return responseData;
  	}

  	async heart(id,user_id = ''){
  		console.log(id,user_id);
		var responseData = await axios
	    .post(this.location+'api/heart',{id:id,user_id:user_id})
	    .then(function(response){
	      return response.data;
	    });
	    return responseData;
  	}

}