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
    .state('vacation', {
        url: "/vacation",
        templateUrl: "views/template.html",
        controller: 'VacationCtrl'
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
