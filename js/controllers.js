'use strict';

//Controllers
var reviewControllers = angular.module('reviewControllers',[]);

reviewControllers.factory('MyData', function(){
	return {
		imagesReviewed: []
	};
});

reviewControllers.controller('reviewController', function($http, $scope, MyData){
	
	var count = 0,
		review = this;
	$scope.loadedImages = MyData.imagesReviewed;
	this.hasPhotos = false;
	this.finishReviews = false;

	var fetchImages = function ($http){

		var url = 'https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=17592ab295bfffea2dbfac2566bb9cd0&per_page=9&format=json&nojsoncallback=1';

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

				$scope.loadedImages.push(photo);
			}

			console.log('$scope.loadedImages: ' + $scope.loadedImages.length);
			review.image = $scope.loadedImages[0];
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

	//console.log('report: ' + MyData.imagesReviewed);
	$scope.imagesReviewed =  MyData.imagesReviewed;

	$scope.sendReport = function (value) {
		alert('Report send at: ' + new Date());
	}

});