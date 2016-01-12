// var properties = require(__dirname + '/../flickr-key.json');
// console.log(properties);

describe('Protractor Demo App', function() {
  it('should have a title', function() {
    
    browser.get('https://aristidesmelendez.github.io/');

    expect(browser.getTitle()).toEqual('Review Image');
    expect(element(by.css("div.noPhotos h1")).getWebElement().getText()).toEqual('');
    expect(element(by.css(".container div.page-header h1.col-md-12")).getWebElement().getText()).not.toEqual('No more photos');

  });
});