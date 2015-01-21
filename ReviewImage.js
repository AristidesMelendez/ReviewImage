// Demo application to learn AngularJS
// Author: Aristides Melendez
// Date: 2015/01/14 11:22 -0500 GTM


'use strict';

/* App Module */

var reviewImageApp = angular.module('reviewImageApp', ['reviewControllers']);


reviewImageApp.directive('imageViewForm', function(){
	return {
		retrict: 'E',
		templateUrl: 'views/imageViewForm.html',
		controller: 'reviewController',
		controllerAs:  'reviewCtrl'

	};	
});