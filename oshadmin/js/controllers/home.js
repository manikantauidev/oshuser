angular.module('newapp')
 .controller('homeCtrl', function ($scope, $http, $location, resturl) {
	$http.get(resturl+"/admin/getStore").then(function(resp) {
		console.log(resp);
		$scope.storeDetails=resp.data.storeInfo;
		console.log($scope.storeDetails);
	});
	$scope.logout = function () {
		localStorage.clear();
		$location.path('/adminlogin');
	}
});