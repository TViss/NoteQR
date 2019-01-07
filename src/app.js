var angular = require('angular');
var app = angular.module("qrcode", [require('angular-route'), require('angular-material')]);
app.config(function ($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
    .when("/", {
        templateUrl : "templates/main.html",
	controller : function($scope, $http)
	{
		$scope.qrcodes=[];
		$http.get("/qrcodes").then(function(res)
		{
			$scope.qrcodes = $scope.qrcodes.concat(res.data);	
		});
		$scope.genqr=function()
		{
			$http.get("/generate").then(function(res)
			{
				$scope.qrcodes.push(res.data);	
			});
		};	
	}
    })
    .when("/message/:hash", {
        templateUrl : "templates/message.html",
	controller : function($scope, $http, $routeParams)
	{
		$scope.qrcode = {};
		$http.get("/qrcode/" + $routeParams.hash).then(function(res)
		{
			$scope.qrcode = res.data;	
		});
		$scope.save=function()
		{
			$http.put("/qrcode/" + $routeParams.hash, $scope.qrcode).then(function(res)
			{
				alert("Saved Successfully");
			});
		};	
	}
    })
    .when("/green", {
        templateUrl : "green.htm"
    })
    .when("/blue", {
        templateUrl : "blue.htm"
    });
});
