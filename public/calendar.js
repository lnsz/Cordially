var app = angular.module('app', []);

app.controller("ctrl", function($scope){
	$scope.months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
	$scope.currentMonth = 1;
	$scope.currentDay = 21;
	$scope.currentYear = 2017;
	$scope.nextMonth =  function(){
		$scope.currentYear++;
	};
	$scope.previousYear =  function(){
		$scope.currentYear--;
	};
	$scope.setMonth =  function(month){
		$scope.currentMonth = month;
	};

});
