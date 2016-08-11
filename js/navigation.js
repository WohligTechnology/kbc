// var path = "http://192.168.1.102/newhq/";
var mainpath = "http://wohlig.co.in/master/";
var path = "";
if (!$.jStorage.get('serverpart')) {
  path = "http://wohlig.co.in/master/";
}else {
  path = "http://wohlig.co.in/master/"+ $.jStorage.get('serverpart') + "/";
}
var adminurl = path + "index.php/json/";
var imageurl = path + "uploads/";


var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function($http) {
  var navigation = [{
    name: "Home",
    classis: "active",
    link: "#/home",
    subnav: []
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
    todaysQuestion: function(id, callback) {
      $http.get(adminurl + "getSingleQuestionAndOption?=id" + id);
    },
    pingHq: function(id, callback) {
      $http({
        url: adminurl + "pingHq",
        method: "POST",
        data: {
          "user": id
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
    saveSurvey: function(user, survey, questions, callback) {
      var obj = {
        user: user,
        survey: survey,
        questions: questions
      };
      $http({
        url: adminurl + "storeSurveyAnswer",
        method: "POST",
        data: obj
      }).success(callback);
    },
    sendlogo: function(callback) {
      $http({
        url: adminurl + "sendlogo",
        method: "POST"
      }).success(callback);
    },
    checkKey: function(key,callback) {
      var obj = {
        key: key
      };
      $http({
        url: adminurl + "checkKey",
        method: "POST",
        data: obj
      }).success(callback);
    }

  };
});
