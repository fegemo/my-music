angular.module('music.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Power Metal', id: 1 },
    { title: 'Space Metal', id: 2 },
    { title: 'Rock', id: 3 },
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('BrowseMusicCtrl', function($scope) {
  $scope.songs = [
    { title: 'The Argument 1', album: 'The Theory of Everything', artist: 'Ayreon', albumArtURL: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/26/Ayreon-TheoryOfEverything-cd.jpg/220px-Ayreon-TheoryOfEverything-cd.jpg' },
    { title: 'The Scarecrow', album: 'The Scarecrow', artist: 'Avantasia', albumArtURL: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Avantasia_-_The_Scarecrow_-_2008._Front.jpg/220px-Avantasia_-_The_Scarecrow_-_2008._Front.jpg' },
    { title: 'March of Time', album: 'Keeper of the Seven Keys: Part II', artist: 'Helloween', albumArtURL: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/KotSK2.jpg/220px-KotSK2.jpg' },
  ];
});
