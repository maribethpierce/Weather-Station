//CONTROLLERS
weatherApp.controller('homeController', ['$scope', '$location', 'cityService', function($scope, $location, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    });
    
    $scope.submit = function() {
        $location.path("/forecast");
    };
    
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.weatherAPPID = "8a24faef01c610b877fa16b07a920c26"
    
    $scope.days = $routeParams.days || '2';
    
    $scope.convertToFahrenheit = function(degK) {
        
        return Math.round((1.8 * (degK - 273)) + 32);
        
    };
    
    $scope.convertToDate = function(dt) {
        
        return new Date(dt * 1000);
        
    }
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/", { callback: "JSON_CALLBACK"}, {get: { method: "JSONP"}});
    
    $scope.weatherResult = $scope.weatherAPI.get( { q: $scope.city, appid: $scope.weatherAPPID });
    
}]);

// cut from $scope.weatherResult - , cnt: $scope.days