// Demo application to learn AngularJS
// Author: Aristides Melendez
// Date: 2015/01/14 11:22 -0500 GTM


'use strict';

/* App Module */

var reviewImage = angular.module('reviewImage', []);

var reviewController = function($http){
	
	var count = 0;
	this.images = [];
	var loadedImages = this.images;

	var fetchImages = function ($http){

		var url = 'https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=17592ab295bfffea2dbfac2566bb9cd0&per_page=20&format=json&jsoncallback=success',
		    argumentos = { };

		$http.get(url, argumentos)
		.success(function (data) {
			var results = data.substring(8,data.length);
			results = results.substring(0, results.length-1);
			results = JSON.parse(results);
			console.log(data.photos);

			var photo;
			for (var i = results.photos.photo.length - 1; i >= 0; i--) {
				photo = {
					description: '',
					clientId: results.photos.photo[i].owner,
					title: results.photos.photo[i].title,
					url: 'https://farm' + results.photos.photo[i].farm + '.staticflickr.com/' + results.photos.photo[i].server + '/' + results.photos.photo[i].id + '_' + results.photos.photo[i].secret + '_n.jpg'
				};

				
				loadedImages.push(photo);
			};

			//loadedImages = data;
			return;
		})
		.error(function (data){
			console.log('error in get call.');
		});
	};

	
	
	fetchImages($http);
	this.image = this.images[count];
	
	//this.images = [
	// 	{
	// 		stars : '5',
	// 		description : 'Add a description here.',
	// 		clientId : 'aristides',
	// 		url: 'http://dummyimage.com/200x200/000/fff',
	// 		title: 'image 1'
	// 	},
	// 	{
	// 		stars : '3',
	// 		description : 'Add a description here.',
	// 		clientId : 'persona2',
	// 		url: 'http://dummyimage.com/200x200/e90/00f/',
	// 		title: 'imagen 2'
	// 	},
	// 	{
	// 		stars : '4',
	// 		description : 'Add a description here.',
	// 		clientId : 'persona3',
	// 		url: 'http://dummyimage.com/200x200/00d/000',
	// 		title: 'immagine 3'
	// 	}
	// ];


	this.accept = function(image){
		image.accepted = true;
		this.nextImage();
	};
	
	this.denied = function(image){
		image.accepted = false;
		this.nextImage();
	};

	this.nextImage = function(){
		
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

};


reviewImage.controller('ReviewController', ['$http',reviewController]);

reviewImage.directive('imageViewForm', function(){
	return {
		retrict: 'E',
		templateUrl: 'imageViewForm.html',
		controller: reviewController,
		controllerAs: 'reviewCtrl'

	};

	
});