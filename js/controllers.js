  angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngSanitize', 'angular-flexslider', 'cfp.loadingBar'])

  .controller('IntroCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("intro");
    $scope.menutitle = NavigationService.makeactive("intro");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.bgClass = 'intro';
  })

  .controller('WishCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    $scope.template = TemplateService.changecontent("wish");
    $scope.menutitle = NavigationService.makeactive("Wish");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.head = {
      info: "You just met a genie who grants you four wishes .You choose :"
    };
    $scope.wish = [{
      img: 'img/community.png',
      name: 'community service'
    }, {
      img: 'img/workplace.png',
      name: 'Happy Workplace'
    }, {
      img: 'img/family.png',
      name: 'Time with Family and Friends'
    }, {
      img: 'img/money.png',
      name: 'Enough Money'
    }, {
      img: 'img/independent.png',
      name: 'Independence'
    }, {
      img: 'img/support.png',
      name: 'support'
    }, {
      img: 'img/success.png',
      name: 'success'
    }, {
      img: 'img/recognized.png',
      name: 'Getting Recognized'
    }];

  })

  .controller('WorkCtrl', function($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.changecontent("work");
    $scope.menutitle = NavigationService.makeactive("Work");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.head = {
      info: "You put in your best at work . We know you do .So , your life looks something like this :"
    };
    $scope.work = [{
      img: "img/work/work1.png"
    }, {
      img: "img/work/work2.png"
    }, {
      img: "img/work/work3.png"
    }, {
      img: "img/work/work4.png"
    }];

  })

  .controller('PlayingCtrl', function($scope, TemplateService, NavigationService, $stateParams, cfpLoadingBar, $state) {
    $scope.template = TemplateService.changecontent("playing");
    $scope.menutitle = NavigationService.makeactive("Playing");
    TemplateService.title = $scope.menutitle;
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

      if (value2.length === 0 ) {
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

  .controller('Question-2Ctrl', function($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.changecontent("question-2");
    $scope.menutitle = NavigationService.makeactive("Question-2");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.head = {
      info: 'How are you feeling today ?'
    };
    $scope.qts2 = [{
      img: "img/qts2/1.png"
    }, {
      img: "img/qts2/2.png"
    }, {
      img: "img/qts2/3.png"
    }, {
      img: "img/qts2/4.png"
    }, {
      img: "img/qts2/5.png"
    }, ];

  })

  .controller('Question-1Ctrl', function($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.changecontent("question-1");
    $scope.menutitle = NavigationService.makeactive("Question-1");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.head = {
      info: "You have managed to get the much awaited annual leave with family .Your vacation goes something like this :"
    };
    $scope.vacation = [{
      img: "img/vacation/vac1.png"
    }, {
      img: "img/vacation/vac2.png"
    }, {
      img: "img/vacation/vac3.png"
    }, {
      img: "img/vacation/vac4.png"
    }];
  })

  .controller('Question-5Ctrl', function($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.changecontent("question-5");
    $scope.menutitle = NavigationService.makeactive("Question-5");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.head = {
      //            info: "You meet a school friend after a long time and he asks you , + "
      //            "How's work? "
      //            " +You say :"
    };
  })

  .controller('Question-6Ctrl', function($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.changecontent("question-6");
    $scope.menutitle = NavigationService.makeactive("Question-6");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.head = {
      info: "You are in the middle of a project and things aren't going your way . What next ?"
    };
  })

  .controller('Question-7Ctrl', function($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.changecontent("question-7");
    $scope.menutitle = NavigationService.makeactive("Question-7");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.head = {
      info: "Your friend approaches you for a job in your company . You are most likely to say this :"
    };
  })

  .controller('Question-8Ctrl', function($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.changecontent("question-8");
    $scope.menutitle = NavigationService.makeactive("Question-8");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.head = {
      info: "Congratulations ! Your organization just won an award :"
    };
  })

  .controller('Question-9Ctrl', function($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.changecontent("question-9");
    $scope.menutitle = NavigationService.makeactive("Question-9");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.head = {
      info: "Some of the things that you value in life are :"
    };
  })

  .controller('Question-10Ctrl', function($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.changecontent("question-10");
    $scope.menutitle = NavigationService.makeactive("Question-10");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.head = {
      info: "You find yourself smiling because you are blessed with :"
    };
  })

  .controller('SurveyCtrl', function($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.changecontent("survey");
    $scope.menutitle = NavigationService.makeactive("Survey");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
  })

  .controller('headerctrl', function($scope, TemplateService) {
    $scope.template = TemplateService;
  });
