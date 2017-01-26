var app = angular.module('myApp', []);

app.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://api.flickr.com/**',
    ]);
});

var FlickrAPI = function($http) {
  var apiService = this;
  apiService.getData = function(callback) {
    console.log('getting data');
    var flickrURL = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json';
    $http.jsonp(flickrURL);
    jsonFlickrFeed = function(data) {
      callback(data.items);
    }
  };
};
FlickrAPI.$inject = ['$http'];
app.service('FlickrAPI', FlickrAPI);


var HomeController = function($scope, FlickrAPI, $interval) {
  $scope.items = [];
  $scope.favorites = {};

  $scope.showAll = true;
  $scope.showFavorites = false;

  $scope.isFavorite = function(item) {
    return item.link in $scope.favorites;
  };
  $scope.addFavorite = function(item) {
    $scope.favorites[item.link] = item;
  };
  $scope.removeFavorite = function(item) {
    delete $scope.favorites[item.link];
  };

  var testFaves = function() {
    var testItem = {
      "title":"You Lookin' at Me?.jpg",
      "link":"https://www.flickr.com/photos/elektratig/31606966764/",
      "media":{
        "m":"https://farm1.staticflickr.com/385/31606966764_3106855f40_m.jpg"
      },
      "date_taken":"2017-01-21T11:49:01-08:00",
      "description":" <p><a href=\"https://www.flickr.com/people/elektratig/\">elektratig</a> posted a photo:</p> <p><a href=\"https://www.flickr.com/photos/elektratig/31606966764/\" title=\"You Lookin' at Me?.jpg\"><img src=\"https://farm1.staticflickr.com/385/31606966764_3106855f40_m.jpg\" width=\"240\" height=\"192\" alt=\"You Lookin' at Me?.jpg\" /></a></p> ",
      "published":"2017-01-22T02:22:18Z",
      "author":"nobody@flickr.com (\"elektratig\")",
      "author_id":"18356757@N00",
      "tags":""
    };

    var testAddFavorite = function() {
      console.assert(angular.equals($scope.favorites, {}));
      $scope.addFavorite(testItem);
      console.assert($scope.favorites[testItem.link] == testItem);
      $scope.favorites = {};
    };

    var testIsFavorite = function() {
       console.assert(angular.equals($scope.favorites, {}));
      console.assert($scope.isFavorite(testItem) == false);
      $scope.favorites[testItem.link] = testItem;
      console.assert($scope.isFavorite(testItem) == true);
      $scope.favorites = {};
    }

    var testRemoveFavorite = function() {
      console.assert(angular.equals($scope.favorites, {}));
      $scope.favorites[testItem.link] = testItem;
      $scope.removeFavorite(testItem);
      console.assert(angular.equals($scope.favorites, {}));
    }
    
    testAddFavorite();
    testIsFavorite();
    testRemoveFavorite();
  };

  testFaves();

  var fetchImages = function() {
    FlickrAPI.getData(function(items) {
      $scope.items = Array.from(new Set($scope.items.concat(items)));
    });
  };

  fetchImages();

  $interval(function() {
    fetchImages();
  }, 60000);


  $scope.setShowAll = function() {
    $scope.showAll = true;
    $scope.showFavorites = false;
  };
  $scope.setShowFavorites = function() {
    $scope.showAll = false;
    $scope.showFavorites = true;
  };
  $scope.favoritesLength = function() {
    return Object.keys($scope.favorites).length;
  };

};
HomeController.$inject = ['$scope', 'FlickrAPI', '$interval'];
app.controller('HomeController', HomeController);
