// 定义全局接口主机地址
var host = 'http://siida.cn/me/attention-back/';
angular.module('app.controllers', [])
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider){

        $ionicConfigProvider.tabs.position('bottom');

})
// 今日文章
.controller('todayCtrl', function($scope,$http) {
	// 加载中
	// 控制哪些显示，哪些隐藏
	$scope.showItems = {
		searching : true
	}
	$http({
	  method: 'GET',
	  url: host+'getPaper.php'
	}).then(function successCallback(response) {
		// 已经获取了今天的文章
		$scope.showItems.searching = false;
		$scope.paperContent = response.data.content;
		$scope.paperTitle = response.data.title;
		$scope.paperTag = response.data.tag;
		$scope.paperAuthor = response.data.author;
	}, function errorCallback(response) {
		$scope.showItems.searching = false;
	    $scope.paperContent = '网络不佳，请您检查网络连接';
	});

	// 下拉刷新
	$scope.refresh = function(){
		$http({
		  method: 'GET',
		  url: host+'getPaper.php'
		}).then(function successCallback(response) {
			// 已经获取了今天的文章
			$scope.showItems.searching = false;
			$scope.paperContent = response.data.content;
			$scope.paperTitle = response.data.title;
			$scope.paperTag = response.data.tag;
			$scope.paperAuthor = response.data.author;
			$scope.$broadcast("scroll.refreshComplete");
		}, function errorCallback(response) {
			$scope.showItems.searching = false;
		    $scope.paperContent = '网络不佳，请您检查网络连接';
			$scope.$broadcast("scroll.refreshComplete");
		});
	}
})
// 历史文章列表
.controller('historyCtrl', function($scope,$http) {
	// 控制哪些显示，哪些隐藏
	$scope.showItems = {
		paperList : false,
		searching : true
	}
	// 像服务端请求内容
	$http({
	  method: 'GET',
	  url: host+'getPaperList.php'
	}).then(function successCallback(response) {
		console.log(response);
		$scope.showItems.paperList = true;
		$scope.showItems.searching = false;
		$scope.list = response.data;
	}, function errorCallback(response) {
		$scope.showItems.paperList = true;
		$scope.showItems.searching = false;
	});

	// 下拉刷新
	$scope.refresh = function(){
		$http({
		  method: 'GET',
		  url: host+'getPaperList.php'
		}).then(function successCallback(response) {
			console.log(response);
			$scope.showItems.paperList = true;
			$scope.showItems.searching = false;
			$scope.list = response.data;
			$scope.$broadcast("scroll.refreshComplete");
		}, function errorCallback(response) {
			$scope.showItems.paperList = true;
			$scope.showItems.searching = false;
			$scope.$broadcast("scroll.refreshComplete");
		});
	}

	// 默认搜索内容为空
	$scope.searchInput = {
		data:""
	};


	/**
	 * 搜索函数
	 */
	$scope.searchStart = function(){
		$scope.showItems.paperList = false;
		$scope.showItems.searching = true;
		$http({
		  method: 'GET',
		  url: host+'searchPaper.php?key='+$scope.searchInput.data
		}).then(function successCallback(response) {
			// 已经获取搜索结果
			$scope.showItems.searching = false;
			$scope.showItems.paperList = true;
			console.log(response.data);
			$scope.list = response.data;
		}, function errorCallback(response) {
		    $scope.paperContent = '网络不佳，请您检查网络连接';
		});
	}
	$scope.turnFn = function(){
		console.log($scope.searchInput)
	}
})

// 阅读某篇历史文章
.controller('historyIdCtrl',function($scope,$http){
	// 控制哪些显示，哪些隐藏
	$scope.showItems = {
		searching : true
	}

	// 等以后有心情了再换掉这个低端的函数
	var str = window.location.href;
	for(var i=str.length-1;i>0;i--){
		if(str[i] === ":"){
			$scope.paperId = str.substr(i+1);
			break;
		}
	}

	// 从后台获取数据
	$http({
	  method: 'GET',
	  url: host+'getPaperById.php?id='+$scope.paperId
	}).then(function successCallback(response) {
		$scope.showItems.searching = false;
		$scope.paperContent = response.data.content;
		$scope.paperTitle = response.data.title;
		$scope.paperTag = response.data.tag;
		$scope.paperAuthor = response.data.author;
	}, function errorCallback(response) {
		$scope.showItems.searching = false;
	    $scope.paperContent = '网络不佳，请您检查网络连接';
	});

	// 下拉刷新
	$scope.refresh = function(){
		$http({
		  method: 'GET',
		  url: host+'getPaperById.php?id='+$scope.paperId
		}).then(function successCallback(response) {
			$scope.showItems.searching = false;
			$scope.paperContent = response.data.content;
			$scope.paperTitle = response.data.title;
			$scope.paperTag = response.data.tag;
			$scope.paperAuthor = response.data.author;
			$scope.$broadcast("scroll.refreshComplete");
		}, function errorCallback(response) {
			$scope.showItems.searching = false;
		    $scope.paperContent = '网络不佳，请您检查网络连接';
			$scope.$broadcast("scroll.refreshComplete");
		});
	}
})
.controller('adviceCtrl', function($scope,$http) {
	$scope.cao = {
		content:"",
		contact:""
	}

	// 发送给开发者
	$scope.sendToMe = function(){
		$http({
		  method: 'GET',
		  url: host+'advice.php?content='+$scope.cao.content+'&contact='+$scope.cao.contact
		}).then(function successCallback(response) {
			alert('感谢您的真诚回馈！开发者会认真听取您的意见并将前端关注做得更好！')
		}, function errorCallback(response) {
		    alert('网络不佳，请您检查网络连接');
		});
	}
})