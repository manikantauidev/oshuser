angular.module('newapp')
  .controller('machineryMgmtCtrl', function ($scope, $http, $location, $window, resturl) {
	$scope.options = [
		{ name: 'Pending', status: 'N' },
		{ name: 'Approved', status: 'Y' },
		{ name: 'All', status: 'ALL' }
	];
	 $("#machfromdate, #machtodate").datepicker({
		autoclose: true,
		format: "yyyy-mm-dd",
		endDate: "today"
	});
	
	$scope.machinerySearch = [
		{type: 'Machinery Name', value: 'USER_NAME'},
		{type: 'Machinery Id', value: 'USER_ID'},
	];
	
	// Portfolio Approvals Starts //
	// Default API Calling //
	$scope.pending = true;
	var request = {
		status : "N"
	}
	$http.post(resturl+"/admin/getAdminMachineryPortfolio?pageNumber=1&pageSize=10", request).then(function(resp){
		console.log(resp);
		$scope.machineryApprovalsGrid.data = resp.data.responseData;
		$scope.machineryApprovalsCount = resp.data.paginationData.totalCount;
	});
	$scope.machineryApprovePaging = function(page, pageSize, total){
		$http.post(resturl+"/admin/getAdminMachineryPortfolio?pageNumber="+page+"&pageSize=10", request).then(function(resp){
			console.log(resp);
			$scope.machineryApprovalsGrid.data = resp.data.responseData;
			$scope.machineryApprovalsCount = resp.data.paginationData.totalCount;
		});
	};
	
	// Search A Machinery Method Starts //
	$scope.getPortfolioBySearch = function(searchType){
		console.log(searchType);
		if(searchType.type == 'Machinery Name'){
			var string = searchType.name;
		}
		else {
			var string = searchType.id;
		}
		var request = {
			searchFor : "MACHINERY_PORTFOLIO",
			searchBy : searchType.value,
			searchString : string
		};
		console.log(request);
		$http.post(resturl+"/getPortfoliosBySearch?pageNumber=1&pageSize=10", request).then(function(resp){
			console.log(resp);
			$scope.machineryApprovalsCount = resp.data.paginationData.totalCount;
			$scope.machineryApprovalsGrid.data = resp.data.responseData;
		});
	};
	//
	
	// Machinery & Equipments Grid Data Retrieval //
	$scope.machineryApprovalsGrid = {};
	$scope.machineryApprovalsGrid.columnDefs = [
		{name :'vendorName', displayName: 'Vendor'},
		{name :'equipmentName'},
		{name :'equipmentPrice'},
		{name :'hiringType'},
		{name :'status'},
		{name: 'Actions', width: 110, enableSorting:false, enableFiltering: false,
			cellTemplate: '<div class="text-center ui-grid-cell-contents"><button class="btn btn-primary" ng-click="grid.appScope.getEquipmentDetails(row)">Details</button></div>'
		}
	];
	
	// Equipment Popup Details  Retrieval //
	$scope.getEquipmentDetails = function(row){
		console.log(row.entity);
		$scope.machineryDetails = {
			equipmentName : row.entity.equipmentName,
			equipmentPrice : row.entity.equipmentPrice,
			vendorName : row.entity.vendorName,
			createdate : row.entity.createdate,
			imageURL : row.entity.imageURL,
			hiringType : row.entity.hiringType,
			machineryPortfolioId : row.entity.machineryPortfolioId
		};
		$scope.showApprove = false;
		if(row.entity.status == "N"){
			$scope.showApprove = true;
		}
		$('.equipmentApprovalsPopup').modal('show');
	}
	
	/* Approvals Filtering, Based on Status Value */
	$scope.selectToFilter = function (selectedValue) {
		if(selectedValue.status == "Y") {
			$scope.approved= true;
			$scope.pending = false;
			$scope.allPortfolio = false;
			var request = {
				status : "Y"
			};
			$http.post(resturl+"/admin/getAdminMachineryPortfolio?pageNumber=1&pageSize=10", request).then(function(resp){
				console.log(resp);
				$scope.machineryApprovalsCount = resp.data.paginationData.totalCount;
				$scope.machineryApprovalsGrid.data = resp.data.responseData;
			});
			
			$scope.machineryApprovePaging = function(page, pageSize, total){
				$http.post(resturl+"/admin/getAdminMachineryPortfolio?pageNumber="+page+"&pageSize=10", request).then(function(resp){
					console.log(resp);
					$scope.machineryApprovalsCount = resp.data.paginationData.totalCount;
					$scope.machineryApprovalsGrid.data = resp.data.responseData;
				});
			};
		}
		if(selectedValue.status == "N") {
			$scope.pending = true;
			$scope.approved= false;
			$scope.allPortfolio = false;
			var request = {
				status : "N"
			};
			$http.post(resturl+"/admin/getAdminMachineryPortfolio?pageNumber=1&pageSize=10", request).then(function(resp){
				console.log(resp);
				$scope.machineryApprovalsCount = resp.data.paginationData.totalCount;
				$scope.machineryApprovalsGrid.data = resp.data.responseData;
			});
			
			$scope.machineryApprovePaging = function(page, pageSize, total){
				$http.post(resturl+"/admin/getAdminMachineryPortfolio?pageNumber="+page+"&pageSize=10", request).then(function(resp){
					console.log(resp);
					$scope.machineryApprovalsCount = resp.data.paginationData.totalCount;
					$scope.machineryApprovalsGrid.data = resp.data.responseData;
				});
			};
		}
		if(selectedValue.status == "ALL") {
			$scope.allPortfolio = true;
			$scope.pending = false;
			$scope.approved= false;
			var request = {
				status : "ALL"
			};
			$http.post(resturl+"/admin/getAdminMachineryPortfolio?pageNumber=1&pageSize=10", request).then(function(resp){
				console.log(resp);
				$scope.machineryApprovalsCount = resp.data.paginationData.totalCount;
				$scope.machineryApprovalsGrid.data = resp.data.responseData;
			});
			
			$scope.machineryApprovePaging = function(page, pageSize, total){
				$http.post(resturl+"/admin/getAdminMachineryPortfolio?pageNumber="+page+"&pageSize=10", request).then(function(resp){
					console.log(resp);
					$scope.machineryApprovalsCount = resp.data.paginationData.totalCount;
					$scope.machineryApprovalsGrid.data = resp.data.responseData;
				});
			};
		}
	}
	
	$scope.approveMachinery = function(machineryDetails, selectedValue){
		console.log(selectedValue);
		$('.equipmentApprovalsPopup').modal('hide');
		console.log(machineryDetails);
		var request = {
			status : "Y",
			portfolioId : machineryDetails.machineryPortfolioId
		};
		$http.post(resturl+"/admin/manageAdminMachineryPortfolios", request).then(function(resp){
			console.log(resp);
			if(resp.data.status == true){
				$scope.success = resp.data.successMessage;
				$('.successPopup').modal('show');
			}
			else {
				$scope.failure = resp.data.errorMessgae;
				$('.ErrdealModal').modal('show');
			}
			if(selectedValue.status == "N"){
				var request = {
					status : "N"
				};
				$http.post(resturl+"/admin/getAdminMachineryPortfolio?pageNumber=1&pageSize=10", request).then(function(resp){
					console.log(resp);
					$scope.machineryApprovalsCount = resp.data.paginationData.totalCount;
					$scope.machineryApprovalsGrid.data = resp.data.responseData;
				});
			}
			else if(selectedValue.status == "Y"){
				var request = {
					status : "Y"
				};
				$http.post(resturl+"/admin/getAdminMachineryPortfolio?pageNumber=1&pageSize=10", request).then(function(resp){
					console.log(resp);
					$scope.machineryApprovalsCount = resp.data.paginationData.totalCount;
					$scope.machineryApprovalsGrid.data = resp.data.responseData;
				});
			}
			else {
				var request = {
					status : "ALL"
				};
				$http.post(resturl+"/admin/getAdminMachineryPortfolio?pageNumber=1&pageSize=10", request).then(function(resp){
					console.log(resp);
					$scope.machineryApprovalsCount = resp.data.paginationData.totalCount;
					$scope.machineryApprovalsGrid.data = resp.data.responseData;
				});
			}
		});
	}
	
	$scope.declineMachinery = function(){
		$('.equipmentApprovalsPopup').modal('hide');
		$('.confirmPopup').modal('show');
	}
	
	$scope.confirmDecline = function(machineryDetails, selectedValue){
		$('.confirmPopup').modal('hide');
		var request = {
			status : "N",
			portfolioId : machineryDetails.machineryPortfolioId
		};
		$http.post(resturl+"/admin/manageAdminMachineryPortfolios", request).then(function(resp){
			console.log(resp);
			if(resp.data.status == true){
				$scope.success = resp.data.successMessage;
				$('.successPopup').modal('show');
			}
			else {
				$scope.failure = resp.data.errorMessgae;
				$('.ErrdealModal').modal('show');
			}
			if(selectedValue.status == "N"){
				var request = {
					status : "N"
				};
				$http.post(resturl+"/admin/getAdminMachineryPortfolio?pageNumber=1&pageSize=10", request).then(function(resp){
					console.log(resp);
					$scope.machineryApprovalsCount = resp.data.paginationData.totalCount;
					$scope.machineryApprovalsGrid.data = resp.data.responseData;
				});
			}
			else if(selectedValue.status == "Y"){
				var request = {
					status : "Y"
				};
				$http.post(resturl+"/admin/getAdminMachineryPortfolio?pageNumber=1&pageSize=10", request).then(function(resp){
					console.log(resp);
					$scope.machineryApprovalsCount = resp.data.paginationData.totalCount;
					$scope.machineryApprovalsGrid.data = resp.data.responseData;
				});
			}
			else {
				var request = {
					status : "ALL"
				};
				$http.post(resturl+"/admin/getAdminMachineryPortfolio?pageNumber=1&pageSize=10", request).then(function(resp){
					console.log(resp);
					$scope.machineryApprovalsCount = resp.data.paginationData.totalCount;
					$scope.machineryApprovalsGrid.data = resp.data.responseData;
				});
			}
		});
	}
	// Portfolio Approvals Ends //
	
	// Machinery Bookings Starts //
	$scope.filterOptions = [
		{ name: 'Pending', status: 'N' },
		{ name: 'Closed', status: 'Y' },
		{ name: 'All', status: 'ALL' }
	];
	
	$scope.bookingSearch = [
		{type: 'User Name', value: 'USER_NAME'},
		{type: 'User Id', value: 'USER_ID'}
	];
	
	var request = {
		status : "N",
		vendorType : "5"
	};
	$http.post(resturl+"/getVendorBookingsForAdmin?pageNumber=1&pageSize=10", request).then(function(resp){
		console.log(resp);
		$scope.machineryBookingsGrid.data = resp.data.responseData;
		$scope.machineryBookingsCount = resp.data.paginationData.totalCount;
	});
	$scope.pendResponse = true;
	$scope.machineryBookingsPaging = function(page, pageSize, total, status){
		var request = {
			status :status,
			vendorType : "5"
		};
		$http.post(resturl+"/getVendorBookingsForAdmin?pageNumber="+page+"&pageSize=10", request).then(function(resp){
			console.log(resp);
			$scope.machineryBookingsGrid.data = resp.data.responseData;
			$scope.machineryBookingsCount = resp.data.paginationData.totalCount;
		});
	}
	$scope.machineryBookingsGrid = {};
	$scope.machineryBookingsGrid.columnDefs = [
		{name:'id', displayName: 'Booking Id', width: 120},
		{name:'vendorName', displayName: 'Vendor'},
		{name:'customerName', displayName: 'Customer'},
		{name:'bookingDate'},
		{name:'status',  width: 130},
		{name: 'Actions', width: 110, enableSorting:false, enableFiltering: false,
			cellTemplate: '<div class="text-center ui-grid-cell-contents"><button class="btn btn-primary"  ng-click="grid.appScope.getBookingDetails(row)">Details</button></div>'
		}
	];
	
	$scope.getBookingDetails = function(row) {
		$scope.bookingInfo = {
			id : row.entity.id,
			customerName : row.entity.customerName,
			vendorId : row.entity.vendorId,
			vendorName : row.entity.vendorName,
			customerEmailId : row.entity.customerEmailId,
			customerMobileNumber : row.entity.customerMobileNumber,
			vendorEmailId : row.entity.vendorEmailId,
			vendorMobileNumber : row.entity.vendorMobileNumber,
			bookingDate : row.entity.bookingDate,
			appointmentDate : row.entity.appointmentDate,
			equipmentName : row.entity.equipmentName,
			equipmentPrice : row.entity.equipmentPrice,
			hiringtype : row.entity.hiringtype
		};
		console.log($scope.bookingInfo.id);
		$('.bookingPopup').modal('show');
		$scope.showOpened = false;
		if(row.entity.status == "N"){
			$scope.showOpened = true;
		}
	}
	
	// Close Booking //
	$scope.closeBooking = function(bookingInfo, selectedType){
		$('.bookingPopup').modal('hide');
		var request = {
			bookingId : bookingInfo.id,
			status : "Y",
			comment : bookingInfo.comment
		};
		console.log(request);
		$http.post(resturl+"/adminVendorBookingClose", request).then(function(resp){
			console.log(resp);
			if(resp.data.status == "true"){
				$('.successPopup').modal('show');
				$scope.success = resp.data.successMessage;
			}
			else {
				$('.ErrdealModal').modal('show');
				$scope.failure = resp.data.errorMessage;
			}
			var payload = {
				vendorType : "5",
				status : selectedType
			};
			$http.post(resturl+"/getVendorBookingsForAdmin?pageNumber=1&pageSize=10", payload).then(function(resp){
				console.log(resp);
				$scope.machineryBookingsGrid.data = resp.data.responseData;
				$scope.machineryBookingsCount = resp.data.paginationData.totalCount;
			});
		});
	}
	
	// Function retrieve the booking's list based on status //
	$scope.machinaryByDate = function(status,mechenarybydate) {
			$window.scrollTo(0, 0);
		if(mechenarybydate.startDate > mechenarybydate.endDate){
			$scope.failure = "'From date' should be less than 'To date'";
			$('.ErrdealModal').modal('show');
		}else{
		if(status == "N"){
			var payload = {
				vendorType : "5",
				startDate : mechenarybydate.startDate,
				endDate : mechenarybydate.endDate,
				status : status
			
			};
			$http.post(resturl+"/getVendorBookingsForAdmin?pageNumber=1&pageSize=10", payload).then(function(resp){
				console.log(resp);
				$scope.machineryBookingsGrid.data = resp.data.responseData;
				$scope.machineryBookingsCount = resp.data.paginationData.totalCount;
			});
			$scope.pendResponse = true;
			$scope.responded = false;
			$scope.allbookings = false;
		}
		else if(status == "Y"){
			var payload = {
				vendorType : "5",
				startDate : mechenarybydate.startDate,
				endDate : mechenarybydate.endDate,
				status : status
			};
			$http.post(resturl+"/getVendorBookingsForAdmin?pageNumber=1&pageSize=10", payload).then(function(resp){
				console.log(resp);
				$scope.machineryBookingsGrid.data = resp.data.responseData;
				$scope.machineryBookingsCount = resp.data.paginationData.totalCount;
			});
			$scope.pendResponse = false;
			$scope.responded = true;
			$scope.allbookings = false;
		}
		else {
			var payload = {
				vendorType : "5",
				startDate : mechenarybydate.startDate,
				endDate : mechenarybydate.endDate,
				status : status
			};
			$http.post(resturl+"/getVendorBookingsForAdmin?pageNumber=1&pageSize=10", payload).then(function(resp){
				console.log(resp);
				$scope.machineryBookingsGrid.data = resp.data.responseData;
				$scope.machineryBookingsCount = resp.data.paginationData.totalCount;
			});
			$scope.pendResponse = false;
			$scope.responded = false;
			$scope.allbookings = true;
		}
		};
	}
	// Delete Confirmation Popup //
	$scope.deleteBooking = function(){
		$('.bookingPopup').modal('hide');
		$('.delBookConfPopup').modal('show');
	}
	
	// Deleting A Responded Booking //
	/*$scope.confirmDeleteBooking = function(bookingId, selectedType){
		var request = {
			id : bookingId
		};
		$http.post(resturl+"").then(function(resp){
			console.log(resp);
		});
	}*/
	
	// Search Customer Method Starts //
	$scope.getBookingsBySearch = function(bookingType){
		if(bookingType.type == 'User Name'){
			var string = bookingType.name;
		}
		else{
			var string = bookingType.id;
		}
		var request = {
			vendorType : "5",
			searchBy : bookingType.value,
			searchString : string
		};
		console.log(request);
		$http.post("http://103.92.235.45/shop/getVendorBookingsBySearch?pageNumber=1&pageSize=10", request).then(function(resp){
			console.log(resp);
			if(resp.data.responseData != null){
				$scope.noResults = false;
				
				$scope.machineryBookingsGrid.data = resp.data.responseData;
				$scope.machineryBookingsCount = resp.data.paginationData.totalCount;
			}
			else{
				$scope.noResults = true;
				$scope.message = resp.data.errorMsg;
				$scope.machineryBookingsGrid.data = [];
				$scope.machineryBookingsCount = 0;
			}
		});
	}
	// Search Customer Method Ends //
	
	// Machinery Bookings Ends //
	
});