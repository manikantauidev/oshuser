angular.module('newapp') 
  .controller('RegistrationCtrl', function ($scope, $http, $location, $route,resturl,$rootScope) {   
	$scope.typeOfSearch = [
		{name : "Category", value : "Category"},
		{name : "Brand", value : "Brand"},
		{name : "Product", value : "Product"}
	];
	$http.get(resturl+"/getAllCategories").then(function(resp) {
		console.log(resp);
		$scope.menuitem = resp.data.categoryData;
	});
	$scope.isDisabled = false;
	$scope.alerthide=function(){
		$scope.errmsg=false;
	}
	$scope.register = function (user) {
	$scope.isDisabled = true;
	$rootScope.firstName =user.firstName;
	$rootScope.lastName =user.lastName;
	$rootScope.usertype =user.userType;
		user.activationURL="http://onesevenhome.com/#/activateuser";
		$http.post(resturl+"/customer/register", user).then(function(resp) {
			if(resp.data.status == "true"){
				$location.path('/conform');
			}
			else {
				$scope.errmsg=true;
				$scope.isDisabled = false;
				$location.path('/registration');
				$scope.errmessage = resp.data.errorMessage;
			}
		});
	};
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
		// Page Navigation To Top Functionality //
	jQuery(window).scroll(function() {
		if (jQuery(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
			jQuery('#return-to-top').fadeIn(200);    // Fade in the arrow
		} else {
			jQuery('#return-to-top').fadeOut(200);   // Else fade out the arrow
		}
	});
	jQuery('#return-to-top').click(function() {      // When arrow is clicked
		jQuery('body,html').animate({
			scrollTop : 0                       // Scroll to top of body
		}, 500);
	});
});