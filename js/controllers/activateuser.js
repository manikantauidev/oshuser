angular.module('newapp')
  .controller('activateuserCtrl', function ($scope, $http, $location,resturl) {
	$scope.typeOfSearch = [
		{name : "Category", value : "Category"},
		{name : "Brand", value : "Brand"},
		{name : "Product", value : "Product"}
	];
	console.log($location.search());
	$http.post(resturl+"/user/activate", $location.search()).then(function(resp){
		console.log(resp);
		$location.path('/login');
	});
});