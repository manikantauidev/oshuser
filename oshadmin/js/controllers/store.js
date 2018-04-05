angular.module('newapp')
 .controller('storeCtrl', function ($scope, $http, $location, resturl) {
	 
	$scope.logout = function () {
		localStorage.clear();
		$location.path('/adminlogin');
	}
	$http.get(resturl+"/admin/getStore").then(function(resp) {
		console.log(resp);
		$scope.setStore=resp.data.storeInfo;
		console.log($scope.setStore);
	});
	$scope.alerthide=function(){
		$scope.errmsg=false;
	}
	$scope.storeUpdate = function (setStore) {
		setStore.storeCountry = "IN";
		console.log(setStore);
		$http.post(resturl+"/admin/updatestore", setStore).then(function(resp){
			console.log(resp);
			if(resp.data.status == "true") {
				setStore.storeCountry = "India";
				$scope.errmsg=true;
				$scope.errmessage = resp.data.successMessage;
				console.log($scope.errmessage);
			}
			else {
				$scope.errmsg=true;
				$scope.errmessage = resp.data.errorMessage;
				$location.path('/store');
			}
		});
	}
});	