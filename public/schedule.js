var app = angular.module('app', []).config(function($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
});;

app.controller("ctrl", function($scope, $http, $location){
    $scope.options = [{"length": "CUSTOM", "colour": "#5F95CF"}, {"length": "15 MINUTES", "colour": "#68C6BF"}, {"length": "30 MINUTES", "colour": "#A897C7"}, {"length": "60 MINUTES", "colour": "#DFA73C"}];
    $scope.invisible = true;

    angular.element(document).ready(function() {
        console.log($location.search().username)
        if ($location.search().username != null){
            $http.get("/user", { params: {
                username: $location.search().username}
            }).then(function successCallback(response) {
                $scope.name = $location.search().username;
                $scope.invisible = false;
            }, function errorCallback(response) {
                console.log($location.search().username);
                $scope.invisible = true;
            });
        }else{
            $scope.invisible = true;
        }
    });
    $scope.name = $location.search()._id;
    $scope.scheduleEvent = function(eventDuration){
        window.location = "/process.html?username=" + $scope.name + "&duration=" + eventDuration;
    };

    $scope.colour = function(colour){
        return { color: colour };
    }
});