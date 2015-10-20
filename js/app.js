// JavaScript Document
var firstapp = angular.module('firstapp', [
    'ui.router',
    'phonecatControllers',
    'templateservicemod',
    'navigationservice'
]);

firstapp.config(function($stateProvider, $urlRouterProvider,$httpProvider) {
    
    // for http request with session
    $httpProvider.defaults.withCredentials = true;
    

    $stateProvider

    .state('intro', {
        url: "/intro",
        templateUrl: "views/template.html",
        controller: 'IntroCtrl'
    })

    .state('wish', {
        url: "/wish",
        templateUrl: "views/template.html",
        controller: 'WishCtrl'
    })

    .state('work', {
        url: "/work",
        templateUrl: "views/template.html",
        controller: 'WorkCtrl'
    })
    .state('playing', {
        url: "/playing",
        templateUrl: "views/template.html",
        controller: 'PlayingCtrl'
    })
    .state('question-1', {
        url: "/question-1",
        templateUrl: "views/template.html",
        controller: 'Question-1Ctrl'
    })
    .state('question-2', {
        url: "/question-2",
        templateUrl: "views/template.html",
        controller: 'Question-2Ctrl'
    })

    $urlRouterProvider.otherwise("/intro");

});


//firstapp.directive('img', function($compile, $parse) {
//    return {
//        restrict: 'E',
//        replace: false,
//        link: function($scope, element, attrs) {
//            var $element = $(element);
//            if(!attrs.noloading)
//            {
//                $element.after("<img src='img/loading.gif' class='loading' />");
//                var $loading = $element.next(".loading");
//                $element.load(function() {
//                    $loading.remove();
//                    $(this).addClass("doneLoading");
//                });
//            }
//            else
//            {
//                $($element).addClass("doneLoading");
//            }
//        }
//    };
//});
