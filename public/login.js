var app = angular.module('app', []);

app.controller("ctrl", function($scope, $http, $window){
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
			$window.location.href = "/dashboard.html";
		}, function errorCallback(response) {
			$scope.errorMessage = "INCORRECT USERNAME OR PASSWORD";
		});
	}
	$scope.createUser =  function(){
		if($scope.isClickable){
			console.log($scope.username);
			$http.post("/createUser", {
				username: $scope.username, 
				password: $scope.password
			}).then(function successCallback(response) {
				$scope.errorMessage = "";
				$window.location.href = "/dashboard.html";
			}, function errorCallback(response) {
				$scope.errorMessage = "USERNAME IS TAKEN";
			});
		};
	}
	$("#getstarted").click(function() {
	  $('.getstarted').removeClass('delay');

	  $('.loginButton1').removeClass('delay');
	  $('#createPassword').addClass('delay');
	  $('.emailTextbox').addClass('delay');

	  $('#getstarted').addClass('fadeOut');
	  $('#emailTextbox').addClass('extend');
	  $('#loginButton1').addClass('moveDown');
	  $('#loginButton1').html('CREATE ACCOUNT');
	  $('#loginButton1').attr('data-target', "");
	  $('#createPassword').addClass('fadeIn');
	  $('#backButton').addClass('fadeBack');
	  $scope.isClickable = true;
	});
    $("#backButton").click(function() {
      $('.getstarted').addClass('delay');
	  $('.emailTextbox').removeClass('delay');
	  $('.loginButton1').addClass('delay');
	  $('#createPassword').removeClass('delay');

	  $('#getstarted').removeClass('fadeOut');
	  $('#emailTextbox').removeClass('extend');
	  $('#loginButton1').removeClass('moveDown');
	  $('#loginButton1').html('LOG IN');
	  $('#loginButton1').attr('data-target', "#modal");
	  $('#createPassword').removeClass('fadeIn');
	  $('#backButton').removeClass('fadeBack');
	  $scope.isClickable = false;
	});
});

