angular.module('newapp')
 .controller('dealOfDayCtrl', function ($scope, $http, $location, resturl) {
	date = new Date();
	date.setDate(date.getDate());
	$("#dealStateDate, #dealEndDate").datepicker({
		autoclose: true,
		format: "yyyy-mm-dd",
		startDate: date
	});
	$http.get(resturl+"/getAllCategories").then(function(resp) {
		console.log(resp);
		$scope.menuitem = resp.data.categoryData;
	});
	$scope.catchange=function(){
     console.log($scope.catvalue);
	  var index = $scope.menuitem.findIndex(function(item, i) {
        return item.title === $scope.catvalue;
    });
		$scope.categorySub = $scope.menuitem[index].subCategory
	}
	$scope.subCatChange = function() {
		console.log($scope.subCatValue);
	}
	$http.get(resturl+"/getAllDealOfDay/"+"?"+"pageNumber=1&pageSize=15").then(function(resp) {
		$scope.dealOfTheDay = resp.data.responseData;
		$scope.totalCount=resp.data.paginationData.totalCount;
	});
	$scope.page = 1;
	$scope.PagingAct = function(page, pageSize, total) {
		$http.get(resturl+"/getAllDealOfDay/"+"?"+"pageNumber="+page+"&pageSize=15").then(function(resp) {
			$scope.dealOfTheDay = resp.data.responseData;
			$scope.totalCount=resp.data.paginationData.totalCount;
		});
	}
	
	$scope.getProd = function(dealData) {
		$scope.updateDealmgm = {
			imagePath : dealData.imageURL,
			prodId : dealData.productId,
			prodname : dealData.productName,
			sdate : dealData.productPriceSpecialStartDate,
			edate : dealData.productPriceSpecialEndDate,
			prodPrice : dealData.productPrice,
			prodDiscountPrice : dealData.productDiscountPrice,
			prodDescription : dealData.productDescription
		};
		console.log($scope.updateDealmgm);
	};
	$scope.page = 1;
	$scope.proceed = function () {
		$http.get(resturl+"/categories/"+$scope.subCatValue+"?"+"pageNumber="+$scope.page+"&pageSize=15").then(function(resp) {
			console.log(resp);
			$scope.prodData = resp.data.responseData;
			$scope.prodData.productPriceSpecialStartDate = resp.data.responseData.productPriceSpecialStartDate;
			$scope.prodData.productPriceSpecialEndDate = resp.data.responseData.productPriceSpecialEndDate;
			$scope.pagingTotal = resp.data.paginationData.totalCount;
		});
	}
	$scope.PagingAct = function(page, pageSize, total) {
		$http.get(resturl+"/categories/"+$scope.subCatValue+"?"+"pageNumber="+page+"&pageSize=15").then(function(resp) {
			console.log(resp);
			$scope.prodData = resp.data.responseData;
			$scope.prodData.productPriceSpecialStartDate = resp.data.responseData.productPriceSpecialStartDate;
			$scope.prodData.productPriceSpecialEndDate = resp.data.responseData.productPriceSpecialEndDate;
			$scope.pagingTotal = resp.data.paginationData.totalCount;
		});
	}
	$scope.alerthide=function(){
		$scope.dateErrorMsg=false;
		$scope.errmsg = false;
	}
	
	// Set a Product as Deal Of The Day //
	$scope.setProd = function(setDealMgmt) {
		function chkdate(StartDate, EndDate) {
        $scope.errDateMessage = '';        
        if(new Date(setDealMgmt.sdate) >= new Date(setDealMgmt.edate)){
		$scope.dateErrorMsg=true;
        $scope.errDateMessage = 'End Date should be greater than Start Date';
        return false;
        }
		else {
		$scope.dateErrorMsg = false;
		var payload = {
			"productId" : setDealMgmt.prodId,
			"productPriceSpecialStartDate" : setDealMgmt.sdate,
			"productPriceSpecialEndDate" : setDealMgmt.edate,
			"status" : "Y"
		};
		$http.post(resturl+"/admin/dealOfDay", payload).then(function(resp){
			console.log(resp);
			if(resp.data.errorMesg == null) {
				$scope.successMesssage=true;
					$('.setDealPopup').modal('hide');
					$('.successPopup').modal('show');
					$scope.errmessage = resp.data.successMsg;
			}
			else {
				$('.setDealPopup').modal('hide');
				$('.errorPopup').modal('show');
				$scope.errmessage = resp.data.errorMesg;
			}
			$http.get(resturl+"/getAllDealOfDay/"+"?"+"pageNumber=1&pageSize=15").then(function(resp) {
				$scope.dealOfTheDay = resp.data.responseData;
				$scope.totalCount=resp.data.paginationData.totalCount;
			});
			$scope.page = 1;
			$scope.PagingAct = function(page, pageSize, total) {
				$http.get(resturl+"/getAllDealOfDay/"+"?"+"pageNumber="+page+"&pageSize=15").then(function(resp) {
					$scope.dealOfTheDay = resp.data.responseData;
					$scope.totalCount=resp.data.paginationData.totalCount;
				});
			}
		});
		}
	  };
	  chkdate(setDealMgmt.sdate, setDealMgmt.edate);
	}
	$scope.updateProd = function(updateDealmgm) {
		function chkdate(StartDate,EndDate) {
        $scope.errDateMessage = '';        
        if(new Date(updateDealmgm.sdate) >= new Date(updateDealmgm.edate)){
		$scope.dateErrorMsg=true;
        $scope.errDateMessage = 'End Date should be greater than Start Date';
        return false;
        }
		else {
		$scope.dateErrorMsg = false;
		var payload = {
			"productId" : updateDealmgm.prodId,
			"productPriceSpecialStartDate" : updateDealmgm.sdate,
			"productPriceSpecialEndDate" : updateDealmgm.edate,
			"status" : "Y"
		};
		$http.post(resturl+"/admin/dealOfDay", payload).then(function(resp){
			console.log(resp);
			if(resp.data.errorMesg == null) {
				$scope.errmsg=true;
				$('.pop-up-1').modal('hide');
				$('.successPopup').modal('show');
				$scope.errmessage = resp.data.successMsg;
			}
			else {
				$scope.errmsg = true;
				$('.pop-up-1').modal('hide');
				$('.errorPopup').modal('show');
				$scope.errmessage = resp.data.errorMesg;
			}
			$http.get(resturl+"/getAllDealOfDay/"+"?"+"pageNumber=1&pageSize=15").then(function(resp) {
				$scope.dealOfTheDay = resp.data.responseData;
				$scope.totalCount=resp.data.paginationData.totalCount;
			});
			$scope.page = 1;
			$scope.PagingAct = function(page, pageSize, total) {
				$http.get(resturl+"/getAllDealOfDay/"+"?"+"pageNumber="+page+"&pageSize=15").then(function(resp) {
					$scope.dealOfTheDay = resp.data.responseData;
					$scope.totalCount=resp.data.paginationData.totalCount;
				});
			}
		});
		}
	  };
	  chkdate(updateDealmgm.sdate, updateDealmgm.edate);
	}
	
	// Product Info. to Set New Deal Of The Day -- //
	
	$scope.getProdInfo = function(prodInfo) {
		$scope.setDealMgmt = {
			prodId : prodInfo.productId,
			prodname : prodInfo.productName,
			sdate : prodInfo.productPriceSpecialStartDate,
			edate : prodInfo.productPriceSpecialEndDate,
			prodPrice : prodInfo.productPrice,
			prodDiscountPrice : prodInfo.productDiscountPrice,
			imagePath : prodInfo.imageURL,
			prodDescription : prodInfo.productDescription
		}
	}
	
	//-- To delete a Particular Product --//
	$scope.confirmDelete = function () {
		$('.pop-up-1').modal('hide');
		$('#confirmPopup').modal('show');
	}
	$scope.deleteProd = function(updateDealmgm) {
		var request = {
			"productId" : updateDealmgm.prodId,
			"productPriceSpecialStartDate" : updateDealmgm.sdate,
			"productPriceSpecialEndDate" : updateDealmgm.edate,
			"status" : "N"
		};
		console.log(request);
		$http.post(resturl+"/admin/dealOfDay", request).then(function(resp){
			console.log(resp);
			if(resp.data.errorMesg == null) {
				$scope.errmsg=true;
				$('#confirmPopup').modal('hide');
				$('.successPopup').modal('show');
				$scope.errmessage = resp.data.successMsg;
			}
			else {
				$scope.errmessage = resp.data.errorMesg;
				$('.errorPopup').modal('show');
			}
			$http.get(resturl+"/getAllDealOfDay/"+"?"+"pageNumber=1&pageSize=15").then(function(resp) {
				$scope.dealOfTheDay = resp.data.responseData;
				$scope.totalCount=resp.data.paginationData.totalCount;
			});
			$scope.page = 1;
			$scope.PagingAct = function(page, pageSize, total) {
				$http.get(resturl+"/getAllDealOfDay/"+"?"+"pageNumber="+page+"&pageSize=15").then(function(resp) {
					$scope.dealOfTheDay = resp.data.responseData;
					$scope.totalCount=resp.data.paginationData.totalCount;
				});
			}
		});
	}
});