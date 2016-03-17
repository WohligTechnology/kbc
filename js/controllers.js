angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngSanitize', 'angular-flexslider', 'cfp.loadingBar'])

.controller('IntroCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("intro");
  $scope.menutitle = NavigationService.makeactive("Intro");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  $scope.bgColor = "intro";
})

.controller('PlayingCtrl', function($scope, TemplateService, NavigationService, $stateParams, cfpLoadingBar, $state) {
  $scope.template = TemplateService.changecontent("playing");
  $scope.menutitle = NavigationService.makeactive("Question");
  TemplateService.title = $scope.menutitle;
  $scope.bgColor = "bg-warning";
  $scope.navigation = NavigationService.getnav();
  console.log($stateParams.id);
  var stateParam = "MTUmaHE=";

  var other = $.jStorage.get("userid");

  if ($stateParams.id) {
    stateParam = $stateParams.id;
    $.jStorage.set("userid", stateParam);
  } else if (other) {
    stateParam = other;
  }

  function populateQuestion(data) {
    console.log(data);
    if (data.type == "survey") {
      $scope.template = TemplateService.changecontent("survey");
    } else if (data.length > 0) {
      $scope.template = TemplateService.changecontent("playing");
    } else if (!data.value) {
      $scope.template = TemplateService.changecontent("intro");
      $scope.menutitle = NavigationService.makeactive("intro");
      TemplateService.title = $scope.menutitle;
      $scope.navigation = NavigationService.getnav();
      $scope.bgClass = 'intro';
    }

    $scope.allQuestions = data;
    _.map($scope.allQuestions.questions, function(n) {
      if (n.type == "3") {
        n.value = [];
        _.each(n.option, function(m) {
          n.value.push(false);
        });
      }
      return n;
    });
    $scope.questionIndex = 0;
    $scope.playing = data[0];
  }

  NavigationService.pingHq(stateParam, populateQuestion);

  $scope.submitSurvey = function(surveyId, form) {

    var form2 = _.cloneDeep(form);

    var values = _.map(form2, function(n) {
      var obj = {};
      if (n.type == "3") {
        var texts = [];
        _.each(n.option, function(m, key) {
          if (n.value[key]) {
            texts.push(m.title);
          }
        });
        obj.answer = texts.join(',');
        obj.questionid = n.id;
      } else {
        obj.answer = n.value;
        obj.questionid = n.id;
      }

      return obj;
    });


    console.log(values);
    var value2 = _.filter(values, {
      answer: undefined
    });

    if (value2.length === 0) {
      NavigationService.saveSurvey(stateParam, surveyId, values, function(data) {
        console.log(data);
        NavigationService.pingHq(stateParam, populateQuestion);
      });
    }

  };
  $scope.selectOption = function(play) {
    if (play.active === false || !play.active) {
      play.active = true;
    } else {
      play.active = false;
    }
    cfpLoadingBar.start();



    NavigationService.saveAnswer(stateParam, $scope.playing.question, play.id, $scope.playing.test, function(data) {
      // if (data != "true") {
      //   $scope.questionIndex = 0;
      // }
      // if ($scope.questionIndex < $scope.allQuestions.length - 1) {
      //   $scope.questionIndex++;
      //   $scope.playing = $scope.allQuestions[$scope.questionIndex];
      // } else {
      //   $state.go('intro');
      // }

      NavigationService.pingHq(stateParam, populateQuestion);


      cfpLoadingBar.complete();

    });

  };

})

.controller('SurveyCtrl', function($scope, TemplateService, NavigationService) {
  $scope.template = TemplateService.changecontent("survey");
  $scope.menutitle = NavigationService.makeactive("Survey");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  $scope.bgColor = "bg-warning";
})

.controller('WelcomeCtrl', function($scope, TemplateService, NavigationService) {
  $scope.template = TemplateService.changecontent("welcome");
  $scope.menutitle = NavigationService.makeactive("Welcome");
  TemplateService.title = $scope.menutitle;
  TemplateService.header = "";
  TemplateService.footer = "";
  $scope.navigation = NavigationService.getnav();
  $scope.bgColor = "bg-green";
})

.controller('ThankYouCtrl', function($scope, TemplateService, NavigationService) {
  $scope.template = TemplateService.changecontent("thankyou");
  $scope.menutitle = NavigationService.makeactive("Thank You");
  TemplateService.title = $scope.menutitle;
  TemplateService.header = "";
  TemplateService.footer = "";
  $scope.navigation = NavigationService.getnav();
  $scope.bgColor = "bg-green";
})

.controller('headerctrl', function($scope, TemplateService) {
  $scope.template = TemplateService;
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $(window).scrollTop(0);
  });
});
