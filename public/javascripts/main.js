$(document).ready(function(){
	$('.login-form').fadeIn({duration:300, queue:false})
	$('#password').click(function(){
		$('.login-form .password-error').slideUp({duration:100, queue:false});
	})
	$('#userid').click(function(){
		$('.login-form .userid-error').slideUp({duration:100, queue:false});
	})




	$('.submit-btn').click(function(){
		var userid = $('#userid').val();
		var password = $('#password').val();
		console.log(userid,password)
		var con = true;
		if(userid.length == 0){
			$('.login-form .userid-error').slideDown({duration:300, queue:false});
			con = false;
		}
		if(password.length == 0){
			$('.login-form .password-error').slideDown({duration:300, queue:false});
			con = false;
		}
		if(con){
			detail={
				userid:userid,
				password:password
			}
			console.log("aa");
			var url = 'http://localhost:3000/'+userid+'/';
			console.log(url);
			fetch(url,{
				method:'post',
				body:JSON.stringify(detail),
				headers: new Headers({
					'content-type':'application/json'
				})
			})
			.then(res=>res.json())
			.then(data=>{
				if(data.conn){
					alert(data.message);
					location.replace(data.link)
				}
				else{
					$('.server-message').html(data.message).slideDown({duration:300,queue:false});
				}
			})
			.catch(err=>console.log(err))
		}
	})




})