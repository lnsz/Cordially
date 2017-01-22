var app = angular.module('app', []);

app.controller("ctrl", function($scope, $http){
	$scope.username = "";
	$scope.password = "";
	$scope.errorMessage = "";
	$scope.isClickable = false;

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
		if($scope.isClickable){
			$http.post("/createUser", {
				username: $scope.username, 
				password: $scope.password
			}).then(function successCallback(response) {
				$scope.errorMessage = "";
			}, function errorCallback(response) {
				$scope.errorMessage = "USERNAME IS TAKEN";
			});
		};
	}
	$("#getstarted").click(function() {
	  $('#getstarted').addClass('fadeOut');
	  $('#emailTextbox').addClass('extend');
	  $('#loginButton1').addClass('moveDown');
	  $('#loginButton1').html('CREATE ACCOUNT');
	  $('#loginButton1').attr('data-target', "");
	  $('#createPassword').addClass('fadeIn');
 		console.log($scope.isClickable );
	});
});

