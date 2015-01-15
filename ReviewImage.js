// Demo application to learn AngularJS
// Author: Aristides Melendez
// Date: 2015/01/14 11:22 -0500 GTM


'use strict';

/* App Module */

var reviewImage = angular.module('reviewImage', []);

reviewImage.controller('ReviewController', function(){
	
	var count = 0;
	var parent = this;

	this.images = [
		{
			stars : '5',
			description : 'Add a description here.',
			clientId : 'aristides',
			url: 'http://dummyimage.com/200x200/000/fff',
			title: 'image 1'
		},
		{
			stars : '3',
			description : 'Add a description here.',
			clientId : 'persona2',
			url: 'http://dummyimage.com/200x200/e90/00f/',
			title: 'imagen 2'
		},
		{
			stars : '4',
			description : 'Add a description here.',
			clientId : 'persona3',
			url: 'http://dummyimage.com/200x200/00d/000',
			title: 'immagine 3'
		}
	];

	this.image = this.images[count];
	
	this.accept = function(image){
		image.accepted = true;
		this.nextImage();
	};
	
	this.denied = function(image){
		image.accepted = false;
		this.nextImage();
	};

	this.nextImage = function(){
		console.log('xopa ' + count);
		console.log('images length: ' + this.images.length);

		if(count < (this.images.length - 1)){
			this.image =  this.images[++count];
		} else {
			// last Image reach.
			this.image = {
				title: 'End of images',
				url: 'http://dummyimage.com/200x200/0f0/f0f',
				
			}
		}

	};
});

reviewImage.directive('imageViewForm', function(){
	return {
		retrict: 'E',
		templateUrl: 'imageViewForm.html'
		//controller: ReviewController()

	};

	
});