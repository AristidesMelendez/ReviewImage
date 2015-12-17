'use strict';

describe('Review Controllers', function(){

	beforeEach(module('reviewControllers'));

	describe('MyData', function() {
		it('Should be an empty string when app start.', inject(function (MyData) {
			expect(MyData).toEqual({imagesReviewed: []});
		}))
	});

	describe('test', function() {
		it('pass no matter what', function(){
			expect(true).toBeTruthy();
		});
	});
	
});