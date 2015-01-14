// Demo application to learn AngularJS
// Author: Aristides Melendez
// Date: 2015/01/14 11:22 -0500 GTM


'use strict';

/* App Module */

var reviewImage = angular.module('reviewImage', []);

reviewImage.controller('ReviewController', function(){
	
	this.image = {
		stars : '5',
		description : 'Add a description here.',
		clientId : 'aristides'
	};
	
	this.accept = function(image){
		var bla;
		
		image.accepted = true;
	};
	
	this.denied = function(image){
		var blo;
		
		image.accepted = false;
	};
});