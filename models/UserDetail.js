const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userdetailSchema = new Schema({
	email:{
		type:String,
		required:true
	},
	userid:{
		type:String,
		required:true,
		unique:true
	},
	password:{
		type:String,
		required:true,
	},
	admin:{
		type:Boolean,
		default:false
	}
},{
	timestamps:true
});

var UserDetail = mongoose.model('UserDetail',userdetailSchema);
module.exports = UserDetail;
