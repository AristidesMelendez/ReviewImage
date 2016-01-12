'use strict';

//Controllers
var reviewControllers = angular.module('reviewControllers',[]);

reviewControllers.factory('MyData', function(){
	return {
		imagesReviewed: []
	};
});


// Fetch image from flickr service.
var fetchImages = function ($http, callback){
	
	// First get properties file.
	$http.get('flickr-key.json').then(function (properties){

		var quantity = properties.data.quantity,
			api_key = properties.data.flickrKey,
			endpoint = properties.data.endpoint,
			format = properties.data.format,
			url = endpoint + 'api_key=' + api_key + '&per_page=' + quantity + '&format=' + format;

		// make GET call
		$http.get(url)
		.success(function (data) {

			var photo,
				images = [],
				photos = data.photos.photo;

			for (var i = photos.length - 1; i >= 0; i--) {
				var rootUrl = 'https://farm' + photos[i].farm + '.staticflickr.com/' + photos[i].server + '/' + photos[i].id + '_' + photos[i].secret;
				photo = {
					description: '',
					clientId: photos[i].owner,
					title: photos[i].title,
					url: rootUrl + '_z.jpg',
					thumbnail: rootUrl + '_q.jpg',
					target: 'https://www.flickr.com/photos/' + photos[i].owner + '/' + photos[i].id
				};

				images.push(photo);
			}

			callback(true, images);
		})
		.error(function (data){
			console.log('Error in flickr call.');
			callback(false, []);
		});

	});
};

reviewControllers.controller('reviewController', function($http, $scope, MyData){
	
	var count = 0,
		review = this;
	$scope.loadedImages = MyData.imagesReviewed;
	this.hasPhotos = false;
	this.finishReviews = false;
	
	fetchImages($http, function(hasPhotos, images) {
		$scope.loadedImages.push.apply($scope.loadedImages, images);
		review.hasPhotos = hasPhotos;
		if(images.length > 0){
			review.image = $scope.loadedImages[0];
		}
	    
	});

	this.accept = function(image){
		image.accepted = true;
		this.nextImage();
	};
	
	this.denied = function(image){
		image.accepted = false;
		this.nextImage();
	};

	this.nextImage = function(){
		if(count < ($scope.loadedImages.length - 1)){
			this.image =  $scope.loadedImages[++count];
		} else {
			review.hasPhotos = false;
			review.finishReviews = true;
			// last Image reach.
			this.image = {
				title: 'End of images',
				url: 'http://dummyimage.com/200x200/0f0/f0f'
			}
		}
	};
});

reviewControllers.controller('reportController', function($scope, MyData){
	// show image report.

	console.log('report, number of images: ' + MyData.imagesReviewed.length);
	$scope.imagesReviewed =  MyData.imagesReviewed;

	$scope.sendReport = function (value) {
		alert('Report send at: ' + new Date());
	}

});