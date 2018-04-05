angular.module('newapp')
 .controller('testimonialMgmtCtrl', function ($scope, $http, $location, $routeParams, resturl) {
	$scope.options = [
		{ name: 'All', status: 'ALL' },
		{ name: 'Enabled', status: 'Y' },
		{ name: 'Disabled', status: 'N' }];
	
	// Default Loading Of All Testimonials // 
	var payload = {
		status : "ALL"
	};
	$http.post(resturl+"/getTestimonials?"+"pageNumber=1&pageSize=15",payload).then(function(resp) {
		$scope.testimonialgrid.data = resp.data.responseData;
		$scope.testmonialCount = resp.data.paginationData.totalCount;
	});
	$scope.testmonFilter = function(selectValue) {
		$scope.selectValue = selectValue;
		console.log($scope.selectValue);
	};
	$scope.testmonPagingAct = function (page, pageSize, total) {
		$http.post(resturl+"/getTestimonials?pageNumber="+page+"&pageSize=15", payload).then(function(resp) {
		$scope.testimonialgrid.data = resp.data.responseData;
		$scope.testmonialCount = resp.data.paginationData.totalCount;
	});
	};
	
	// Grid Entities //
	$scope.testimonialgrid = {};
	$scope.testimonialgrid.columnDefs = [
		{name: 'customerId', enableFiltering: false},
		{name: 'customerName', enableFiltering: false},
		{name: 'testimonialId', enableFiltering: false},
		{name: 'description', enableFiltering: false, visible: false},
		{name: 'emailAddress', enableFiltering: false, visible: false},
		{name: 'status', displayName: 'Enable State', enableFiltering: true},
		{name: 'Actions', width: 110, enableSorting:false, enableFiltering: false,
			cellTemplate: '<div class="text-center ui-grid-cell-contents"><button class="btn btn-primary"  ng-click="grid.appScope.testmonialDetails(row)">Details</button></div>'
		}];

	// Popup Values Retrieval //
	$scope.testmonialDetails = function(row){
		$scope.testmonInfo = {
			custId: row.entity.customerId,
            custName: row.entity.customerName,
            description: row.entity.description,
			testmonId : row.entity.testimonialId,
			emailId : row.entity.emailAddress
		};
		if(row.entity.status == "N") {
			$scope.enableShow = true;
			$scope.disableShow = false;
		}
		else {
			$scope.enableShow = false;
			$scope.disableShow = true;
		}		
		$('#testimonPopup').modal('show');
	};
	
	// Filtering Based On Enable State //
	$scope.selectToFilter = function (selectedValue) {
		if(selectedValue.status == "Y") {
			$scope.statusValue = selectedValue.status;
			var payload = {
				status : "Y"
			}
			console.log(status);
			$http.post(resturl+"/getTestimonials?"+"pageNumber=1&pageSize=15",payload).then(function(resp) {
				$scope.testimonialgrid.data = resp.data.responseData;
				$scope.testmonialCount = resp.data.paginationData.totalCount;
			});
			$scope.testmonPagingAct = function (page, pageSize, total) {
				$http.post(resturl+"/getTestimonials?pageNumber="+page+"&pageSize=15", payload).then(function(resp) {
					$scope.testimonialgrid.data = resp.data.responseData;
					$scope.testmonialCount = resp.data.paginationData.totalCount;
				});
			};	
		}
		else if(selectedValue.status == "N"){
			$scope.statusValue = selectedValue.status;
			var payload = {
				status : "N"
			}
			console.log(status);
			$http.post(resturl+"/getTestimonials?"+"pageNumber=1&pageSize=15",payload).then(function(resp) {
				$scope.testimonialgrid.data = resp.data.responseData;
				$scope.testmonialCount = resp.data.paginationData.totalCount;
			});
			$scope.testmonPagingAct = function (page, pageSize, total) {
				$http.post(resturl+"/getTestimonials?pageNumber="+page+"&pageSize=15", payload).then(function(resp) {
					$scope.testimonialgrid.data = resp.data.responseData;
					$scope.testmonialCount = resp.data.paginationData.totalCount;
				});
			};
		}
		else {
			$scope.statusValue = "ALL";
			var payload = {
				status : "ALL"
			}
			console.log(status);
			$http.post(resturl+"/getTestimonials?"+"pageNumber=1&pageSize=15",payload).then(function(resp) {
				$scope.testimonialgrid.data = resp.data.responseData;
				$scope.testmonialCount = resp.data.paginationData.totalCount;
			});
			$scope.testmonPagingAct = function (page, pageSize, total) {
				$http.post(resturl+"/getTestimonials?pageNumber="+page+"&pageSize=15", payload).then(function(resp) {
					$scope.testimonialgrid.data = resp.data.responseData;
					$scope.testmonialCount = resp.data.paginationData.totalCount;
				});
			};
		}
	};
	
	// Confirm Delete Testimonial Popup //
	$scope.deleteTestmon = function() {
		$('#testimonPopup').modal('hide');
		$('#confirmPopup').modal('show');
	};
	
	// Enable Testimonial //
	$scope.enableTestmon = function(testmonInfo) {
		$scope.enableRequest = {
			testimonialId : testmonInfo.testmonId,
			status : "Y"
		};
		console.log($scope.enableRequest);
		$http.post(resturl+"/approve/testimonial", $scope.enableRequest).then(function(resp){
			console.log(resp);
			if(resp.data.status == "true") {
				$scope.testSuccMsg = resp.data.successMessage;
				$('#testimonPopup').modal('hide');
				$('#SuccessModal').modal('show');
			}
			else {
				$scope.testFailMsg = resp.data.errorMessage;
				$('#testimonPopup').modal('hide');
				$('#ErrdealModal').modal('show');
			}
			if($scope.statusValue == "N"){
				$scope.disableRequest = {
					status : "N"
				}
			}
			else {
				$scope.disableRequest = {
					status : "ALL"
				}
			}
			console.log($scope.disableRequest);
			$http.post(resturl+"/getTestimonials?"+"pageNumber=1&pageSize=15", $scope.disableRequest).then(function(resp) {
				$scope.testimonialgrid.data = resp.data.responseData;
				$scope.testmonialCount = resp.data.paginationData.totalCount;
			});
			// }
		});
	};
	
	// Disable Testimonial //
	$scope.disableTestmon = function(testmonInfo) {
		$scope.disableRequest = {
			testimonialId : testmonInfo.testmonId,
			status : "N"
		};
		console.log($scope.disableRequest);
		$http.post(resturl+"/approve/testimonial", $scope.disableRequest).then(function(resp){
			console.log(resp);
			if(resp.data.status == "true") {
				$scope.testSuccMsg = resp.data.successMessage;
				$('#testimonPopup').modal('hide');
				$('#SuccessModal').modal('show');
			}
			else {
				$scope.testFailMsg = resp.data.errorMessage;
				$('#testimonPopup').modal('hide');
				$('#ErrdealModal').modal('show');
			}
			if($scope.statusValue == "Y"){
				$scope.enableRequest = {
					status : "Y"
				}
			}
			else {
				$scope.enableRequest = {
					status : "ALL"
				}
			}
			console.log($scope.enableRequest);
			$http.post(resturl+"/getTestimonials?"+"pageNumber=1&pageSize=15", $scope.enableRequest).then(function(resp) {
				$scope.testimonialgrid.data = resp.data.responseData;
				$scope.testmonialCount = resp.data.paginationData.totalCount;
			});
		});
	};
	
	// Delete Testimonial after Confirmation //
	$scope.confirmDelete = function(testmonInfo) {
		console.log(testmonInfo.testmonId);
		$http.get(resturl+"/deleteTestimonial/"+testmonInfo.testmonId).then(function(resp){
			console.log(resp);
			$('#confirmPopup').modal('hide');
			if(resp.data.status == "true"){
				$scope.testSuccMsg = resp.data.successMessage;
				$('#SuccessModal').modal('show');
			}
			else {
				$scope.testFailMsg = resp.data.errorMessage;
				$('#ErrdealModal').modal('show');
			}
			if($scope.statusValue == "N"){
				$scope.payload = {
					status : "N"
				};
			}
			else if($scope.statusValue == "Y") {
				$scope.payload = {
					status : "Y"
				};
			}
			else {
				$scope.payload = {
					status : "ALL"
				};
			}
			$http.post(resturl+"/getTestimonials?"+"pageNumber=1&pageSize=15", $scope.payload).then(function(resp) {
				$scope.testimonialgrid.data = resp.data.responseData;
				$scope.testmonialCount = resp.data.paginationData.totalCount;
			});
		});
	};
});