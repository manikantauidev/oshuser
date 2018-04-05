angular.module('newapp') 
  .controller('deliveryctrl', function ($scope,$http, $location,resturl) {
	$scope.typeOfSearch = [
		{name : "Category", value : "Category"},
		{name : "Brand", value : "Brand"},
		{name : "Product", value : "Product"}
	];
	if(localStorage.loggedInUser !=undefined){
		$scope.loggedInUser=localStorage.loggedInUser;
		$scope.loggedInUserName=localStorage.loggedInUserName;
		$scope.userlogged=true;
	} else {
		$scope.userlogged=false;
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
	$scope.lengthofcart = 0;
	$http.get(resturl+"/shop/customer/displayShippingAddress/"+localStorage.loggedInuserId).then(function(resp){
		console.log(resp);
		$scope.deliverylist=resp.data.shippingAddress;
		$scope.customerName = resp.data.customerName;
		$scope.shippingLength = resp.data.shippingAddress.length;
		for(i=0; i<$scope.shippingLength; i++){
			$scope.addressId = resp.data.shippingAddress[i].preferenceOrder;
			console.log($scope.addressId);
		}
		$scope.hideAddress = true;
		if($scope.shippingLength >= 3) {
			$scope.hideAddress = false;
		}
	});
	$scope.newaddress = function (user) {
		if($scope.addressId ==1 || $scope.addressId ==3) {
			user.billingAddress = false;
			user.deliveryAddress = true;
			user.secondaryDeliveryAddress = false;
		}
		else {
			user.billingAddress = false;
			user.deliveryAddress = false;
			user.secondaryDeliveryAddress = true;
		}
		console.log(user);
		$http.post(resturl+"/shop/customer/updateShippingAddress/"+localStorage.loggedInuserId, user).then(function(resp) {
			console.log(resp);
			$scope.deliverylist=resp.data.shippingAddress;
			console
			$http.get(resturl+"/shop/customer/displayShippingAddress/"+localStorage.loggedInuserId).then(function(resp){
				console.log(resp);
				$scope.deliverylist=resp.data.shippingAddress;
				$scope.shippingLength = resp.data.shippingAddress.length;
				console.log($scope.shippingLength);
				if($scope.shippingLength >= 3) {
					$scope.hideAddress = false;
				}
				else {
					$scope.hideAddress = true;
				}
			});
		});
	};
	$scope.deleteProd = function (idProd) {
		console.log(idProd);
		$http.get(resturl+"/shop/customer/removeShippingAddress/"+localStorage.loggedInuserId+"?addressPref="+idProd).then(function(resp) {
			console.log(resp);
			$http.get(resturl+"/shop/customer/displayShippingAddress/"+localStorage.loggedInuserId).then(function(resp){
				console.log(resp);
				$scope.deliverylist=resp.data.shippingAddress;
				$scope.shippingLength = resp.data.shippingAddress.length;
				console.log($scope.shippingLength);
				if($scope.shippingLength >= 3) {
					$scope.hideAddress = false;
				}
				else {
					$scope.hideAddress = true;
				}
			});
		});
	}
$scope.preferenceOrder=1;
	$scope.address=function (preferenceOrder) {
		$scope.preferenceOrder = preferenceOrder;
		console.log($scope.preferenceOrder);
	}
	$scope.placeorder=function () {
		window.location.assign(resturl+"/order/commitOrder/" +$scope.cartCode+ "/"+$scope.preferenceOrder+"?"+"userId="+localStorage.loggedInuserId )
	}
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