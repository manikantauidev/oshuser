angular.module('newapp')
  .controller('vendorProductsCtrl', function ($scope, $http, $location, resturl) {
	$http.get(resturl+"/getRequestedVendorForAdmin?pageNumber=1&pageSize=10").then(function(resp){
		console.log(resp);
		$scope.vendorProductsGrid.data = resp.data.responseData;
		$scope.vendorProductsCount = resp.data.paginationData.totalCount;
	});
	
	$scope.vendorProductsPaging = function(page, pageSize ,total){
		$http.get(resturl+"/getRequestedVendorForAdmin?pageNumber="+page+"&pageSize=10").then(function(resp){
			console.log(resp);
			$scope.vendorProductsGrid.data = resp.data.responseData;
			$scope.vendorProductsCount = resp.data.paginationData.totalCount;
		});
	}
	$scope.vendorProductsGrid = {};
	$scope.vendorProductsGrid.columnDefs = [
		{name: 'vendorId'},
		{name: 'vendorName', displayName: 'Vendor'},
		{name: 'count', displayName: 'Total Products'},
		{name: 'Actions', width: 110, enableSorting:false, enableFiltering: false,
			cellTemplate: '<div class="text-center ui-grid-cell-contents"><button class="btn btn-primary" ng-click="grid.appScope.getVendorProducts(row)">Details</button></div>'
		}
	];
	
	$scope.getVendorProducts = function(row){
		$http.get(resturl+"/admin/vendor/products/"+row.entity.vendorId+"?pageNumber=1&pageSize=6").then(function(resp){
			console.log(resp);
			$scope.vendorProductDetails = resp.data.responseData;
			$scope.productsCount = resp.data.paginationData.totalCount;
			$scope.vendorProductDetails.vendorName = row.entity.vendorName;
			$scope.vendorProductDetails.vendorId = row.entity.vendorId;
			if(resp.status == "200"){
				$('.vendorProductsPopup').modal('show');
			}
		});
		$scope.productsPaging = function(page, pageSize, total){
			$http.get(resturl+"/admin/vendor/products/"+row.entity.vendorId+"?pageNumber="+page+"&pageSize=6").then(function(resp){
				console.log(resp);
				$scope.vendorProductDetails = resp.data.responseData;
				$scope.productsCount = resp.data.paginationData.totalCount;
				$scope.vendorProductDetails.vendorName = row.entity.vendorName;
				$scope.vendorProductDetails.vendorId = row.entity.vendorId;
				if(resp.status == "200"){
					$('.vendorProductsPopup').modal('show');
				}
			});
		}
		
	}
	
	/*$scope.productsGrid = {
		rowHeight:100
	};
	$scope.productsGrid.columnDefs = [
		{name: 'productId'},
		{name: 'productName'},
		{name: 'imageURL', displayName: 'Product Image',
			cellTemplate:"<img width=\"50px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"
		},
		{name: 'Select', width: 110, enableSorting:false, enableFiltering: false,
			cellTemplate: '<span class="vendor-chk-select"><input id="{{productDetails.vendorProductId}}" value="{{productDetails.vendorProductId}}" type="checkbox" ng-model="productDetails.checked" ng-click="vendorselect(productDetails)" /><label for="{{productDetails.vendorProductId}}"></label></span>'
		}
	];*/
	
	$scope.approveProducts = function(){
		$('.vendorProductsPopup').modal('hide');
		var vendorProductIds = $(".vendor-chk-select input:checkbox:checked").map(function(){
			return $(this).val();
		}).get();
		var request = {
			vendorProductIds : vendorProductIds,
			status : true
		};
		console.log(request);
		$http.post(resturl+"/admin/vendorproducts/activate", request).then(function(resp){
			console.log(resp);
			if(resp.data.status == "true"){
				$scope.success = resp.data.successMsg;
				$('.successPopup').modal('show');
			}
			else{
				$scope.failure = resp.data.errorMessage;
				$('.errorPopup').modal('show');
			}
			$http.get(resturl+"/getRequestedVendorForAdmin?pageNumber=1&pageSize=10").then(function(resp){
				console.log(resp);
				$scope.vendorProductsGrid.data = resp.data.responseData;
				$scope.vendorProductsCount = resp.data.paginationData.totalCount;
			});
		});
	}
	
	$scope.declineProducts = function(){
		$('.vendorProductsPopup').modal('hide');
		$('.confirmPopup').modal('show');
	}
	
	$scope.confirmDelete = function(){
		$('.confirmPopup').modal('hide');
		var vendorProductIds = $(".vendor-chk-select input:checkbox:checked").map(function(){
			return $(this).val();
		}).get();
		var request = {
			vendorProductIds : vendorProductIds,
			status : false
		};
		console.log(request);
		$http.post(resturl+"/admin/vendorproducts/activate", request).then(function(resp){
			console.log(resp);
			if(resp.data.status == "true"){
				$scope.success = resp.data.successMsg;
				$('.successPopup').modal('show');
			}
			else{
				$scope.failure = resp.data.errorMessage;
				$('.errorPopup').modal('show');
			}
			$http.get(resturl+"/getRequestedVendorForAdmin?pageNumber=1&pageSize=10").then(function(resp){
				console.log(resp);
				$scope.vendorProductsGrid.data = resp.data.responseData;
				$scope.vendorProductsCount = resp.data.paginationData.totalCount;
			});
		});
	}
});