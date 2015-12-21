'use strict';

describe('directive tests', function() {

  describe('Image form - Aris', function() {

    var element, scope, compile, $httpBackend;

    beforeEach(module('reviewImageApp'));
    beforeEach(module('views'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
      scope = _$rootScope_;
      compile = _$compile_;

    }));

    it('should print a form to evaluate  a photo.', function() {
      scope.image = {
          description: 'photo_description ',
          clientId: 'photo_owner',
          title: 'photo title',
          url: 'url_example_z.jpg',
          thumbnail: 'url_example_q.jpg',
          target: 'https://www.flickr.com/photos/photo_owner/photo_id'
      };

      element = compile('<aris-image-form image="image"></aris-image-form>')(scope); 
      
      scope.$digest();
      
      var DOMpart = element.find('.page-header h1');
      expect(DOMpart).toBeDefined();
      expect(DOMpart.text()).toEqual('photo title');

      DOMpart = element.find('div.row a');
      expect(DOMpart).toBeDefined();

      DOMpart = element.find('div:eq(2) label');
      expect(DOMpart).toBeDefined();
      expect(DOMpart.text()).toEqual('Description: ');

      DOMpart = element.find('div:eq(3) label');
      expect(DOMpart).toBeDefined();
      expect(DOMpart.text()).toEqual('Stars: ');

      DOMpart = element.find('div:eq(4) label');
      expect(DOMpart).toBeDefined();
      expect(DOMpart.text()).toEqual('Client id: ');

      DOMpart = element.find('div:eq(4) input');
      expect(DOMpart).toBeDefined();
      expect(DOMpart.val()).toEqual('photo_owner');

    });

  });

});
