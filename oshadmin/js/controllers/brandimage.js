angular.module('newapp')
  .controller('brandImageCtrl', function($scope, $http, $location, $window, resturl) {
	$scope.options = [
		{ name: 'All', status: 'ALL' },
		{ name: 'Enabled', status: 'Y' },
		{ name: 'Disabled', status: 'N' }];
	
	// Default Loading Of All Testimonials // 
	var payload = {
		status : "ALL"
	};
	$http.post(resturl+"/getBrandImages?"+"pageNumber=1&pageSize=15", payload).then(function(resp){
		console.log(resp);
		$scope.brandImagegrid.data = resp.data.responseData;
		$scope.brandImageCount =  resp.data.paginationData.totalCount;
	});
	$scope.brandImagePagingAct = function (page, pageSize, total) {
		$http.post(resturl+"/getBrandImages?pageNumber="+page+"&pageSize=15", payload).then(function(resp) {
		$scope.brandImagegrid.data = resp.data.responseData;
		$scope.brandImageCount = resp.data.paginationData.totalCount;
	});
	};
	$scope.brandImagegrid = {};
	$scope.brandImagegrid.columnDefs = [
		{name: 'brandId'},
		{name: 'brandName'},
		{name: 'status'},
		{name: 'Actions', width: 110, enableSorting:false, enableFiltering: false,
			cellTemplate: '<div class="text-center ui-grid-cell-contents"><button class="btn btn-primary"  ng-click="grid.appScope.brandImageDetails(row)">Details</button></div>'
		}];
	
	// Popup Values Retrieval //
	$scope.brandImageDetails = function(row){
		$scope.brandImageInfo = {
			brandId: row.entity.brandId,
            brandName: row.entity.brandName,
            brangImage: row.entity.brangImage
		};
		if(row.entity.status == "N") {
			$scope.enableShow = true;
			$scope.disableShow = false;
		}
		else {
			$scope.enableShow = false;
			$scope.disableShow = true;
		}		
		$('#brandImagePopup').modal('show');
	};
	// Reading the Seleting Files //
	$scope.files = [];
	$scope.$on("seletedFile", function (event, args) {
        $scope.$apply(function () {
            //add the file object to the scope's files collection
            if ($scope.files.length == 0) {
               $scope.files.push(args.file);
            } else {
               $scope.files.splice(0, 1);
               $scope.files.push(args.file);
            }
        });
    });
	
	$scope.brandImageUpload = function(brandImg){
		var request = {
			brandName : brandImg.brandName,
			status : "N"
		}
		console.log(request);
		$http({
			method: 'POST',
			url: resturl+"/uploadBrandImage",
			headers: {
				'Content-Type': undefined
			},
			transformRequest: function(data) {
			var formData = new FormData();
			formData.append("brandImageRequest", JSON.stringify(request));
				if (data.file.length == 0) {
					formData.append("file", new File([""], "emptyFile.jpg", {
						type: "impage/jpeg"
					}));
				}
				else {
					for (var i = 0; i < data.file.length; i++) {
						formData.append("file", data.file[i]);
					}
				}
				return formData;
			},
			data: {
				fileInfo: request,
				file: $scope.files
			}
		})
		.success(function(resp, status, headers, config) {
			console.log(resp);
			console.log(resp.status);
			$scope.files = [];
			if (resp.status == "true") {
				$scope.success = resp.successmessge;
				$('.successPopup').modal('show');
			} else {
				$scope.failure = resp.errorMessage;
				$('#ErrdealModal').modal('show');
			}
			var payload = {
				status : "ALL"
			};
			$http.post(resturl+"/getBrandImages?"+"pageNumber=1&pageSize=15", payload).then(function(resp){
				console.log(resp);
				$scope.brandImagegrid.data = resp.data.responseData;
				$scope.brandImageCount = resp.data.paginationData.totalCount;
			});
		}).error(function(data, status, headers, config) {
			$location.path('/brandimageupload');
		});
	};
	/* Filter Based on Status Value */
	$scope.selectToFilter = function (selectedValue) {
		if(selectedValue.status == "Y") {
			$scope.statusValue = selectedValue.status;
			var payload = {
				status : "Y"
			}
			console.log(status);
			$http.post(resturl+"/getBrandImages?"+"pageNumber=1&pageSize=15",payload).then(function(resp) {
				$scope.brandImagegrid.data = resp.data.responseData;
				$scope.brandImageCount = resp.data.paginationData.totalCount;
			});
			$scope.brandImagePagingAct = function (page, pageSize, total) {
				$http.post(resturl+"/getBrandImages?pageNumber="+page+"&pageSize=15", payload).then(function(resp) {
					$scope.brandImagegrid.data = resp.data.responseData;
					$scope.brandImageCount = resp.data.paginationData.totalCount;
				});
			};	
		}
		else if(selectedValue.status == "N"){
			$scope.statusValue = selectedValue.status;
			var payload = {
				status : "N"
			}
			console.log(status);
			$http.post(resturl+"/getBrandImages?"+"pageNumber=1&pageSize=15",payload).then(function(resp) {
				$scope.brandImagegrid.data = resp.data.responseData;
				$scope.brandImageCount = resp.data.paginationData.totalCount;
			});
			$scope.brandImagePagingAct = function (page, pageSize, total) {
				$http.post(resturl+"/getBrandImages?pageNumber="+page+"&pageSize=15", payload).then(function(resp) {
					$scope.brandImagegrid.data = resp.data.responseData;
					$scope.brandImageCount = resp.data.paginationData.totalCount;
				});
			};
		}
		else {
			$scope.statusValue = "ALL";
			var payload = {
				status : "ALL"
			}
			console.log(status);
			$http.post(resturl+"/getBrandImages?"+"pageNumber=1&pageSize=15",payload).then(function(resp) {
				$scope.brandImagegrid.data = resp.data.responseData;
				$scope.brandImageCount = resp.data.paginationData.totalCount;
			});
			$scope.brandImagePagingAct = function (page, pageSize, total) {
				$http.post(resturl+"/getBrandImages?pageNumber="+page+"&pageSize=15", payload).then(function(resp) {
					$scope.brandImagegrid.data = resp.data.responseData;
					$scope.brandImageCount = resp.data.paginationData.totalCount;
				});
			};
		}
	};
	$scope.deletebrandImage = function() {
		$('#brandImagePopup').modal('hide');
		$('#confirmPopup').modal('show');
	};
	$scope.confirmDelete = function(brandImageInfo){
		console.log(brandImageInfo.brandId);
		$http.get(resturl+"/deleteBrandImage/"+brandImageInfo.brandId).then(function(resp){
			console.log(resp);
			$('#confirmPopup').modal('hide');
			if(resp.data.status == "true"){
				$scope.success = resp.data.successMessage;
				$('.successPopup').modal('show');
				
			}
			else {
				$scope.failure = resp.data.errorMessage;
				$('.ErrdealModal').modal('show');
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
		$http.post(resturl+"/getBrandImages?"+"pageNumber=1&pageSize=15", $scope.payload).then(function(resp){
			$scope.brandImagegrid.data = resp.data.responseData;
			$scope.brandImageCount =  resp.data.paginationData.totalCount;
		});
		});
	};
	
	// Enable Brand Image Service //
	$scope.enableBrandImg = function(brandImageInfo) {
		$scope.enableRequest = {
			brandImageId : brandImageInfo.brandId,
			status : "Y"
		};
		console.log($scope.enableRequest);
		$http.post(resturl+"/enable/brandImage", $scope.enableRequest).then(function(resp){
			console.log(resp);
			$('#brandImagePopup').modal('hide');
			if(resp.data.status == "true") {
				$scope.success = resp.data.successMessage;
				$('#SuccessModal').modal('show');
			}
			else {
				$scope.failure = resp.data.errorMessage;
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
			$http.post(resturl+"/getBrandImages?"+"pageNumber=1&pageSize=15", $scope.disableRequest).then(function(resp) {
				$scope.brandImagegrid.data = resp.data.responseData;
				$scope.brandImageCount = resp.data.paginationData.totalCount;
			});
			// }
		});
	};
	
	// Disable Brand Image Service //
	$scope.disableBrandImg = function(brandImageInfo) {
		$scope.disableRequest = {
			brandImageId : brandImageInfo.brandId,
			status : "N"
		};
		console.log($scope.disableRequest);
		$http.post(resturl+"/enable/brandImage", $scope.disableRequest).then(function(resp){
			console.log(resp);
			$('#brandImagePopup').modal('hide');
			if(resp.data.status == "true") {
				$scope.success = resp.data.successMessage;
				$('#SuccessModal').modal('show');
			}
			else {
				$scope.failure = resp.data.errorMessage;
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
			$http.post(resturl+"/getBrandImages?"+"pageNumber=1&pageSize=15", $scope.enableRequest).then(function(resp) {
				$scope.brandImagegrid.data = resp.data.responseData;
				$scope.brandImageCount = resp.data.paginationData.totalCount;
			});
		});
	};
});
newapp.directive('brandImages', function () {
	return {
      require: 'ngModel',
      //create a new scope
      scope: true,
      link: function (scope, el, attrs, ngModel) {
         el.bind('change', function (event) {
            var files = event.target.files;
            //iterate files since 'multiple' may be specified on the element
            for (var i = 0; i < files.length; i++) {
               //emit event upward
               scope.$emit("seletedFile", {
                  file: files[i]
               });
            }
            scope.$apply(function () {
               console.log(el.val());
               ngModel.$setViewValue(el.val());
               ngModel.$render();
            })
         });
      }
   };
});