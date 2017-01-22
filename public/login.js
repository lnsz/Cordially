var app = angular.module('app', []);

app.controller("ctrl", function($scope, $http){
	$scope.username = "";
	$scope.password = "";
	$scope.errorMessage = "";

	$scope.login =  function(){
		$http.post("/login", {
			username: $scope.username, 
			password: $scope.password
		}).then(function successCallback(response) {
			$scope.errorMessage = "";
		}, function errorCallback(response) {
			$scope.errorMessage = "INCORRECT USERNAME OR PASSWORD";
		});
	}
	$scope.createUser =  function(){
		$http.post("/createUser", {
			username: $scope.username, 
			password: $scope.password
		}).then(function successCallback(response) {
			$scope.errorMessage = "";
		}, function errorCallback(response) {
			$scope.errorMessage = "USERNAME IS TAKEN";
		});
	};
});

$("#getstarted").click(function() {
  $('#getstarted').addClass('fadeOut');
  $('#emailTextbox').addClass('extend');
  $('#loginButton').addClass('moveDown');
  $('#loginButton').html('CREATE ACCOUNT');
  $('#loginButton').attr('data-target', "");
  $('#loginButton').attr('ng-click', "createUser()");
  $('#createPassword').addClass('fadeIn');
});