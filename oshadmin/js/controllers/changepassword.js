angular.module('newapp')
 .controller('changePassCtrl', function ($scope, $http, $location, $routeParams, resturl) {
	$http.get(resturl+"/admin/list").then(function(resp){
		console.log(resp);
		$scope.admin = resp.data.adminList;
		console.log($scope.admin);
		$scope.adminName = resp.data.adminList['0'].adminName;
		console.log($scope.adminName);
	});
	$scope.logout = function () {
		localStorage.clear();
		$location.path('/adminlogin');
	}
	$scope.alerthide=function(){
		$scope.errmsg=false;
	}
	$scope.changePswd = function(setNewPswd) {
		setNewPswd.adminName = $scope.adminName;
		console.log(setNewPswd);
		$http.post(resturl+"/admin/updatepassword", setNewPswd).then(function(resp){
			console.log(resp);
			if(resp.data.status == "true") {
				$scope.errmsg=true;
				$scope.errmessage = resp.data.successMessage;
			}
			else {
				$scope.errmsg = true;
				$scope.errmessage = resp.data.errorMessage;
			}
		});
	}
});