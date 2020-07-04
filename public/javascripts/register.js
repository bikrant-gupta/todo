$(document).ready(function(){
	
	$('.register-form').fadeIn({duration:300, queue:false})
	$('#email').click(function(){
		$('.register-form .email-error').slideUp({duration:100, queue:false});
	})
	$('#password').click(function(){
		$('.register-form .password-error').slideUp({duration:100, queue:false});
	})
	$('#confirm-password').click(function(){
		$('.register-form .confirm-password-error').slideUp({duration:100, queue:false});
	})
	$('#userid').click(function(){
		$('.register-form .userid-error').slideUp({duration:100, queue:false});
	})




	$('.register-btn').click(function(){
		var email = $('#email').val();
		var userid = $('#userid').val();
		var password = $('#password').val();
		var confirm_password = $('#confirm-password').val();
		console.log(userid,password)
		var con = true;
		if(email.length == 0){
			$('.register-form .email-error').slideDown({duration:300, queue:false});
			con = false;
		}
		if(userid.length < 6){
			$('.register-form .userid-error').slideDown({duration:300, queue:false});
			con = false;
		}
		if(password.length < 6){
			$('.register-form .password-error').slideDown({duration:300, queue:false});
			con = false;
		}
		if(password !== confirm_password || confirm_password.length == 0){
			$('.register-form .confirm-password-error').slideDown({duration:300, queue:false});
			con = false;
		}
		const detail={
					email:email,
					userid:userid,
					password:password
		};
		if(con){
			console.log("aabb");
			fetch('http://localhost:3000/',{
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
					location.replace(data.link);
				}
				else{
					$('.server-message').html(data.message).slideDown({duration:300, queue:false});
				}
				// if(data.conn)==-1) $('.server-message').html(data).slideDown({duration:300, queue:false});
				// else alert(data.substr(5));
				// console.log(data);
			})
			.catch(err=>console.log(err));
		}
	})


})