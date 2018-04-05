angular.module('newapp')
  .controller('wallpaperMgmtCtrl', function ($scope, $http, $location, $window, resturl) {
	$scope.options = [
		{ name: 'Pending', status: 'N' },
		{ name: 'Approved', status: 'Y' },
		{ name: 'All', status: 'ALL' }
	];
	
	// Retrieval, Approve, Decline Functionality Starts //
	// Default API Calling Starts //
	var payload = {
		status : "N"
	};
	$scope.pending = true;
	
	$http.post(resturl+"/admin/getAdminWallPaperPortfolio?pageNumber=1&pageSize=10", payload).then(function(resp){
		console.log(resp);
		$scope.wallpaperApprovalsGrid.data = resp.data.responseData;
		$scope.wallpaperCount = resp.data.paginationData.totalCount;
	});
	$scope.approvalPagingAct = function(page, pageSize, total){
		$http.post(resturl+"/admin/getAdminWallPaperPortfolio?pageNumber="+page+"&pageSize=10", payload).then(function(resp){
			console.log(resp);
			$scope.wallpaperApprovalsGrid.data = resp.data.responseData;
			$scope.wallpaperCount = resp.data.paginationData.totalCount;
		});
	}
	
	// Default API Calling Ends //
	
	// Grid Data Retrieval Starts //
	$scope.wallpaperApprovalsGrid = {};
	$scope.wallpaperApprovalsGrid.columnDefs = [
		{name: 'portfolioId', width: 130},
		{name: 'vendorId', width: 130},
		{name: 'vendorName', displayName: 'Vendor'},
		{name: 'portfolioName', displayName: 'Description'},
		{name: 'status', width: 120},
		{name: 'Actions', width: 110, enableSorting:false, enableFiltering: false,
			cellTemplate: '<div class="text-center ui-grid-cell-contents"><button class="btn btn-primary"  ng-click="grid.appScope.portfolioDetails(row)">Details</button></div>'
		}];
	// Grid Data Retrieval Ends //
	
	// Popup Data Retrieval Starts //
	$scope.portfolioDetails = function(row){
		$scope.getDetails = {
			vendorName : row.entity.vendorName,
			vendorId : row.entity.vendorId,
			portfolioName : row.entity.portfolioName,
			brand : row.entity.brand,
			thickness : row.entity.thickness,
			price : row.entity.price,
			size : row.entity.size,
			portfolioId : row.entity.portfolioId
		};
		$scope.imagePath = row.entity.imageURL;
		var res = $scope.imagePath.split(".");
		if(res[1] == "pdf" || res[1] == "doc" || res[1] == "docx" || res[1] == "txt"){
			$scope.showFile = true;
			$scope.showImage = false;
		}
		else{
			$scope.showFile = false;
			$scope.showImage = true;
		}
		if(row.entity.status == "N"){
			$scope.showApprove = true;
		}
		else{
			$scope.showApprove = false;
		}
		$('.approvalsPopup').modal('show');
	}
	// Popup Data Retrieval Ends //
	
	// Approve Wallpaper's Portfolio Starts //
	$scope.approvePortImg = function(getDetails, selectedValue){
		$('.approvalsPopup').modal('hide');
		console.log(getDetails);
		console.log(selectedValue);
		var request = {
			status : "Y",
			portfolioId : getDetails.portfolioId
		};
		$http.post(resturl+"/admin/manageAdminWallPaperPortfolios", request).then(function(resp){
			console.log(resp);
			if(resp.data.status == true){
				$scope.success = resp.data.successMessage;
				$('.successPopup').modal('show');
			}
			else {
				$scope.failure = resp.data.errorMessage;
				$('.ErrdealModal').modal('show');
			}
			if(selectedValue.status == "N"){
				var request = {
					status : "N"
				};
				$http.post(resturl+"/admin/getAdminWallPaperPortfolio?pageNumber=1&pageSize=10", request).then(function(resp){
					console.log(resp);
					$scope.wallpaperApprovalsGrid.data = resp.data.responseData;
					$scope.wallpaperCount = resp.data.paginationData.totalCount;
				});
			}
			else if(selectedValue.status == "Y"){
				var request = {
					status : "Y"
				};
				$http.post(resturl+"/admin/getAdminWallPaperPortfolio?pageNumber=1&pageSize=10", request).then(function(resp){
					console.log(resp);
					$scope.wallpaperApprovalsGrid.data = resp.data.responseData;
					$scope.wallpaperCount = resp.data.paginationData.totalCount;
				});
			}
			else {
				var request = {
					status : "ALL"
				};
				$http.post(resturl+"/admin/getAdminWallPaperPortfolio?pageNumber=1&pageSize=10", request).then(function(resp){
					console.log(resp);
					$scope.wallpaperApprovalsGrid.data = resp.data.responseData;
					$scope.wallpaperCount = resp.data.paginationData.totalCount;
				});
			}
		});
	}
	// Approve Wallpaper Portfolio Ends //
	
	// Confirm Popup To Decline //
	$scope.deletePortImg = function(){
		$('.approvalsPopup').modal('hide');
		$('.confirmPopup').modal('show');
	}
	// Decline Wallpaper's Portfolio Starts //
	$scope.confirmDelete = function(getDetails, selectedValue){
		console.log(getDetails);
		console.log(selectedValue);
		$('.confirmPopup').modal('hide');
		var request = {
			status : "N",
			portfolioId : getDetails.portfolioId
		};
		$http.post(resturl+"/admin/manageAdminWallPaperPortfolios", request).then(function(resp){
			console.log(resp);
			if(resp.data.status == true){
				$scope.success = resp.data.successMessage;
				$('.successPopup').modal('show');
			}
			else {
				$scope.failure = resp.data.errorMessage;
				$('.ErrdealModal').modal('show');
			}
			if(selectedValue.status == "N"){
				var request = {
					status : "N"
				};
				$http.post(resturl+"/admin/getAdminWallPaperPortfolio?pageNumber=1&pageSize=10", request).then(function(resp){
					console.log(resp);
					$scope.wallpaperApprovalsGrid.data = resp.data.responseData;
					$scope.wallpaperCount = resp.data.paginationData.totalCount;
				});
			}
			else if(selectedValue.status == "Y"){
				var request = {
					status : "Y"
				};
				$http.post(resturl+"/admin/getAdminWallPaperPortfolio?pageNumber=1&pageSize=10", request).then(function(resp){
					console.log(resp);
					$scope.wallpaperApprovalsGrid.data = resp.data.responseData;
					$scope.wallpaperCount = resp.data.paginationData.totalCount;
				});
			}
			else {
				var request = {
					status : "ALL"
				};
				$http.post(resturl+"/admin/getAdminWallPaperPortfolio?pageNumber=1&pageSize=10", request).then(function(resp){
					console.log(resp);
					$scope.wallpaperApprovalsGrid.data = resp.data.responseData;
					$scope.wallpaperCount = resp.data.paginationData.totalCount;
				});
			}
		});
	}
	// Decline Wallpaper's Portfolio Ends //
	
	/* Filter Based on Status Value */
	$scope.selectToFilter = function (selectedValue) {
		if(selectedValue.status == "ALL") {
			$scope.pending = false;
			$scope.approved = false;
			$scope.allPortfolio = true;
			var payload = {
				status : "ALL"
			}
			console.log(payload);
			$http.post(resturl+"/admin/getAdminWallPaperPortfolio?pageNumber=1&pageSize=10", payload).then(function(resp){
				console.log(resp);
				$scope.wallpaperApprovalsGrid.data = resp.data.responseData;
				$scope.wallpaperCount = resp.data.paginationData.totalCount;
			});
			$scope.approvalPagingAct = function(page, pageSize, total){
				$http.post(resturl+"/admin/getAdminWallPaperPortfolio?pageNumber="+page+"&pageSize=10", payload).then(function(resp){
					console.log(resp);
					$scope.wallpaperApprovalsGrid.data = resp.data.responseData;
					$scope.wallpaperCount = resp.data.paginationData.totalCount;
				});
			}
		}
		if(selectedValue.status == "N") {
			$scope.pending = true;
			$scope.approved = false;
			$scope.allPortfolio = false;
			var payload = {
				status : "N"
			}
			console.log(payload);
			$http.post(resturl+"/admin/getAdminWallPaperPortfolio?pageNumber=1&pageSize=10", payload).then(function(resp){
				console.log(resp);
				$scope.wallpaperApprovalsGrid.data = resp.data.responseData;
				$scope.wallpaperCount = resp.data.paginationData.totalCount;
			});
			$scope.approvalPagingAct = function(page, pageSize, total){
				$http.post(resturl+"/admin/getAdminWallPaperPortfolio?pageNumber="+page+"&pageSize=10", payload).then(function(resp){
					console.log(resp);
					$scope.wallpaperApprovalsGrid.data = resp.data.responseData;
					$scope.wallpaperCount = resp.data.paginationData.totalCount;
				});
			}
		}
		if(selectedValue.status == "Y") {
			$scope.pending = false;
			$scope.approved = true;
			$scope.allPortfolio = false;
			var payload = {
				status : "Y"
			}
			console.log(payload);
			$http.post(resturl+"/admin/getAdminWallPaperPortfolio?pageNumber=1&pageSize=10", payload).then(function(resp){
				console.log(resp);
				$scope.wallpaperApprovalsGrid.data = resp.data.responseData;
				$scope.wallpaperCount = resp.data.paginationData.totalCount;
			});
			$scope.approvalPagingAct = function(page, pageSize, total){
				$http.post(resturl+"/admin/getAdminWallPaperPortfolio?pageNumber="+page+"&pageSize=10", payload).then(function(resp){
					console.log(resp);
					$scope.wallpaperApprovalsGrid.data = resp.data.responseData;
					$scope.wallpaperCount = resp.data.paginationData.totalCount;
				});
			}
		}
	}
	// Retrieval, Approve, Decline Functionality Ends //
});