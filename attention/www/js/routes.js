angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('tabsController', {
      url: '/page1',
      abstract:true,
      templateUrl: 'templates/tabsController.html'
    })

    .state('tabsController.today', {
      url: '/page5',
      views: {
        'tab1': {
          templateUrl: 'templates/today.html',
          controller: 'todayCtrl'
        }
      }
    })
    // 历史文章列表
    .state('tabsController.history', {
      url: '/page6',
      views: {
        'tab2': {
          templateUrl: 'templates/history.html',
          controller: 'historyCtrl'
        }
      }
    })

    // 在历史文章中看某个确定的一篇
    .state('tabsController.history-id',{
      url:'/page6/:id',
      views:{
        'tab2':{
          templateUrl:'templates/historyId.html',
          controller:'historyIdCtrl'
        }
      }
    })


    // 吐槽和反馈
    .state('tabsController.advice', {
      url: '/page7',
      views: {
        'tab3': {
          templateUrl: 'templates/advice.html',
          controller: 'adviceCtrl'
        }
      }
    })

    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/page1/page5');

});