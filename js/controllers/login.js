angular.module('newapp')
  .controller('LoginCtrl', function($scope, $http, $location, $route,resturl) {
	$scope.typeOfSearch = [
		{name : "Category", value : "Category"},
		{name : "Brand", value : "Brand"},
		{name : "Product", value : "Product"}
	];
	$scope.redirect = function(session) {
		console.log(session);
		$http.post(resturl+"/user/login", session).then(function(resp) {
			if(resp.data.success == true){
				localStorage.setItem("loggedInUser", session.userName );
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
				$scope.session.password ="";
				$location.path('/login');
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