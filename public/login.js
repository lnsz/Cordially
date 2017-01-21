var app = angular.module('app', []);

app.controller("ctrl", function($scope, $http){
	$scope.username = "";
	$scope.password = "";
	$scope.errorMessage = "";

	$scope.login =  function(){
		console.log("Username: " + $scope.username + "\nPassword: " + $scope.password);
		$http.post("/login", {
			username: $scope.username, 
			password: $scope.password
		}).then(function successCallback(response) {
			$scope.errorMessage = "";
		}, function errorCallback(response) {
			$scope.errorMessage = "Incorrect username or password";
		});
	}
	$scope.createUser =  function(){
		console.log("Username: " + $scope.username + "\nPassword: " + $scope.password);
		$http.post("/createUser", {
			username: $scope.username, 
			password: $scope.password
		}).then(function successCallback(response) {
			$scope.errorMessage = "";
		}, function errorCallback(response) {
			$scope.errorMessage = "Username already exists";
		});
	};
});