angular.module('newapp')
  .controller('registeredVendorsCtrl', function ($scope, $http, $location, resturl) {
	$scope.options = [
		{ name: 'Pending', status: '0' },
		{ name: 'Approved', status: '1' },
		{ name: 'All', status: 'ALL' }
	];
	var request = {
		status : "0"
	};
	$scope.pending = true;
	$http.post(resturl+"/getVendorForAdmin?pageNumber=1&pageSize=10", request).then(function(resp){
		console.log(resp);
		$scope.vendorsCount = resp.data.paginationData.totalCount;
		$scope.registerVendorsGrid.data = resp.data.responseData;
	});
	
	$scope.vendorListPaging = function(page, pageSize, total){
		$http.post(resturl+"/getVendorForAdmin?pageNumber="+page+"&pageSize=10", request).then(function(resp){
			console.log(resp);
			$scope.vendorsCount = resp.data.paginationData.totalCount;
			$scope.registerVendorsGrid.data = resp.data.responseData;
		});
	}
	
	$scope.registerVendorsGrid = {};
	$scope.registerVendorsGrid.columnDefs=[
	{name: 'vendorId', width: 140},
	{name: 'vendorName', displayName: 'Vendor'},
	{name: 'vendorType'},
	{name: 'status'},
	{name: 'Actions', width: 110, enableSorting:false, enableFiltering: false,
		cellTemplate: '<div class="text-center ui-grid-cell-contents"><button class="btn btn-primary"  ng-click="grid.appScope.vendorDetails(row)">Details</button></div>'
	}
	];
	
	$scope.vendorDetails = function(row){
		$http.get(resturl+"/getUser/"+row.entity.vendorId).then(function(resp){
			$scope.vendorProfile = resp.data.vendorDetails;
			console.log($scope.vendorProfile);
			$scope.vendorProfile.vendorId = row.entity.vendorId;
			$scope.showCertificate = true;
			$scope.noCertificate = false;
			if($scope.vendorProfile.vendorAuthCert == null || $scope.vendorProfile.vendorAuthCert == ""){
				console.log($scope.vendorProfile.vendorAuthCert);
				$scope.showCertificate = false;
				$scope.noCertificate = true;
			}
			if(resp.status = "200"){
				$('.vendorDetailsPopup').modal('show');
			}
		});
		$scope.showApprove = false;
		if(row.entity.status == "Pending for Approval"){
			$scope.showApprove = true;
		}
	}
	
	/* Filter Based on Status Value */
	$scope.selectToFilter = function (selectedValue) {
		if(selectedValue.status == "1") {
			$scope.approved= true;
			$scope.pending = false;
			$scope.allVendors = false;
			var request = {
				status : "1"
			};
			$http.post(resturl+"/getVendorForAdmin?pageNumber=1&pageSize=10", request).then(function(resp){
				console.log(resp);
				$scope.vendorsCount = resp.data.paginationData.totalCount;
				$scope.registerVendorsGrid.data = resp.data.responseData;
			});
			
			$scope.vendorListPaging = function(page, pageSize, total){
				$http.post(resturl+"/getVendorForAdmin?pageNumber="+page+"&pageSize=10", request).then(function(resp){
					console.log(resp);
					$scope.vendorsCount = resp.data.paginationData.totalCount;
					$scope.registerVendorsGrid.data = resp.data.responseData;
				});
			};
		}
		if(selectedValue.status == "0") {
			$scope.pending = true;
			$scope.approved= false;
			$scope.allVendors = false;
			var request = {
				status : "0"
			};
			$http.post(resturl+"/getVendorForAdmin?pageNumber=1&pageSize=10", request).then(function(resp){
				console.log(resp);
				$scope.vendorsCount = resp.data.paginationData.totalCount;
				$scope.registerVendorsGrid.data = resp.data.responseData;
			});
			
			$scope.vendorListPaging = function(page, pageSize, total){
				$http.post(resturl+"/getVendorForAdmin?pageNumber="+page+"&pageSize=10", request).then(function(resp){
					console.log(resp);
					$scope.vendorsCount = resp.data.paginationData.totalCount;
					$scope.registerVendorsGrid.data = resp.data.responseData;
				});
			};
		}
		if(selectedValue.status == "ALL") {
			$scope.allVendors = true;
			$scope.pending = false;
			$scope.approved= false;
			var request = {
				status : "ALL"
			};
			$http.post(resturl+"/getVendorForAdmin?pageNumber=1&pageSize=10", request).then(function(resp){
				console.log(resp);
				$scope.vendorsCount = resp.data.paginationData.totalCount;
				$scope.registerVendorsGrid.data = resp.data.responseData;
			});
			
			$scope.vendorListPaging = function(page, pageSize, total){
				$http.post(resturl+"/getVendorForAdmin?pageNumber="+page+"&pageSize=10", request).then(function(resp){
					console.log(resp);
					$scope.vendorsCount = resp.data.paginationData.totalCount;
					$scope.registerVendorsGrid.data = resp.data.responseData;
				});
			};
		}
	}
	
	$scope.approveVendor = function(vendorProfile){
		$('.vendorDetailsPopup').modal('hide');
		var request = {
			status : "Approved",
			vendorId : vendorProfile.vendorId
		};
		$http.post(resturl+"/approveVendorByAdmin", request).then(function(resp){
			console.log(resp);
			if(resp.data.status == "true"){
				$scope.success = resp.data.successMessage;
				$('.successPopup').modal('show');
			}
			else{
				$scope.failure = resp.data.errorMessage;
				$('.errorPopup').modal('show');
			}
			var request = {
				status : "0"
			};
			$http.post(resturl+"/getVendorForAdmin?pageNumber=1&pageSize=10", request).then(function(resp){
				console.log(resp);
				$scope.vendorsCount = resp.data.paginationData.totalCount;
				$scope.registerVendorsGrid.data = resp.data.responseData;
			});
		});
	}
	$scope.declineVendor = function(){
		$('.vendorDetailsPopup').modal('hide');
		$('.confirmPopup').modal('show');
	}
	
	$scope.confirmDelete = function(vendorProfile){
		$('.confirmPopup').modal('hide');
		var request = {
			status : "Pending for Approval",
			vendorId : vendorProfile.vendorId
		};
		$http.post(resturl+"/approveVendorByAdmin", request).then(function(resp){
			console.log(resp);
			if(resp.data.status == "true"){
				$scope.success = resp.data.successMessage;
				$('.successPopup').modal('show');
			}
			else{
				$scope.failure = resp.data.errorMessage;
				$('.errorPopup').modal('show');
			}
			var request = {
				status : "1"
			};
			$http.post(resturl+"/getVendorForAdmin?pageNumber=1&pageSize=10",request).then(function(resp){
				console.log(resp);
				$scope.vendorsCount = resp.data.paginationData.totalCount;
				$scope.registerVendorsGrid.data = resp.data.responseData;
			});
		});
	}
});