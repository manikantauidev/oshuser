angular.module('newapp')
  .controller('adminloginCtrl', function($scope, $http, $location, resturl) {
	$scope.redirect = function(admin) {
		console.log(admin);
		$http.post(resturl+"/admin/login", admin).then(function(resp) {
		if(resp.data.status == "true"){			
			localStorage.setItem("loggedInAdmin", admin.emailAddress);
			localStorage.setItem("OSHAdminName", resp.data.adminName);
			localStorage.setItem("OSHAdminId", resp.data.id);
			$location.path('/home');
		}
		else {
			$scope.errmsg=true;
			$scope.errmessage = resp.data.errorMessage;
			console.log($scope.errmessage);
			$location.path('/');
		}
	  });
	}
	$scope.alerthide=function() {
		$scope.errmsg=false;
	}
});