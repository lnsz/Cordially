var app = angular.module('app', []);

app.controller("ctrl", function($scope){
	$scope.months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
	// Today's date
	$scope.today = new Date();
	$scope.thisDay = $scope.today.getDate();
	$scope.thisMonth = $scope.today.getMonth()+1;
	$scope.thisYear = $scope.today.getFullYear();
	// Currently selected dates
	$scope.currentDay = $scope.thisDay;
	$scope.currentMonth = $scope.thisMonth;
	$scope.currentYear = $scope.thisYear;

	$scope.numDays = 31;
	$scope.extraDays = findExtraDays($scope.currentDay, $scope.currentMonth, $scope.currentYear);
	

	$scope.nextYear =  function(){
		$scope.currentYear++;
		if($scope.currentYear % 4 == 0){
			$scope.numDays = 29;
		} else{
			$scope.numDays = 28;
		}
		$scope.extraDays = findExtraDays($scope.currentDay, $scope.currentMonth, $scope.currentYear);
	};
	$scope.previousYear =  function(){
		$scope.currentYear--;
		if($scope.currentYear % 4 == 0){
			$scope.numDays = 29;
		} else{
			$scope.numDays = 28;
		}
		$scope.extraDays = findExtraDays($scope.currentDay, $scope.currentMonth, $scope.currentYear);
	};
	$scope.setMonth =  function(month){
		$scope.currentMonth = month;
		if($scope.currentMonth == 2){
			if($scope.currentYear % 4 == 0){
				$scope.numDays = 29;
			} else{
				$scope.numDays = 28;
			}
		} else if($scope.currentMonth == 1 || $scope.currentMonth == 3 || $scope.currentMonth == 5 ||
		 		  $scope.currentMonth == 7 || $scope.currentMonth == 8 || $scope.currentMonth == 10 || $scope.currentMonth== 12){
	  	   $scope.numDays = 31;
		} else{
		   $scope.numDays = 30;
		}
		$scope.extraDays = findExtraDays($scope.currentDay, $scope.currentMonth, $scope.currentYear);
	};
	$scope.range = function(n) {
        return new Array(n);
    };
    $scope.setMonth($scope.currentMonth);
});
var findExtraDays = function(currentDay, currentMonth, currentYear){
 	var k = 1;
	var m = currentMonth - 2;
	if (m == 0){
		m = 12;
	} else if (m == -1){
		m = 11;
	}
   	var c = Math.floor(currentYear / 100.0);
   	var y = currentYear - c * 100;
   	if (currentMonth == 1 || currentMonth == 2){
   		y--;
   	}
   	var w = (k + Math.floor(2.6 * m - 0.2) - 2 * c + y + Math.floor(y / 4.0) + Math.floor(c / 4.0)).mod(7); // https://cs.uwaterloo.ca/~alopez-o/math-faq/node73.html
   	return w;
}

Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
};