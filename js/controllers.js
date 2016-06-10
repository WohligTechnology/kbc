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
    var stateParam = "NyZocQ==";

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
            $scope.template = TemplateService.changecontent("thankyou");
            $scope.menutitle = NavigationService.makeactive("Thank You");
            TemplateService.title = $scope.menutitle;
            TemplateService.header = "";
            TemplateService.footer = "";
            $scope.navigation = NavigationService.getnav();
            $scope.bgColor = 'bg-green';
        }

        $scope.allQuestions = data;
        _.map($scope.allQuestions.questions, function(n) {
            switch (n.type) {
                case "3":
                    n.value = [];
                    n.touch = false;
                    if (n.isrequired == "1") {
                        n.values = [];
                    }
                    _.each(n.option, function(m) {
                        n.value.push(false);
                    });
                    break;
                case "5":
                    n.touch = false;
                    if (n.isrequired == "1") {
                        n.values = [];
                    }
                    break;
                default:
            }
            return n;
        });
        $scope.questionIndex = 0;
        $scope.playing = data[0];
    }

    NavigationService.pingHq(stateParam, populateQuestion);

    // for checkbox and radio button validation
    $scope.updateQuestionValue = function(choice, question) {
        question.touch = true;
        question.values = question.values || [];
        if (choice.checked) {
            question.values.push(choice.id);
            question.values = _.uniq(question.values);
        } else {
            question.values = _.without(question.values, choice.id);
        }
    };

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

        // if (value2.length === 0) {

        NavigationService.saveSurvey(stateParam, surveyId, values, function(data) {
            console.log(data);
            NavigationService.pingHq(stateParam, populateQuestion);
        });

        // }

    };
    $scope.anss = [];
    $scope.anss2 = "";
    $scope.nextQ = function() {
        console.log("In NExt");
        $(window).scrollTop(0);
        console.log($scope.anss.length);
        console.log($scope.playing.optionselect);
        if ($scope.anss.length === parseInt($scope.playing.optionselect)) {
            _.each($scope.anss, function(n, key) {
                console.log(n);
                if (key === 0) {
                    $scope.anss2 = n;
                } else {
                    $scope.anss2 += "," + n;
                }

            });
            NavigationService.saveAnswer(stateParam, $scope.playing.question, $scope.anss2, $scope.playing.test, function(data) {
                // if (data != "true") {
                //   $scope.questionIndex = 0;
                // }
                // if ($scope.questionIndex < $scope.allQuestions.length - 1) {
                //   $scope.questionIndex++;
                //   $scope.playing = $scope.allQuestions[$scope.questionIndex];
                // } else {
                //   $state.go('intro');
                // }
                $scope.anss = [];
                $scope.anss2 = "";
                NavigationService.pingHq(stateParam, populateQuestion);
            });
        } else {
            console.log("Error Text Goes Here...");
        }

    };


    $scope.selectOption = function(play) {
        $(window).scrollTop(0);
        console.log(play.id);
        var ispresent = _.findWhere($scope.anss, play.id);
        console.log(ispresent);
        if (ispresent) {
            console.log("in if");
            play.active = !play.active;

            $scope.anss = _.filter($scope.anss, function(n) {
                return n != play.id;
            });
        } else {
            console.log("in else");

            if (parseInt($scope.playing.optionselect) > $scope.anss.length) {
                $scope.anss.push(play.id);
                play.active = !play.active;

                // if (play.active === false || !play.active) {
                //   // play.active = true;
                // } else {
                //   // play.active = false;
                // }
            }
        }
        console.log($scope.anss);
        // cfpLoadingBar.start();



        // NavigationService.saveAnswer(stateParam, $scope.playing.question, play.id, $scope.playing.test, function(data) {
        //   // if (data != "true") {
        //   //   $scope.questionIndex = 0;
        //   // }
        //   // if ($scope.questionIndex < $scope.allQuestions.length - 1) {
        //   //   $scope.questionIndex++;
        //   //   $scope.playing = $scope.allQuestions[$scope.questionIndex];
        //   // } else {
        //   //   $state.go('intro');
        //   // }
        //
        //   NavigationService.pingHq(stateParam, populateQuestion);
        //
        //
        //   cfpLoadingBar.complete();
        //
        // });

    };

})

.controller('SurveyCtrl', function($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.changecontent("survey");
    $scope.menutitle = NavigationService.makeactive("Survey");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.bgColor = "bg-warning";
})

.controller('WelcomeCtrl', function($scope, TemplateService, NavigationService, $state, $stateParams) {
    $scope.template = TemplateService.changecontent("welcome");
    $scope.menutitle = NavigationService.makeactive("Welcome");
    TemplateService.title = $scope.menutitle;
    TemplateService.header = "";
    TemplateService.footer = "";
    $scope.navigation = NavigationService.getnav();
    $scope.bgColor = "bg-green";

    $scope.getSetGo = function() {
        if ($stateParams.id) {
            $state.go('playing', {
                id: $stateParams.id
            });
        } else {
            $state.go('playingWithoutId');
        }

    };
})

.controller('ThankYouCtrl', function($scope, TemplateService, NavigationService) {
        $scope.template = TemplateService.changecontent("thankyou");
        $scope.menutitle = NavigationService.makeactive("Thank You");
        TemplateService.title = $scope.menutitle;
        TemplateService.header = "";
        TemplateService.footer = "";
        $scope.navigation = NavigationService.getnav();
        $scope.bgColor = "bg-red";
    })
    .controller('keyLoginCtrl', function($scope, TemplateService, NavigationService) {
        $scope.template = TemplateService.changecontent("Login");
        $scope.menutitle = NavigationService.makeactive("Login");
        TemplateService.title = $scope.menutitle;
        TemplateService.header = "";
        TemplateService.footer = "";
        $scope.navigation = NavigationService.getnav();
        $scope.bgColor = "bg-red";
        $scope.key = {};
        $scope.enterKey = function() {
            console.log($scope.key);
            NavigationService.checkKey($scope.key, function(data) {
                console.log(data);
            });
        };
    })

.controller('headerctrl', function($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService;
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        console.log("In header");
        $(window).scrollTop(0);
    });

    function getLogo(data) {
        $scope.logo = data;
    }
    NavigationService.sendlogo(getLogo);

});
