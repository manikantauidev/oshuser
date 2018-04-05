angular.module('newapp')
  .controller('approveProdCtrl', function ($scope, $http, $location, resturl) {
	$scope.alerthide=function(){
		$scope.errmsg=false;
	}
	$http.get(resturl+"/admin/vendor/products/?"+"pageNumber=1&pageSize=15").then(function(resp) {
		console.log(resp);
		$scope.approve = resp.data.responseData;
		$scope.totalCount=resp.data.paginationData.totalCount;
		for(i=0; i<resp.data.responseData.length; i++) {
			$scope.vendorProdId = resp.data.responseData[i].vendorProductId;
		}
	});
	
	$scope.page = 1;
	$scope.PagingAct = function(page, pageSize, total) {
		$http.get(resturl+"/admin/vendor/products/?"+"pageNumber="+page+"&pageSize=15").then(function(resp) {
			$scope.approve = resp.data.responseData;
			$scope.totalCount=resp.data.paginationData.totalCount;
			for(i=0; i<resp.data.responseData.length; i++) {
				$scope.vendorProdId = resp.data.responseData[i].vendorProductId;
			}
		});
	}
	
	// Approve Product Request //
	$scope.vendorApprove = function(appDec) {
		console.log(appDec);
		$scope.approveProdReq = {
			vendorName : appDec.vendorName,
			vendorIdValue : appDec.vendorId,
			vendorProdIdValue : appDec.vendorProductId,
			prodName : appDec.productName,
			prodId : appDec.productId,
			imagePath : appDec.imageURL,
			prodDescription : appDec.productDescription,
			mobileNumber : appDec.vendorTelephone,
			houseNumber : appDec.houseNumber,
			area : appDec.area,
			street : appDec.street,
			city : appDec.city,
			state : appDec.state,			
			pinCode : appDec.pinCode
		};
	};
	
	$scope.approveVendorReq = function(approveProdReq) {
		var payload = {
			"vendorProductId": approveProdReq.vendorProdIdValue,
			"status" :true
		}
		console.log(payload);
		$http.post(resturl+"/admin/products/activate", payload).then(function(resp) {
			console.log(resp);
			if(resp.data.status == "true") {
				$('.approveVendorPopup').modal('hide');
				$('.successPopup').modal('show');
				$scope.errmessage = resp.data.successMsg;
			}
		$http.get(resturl+"/admin/vendor/products/?"+"pageNumber=1&pageSize=15").then(function(resp) {
			console.log(resp);
			$scope.approve = resp.data.responseData;
			$scope.totalCount=resp.data.paginationData.totalCount;
			for(i=0; i<resp.data.responseData.length; i++) {
				$scope.vendorProdId = resp.data.responseData[i].vendorProductId;
				}
		});
		
		$scope.page = 1;
			$scope.PagingAct = function(page, pageSize, total) {
				$http.get(resturl+"/admin/vendor/products/?"+"pageNumber="+page+"&pageSize=15").then(function(resp) {
					$scope.approve = resp.data.responseData;
					$scope.totalCount=resp.data.paginationData.totalCount;
						for(i=0; i<resp.data.responseData.length; i++) {
							$scope.vendorProdId = resp.data.responseData[i].vendorProductId;
						}
				});
			}
		});
	}
	$scope.declineRequest = function () {
		$('#getDealModal').modal('hide');
		$('#confirmPopup').modal('show');
	}
	$scope.declineVendorReq = function(approveProdReq) {
		var payload = {
			"vendorProductId": approveProdReq.vendorProdIdValue,
			"status" :false
		}
		console.log(payload);
	$http.post(resturl+"/admin/products/activate", payload).then(function(resp) {
		console.log(resp);
		if(resp.data.status == "false") {
			$('#confirmPopup').modal('hide');
			$('.successPopup').modal('show');
			$scope.errmessage = resp.data.errorMesg;
			console.log($scope.errmessage);
		}
		$http.get(resturl+"/admin/vendor/products/?"+"pageNumber=1&pageSize=15").then(function(resp) {
			console.log(resp);
			$scope.approve = resp.data.responseData;
			$scope.totalCount=resp.data.paginationData.totalCount;
				for(i=0; i<resp.data.responseData.length; i++) {
					$scope.vendorProdId = resp.data.responseData[i].vendorProductId;
				}
		});
		
		$scope.page = 1;
			$scope.PagingAct = function(page, pageSize, total) {
				$http.get(resturl+"/admin/vendor/products/?"+"pageNumber="+page+"&pageSize=15").then(function(resp) {
					$scope.approve = resp.data.responseData;
					$scope.totalCount=resp.data.paginationData.totalCount;
						for(i=0; i<resp.data.responseData.length; i++) {
							$scope.vendorProdId = resp.data.responseData[i].vendorProductId;
						}
				});
			}
		});
	}
});