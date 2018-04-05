angular.module('newapp')
  .controller('forgetPassCtrl', function($scope, $http, $location,resturl) {
	$scope.typeOfSearch = [
		{name : "Category", value : "Category"},
		{name : "Brand", value : "Brand"},
		{name : "Product", value : "Product"}
	];
	$http.get("http://103.92.235.45/shop/getAllCategories").then(function(resp) {
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
		console.log($scope.cartlist);
		if(resp.data.shoppingCartItems != null){
			$scope.lengthofcart = resp.data.shoppingCartItems.length;
			console.log($scope.lengthofcart);
		}
		else{
			$scope.lengthofcart = 0;
		}
	});
	$scope.alerthide=function(){
		$scope.errmsg=false;
	}
	$scope.forget = function (setnew) {
		console.log(setnew);
		setnew.forgotPwdURL = "http://onesevenhome.com/#/newpassword"
		$http.post(resturl+"/user/resetpwd", setnew).then(function(resp) {
			if(resp.data.errorMessage == null) {
				console.log(resp.data.errorMessage);
				$scope.errmsg=true;
				$scope.errmessage = resp.data.successMessage;
			}
			else {
				$scope.errmsg = true;
				$scope.errmessage = resp.data.errorMessage;
			}
		});
	};
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