// Demo application to learn AngularJS
// Author: Aristides Melendez
// Date: 2015/01/14 11:22 -0500 GTM


'use strict';

/* App Module */

var reviewImage = angular.module('reviewImage', []);

var reviewController = function($http){
	
	var count = 0;
	var review = this;
	var loadedImages = [];
	this.hasPhotos = false;

	var fetchImages = function ($http){

		var url = 'https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=17592ab295bfffea2dbfac2566bb9cd0&per_page=20&format=json&nojsoncallback=1';

		$http.get(url)
		.success(function (data) {

			var photo;
			for (var i = data.photos.photo.length - 1; i >= 0; i--) {
				var rootUrl = 'https://farm' + data.photos.photo[i].farm + '.staticflickr.com/' + data.photos.photo[i].server + '/' + data.photos.photo[i].id + '_' + data.photos.photo[i].secret;
				photo = {
					description: '',
					clientId: data.photos.photo[i].owner,
					title: data.photos.photo[i].title,
					url: rootUrl + '_z.jpg',
					thumbnail: rootUrl + '_q.jpg',
					target: 'https://www.flickr.com/photos/' + data.photos.photo[i].owner + '/' + data.photos.photo[i].id
				};

				loadedImages.push(photo);
			}

			console.log('loadedImages: ' + loadedImages.length);
			review.image = loadedImages[0];
			review.hasPhotos = true;
		})
		.error(function (data){
			console.log('error in get call.');
		});
	};
	
	fetchImages($http);

	this.accept = function(image){
		image.accepted = true;
		this.nextImage();
	};
	
	this.denied = function(image){
		image.accepted = false;
		this.nextImage();
	};

	this.nextImage = function(){
		if(count < (loadedImages.length - 1)){
			this.image =  loadedImages[++count];
		} else {
			review.hasPhotos = false;
			// last Image reach.
			this.image = {
				title: 'End of images',
				url: 'http://dummyimage.com/200x200/0f0/f0f'
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