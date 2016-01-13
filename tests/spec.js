// var properties = require(__dirname + '/../flickr-key.json');
// console.log(properties);
var util = require('util');

describe('Review image App', function() {
  it('should have all load.', function() {
    
    browser.get('https://aristidesmelendez.github.io/');

    expect(browser.getTitle()).toEqual('Review Image');

    // 1st photo
    expect(element(by.css(".container div.page-header h1.col-md-12")).getWebElement().getText()).not.toEqual('No more photos');

    element(by.model('image.description')).sendKeys('algun comentario para esta image.');
    element(by.model('image.stars')).sendKeys(3);
    //expect(element(by.model('image.clientId')).getText()).not.toEqual('');
    expect(element(by.css('button.btn-danger')).getText()).toEqual('Reject');
    expect(element(by.css('button.btn-success')).getText()).toEqual('Accept');
    element(by.css('button.btn-success')).click();

    // 2nd photo
    expect(element(by.css(".container div.page-header h1.col-md-12")).getWebElement().getText()).not.toEqual('No more photos');
    element(by.model('image.description')).sendKeys('No me gusto');
    element(by.model('image.stars')).sendKeys(1);
    expect(element(by.css('button.btn-danger')).getText()).toEqual('Reject');
    expect(element(by.css('button.btn-success')).getText()).toEqual('Accept');
    element(by.css('button.btn-danger')).click();

    // 3rd photo
    expect(element(by.css(".container div.page-header h1.col-md-12")).getWebElement().getText()).not.toEqual('No more photos');
    element(by.model('image.description')).sendKeys('Aprobada.');
    element(by.model('image.stars')).sendKeys(5);
    expect(element(by.css('button.btn-danger')).getText()).toEqual('Reject');
    expect(element(by.css('button.btn-success')).getText()).toEqual('Accept');
    element(by.css('button.btn-success')).click();

    expect(element(by.css("div.noPhotos h1")).getWebElement().getText()).toEqual('No more photos');
    element(by.css('div.noPhotos a')).click();

    expect(element(by.css("div.page-header h1")).getWebElement().getText()).toEqual('Report');
    var checkedItems = element.all(by.css('div.col-md-4'));
    expect(checkedItems.count()).toEqual(3);

    //using a then() to sort in items.
    element.all(by.css('div.col-md-4')).then(function (checkedItems) {
        expect(checkedItems.length).toBe(3);

	    checkedItems[0].all(by.css('div')).then( function (imageInfo) {
	        expect(imageInfo[1].element(by.css('label')).getText()).toEqual('Accepted: true');
	        expect(imageInfo[2].element(by.css('label')).getText()).toEqual('Description: algun comentario para esta image.');
	        expect(imageInfo[3].element(by.css('label')).getText()).toEqual('Stars: 3');
	    });

	    checkedItems[1].all(by.css('div')).then( function (imageInfo) {
	        expect(imageInfo[1].element(by.css('label')).getText()).toEqual('Accepted: false');
	        expect(imageInfo[2].element(by.css('label')).getText()).toEqual('Description: No me gusto');
	        expect(imageInfo[3].element(by.css('label')).getText()).toEqual('Stars: 1');
	    });

	    checkedItems[2].all(by.css('div')).then( function (imageInfo) {
	        expect(imageInfo[1].element(by.css('label')).getText()).toEqual('Accepted: true');
	        expect(imageInfo[2].element(by.css('label')).getText()).toEqual('Description: Aprobada.');
	        expect(imageInfo[3].element(by.css('label')).getText()).toEqual('Stars: 5');
	    });

    });

  });

});