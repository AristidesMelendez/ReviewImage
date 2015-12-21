// Demo application to learn AngularJS
// Author: Aristides Melendez
// Date: 2015/01/14 11:22 -0500 GTM


'use strict';

/* App Module */

var reviewImageApp = angular.module('reviewImageApp', ['ngRoute','reviewControllers']);


reviewImageApp.directive('arisImageForm', function(){
	return {
		retrict: 'E',
		templateUrl: 'views/aris-image-form.html',
		scope: {
			image: '=image'
		}
	};	
});

reviewImageApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'views/imageViewForm.html',
				controller: 'reviewController',
				controllerAs: 'reviewCtrl'
			}).
			when('/report', {
				templateUrl: 'views/report.html',
				controller: 'reportController',
				controllerAs: 'repoCtrl'
			}).
			otherwise({
				redirectTo: '/'
			});
	}
]);