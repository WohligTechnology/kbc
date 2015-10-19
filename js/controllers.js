angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngSanitize', 'angular-flexslider'])

.controller('IntroCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("intro");
    $scope.menutitle = NavigationService.makeactive("intro");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

})

.controller('WishCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
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
        },

        {
            img: 'img/success.png',
            name: 'success'
        }, {
            img: 'img/recognized.png',
            name: 'Getting Recognized'
        }
    ];

})

.controller('WorkCtrl', function ($scope, TemplateService, NavigationService) {
        $scope.template = TemplateService.changecontent("work");
        $scope.menutitle = NavigationService.makeactive("Work");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    $scope.head ={
        info: "You put in your best at work . We know you do .So , your life looks something like this :"
    }
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
    .controller('Question-2Ctrl', function ($scope, TemplateService, NavigationService) {
        $scope.template = TemplateService.changecontent("question-2");
        $scope.menutitle = NavigationService.makeactive("Question-2");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    $scope.head = {
        info:'How are you feeling today ?'
    };
        $scope.qts2 = [
            {
                img: "img/qts2/1.png"
    }, 
            {
                img: "img/qts2/2.png"
    },
            {
                img: "img/qts2/3.png"
    },
            {
                img: "img/qts2/4.png"
    },
            {
                img: "img/qts2/5.png"
    },
    ];

    })
    .controller('Question-1Ctrl', function ($scope, TemplateService, NavigationService) {
        $scope.template = TemplateService.changecontent("question-1");
        $scope.menutitle = NavigationService.makeactive("Question-1");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    $scope.head = {
        info: "You have managed to get the much awaited annual leave with family .Your vacation goes something like this :"
    }
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

.controller('headerctrl', function ($scope, TemplateService) {
    $scope.template = TemplateService;
})

;
