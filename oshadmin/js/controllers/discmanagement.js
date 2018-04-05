angular.module('newapp')
  .controller('discmanagementCtrl', function ($scope,$http,$location,resturl) {
	$http.get(resturl+"/getAllCategories").then(function(resp) {	
	$scope.menuitems = angular.copy(resp.data.categoryData);
	$scope.catvalue = $scope.menuitems[0].title;
	if($scope.menuitems[0].subCategory != null){
		$scope.subCatValueEnb = false;
		$scope.categorySub = $scope.menuitems[0].subCategory;
		$scope.subCatValue = $scope.categorySub[0].title;
		$http.get(resturl+"/categories/" + $scope.subCatValue +"?"+"pageNumber=1&pageSize=15").then(function(resp) {
		$scope.addnewdealgrid.data = resp.data.responseData;
		$scope.addnewDtotalCount=resp.data.paginationData.totalCount; 
		});
	}else{
		$scope.subCatValueEnb = true;
		$scope.categorySub  = {};
	}
	});	
	/**** Grid ****/
	 $scope.addnewdealgrid = {};
  $scope.addnewdealgrid.columnDefs = [
    { name: 'productId'},
    { name: 'productName'},
	{ name: 'productPrice'},
	{ name: 'productDiscountPrice',displayName:'Discount Price'},
	{ name: 'productPriceSpecialStartDate',displayName:'StartDate'},
    { name: 'productPriceSpecialEndDate',displayName:'EndDate'},	
	{
    name: 'Actions',width: 110,enableSorting : false,enableFiltering:false,
    cellTemplate: '<div class="text-center ui-grid-cell-contents"><button class="btn btn-primary"  ng-click="grid.appScope.updateDisc(row)">Details</button></div>'
	}
	
  ];
  $scope.updateDisc = function(row) {	

$http.get(resturl+"/products/"+row.entity.productId).then(function(resp) {
		 $scope.updateDiscmgm={
  prodId:row.entity.productId,
   prodname:row.entity.productName,
   productPrice:row.entity.productPrice,
   productDiscountPrice:row.entity.productDiscountPrice,
   sdate:row.entity.productPriceSpecialStartDate,
   edate:row.entity.productPriceSpecialEndDate,
   description:resp.data.productDescription,
   title:resp.data.productTitle
	};
	$scope.prdImage=resp.data.defaultImage;
	 $('#updateDiscModal').modal('show');
		});
		
  }
   $("#dealmgmsdate,#dealmgmedate").datepicker({
       autoclose: true,
  format: "yyyy-mm-dd"
  });
  
  // Price || Discount Calculation Service //
	$scope.getDiscountValue = function(updateDiscmgm){
		if(updateDiscmgm.productDiscountPrice == undefined){
			var request = {
				productId : updateDiscmgm.prodId,
				status : true,
				discountValue : updateDiscmgm.productDiscountPercentage
			}
		} else {
			var request = {
				productId : updateDiscmgm.prodId,
				status : false,
				discountValue : updateDiscmgm.productDiscountPrice
			}
		}
		console.log(request);
		$http.post(resturl+"/getDiscountPriceOrPercentage", request).then(function(resp){
			console.log(resp);
			if(updateDiscmgm.productDiscountPrice == undefined){
				$scope.updateDiscmgm.productDiscountPrice = resp.data.discountedvalue;
			}
			else {
				$scope.updateDiscmgm.productDiscountPercentage = resp.data.discountedvalue;
			}
		});
	}
	$scope.setDisc = function(prodInfo) {
		function chkdate(StartDate,EndDate) {
        $scope.errDateMessage = '';        
        if(new Date(StartDate) > new Date(EndDate)){
        dealerrmsg('End Date should be greater than Start Date');
        return false;
        }
		else {
		$scope.dateErrorMsg = false;
		var payload = {
			"productId" : prodInfo.prodId,
			"productDiscountPrice":prodInfo.productDiscountPrice,
			"productPriceSpecialStartDate" : prodInfo.sdate,
			"productPriceSpecialEndDate" : prodInfo.edate
		};
		$http.post(resturl+"/updateProductDiscount", payload).then(function(resp){
			if(resp.data.status==true){	
		dealsuccmsg("Discount updated Sucessfully")		
		}
		else{
			dealerrmsg(resp.data.errorMsg)
		}		
		});
		}
	  };
	  chkdate(prodInfo.sdate,prodInfo.edate);
	}	
	 function dealerrmsg(param){
		$scope.dealerrmsg=param;
		$('#ErrdealModal').modal('show');
	}
	function dealsuccmsg(param){
		$scope.dealsuccmsg=param;
		$('#SuccessModal').modal('show');
	}
	$scope.catchange=function(){
	  var index = $scope.menuitems.findIndex(function(item, i) {
        return item.title === $scope.catvalue;
    });
	if($scope.menuitems[index].subCategory != null){
		$scope.subCatValueEnb = false;
		$scope.categorySub = $scope.menuitems[index].subCategory;
		$scope.subCatValue = $scope.categorySub[0].title;
		$http.get(resturl+"/categories/" + $scope.subCatValue +"?"+"pageNumber=1&pageSize=15").then(function(resp) {
		$scope.addnewdealgrid.data=resp.data.responseData;
		$scope.addnewDtotalCount=resp.data.paginationData.totalCount; 
		});
	}else{
		$scope.subCatValueEnb = true;
		$scope.categorySub  = {};
	}
	}
	$scope.subCatChange = function(){
		$http.get(resturl+"/categories/" + $scope.subCatValue +"?"+"pageNumber=1&pageSize=15").then(function(resp) {
			$scope.addnewdealgrid.data=resp.data.responseData;
			$scope.addnewDtotalCount=resp.data.paginationData.totalCount; 
		});
	}
	$scope.UpPagingAct = function(page, pageSize, total) {
		$http.get(resturl+"/categories/" + $scope.subCatValue +"?"+"pageNumber="+page+"&pageSize=15").then(function(resp) {		
			$scope.addnewdealgrid.data=resp.data.responseData;
			$scope.addnewDtotalCount=resp.data.paginationData.totalCount;
		});
	}
});