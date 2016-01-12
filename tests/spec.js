// var properties = require(__dirname + '/../flickr-key.json');
// console.log(properties);
var util = require('util');

describe('Review image App', function() {
  it('should have all load.', function() {
    
    browser.get('https://aristidesmelendez.github.io/');

    expect(browser.getTitle()).toEqual('Review Image');
    expect(element(by.css("div.noPhotos h1")).getWebElement().getText()).toEqual('');

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
    element(by.model('image.description')).sendKeys('algun comentario para esta image.');
    element(by.model('image.stars')).sendKeys(3);
    expect(element(by.css('button.btn-danger')).getText()).toEqual('Reject');
    expect(element(by.css('button.btn-success')).getText()).toEqual('Accept');
    element(by.css('button.btn-success')).click();

    // 3rd photo
    expect(element(by.css(".container div.page-header h1.col-md-12")).getWebElement().getText()).not.toEqual('No more photos');
    element(by.model('image.description')).sendKeys('algun comentario para esta image.');
    element(by.model('image.stars')).sendKeys(3);
    expect(element(by.css('button.btn-danger')).getText()).toEqual('Reject');
    expect(element(by.css('button.btn-success')).getText()).toEqual('Accept');
    element(by.css('button.btn-success')).click();


  });
});