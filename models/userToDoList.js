var express = require('express');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var listSchema = new Schema({
	list:{
		type:String
	}
});


var todolistSchema = new Schema({
	userid:{
		type:String,
		required:true,
		unique:true
	},
	mylist:{
		type:Array,
		required:false,
		default:undefined
	}
});

var UserToDoList = mongoose.model('UserToDoList',todolistSchema);

module.exports = UserToDoList;