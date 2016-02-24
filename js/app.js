// JavaScript Document
var firstapp = angular.module('firstapp', [
    'ui.router',
    'phonecatControllers',
    'templateservicemod',
    'navigationservice'
]);

firstapp.config(function($stateProvider, $urlRouterProvider, $httpProvider, cfpLoadingBarProvider) {

    // for http request with session
    $httpProvider.defaults.withCredentials = true;
	cfpLoadingBarProvider.includeSpinner = true;
	cfpLoadingBarProvider.spinnerTemplate = '<div class="loadingcfp"><div class="in-box"><div class="sk-fading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>Please wait...</div></div>';
	cfpLoadingBarProvider.includeBar = false;


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
            url: "/playing/:id",
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
        .state('survey', {
            url: "/survey",
            templateUrl: "views/template.html",
            controller: 'SurveyCtrl'
        });

    $urlRouterProvider.otherwise("/intro");

});


firstapp.filter('serverimage', function () {
	return function (input) {
			return imageurl + input;
	};
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
