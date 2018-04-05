angular.module('newapp')
  .controller('newPassCtrl', function($scope, $http, $location, $routeParams,resturl) {
	$scope.typeOfSearch = [
		{name : "Category", value : "Category"},
		{name : "Brand", value : "Brand"},
		{name : "Product", value : "Product"}
	];
	$http.get("http://103.92.235.45/shop/getAllCategories").then(function(resp) {
		console.log(resp);
		$scope.menuitem = resp.data.categoryData;
	});
	
	$scope.alerthide=function(){
		$scope.errmsg=false;
	}
	$scope.newpassword = function (setNewPass) {
		setNewPass.ofid = $routeParams.ofid;
		setNewPass.email = $routeParams.email;
		console.log(setNewPass);
		$http.post(resturl+"/user/updatepwd", setNewPass).then(function(resp) {
			console.log(resp);
			// if(resp.data.errorMessage != null) {
				// $scope.errmsg=true;
				// $scope.errmessage = resp.data.errorMessage;
				// $location.path('/login');
			// }
			
			if(resp.data.errorMessage == null){
		$location.path('/login');
	}
	else {
		$scope.errmsg=true;
		$location.path('/newpassword');
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