//var path = "http://localhost/newhq/";
var path = "http://192.168.0.120/newhq/";
var adminurl = path + "index.php/json/";
var imageurl = path + "uploads/";

var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function($http) {
    var navigation = [{
        name: "Home",
        classis: "active",
        link: "#/home",
        subnav: [{
            name: "Subnav1",
            classis: "active",
            link: "#/home"
        }, {
            name: "Subnav2",
            classis: "active",
            link: "#/home"
        }, {
            name: "Subnav3",
            classis: "active",
            link: "#/home"
        }]
    }, {
        name: "Features",
        active: "",
        link: "#/feature",
        classis: "active",
        subnav: []
    }, {
        name: "Infinite Scroll",
        active: "",
        link: "#/infinite",
        classis: "active",
        subnav: []
    }];

    return {
        getnav: function() {
            return navigation;
        },
        makeactive: function(menuname) {
            for (var i = 0; i < navigation.length; i++) {
                if (navigation[i].name == menuname) {
                    navigation[i].classis = "active";
                } else {
                    navigation[i].classis = "";
                }
            }
            return menuname;
        },
	   todaysQuestion: function(id, callback){
		   $http.get(adminurl + "getSingleQuestionAndOption?=id" + id);
	   },
	   pingHq: function(id, callback){
		   $http({
			 url: adminurl + "pingHq",
			 method: "POST",
			 data: {
				 "user":id
			 }
		   }).success(callback);
	   },
	   saveAnswer: function(user, question, answer, test, callback) {
		   $http({
			 url: adminurl + "storeUserAnswer",
			 method: "POST",
			 data: {
				 "user": user,
				 "question": question,
				 "option": answer,
				 "test": test
			 }
		   }).success(callback);
	   },
     saveSurvey: function(user,survey,questions,callback) {
       var obj = {user:user,survey:survey,questions:questions};
       $http({
			 url: adminurl + "storeSurveyAnswer",
			 method: "POST",
			 data: obj
		   }).success(callback);
     }

   };
});
