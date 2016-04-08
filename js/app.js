// JavaScript Document
var firstapp = angular.module('firstapp', [
  'ui.router',
  'phonecatControllers',
  'templateservicemod',
  'navigationservice'
]);

firstapp.config(function($stateProvider, $urlRouterProvider, $httpProvider, cfpLoadingBarProvider) {

  // for http request with session
  $httpProvider.defaults.withCredentials = false;
  cfpLoadingBarProvider.includeSpinner = true;
  cfpLoadingBarProvider.spinnerTemplate = '<div class="loadingcfp"><div class="in-box"><div class="sk-fading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>Please wait...</div></div>';
  cfpLoadingBarProvider.includeBar = false;


  $stateProvider

    .state('intro', {
    url: "/intro",
    templateUrl: "views/template.html",
    controller: 'IntroCtrl'
  })

  .state('playingWithoutId', {
    url: "/playing",
    templateUrl: "views/template.html",
    controller: 'PlayingCtrl'
  })

  .state('playing', {
    url: "/playing/:id",
    templateUrl: "views/template.html",
    controller: 'PlayingCtrl'
  })

  .state('survey', {
    url: "/survey",
    templateUrl: "views/template.html",
    controller: 'SurveyCtrl'
  })

  .state('welcome', {
    url: "/welcome",
    templateUrl: "views/template.html",
    controller: 'WelcomeCtrl'
  })
  .state('welcomeWithoutId', {
    url: "/welcome/:id",
    templateUrl: "views/template.html",
    controller: 'WelcomeCtrl'
  })

  .state('thankyou', {
    url: "/thankyou",
    templateUrl: "views/template.html",
    controller: 'ThankYouCtrl'
  });

  $urlRouterProvider.otherwise("/playing");

});


firstapp.filter('serverimage', function() {
  return function(input) {
    return imageurl + input;
  };
});

firstapp.directive("minHeight", function($window) {
  return function(scope, element, attrs) {
    var minheight = '';
    minheight = $(window).height();
    element.css({
      "min-height": minheight + "px"
    });
  };
});
