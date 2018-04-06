angular.module('newapp')
  .controller('architectsMgmtCtrl', function($scope, $http, $location, $window, resturl) {
	$scope.options = [
		{ name: 'Pending', status: 'N' },
		{ name: 'Approved', status: 'Y' },
		{ name: 'All', status: 'ALL' }
	];
	 $("#arcfromdate, #arctodate").datepicker({
		autoclose: true,
		format: "yyyy-mm-dd",
		endDate: "today"
	});
	
	$scope.architectSearch = [
		{type: 'Architect Name', value: 'USER_NAME'},
		{type: 'Architect Id', value: 'USER_ID'},
	];
	
	// Default API Response Calling Starts //
	var payload = {
		status : "N"
	};
	$scope.pending = true;
	
	$http.post(resturl+"/admin/getAdminArchitectsPortfolio?pageNumber=1&pageSize=10", payload).then(function(resp){
		console.log(resp);
		$scope.approvalsGrid.data = resp.data.responseData;
		$scope.approvalsCount = resp.data.paginationData.totalCount;
	});
	$scope.approvalPagingAct = function(page, pageSize, total){
		$http.post(resturl+"/admin/getAdminArchitectsPortfolio?pageNumber="+page+"&pageSize=10", payload).then(function(resp){
			console.log(resp);
			$scope.approvalsGrid.data = resp.data.responseData;
			$scope.approvalsCount = resp.data.paginationData.totalCount;
		});
	}
	// Default API Response Calling Ends //
	
	// Search An Architect Method Starts //
	$scope.getPortfolioBySearch = function(searchType){
		if(searchType.type == 'Architect Name'){
			var string = searchType.name;
		}
		else {
			var string = searchType.id;
		}
		var request = {
			searchFor : "ARCHITECT_PORTFOLIO",
			searchBy : searchType.value,
			searchString : string
		};
		console.log(request);
		$http.post(resturl+"/getPortfoliosBySearch?pageNumber=1&pageSize=10", request).then(function(resp){
			console.log(resp);
			$scope.approvalsGrid.data = resp.data.responseData;
			$scope.approvalsCount = resp.data.paginationData.totalCount;
		});
	}
	// Search An Architect Method Ends //
	
	// Grid Data Retrieval Starts //
	$scope.approvalsGrid = {};
	$scope.approvalsGrid.columnDefs = [
		{name: 'architectPortfolioId', displayName: 'Portfolio Id', width: 130},
		{name: 'vendorName', displayName: 'Vendor'},
		{name: 'portfolioName', displayName: 'Description'},
		{name: 'createdate', displayName: 'Date'},
		{name: 'status', width: 120},
		{name: 'Actions', width: 110, enableSorting:false, enableFiltering: false,
			cellTemplate: '<div class="text-center ui-grid-cell-contents"><button class="btn btn-primary"  ng-click="grid.appScope.portfolioDetails(row)">Details</button></div>'
		}];
	// Grid Data Retrieval Ends //
	
	// Popup Retrieval Starts //
	$scope.portfolioDetails = function(row){
		$scope.portfolioInfo = {
			architectPortfolioId : row.entity.architectPortfolioId,
			createdate : row.entity.createdate,
			portfolioName : row.entity.portfolioName,
			vendorDescription : row.entity.vendorDescription,
			vendorImageURL : row.entity.vendorImageURL,
			vendorName : row.entity.vendorName,
			vendorShortDescription : row.entity.vendorShortDescription
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
	// Popup Retrieval Ends //
	
	// Approve Portfolio Images Service Starts //
	$scope.approvePortImg = function(portfolioInfo){
		$('.approvalsPopup').modal('hide');
		console.log(portfolioInfo);
		var request = {
			status : 'Y',
			portfolioId : portfolioInfo.architectPortfolioId
		};
		console.log(request);
		$http.post(resturl+"/admin/manageAdminArchitectPortfolios", request).then(function(resp){
			console.log(resp);
			if(resp.data.status == true){
				$scope.success = resp.data.successMessage;
				$('.successPopup').modal('show');
			}
			else {
				$scope.failure = resp.data.errorMessgae;
				$('.ErrdealModal').modal('show');
			}
			var payload = {
				status : "N"
			};	
			$http.post(resturl+"/admin/getAdminArchitectsPortfolio?pageNumber=1&pageSize=10", payload).then(function(resp){
				console.log(resp);
				$scope.approvalsGrid.data = resp.data.responseData;
				$scope.approvalsCount = resp.data.paginationData.totalCount;
			});
		});
	}
	// Approve Portfolio Images Service Ends //
	
	
	// Decline Portfolio Images Service Starts //
	$scope.confirmDelete = function(portfolioInfo){
		$('.confirmPopup').modal('hide');
		console.log(portfolioInfo);
		var request = {
			status : 'N',
			portfolioId : portfolioInfo.architectPortfolioId
		};
		console.log(request);
		$http.post(resturl+"/admin/manageAdminArchitectPortfolios", request).then(function(resp){
			console.log(resp);
			if(resp.data.status == true){
				$scope.success = resp.data.successMessage;
				$('.successPopup').modal('show');
			}
			else {
				$scope.failure = resp.data.errorMessgae;
				$('.ErrdealModal').modal('show');
			}
			var payload = {
				status : "N"
			};	
			$http.post(resturl+"/admin/getAdminArchitectsPortfolio?pageNumber=1&pageSize=10", payload).then(function(resp){
				console.log(resp);
				$scope.approvalsGrid.data = resp.data.responseData;
				$scope.approvalsCount = resp.data.paginationData.totalCount;
			});
		});
	}
	// Decline Portfolio Images Service Ends //
	
	// Delete Portfolio Confirmation Call //
	$scope.deletePortImg = function(){
		$('.approvalsPopup').modal('hide');
		$('.confirmPopup').modal('show');
	}
	
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
			$http.post(resturl+"/admin/getAdminArchitectsPortfolio?pageNumber=1&pageSize=10", payload).then(function(resp){
				console.log(resp);
				$scope.approvalsGrid.data = resp.data.responseData;
				$scope.approvalsCount = resp.data.paginationData.totalCount;
			});
			$scope.approvalPagingAct = function(page, pageSize, total){
				$http.post(resturl+"/admin/getAdminArchitectsPortfolio?pageNumber="+page+"&pageSize=10", payload).then(function(resp){
					console.log(resp);
					$scope.approvalsGrid.data = resp.data.responseData;
					$scope.approvalsCount = resp.data.paginationData.totalCount;
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
			$http.post(resturl+"/admin/getAdminArchitectsPortfolio?pageNumber=1&pageSize=10", payload).then(function(resp){
				console.log(resp);
				$scope.approvalsGrid.data = resp.data.responseData;
				$scope.approvalsCount = resp.data.paginationData.totalCount;
			});
			$scope.approvalPagingAct = function(page, pageSize, total){
				$http.post(resturl+"/admin/getAdminArchitectsPortfolio?pageNumber="+page+"&pageSize=10", payload).then(function(resp){
					console.log(resp);
					$scope.approvalsGrid.data = resp.data.responseData;
					$scope.approvalsCount = resp.data.paginationData.totalCount;
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
			$http.post(resturl+"/admin/getAdminArchitectsPortfolio?pageNumber=1&pageSize=10", payload).then(function(resp){
				console.log(resp);
				$scope.approvalsGrid.data = resp.data.responseData;
				$scope.approvalsCount = resp.data.paginationData.totalCount;
			});
			$scope.approvalPagingAct = function(page, pageSize, total){
				$http.post(resturl+"/admin/getAdminArchitectsPortfolio?pageNumber="+page+"&pageSize=10", payload).then(function(resp){
					console.log(resp);
					$scope.approvalsGrid.data = resp.data.responseData;
					$scope.approvalsCount = resp.data.paginationData.totalCount;
				});
			}
		}
	}
	// Approvals Functionality Ends //
	
	// Bookings Functionality Starts //
	
	$scope.filterOptions = [
		{ name: 'Pending', status: 'N' },
		{ name: 'Approved', status: 'Y' },
		{ name: 'All', status: 'ALL' }
	];
	
	$scope.bookingSearch = [
		{type: 'User Name', value: 'USER_NAME'},
		{type: 'User Id', value: 'USER_ID'}
	];
	
	$scope.pendResponse = true;
	/*var request = {
		vendorType : "3",
		status : "N"
	};
	$http.post(resturl+"/getVendorBookingsForAdmin?pageNumber=1&pageSize=10", request).then(function(resp){
		console.log(resp);
		$scope.bookingsGrid.data = resp.data.responseData;
		$scope.bookingCount = resp.data.paginationData.totalCount;
	});
	$scope.bookingsPagingAct = function(page, pageSize, total){
		$http.post(resturl+"/getVendorBookingsForAdmin?pageNumber="+page+"&pageSize=10", request).then(function(resp){
			console.log(resp);
			$scope.bookingsGrid.data = resp.data.responseData;
			$scope.bookingCount = resp.data.paginationData.totalCount;
		});
	}*/
	$scope.bookingsGrid = {};
	$scope.bookingsGrid.columnDefs = [
		{name:'customerName', displayName: 'Customer'},
		{name:'vendorId', displayName: 'Achitect Id', width: 140},
		{name:'vendorName', displayName: 'Achitect'},
		{name:'status',  width: 130},
		{name: 'Actions', width: 110, enableSorting:false, enableFiltering: false,
			cellTemplate: '<div class="text-center ui-grid-cell-contents"><button class="btn btn-primary"  ng-click="grid.appScope.bookingDetails(row)">Details</button></div>'
		}
	];	
	
	$scope.bookingDetails = function(row){
		$scope.getBookedDetails = {
			customerName : row.entity.customerName,
			vendorName : row.entity.vendorName,
			appointmentDate : row.entity.appointmentDate,
			description : row.entity.description,
			bookingDate : row.entity.bookingDate,
			customerEmailId : row.entity.customerEmailId,
			customerMobileNumber : row.entity.customerMobileNumber,
			vendorEmailId : row.entity.vendorEmailId,
			vendorMobileNumber : row.entity.vendorMobileNumber,
			id : row.entity.id
		};
		$scope.showOpened = false;
		$('.bookingsPopup').modal('show');
		if(row.entity.status == "N"){
			$scope.showOpened = true;
		}
	}
	
	$scope.ArchitectByDate = function(status,architectsdate){
		if(architectsdate.startDate > architectsdate.endDate){
			$scope.failure = "'From date' should be less than 'To date'";
			$('.ErrdealModal').modal('show');
		}
		else{
		  if(status == "N"){
			$scope.pendResponse = true;
			$scope.responded = false;
			$scope.allbookings = false;
			var request = {
				vendorType : "3",
				startDate : architectsdate.startDate,
				endDate : architectsdate.endDate,
				status : status
			}
			$http.post(resturl+"/getVendorBookingsForAdmin?pageNumber=1&pageSize=10", request).then(function(resp){
				console.log(resp);
				$scope.bookingsGrid.data = resp.data.responseData;
				$scope.bookingCount = resp.data.paginationData.totalCount;
			});
			$scope.bookingsPagingAct = function(page, pageSize, total){
				$http.post(resturl+"/getVendorBookingsForAdmin?pageNumber="+page+"&pageSize=10").then(function(resp){
					console.log(resp);
					$scope.bookingsGrid.data = resp.data.responseData;
					$scope.bookingCount = resp.data.paginationData.totalCount;
				});
			}
		}
		else if(status == "Y"){
			$scope.pendResponse = false;
			$scope.responded = true;
			$scope.allbookings = false;
			var request = {
				vendorType : "3",
				startDate : architectsdate.startDate,
				endDate : architectsdate.endDate,
				status : status
			}
			$http.post(resturl+"/getVendorBookingsForAdmin?pageNumber=1&pageSize=10", request).then(function(resp){
				console.log(resp);
				$scope.bookingsGrid.data = resp.data.responseData;
				$scope.bookingCount = resp.data.paginationData.totalCount;
			});
			$scope.bookingsPagingAct = function(page, pageSize, total){
				$http.post(resturl+"/getVendorBookingsForAdmin?pageNumber="+page+"&pageSize=10").then(function(resp){
					console.log(resp);
					$scope.bookingsGrid.data = resp.data.responseData;
					$scope.bookingCount = resp.data.paginationData.totalCount;
				});
			}
		}
		else {
			$scope.pendResponse = false;
			$scope.responded = false;
			$scope.allbookings = true;
			var request = {
				vendorType : "3",
				startDate : architectsdate.startDate,
				endDate : architectsdate.endDate,
				status : status
			}
			$http.post(resturl+"/getVendorBookingsForAdmin?pageNumber=1&pageSize=10", request).then(function(resp){
				console.log(resp);
				$scope.bookingsGrid.data = resp.data.responseData;
				$scope.bookingCount = resp.data.paginationData.totalCount;
			});
			$scope.bookingsPagingAct = function(page, pageSize, total){
				$http.post(resturl+"/getVendorBookingsForAdmin?pageNumber="+page+"&pageSize=10", request).then(function(resp){
					console.log(resp);
					$scope.bookingsGrid.data = resp.data.responseData;
					$scope.bookingCount = resp.data.paginationData.totalCount;
				});
			}
		}
		};
	}
	
	// Close Booking Service //
	$scope.closeBooking  = function(getBookedDetails){
		$('.bookingsPopup').modal('hide');
		console.log(getBookedDetails);
		var request = {
			bookingId : getBookedDetails.id,
			comment : getBookedDetails.comment,
			status : "Y"
		}
		$http.post(resturl+"/adminVendorBookingClose", request).then(function(resp){
			console.log(resp);
			if(resp.data.status == "true"){
				$scope.success = resp.data.successMessage;
				$('.successPopup').modal('show');
			}
			else{
				$scope.failure = resp.data.errorMessage;
				$('.ErrdealModal').modal('show');
			}
			var payload = {
				status : "N",
				vendorType : "3"
			};
			$http.post(resturl+"/getVendorBookingsForAdmin?pageNumber=1&pageSize=10", payload).then(function(resp){
				console.log(resp);
				$scope.bookingsGrid.data = resp.data.responseData;
				$scope.bookingCount = resp.data.paginationData.totalCount;
			});
		});
	}
	
	// Search Customer Method Starts //
	$scope.getBookingsBySearch = function(bookingType){
		if(bookingType.type == 'User Name'){
			var string = bookingType.name;
		}
		else{
			var string = bookingType.id;
		}
		var request = {
			vendorType : "3",
			searchBy : bookingType.value,
			searchString : string
		};
		console.log(request);
		$http.post("http://103.92.235.45/shop/getVendorBookingsBySearch?pageNumber=1&pageSize=10", request).then(function(resp){
			console.log(resp);
			if(resp.data.responseData != null){
				$scope.noResults = false;
				$scope.bookingsGrid.data = resp.data.responseData;
				$scope.bookingCount = resp.data.paginationData.totalCount;
			}
			else{
				$scope.noResults = true;
				$scope.message = resp.data.errorMsg;
				$scope.bookingsGrid.data = [];
				$scope.bookingCount = 0;
			}
		});
	}
	// Search Customer Method Ends //
	
	// Respond Service Ends //
	// Bookings Functionality Ends //
});