// JavaScript Document
var firstapp = angular.module('firstapp', [
    'ui.router',
    'phonecatControllers',
    'templateservicemod',
    'navigationservice'
]);

firstapp.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

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
        .state('question-5', {
            url: "/question-5",
            templateUrl: "views/template.html",
            controller: 'Question-5Ctrl'
        })
        .state('question-6', {
            url: "/question-6",
            templateUrl: "views/template.html",
            controller: 'Question-6Ctrl'
        })
        .state('question-7', {
            url: "/question-7",
            templateUrl: "views/template.html",
            controller: 'Question-7Ctrl'
        })
        .state('question-8', {
            url: "/question-8",
            templateUrl: "views/template.html",
            controller: 'Question-8Ctrl'
        })
        .state('question-9', {
            url: "/question-9",
            templateUrl: "views/template.html",
            controller: 'Question-9Ctrl'
        })
        .state('question-10', {
            url: "/question-10",
            templateUrl: "views/template.html",
            controller: 'Question-10Ctrl'
        })

    $urlRouterProvider.otherwise("/intro");

});


firstapp.directive("minHeight", function($window) {
    return function(scope, element, attrs) {
        console.log(element);
        var minheight = '';
        var minheight = $(window).height();
        console.log(minheight);
        element.css({
            "min-height": minheight + "px"
        });
    };
});