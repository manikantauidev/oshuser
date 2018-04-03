angular.module('newapp')
  .controller('postaRequirementCtrl', function ($scope, $http, $location, resturl, $window) {
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
	$scope.getRequirements = function(status, requirementDates){
		$window.scrollTo(0, 0);
		if(requirementDates.startDate > requirementDates.endDate){
			$scope.failure = "'From date' should be less than 'To date'";
			$('#ErrdealModal').modal('show');
		}
		else{
			var request = {
				startDate : requirementDates.startDate,
				endDate : requirementDates.endDate,
				status : status
			};
			console.log(request);
			$http.post("http://103.92.235.45/shop/getPostRequirementsByDate", request).then(function(resp){
				console.log(resp);
				$scope.postRequirementGrid.data = resp.data.responseData;
				$scope.postRequireCount = resp.data.paginationData.totalCount;
			});
		}
	};
	
	$scope.postRequirePaging = function(page, pageSize, total, status, requirementDates){	
		$window.scrollTo(0, 0);
		var request = {
			startDate : requirementDates.startDate,
			endDate : requirementDates.endDate,
			status : status
		}
		$http.post("http://103.92.235.45/shop/getPostRequirementsByDate/?pageNumber="+page+"&pageSize=10", request).then(function(resp){
			console.log(resp);
			$scope.postRequirementGrid.data = resp.data.responseData;
			$scope.postRequireCount = resp.data.paginationData.totalCount;
		});	
	}
	
	$scope.postRequirementGrid = {};
	$scope.postRequirementGrid.columnDefs = [
		{ name: 'customerName'},
		{ name: 'customerId'},
		{ name: 'postRequirementId'},
		{ name: 'dateAndTime', displayName: 'Date & Time', type: 'date', cellFilter: 'date:"dd-MM-yyyy - HH:mm:ss"'},
		{name: 'Actions',width: 110,enableSorting:false,enableFiltering:false,
			cellTemplate: '<div class="text-center ui-grid-cell-contents"><button class="btn btn-primary"  ng-click="grid.appScope.detailRequirement(row)">Details</button></div>'
		}
	];
	
	$scope.detailRequirement = function(row) {
		$scope.requirementDetails ={
			customerName:row.entity.customerName,
			customerId:row.entity.customerId,
			postRequirementId:row.entity.postRequirementId,
			query:row.entity.query
		};
		$('#postRequirementModal').modal('show');
	};
	
	$scope.postReqRespond = function(requirementDetails, status, requirementDates){
		$window.scrollTo(0, 0);
		$('#postRequirementModal').modal('hide');
		var reqObj ={
			postRequirementId : requirementDetails.postRequirementId,
			responseMessage : requirementDetails.responseMessage
		};
		console.log(reqObj);
		$http.post(resturl+"/postrequirement", reqObj).then(function(resp){
			console.log(resp);
			if(resp.status != null){
				$scope.success = resp.data.successMessage;
				$('#SuccessModal').modal('show');
			}
			else{	
				$scope.failure = resp.data.errorMessage;
				$('#ErrdealModal').modal('show');
			}
		});
		var request = {
			startDate : requirementDates.startDate,
			endDate : requirementDates.endDate,
			status : status
		};
		
		$http.post("http://103.92.235.45/shop/getPostRequirementsByDate/?pageNumber=1&pageSize=10", request).then(function(resp){
			console.log(resp);
			$scope.postRequirementGrid.data = resp.data.responseData;
			$scope.postRequireCount = resp.data.paginationData.totalCount;
		});
		
	};
});