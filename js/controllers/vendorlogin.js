angular.module('newapp')
 .controller('vendorlogCtrl', function($scope, $http, $location, $route,resturl) {
	$scope.typeOfSearch = [
		{name : "Category", value : "Category"},
		{name : "Brand", value : "Brand"},
		{name : "Product", value : "Product"}
	];
	$scope.vendorlog = function(vlogin) {
		console.log(vlogin);
	$http.post(resturl+"/user/login ", vlogin)
		.then(function(resp) {
	if(resp.data.success == true){
		localStorage.setItem("loggedInUser", vlogin.userName);
		console.log(localStorage.getItem("loggedInUser"));
		$location.path('/dashboard');
		$scope.title = resp.data.name;
			console.log($scope.title);
		localStorage.setItem("loggedInUserName", $scope.title);
			//console.log(localStorage.getItem(loggedInUserName));
		$scope.userType = resp.data.type;
			localStorage.setItem("loggedInUserType", $scope.userType);
			//console.log(localStorage.getItem(loggedInUserType));
			localStorage.setItem("loggedInuserId", resp.data.userId);
	}
	else if(resp.data.success == false) {
		$scope.errmsg=true;
		$scope.errmessage = resp.data.errorMessage;  
		$scope.vlogin.password ="";
		$location.path('/vendorlogin');
	}
	});
	}
	$scope.alerthide=function(){
		$scope.errmsg=false;
	}
	$http.get(resturl+"/getAllCategories").then(function(resp) {
		console.log(resp);
		$scope.menuitem = resp.data.categoryData;
	});
	$scope.mouseOver = function(param) {
		$scope.set_bg = function() {
			$scope.bgimg = param.imageURL;
			return {
				"background-image": "url(/clients/onesevenhome/img/" + $scope.bgimg + ".jpg)"
			};
		}
	}
	$http.get(resturl+"/cart/displayCart?userId="+localStorage.loggedInuserId).then(function(resp){
		console.log(resp);
		$scope.cartlist=resp.data;
		$scope.cartCode=resp.data.code;
		console.log($scope.cartlist);
		
		$scope.totalprice=resp.data.total;
		console.log($scope.lengthofcart);
		if(resp.data.shoppingCartItems == null) {
			$scope.lengthofcart = 0;
		} else {
			$scope.lengthofcart = resp.data.shoppingCartItems.length;
		}
	});
});