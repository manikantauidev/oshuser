angular.module('newapp')
 .controller('addProdCtrl', function ($scope, $http, $location, resturl) {
	$http.get(resturl+"/getAllCategories").then(function(resp) {
		console.log(resp);
		$scope.menuitem = resp.data.categoryData;
	});
	$scope.subProdChange = function() {
		console.log($scope.subProdValue);
	}
	$scope.catchange=function(){
     console.log($scope.catvalue);
	  var index = $scope.menuitem.findIndex(function(item, i) {
        return item.title === $scope.catvalue;
    });
		$scope.categorySub = $scope.menuitem[index].subCategory
	}
	$scope.subCatChange = function() {
		console.log($scope.subCatValue);
	}
	$scope.proceed = function () {
		$http.get(resturl+"/admin/categories/"+$scope.subCatValue+"/"+$scope.subProdValue+"/?pageNumber=1&pageSize=15").then(function(resp) {
			$scope.routedata=resp.data.responseData;
			$scope.totalProdCount=resp.data.paginationData.totalCount;
			console.log($scope.routedata);
		});
	}
	$scope.prodAddDeletePaging = function(page, pageSize, total) {
		$http.get(resturl+"/admin/categories/"+$scope.subCatValue+"/"+$scope.subProdValue+"/?pageNumber="+page+"&pageSize=15").then(function(resp) {
			$scope.routedata=resp.data.responseData;
			$scope.totalProdCount=resp.data.paginationData.totalCount;
			console.log($scope.routedata);
		});
	};
	$scope.setProductFor = function(prodList){
		console.log(prodList);
		$scope.getProdDetails = {
			productId : prodList.productId,
			productName : prodList.productName,
			productPrice : prodList.productPrice,
			productDescription : prodList.productDescription,
			imageURL : prodList.imageURL,
			featureProduct : prodList.featureProduct,
			newProduct : prodList.newProduct,
			recommendedProduct : prodList.recommendedProduct,
			recentBought : prodList.recentBought
		};
		if($scope.subProdValue == "featureProduct"){
			if(prodList.featureProduct == "Y") {
				$scope.addButton = false;
				$scope.deleteButton = true;
			}
			else {
				$scope.addButton = true;
				$scope.deleteButton = false;
			}
		}
		else if($scope.subProdValue == "newProduct"){
			if(prodList.newProduct == "Y") {
				$scope.addButton = false;
				$scope.deleteButton = true;
			}
			else {
				$scope.addButton = true;
				$scope.deleteButton = false;
			}
		}
		else if($scope.subProdValue == "recommendedProduct"){
			if(prodList.recommendedProduct == "Y") {
				$scope.addButton = false;
				$scope.deleteButton = true;
			}
			else {
				$scope.addButton = true;
				$scope.deleteButton = false;
			}
		}
		else {
			if(prodList.recentBought == "Y") {
				$scope.addButton = false;
				$scope.deleteButton = true;
			}
			else {
				$scope.addButton = true;
				$scope.deleteButton = false;
			}
		}
	};
	
	$scope.addDelete = function(getProdDetails) {
		$('.setProdForPopup').modal('hide');
		var status = "Y";
		if(getProdDetails.featureProduct == "Y") {
			status="N";
			var addRemove = {
				"productId" : getProdDetails.productId,
				"title" : $scope.subProdValue,
				"status" : status
			}
		}
		else if(getProdDetails.newProduct == "Y") {
			status="N";
			var addRemove = {
				"productId" : getProdDetails.productId,
				"title" : $scope.subProdValue,
				"status" : status
			}
		}
		else if(getProdDetails.recommendedProduct == "Y") {
			status="N";
			var addRemove = {
				"productId" : getProdDetails.productId,
				"title" : $scope.subProdValue,
				"status" : status
			}
		}
		else if(getProdDetails.recentBought == "Y") {
			status = "N";
			var addRemove = {
				"productId" : getProdDetails.productId,
				"title" : $scope.subProdValue,
				"status" : status
			}
		}
		else {
			var addRemove = {
				"productId" : getProdDetails.productId,
				"title" : $scope.subProdValue,
				"status" : "Y"
			}
		}
		console.log(addRemove);
		$http.post(resturl+"/admin/addOrRemove", addRemove).then(function(resp){
			console.log(resp);
			if(resp.data.errorMessage == null) {
				$scope.successmessage = resp.data.statusMessage;
				$('.successPopup').modal('show');
			}
			else {
				$scope.deletemessage = resp.data.errorMessage;
				$('.failurePopup').modal('show');
			}
			$http.get(resturl+"/admin/categories/"+$scope.subCatValue+"/"+$scope.subProdValue+"/?pageNumber=1&pageSize=15").then(function(resp) {
				$scope.routedata=resp.data.responseData;
				$scope.totalProdCount=resp.data.paginationData.totalCount;
				console.log($scope.routedata);
			});
		});
	}
});