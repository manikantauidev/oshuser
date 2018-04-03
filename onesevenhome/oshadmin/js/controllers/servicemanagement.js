angular.module('newapp')
  .controller('serviceMgmtCtrl', function($scope, $http, $location, $window, resturl) {
	$window.scrollTo(0, 0);
	$scope.options = [
		{ name: 'Opened Bookings', status: 'N' },
		{ name: 'Closed Bookings', status: 'Y' },
		{ name: 'All Bookings', status: 'ALL' }];
	$("#startDate, #endDate").datepicker({
         autoclose: true,
         format: "yyyy-mm-dd",
         endDate: "today"
     });
	 $scope.getBookings = function(selectedValue, bookingDates){
		 $window.scrollTo(0, 0);
		 console.log(selectedValue, bookingDates);
		 if(bookingDates.startDate > bookingDates.endDate){
			$scope.failure = "Start date must be less than End date";
			$('.errorPopup').modal('show');
		 }
		 else{
			if(selectedValue == "N"){
				$scope.opened = true;
				$scope.closed = false;
				$scope.allBookings = false;
			}
			else if(selectedValue == "Y"){
				$scope.opened = false;
				$scope.closed = true;
				$scope.allBookings = false;
			}
			else{
				$scope.opened = false;
				$scope.closed = false;
				$scope.allBookings = true;
			}
			 var request = {
				status : selectedValue,
				startDate : bookingDates.startDate,
				endDate : bookingDates.endDate
			}
			$http.post(resturl+"/admin/getServicesBookingByDate?pageNumber=1&pageSize=15", request).then(function(resp){
				console.log(resp);
				$scope.serviceBookedData = resp.data.responseData;
				$scope.bookingCount = resp.data.paginationData.totalCount;
			});
		 }
	 }
		
	$scope.getBookedService = function(bookedService){
		console.log(bookedService);
		$scope.bookedDetails = {
			"servicesBookingId" : bookedService.servicesBookingId,
			"serviceType" : bookedService.serviceType,
			"bookingDate" : bookedService.bookingDate,
			// Customer Details //
			"customerName" :bookedService.customerBookingdetails.customerName,
			"contactNumber" :bookedService.customerBookingdetails.contactNumber,
			"street" :bookedService.customerBookingdetails.street,
			"area" :bookedService.customerBookingdetails.area,
			"city" :bookedService.customerBookingdetails.city,
			"state" :bookedService.customerBookingdetails.state,
			"pinCode" :bookedService.customerBookingdetails.pinCode,
			"emailAddress" :bookedService.customerBookingdetails.emailAddress,
			
			// Service Provider Details //
			"companyName" :bookedService.serviceProviderDetails.companyName,
			"telephoneNumber" :bookedService.serviceProviderDetails.contactNumber,
			"houseNumber" :bookedService.serviceProviderDetails.houseNumber,
			"serviceStreet" :bookedService.serviceProviderDetails.street,
			"serviceArea" :bookedService.serviceProviderDetails.area,
			"serviceCity" :bookedService.serviceProviderDetails.city,
			"serviceState" :bookedService.serviceProviderDetails.state,
			"servicePincode" :bookedService.serviceProviderDetails.pinCode,
			"providerEmail" :bookedService.serviceProviderDetails.emailAddress,
		};
		$scope.showCloseBtn = false;
		if(bookedService.status == "N"){
			$scope.showCloseBtn = true;
		}
		
	}
	$scope.bookServicePaging = function(page, pageSize, total, selectedValue, bookingDates){
		$window.scrollTo(0, 0);
		var payload = {
			status : selectedValue,
			startDate : bookingDates.startDate,
			endDate : bookingDates.endDate
		};
		console.log(payload);
		$http.post(resturl+"/admin/getServicesBookingByDate/?pageNumber="+page+"&pageSize=15", payload).then(function(resp){
			console.log(resp);
			$scope.serviceBookedData = resp.data.responseData;
			$scope.bookingCount = resp.data.paginationData.totalCount;
		});
	}
	
	// Closing A Booked Service //
	$scope.closeBookedServ = function(bookedDetails, bookingDates, selectedValue){
		console.log(bookingDates, selectedValue);
		$('.bookServicePopup').modal('hide');
		console.log(bookedDetails);
		var reqPayload = {
			servicesBookingId : bookedDetails.servicesBookingId,
			status : "Y",
			comment : bookedDetails.comment
		};
		console.log(reqPayload);
		$http.post(resturl+"/admin/servicesBooking", reqPayload).then(function(resp){
			console.log(resp);
			if(resp.data.status == "TRUE"){
				$('.successPopup').modal('show');
				$scope.success = resp.data.successMessage;
			}
			else{
				$('.ErrdealModal').modal('show');
				$scope.failure = resp.data.errormessage;
			}
			var reqObj = {
				status : selectedValue,
				startDate : bookingDates.startDate,
				endDate : bookingDates.endDate
			}
			console.log(reqObj);
			$http.post(resturl+"/admin/getServicesBookingByDate/?pageNumber=1&pageSize=15", reqObj).then(function(resp){
				console.log(resp);
				$scope.serviceBookedData = resp.data.responseData;
				$scope.bookingCount = resp.data.paginationData.totalCount;
			});
		});
	}
	
	// Confirmation to Delete A Booked Service //
	$scope.deleteBookService = function(){
		$('.bookServicePopup').modal('hide');
		$('.confirmPopup').modal('show');
	}
	
	// Deletion of Booked Service //
	$scope.confirmDelete = function(servicesBookingId, bookingDates, selectedValue){
		$('.confirmPopup').modal('hide');
		$http.get(resturl+"/admin/deleteServicesBooking/"+servicesBookingId).then(function(resp){
			console.log(resp);
			if(resp.data.status == "TRUE"){
				$('.successPopup').modal('show');
				$scope.success = resp.data.successMessage;
			}
			else{
				$('.ErrdealModal').modal('show');
				$scope.failure = resp.data.errormessage;
			}
			var reqObj = {
				status : selectedValue,
				startDate : bookingDates.startDate,
				endDate : bookingDates.endDate
			}
			console.log(reqObj);
			$http.post(resturl+"/admin/getServicesBookingByDate?pageNumber=1&pageSize=15", reqObj).then(function(resp){
				console.log(resp);
				$scope.serviceBookedData = resp.data.responseData;
				$scope.bookingCount = resp.data.paginationData.totalCount;
			});
		});
	}
	
});