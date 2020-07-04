var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var UserDetail = require('../models/UserDetail');
var UserToDoList = require('../models/userToDoList');




var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.route('/')
.get((req,res,next)=>{
	res.statusCode=200;
	res.setHeader('Content-Type','text/html');
	res.render('index', { title: 'Express' });
})
.post((req,res,next)=>{
	var e = req.body.email;
	var u = req.body.userid;
	var p = req.body.password;
	res.statusCode = 200;
	res.setHeader('Content-Type','application/json');
	var email='';
	var userid='';
	var conn = true;
	for(var i=0;i<e.length;i++){
		if((e[i]>='a' && e[i]<='z') || (e[i]>='A' && e[i]<='Z') || (e[i]>='0' && e[i]<='9') || e[i]=='@' || e[i]=='.' || e[i]=='_')
			email+=e[i];
		else{
			conn=false;
			res.json({conn:false,message:'Invalid email:Error: Unwanted Characters in emailId'});
			break;
		}
	}
	for(var i=0;conn && i<u.length;i++){
		if((u[i]>='a' && u[i]<='z') || (u[i]>='A' && u[i]<='Z') || (u[i]>='0' && u[i]<='9') || u[i]=='@' || u[i]=='.' || u[i]=='_')
			userid+=u[i];
		else{
			conn=false;
			res.json({conn:false,message:'Invalid userid:Error: Unwanted Characters in userid'});
			break;
		}
	}

	console.log(email,userid);

	if(conn){
		UserDetail.findOne({'email':email},'email',function(err,docs){
			if(err){
				console.log('Find Email:error',err);
			}
			else if(!docs){
				UserDetail.findOne({'userid':userid},'userid',function(err,docs){
					if(err){
						console.log('Find userid:error',err);
					}
					else if(!docs){
						UserDetail.create(req.body) 
						.then((detail)=>{
							if(detail){
								console.log(detail);
								res.statusCode = 200;
								res.setHeader('Content-Type','application/json');
								res.json({conn:true,message:'Registered..login to continue!!!',link:'http://localhost:3000/'});
							}
							else{
								res.statusCode = 200;
								res.setHeader('Content-Type','application/json');
								conn = false;
								res.json({conn:false,message:'Unregistered!!!'});
							}
							
						})
						.catch((err)=>next(err));
					}
					else{
						res.json({conn:false,message:'Userid already taken.. Choose another one'});
					}
				})
			}
			else{
				res.json({conn:false,message:'Email Already Exist!!!!'});
			}
		})
	}
	
	
})
.put((req,res,next)=>{
	res.statusCode = 200;
	res.setHeader('Content-Type','application/json');
})
.delete((req,res,next)=>{
	var userid = req.body.userid;
	var password = req.body.password;
	UserDetail.findOne({'userid':userid},'userid password admin',function(err,docs){
		if(docs){
			console.log('Exist\n',docs);
			if(docs.admin){
				if(password === docs.password){
					res.statusCode = 200;
					res.setHeader('Content-Type','application/json');
					UserDetail.remove({})
					.then((resp)=>{
						
						res.json({conn:true,message:'Deleted all details'});

					},(err)=>next(err))
					.catch((err)=>next(err));
				}
				else{
					res.statusCode = 401;
					res.setHeader('Content-Type','application/json');
					res.json({conn:false,message:'Incorrect password!!'});

				}
			}
			else{
				res.statusCode = 401;
				res.setHeader('Content-Type','application/json');
				res.json({conn:false,message:'Cant Delete as you are not admin'})
			}
		}
		else{
			res.statusCode = 401;
			res.setHeader('Content-Type','application/json');
			res.json({conn:false,message:'Userid doesnot exist'})
		}
		

	})
	

});

router.route('/:id')
.get((req,res,next)=>{

			res.statusCode=200;
			res.setHeader('Content-Type','text/html');
			res.sendFile('/home/bikrant/Desktop/Web Development/LoginPage-NodeJS (copy)/public/mylists.html');
	

})
.post((req,res,next)=>{
	res.statusCode=200;
	res.setHeader('Content-Type','application/json');
	var password = req.body.password;
	UserDetail.findOne({'userid':req.params.id},'password',function(err,docs){
		if(err){
			res.statusCode = 404;
			res.setHeader('Content-Type','application/json');
			console.log(err);
			res.json({conn:false,message:'Error',Error:err});
		}
		else if(docs){
			if(password === docs.password){
				res.statusCode = 200;
				res.setHeader('Content-Type','application/json');
				var url = 'http://localhost:3000/'+req.params.id;
				res.json({conn:true,message:'Successfully Logged in',link:url});
			}
			else{
				res.statusCode = 401;
				res.setHeader('Content-Type','application/json');
				res.json({conn:false,message:'Incorrect userid or password!!'});
			}
		}
		else{
			res.statusCode = 401;
			res.setHeader('Content-Type','application/json');
			res.json({conn:false,message:'No such userid exist'});
		}
	})

})

.put((req,res,next)=>{
	res.statusCode = 200;
	res.setHeader('Content-Type','application/json');
})
.delete((req,res,next)=>{
	var userid = req.body.userid;
	var password = req.body.password;
	UserDetail.findOne({'userid':userid},'userid password admin',function(err,docs){
		if(docs){
			console.log('Exist\n',docs);
			if(docs.admin){
				if(password === docs.password){
					res.statusCode = 200;
					res.setHeader('Content-Type','application/json');
					UserDetail.remove({})
					.then((resp)=>{
						
						res.json({conn:true,message:'Deleted all details'});

					},(err)=>next(err))
					.catch((err)=>next(err));
				}
				else{
					res.statusCode = 401;
					res.setHeader('Content-Type','application/json');
					res.json({conn:false,message:'Incorrect password!!'});

				}
			}
			else{
				res.statusCode = 401;
				res.setHeader('Content-Type','application/json');
				res.json({conn:false,message:'Cant Delete as you are not admin'})
			}
		}
		else{
			res.statusCode = 401;
			res.setHeader('Content-Type','application/json');
			res.json({conn:false,message:'Userid doesnot exist'})
		}
		

	})
	

});


router.route('/:id/mylistvalues')
.get((req,res,next)=>{
	var userid = req.params.id;
	UserDetail.findOne({'userid':userid},'userid password',(err,docs)=>{
		if(err){
			console.log(`/${req.params.id}/mylist Error::${err}`);
		}
		if(docs){
			console.log('Exist');
			UserToDoList.findOne({'userid':userid},'userid mylist',(err,docs)=>{
				if(err){
					console.log(`/${req.params.id}/mylist Error::${err}`);
				}
				else{
					if(docs){
						res.statusCode = 200;
						res.setHeader('Content-Type','application/json');
						res.json({conn:true,message:`Fetched Your List ${docs.mylist}`,list:docs})
					}
					else{
						
						var newlist = {
							'userid':userid,
							'mylist':['hello','bikrant']
						};
						UserToDoList.create(newlist)
						.then((newlist)=>{
							res.statusCode = 200;
							res.setHeader('Content-Type','application/json');
							res.json({conn:true,message:'Your New List Created',list:newlist})
						})

					}
				}
				
			})
			

		}
		else{
			res.end(`Not Exists${req.params.id}`)
		}
	})
},(err)=>console.log(err))
// .post((req,res,next)=>{

// },(err)=>console.log(err))
.post((req,res,next)=>{
	var userid = req.body.userid;
	var newvalue = req.body.val;
	UserToDoList.findOneAndUpdate({'userid':userid},{$set:{mylist:newvalue}},{new: true , upsert:true},
	(err,docs)=>{
		if(err){
			console.log(err);
			return;
		}
		if(docs){
			console.log(docs);
			res.statusCode = 200;
			res.setHeader('Content-Type','application/json');
			res.json(docs)
		}
		else{
			console.log('nothing');
			res.statusCode = 200;
			res.setHeader('Content-Type','application/json');
			res.json({"nothing":"nothing"})
		}
	})
	.then((msg)=>{
		console.log(msg);
	})



},(err)=>console.log(err))


module.exports = router;
