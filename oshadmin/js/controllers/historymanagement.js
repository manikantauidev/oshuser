angular.module('newapp')
  .controller('historyMgmtCtrl', function($scope, $http, $location, $window, resturl) {
	  $("#historyfromdate, #historytodate").datepicker({
		autoclose: true,
		format: "yyyy-mm-dd",
		endDate: "today"
	});
	$scope.historyByDate = function(historyDates){
		if(historyDates.fromdate > historyDates.todate){
			$scope.failure = "Invalid dates";
			$('.errorPopup').modal('show');
		}
		else{
			$http.post(resturl+"/getHistoryOfDealsByDate?pageNumber=1&pageSize=10&fromDate="+historyDates.fromdate+"&toDate="+historyDates.todate).then(function(resp){
				console.log(resp);
				$scope.historyMgmtGrid.data = resp.data.responseData;
				$scope.historyCount = resp.data.paginationData.totalCount;
			});
		}
	};
	$scope.historyPagingAct = function(page, pageSize, total, historyDates){
		$http.post(resturl+"/getHistoryOfDealsByDate?pageNumber="+page+"&pageSize=10&fromDate="+historyDates.fromdate+"&toDate="+historyDates.todate).then(function(resp){
			$scope.historyMgmtGrid.data = resp.data.responseData;
			$scope.historyCount = resp.data.paginationData.totalCount;
		});
	};
	// Grid Data Retrieval //
	$scope.historyMgmtGrid = {};
	$scope.historyMgmtGrid.columnDefs = [
		{name: 'productId'},
		{name: 'productName'},
		{name: 'productPrice'},
		{name: 'productDiscountPrice', displayName: 'Discount Price'},
		{name: 'enableFor'},
		{name: 'Actions', width: 110, enableSorting:false, enableFiltering: false,
			cellTemplate: '<div class="text-center ui-grid-cell-contents"><button class="btn btn-primary"  ng-click="grid.appScope.ProdHistoryDetails(row)">Details</button></div>'
		}
	];
	
	$scope.ProdHistoryDetails = function(row){
		console.log(row.entity);
		$scope.prodDetails = {
			historyManagementId : row.entity.historyManagementId,
			productId : row.entity.productId,
			productName : row.entity.productName,
			productPrice : row.entity.productPrice,
			productDiscountPrice : row.entity.productDiscountPrice,
			productPriceEndDate : row.entity.productPriceEndDate,
			productPriceStartDate : row.entity.productPriceStartDate
		};
		if(row.entity.enableFor == "TD"){
			$scope.prodDetails.enableFor = "Today's Deal";
		}
		if(row.entity.enableFor == "DOD"){
			$scope.prodDetails.enableFor = "Deal of The Day";
		}
		$('.historyMgntPopup').modal('show');
	}
});