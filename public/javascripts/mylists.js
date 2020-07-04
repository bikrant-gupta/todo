
$(document).ready(function(){
	var userid = 'wbikrant';
	var len;
	fetch(`http://localhost:3000/${userid}/mylistvalues`,{
		method:'get'
	})
	.then(res=>res.json())
	.then(data=>{
		// console.log(data.list.mylist);
		var list = data.list.mylist;
		len = list.length;

		for(var i=0;i<list.length;i++){
			$('.list-holder').prepend(`
			<div class="input-group my-list-item" id='l${i}' >
				<input type="text" placeholder="type here" class="form-control list-value" value='${list[i]}' id='list${i}' readonly for="no">
				<div class="input-group-append">
					<button class="btn edit" for="l${i}" ><i class="fa fa-lg fa-edit"></i></button>
				</div>
				<div class="input-group-append">
					<button class="btn delete" for="l${i}"><i class="fa fa-lg fa-trash" ></i></button>
				</div>
					
			</div>
			`)
		}
		// $('.edit').css('color','rgb(0,200,0')
		// $('.delete').css('color','rgb(200,0,0)')
		// $('.edit').css('background-color','#333')
		// $('.delete').css('background-color','#333')
		// // console.log(data.list.mylist,data)
		hii(userid);
	})
	.catch(err=>console.log(err));



	function hii(userid){
		
		$('.list-value').keydown(typing);
		function blured(aa){
			console.log('bb',aa)
			$(this).attr('readonly','true');
			$(this).attr('for','no');
		}
		function typing(){
			var readonly = $(this).attr('for');
			
			if(readonly=='no'){
				alert('press edit button to edit');
			}
			else{
				update();
			}
			// console.log(readonly);
		}
		$('.list-value').blur(blured);
		// function blured(){
		// 	$(this).attr('readonly','true');
		// 	$(this).attr('for','no');
		// }

		$('.edit').click(function(){
			var id = $(this).attr('for').substr(1);
			id = '#list'+id;
			$(id).removeAttr('readonly');
			$(id).attr('for','yes');
			// console.log(arr);
			// console.log(this);
		})

		$('.delete').click(function(){
			var id = $(this).attr('for');
			$(`#${id}`).empty();
			// console.log('deleted',id);
			update();
		})

		
	}

	$('.add-btn').click(addnew);

	$('.new-value').keydown(function(){
		if(event.keyCode==13){
				addnew();
		}
	})


	function addnew(){
		// console.log(this);
		var newval = $('.new-value').val();
		$('.list-holder').prepend(`
			<div class="input-group my-list-item" id='l${len}'>
				<input type="text" placeholder="type here" class="form-control list-value" value="${newval}" id='list${len}' readonly>
				<div class="input-group-append">
					<button class="btn edit" for='l${len}' ><i class="fa fa-lg fa-edit"></i>
				</div>
				<div class="input-group-append">
					<button class="btn delete" for='l${len}'><i class="fa fa-lg fa-trash"></i>
				</div>
					
			</div>
		`);
		hii(userid);
		var t = $('.list-holder').children();
		$('.new-value').attr('value','');
		len++;
		update();
		// console.log(len);
	}



	function update(){
		var arr=[];
			for(i=0;i<len;i++){
				var t = $(`#list${i}`).val();
				if(t) arr.push(t)
			}

			fetch(`http://localhost:3000/${userid}/mylistvalues`,{
				method:'post',
				body:JSON.stringify({
					userid:userid,
					val:arr
				}),
				headers: new Headers({
					'content-type':'application/json'
				})
			})
			.then(res=>res.json())
			.then(data=> {

			})
			.catch(err=>console.log(err));
	}
	
	

})