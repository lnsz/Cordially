var app = angular.module('app', []);

app.controller("ctrl", function($scope){
	$scope.months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
	$scope.currentMonth = 1;
	$scope.currentDay = 21;
	$scope.currentYear = 2017;
	$scope.nextMonth =  function(){
		if($scope.currentMonth < 12){
			$scope.currentMonth++;
		}
		else{
			$scope.currentYear++;
			$scope.currentMonth = 1;
		}
	};
	$scope.previousMonth =  function(){
		if($scope.currentMonth > 1){
			$scope.currentMonth--;
		}
		else{
			$scope.currentYear--;
			$scope.currentMonth = 12;
		}
	};


});
