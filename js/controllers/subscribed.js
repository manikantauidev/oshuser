angular.module('newapp')
  .controller('subscribedCtrl', function ($scope, $http, $location, $window, resturl, $rootScope) {
	  $scope.typeOfSearch = [
		{name : "Category", value : "Category"},
		{name : "Brand", value : "Brand"},
		{name : "Product", value : "Product"}
	];
	$window.scrollTo(0, 0);
	  if(localStorage.loggedInUser !=undefined){
		$scope.loggedInUser=localStorage.loggedInUser;
		$scope.loggedInUserName=localStorage.loggedInUserName;
		$scope.userlogged=true;
	} else{
		$scope.userlogged=false;
	}
	if($rootScope.subscriptionData.status == "true"){
		$scope.message = $rootScope.subscriptionData.successMessage;
	}
	else{
		$scope.message = $rootScope.subscriptionData.errorMessage;
	}
	$scope.logout = function (){
		localStorage.clear();
		$location.path('/login');
	}
	$scope.myProfile = function () {
		$location.path('/myaccount');
	};
	$http.get(resturl+"/getAllCategories").then(function(resp) {
		console.log(resp);
		$scope.menuitem = resp.data.categoryData;
	});
    $http.get(resturl+"/getContactUS").then(function(resp){
		console.log(resp);
		$scope.contactdetails=resp.data;
	});
	$http.get(resturl+"/cart/displayCart?userId="+localStorage.loggedInuserId).then(function(resp){
		console.log(resp);
		$scope.cartlist=resp.data;
		console.log($scope.cartlist);
		if(resp.data.shoppingCartItems == null) {
			$scope.lengthofcart = 0;
		}
		else {
			$scope.lengthofcart = resp.data.shoppingCartItems.length;
		}
	});
});