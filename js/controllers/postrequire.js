angular.module('newapp') 
  .controller('postrequirectrl', function ($scope,$http, $location,resturl) {
	$(".login-btn").click(function(){
		$(".myprofile-block").toggle();
	});
	$scope.typeOfSearch = [
		{name : "Category", value : "Category"},
		{name : "Brand", value : "Brand"},
		{name : "Product", value : "Product"}
	];
	if(localStorage.loggedInUser !=undefined){
		$scope.loggedInUser=localStorage.loggedInUser;
		$scope.loggedInUserName=localStorage.loggedInUserName;
		$scope.loggedInUserType = localStorage.loggedInUserType;
		$scope.loggedInuserId=localStorage.loggedInuserId;
		$scope.userlogged=true;
	} else {
		$scope.userlogged=false;
	}
	if ($scope.userlogged==true) {
	$scope.logout = function (){
		localStorage.clear();
		$location.path('/login');
	}
	$scope.mouseOver = function(param) {
		$scope.set_bg = function() {
		$scope.bgimg = param.imageURL;
			return {
				"background-image": "url(/clients/onesevenhome/img/" + $scope.bgimg + ".jpg)"
			};
		}
	}
	$scope.myProfile = function () {
		$location.path('/myaccount');
	};
	
	$http.get(resturl+"/getAllCategories").then(function(resp) {
		console.log(resp);
		 //$scope.menuitem = angular.copy(resp.data.categoryData);
            $scope.menuitems = angular.copy(resp.data.categoryData);
           // $scope.catvalue = $scope.menuitems[0].title;
          //  $scope.prodcatvalue = $scope.menuitems[0].title;
		$scope.menuitem = resp.data.categoryData;
		//console.log($scope.menuitem);
		$scope.menuitem.push({title: "Service"});
		//$scope.menuitem.push({title:"Architecture"});
	});

	$http.get(resturl+"/cart/displayCart?userId="+localStorage.loggedInuserId).then(function(resp){
		console.log(resp);
		$scope.cartlist=resp.data;
		console.log($scope.cartlist);
		if(resp.data.shoppingCartItems == null) {
			$scope.lengthofcart = 0;
		} else {
			$scope.lengthofcart = resp.data.shoppingCartItems.length;
		}
	});
	}else{
		$location.path('/login')
	}
	$http.get(resturl+"/getUser/"+localStorage.loggedInuserId).then(function(resp){
		console.log($scope.loggedInUserType);
		$scope.displayLastName = false;
		if($scope.loggedInUserType=="CUSTOMER"){
			$scope.displayLastName = true;
			$scope.userprofile = resp.data.customerDetails.billing;
			$scope.userprofile.email= resp.data.customerDetails.email;
			$scope.userprofile.state= resp.data.customerDetails.stateProvince;
		}
		else if($scope.loggedInUserType=="SERVICE") {
			$scope.userprofile = resp.data.serviceDetails;
			$scope.userprofile.firstName = resp.data.serviceDetails.vendorName;
			$scope.userprofile.phone = resp.data.serviceDetails.vendorTelephone;
			$scope.userprofile.address = resp.data.serviceDetails.houseNumber;
			$scope.userprofile.stateProvince = resp.data.serviceDetails.state;
		}
		else {
			$scope.userprofile = resp.data.vendorDetails;
			$scope.userprofile.firstName = resp.data.vendorDetails.vendorName;
			$scope.userprofile.phone = resp.data.vendorDetails.vendorTelephone;
			$scope.userprofile.address = resp.data.vendorDetails.houseNumber;
			$scope.userprofile.stateProvince = resp.data.vendorDetails.state;
		}
	});
	$scope.postreq=function (userprofile) {
		var payload = {
			category : userprofile.item.title,
			query : userprofile.query,
			customerId : $scope.loggedInuserId
		}
		console.log(payload);
	$http.post(resturl+"/postrequirement/save",payload).then(function(resp){
			console.log(resp);
			if(resp.data.status == "true"){
			//$scope.errmsg=true;			
			$scope.success = resp.data.successMessage;
					$('.successPopup').modal('show');
		}
		else {
			$scope.failure = resp.data.successMessage;
					$('.errorPopup').modal('show');
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