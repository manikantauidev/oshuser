angular.module('newapp')
  .controller('dealmanagementCtrl', function ($scope,$http,$location,$window,resturl) {
  date = new Date();
  date.setDate(date.getDate());
  $("#dealmgmsdate,#dealmgmedate").datepicker({
       autoclose: true,
  format: "yyyy-mm-dd",
   startDate: date
  });
 var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  $('.dealmgmdate').datepicker({
	  autoclose: true,
      	format: "yyyy-mm-dd"
		}).on('changeDate', function(ev){
      		$scope.alldeal=false;
	 getdealmgm(ev.format());
      	});
	$('.dealmgmdate').datepicker('setDate', today);
	//getdealmgm($('.dealmgmdate input').val());
  $scope.getalldeals=function(param){
	  if(param == true){
		  getdealmgm("ALL");
	  }else{getdealmgm($('.dealmgmdate input').val());}
  }
  /**** Add New Deal****/
  $scope.addnewdeal=function(){
	$('#addnewDealModal').modal('show');  
  }
	 $scope.DealMgmgrid = {};
  $scope.DealMgmgrid.columnDefs = [
    { name: 'productId'},
    { name: 'productName'},
	{ name: 'productPriceSpecialStartDate',displayName:'StartDate'},
    { name: 'productPriceSpecialEndDate',displayName:'EndDate'},	
	{
    name: 'Actions',width: 110,enableSorting : false,enableFiltering:false,
	 cellTemplate: '<div class="text-center ui-grid-cell-contents"><button class="btn btn-primary"  ng-click="grid.appScope.actionDeal(row)">Details</button></div>'
	}
  ];
   $scope.actionDeal = function(row) {	

$http.get(resturl+"/products/"+row.entity.productId).then(function(resp) {
		 $scope.updateDealmgm={
  prodId:row.entity.productId,
   prodname:row.entity.productName,
   description:resp.data.productDescription,
   sdate:row.entity.productPriceSpecialStartDate,
   edate:row.entity.productPriceSpecialEndDate
	};
	$scope.prodImage=resp.data.defaultImage;
	
	$('#updateDealModal').modal('show');
		});
  }
  
  
 $scope.updateDeals=function(updateDealmgm){	 
	  function chkdate(startDate,endDate) {
        $scope.errDateMessage = '';        
        if(new Date(startDate) > new Date(endDate)){
		$scope.errmsg=true;
        $scope.errDateMessage = 'End Date should be greater than start date';
        return false;
        }
		else{
		$scope.errmsg=false;
		var reqobj={"status":true,"productId":updateDealmgm.prodId,"productPriceSpecialStartDate":updateDealmgm.sdate ,"productPriceSpecialEndDate": updateDealmgm.edate};
	    $('#updateDealModal').modal('hide');
		$http.post(resturl+"/admin/deals/updateorremove", reqobj).then(function(resp) {
		if(resp.data.status=="true"){	
		dealsuccmsg(resp.data.successMsg)		
		 if($scope.alldeal==true){
			getdealmgm("ALL");
		 }
		 else{getdealmgm($('.dealmgmdate input').val());}
		 
		}
		else{
			dealerrmsg(resp.data.errorMesg)
		}
		});
		}
    };
	  chkdate(updateDealmgm.sdate,updateDealmgm.edate);
  }
  $scope.deleteDeal = function(row) {
	  $('#DeldealModal').modal('show');
	  deldealobj={"status":false,"productId":row.prodId,"productPriceSpecialStartDate": row.sdate ,"productPriceSpecialEndDate": row.edate};
  };
  $scope.deldealmgm = function () {
		$('#DeldealModal,#updateDealModal').modal('hide');
		$http.post(resturl+"/admin/deals/updateorremove", deldealobj).then(function(resp) {
		if(resp.data.status=="true"){	
			dealsuccmsg(resp.data.successMsg);
		 if($scope.alldeal==true){
			getdealmgm("ALL");
		 }
		 else{getdealmgm($('.dealmgmdate input').val());}
		}
		else{
			dealerrmsg(resp.data.errorMesg);
		}
		});
	};
	function dealerrmsg(param){
		$scope.dealerrmsg=param;
		$('#ErrdealModal').modal('show');
	}
	function dealsuccmsg(param){
		$scope.dealsuccmsg=param;
		$('#SuccessModal').modal('show');
	}
  function getdealmgm(param){
	  var req={"status" : param}
  $http.post(resturl+"/admin/getDeals", req).then(function(resp) {
		$scope.DealMgmgrid.data = resp.data.todaysDealsData;
		$scope.DealMgmuptotalCount=resp.data.paginationData.totalCount; 
		});
  }
$scope.alerthide=function() {
		$scope.errmsg=false;
	}
	
	
	/********      Add New Deal************/
	$http.get(resturl+"/getAllCategories").then(function(resp) {	
	$scope.menuitems = angular.copy(resp.data.categoryData);
	$scope.catvalue = $scope.menuitems[0].title;
	/**** Update Prod ********/
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
	
	
	
	 $scope.addnewdealgrid = {
		 enableCellEditOnFocus: true
		 
	 };
  $scope.addnewdealgrid.columnDefs = [
    { name: 'productId'},
    { name: 'productName'},
	{ name: 'productPriceSpecialStartDate',displayName:'StartDate'},
    { name: 'productPriceSpecialEndDate',displayName:'EndDate'},	
	{
    name: 'Actions',width: 110,enableSorting : false,enableFiltering:false,
	 cellTemplate: '<div class="text-center ui-grid-cell-contents"><button class="btn btn-primary"  ng-click="grid.appScope.addDeal(row)">Details</button></div>'
	}
  ];
	
	$scope.addDeal = function(row) {	

$http.get(resturl+"/products/"+row.entity.productId).then(function(resp) {
		 $scope.addnewDealmgm={
  prodId:row.entity.productId,
   prodname:row.entity.productName,
   description:resp.data.productDescription,
   sdate:row.entity.productPriceSpecialStartDate,
   edate:row.entity.productPriceSpecialEndDate
	};
	$scope.prodImage=resp.data.defaultImage;
	
	$('#addDealModal').modal('show');
		});
  }
  
  
  
$scope.addnewDeal = function(param) {
		function chkdate(StartDate,EndDate) {

        $scope.errDateMessage = '';        

        if(new Date(StartDate) > new Date(EndDate)){

		
        dealerrmsg('End Date should be greater than Start Date');

        return false;

        }

		else {

		$scope.dateErrorMsg = false;
    		
		var payload = {
			"productId" : param.prodId,
			"productPriceSpecialStartDate" : param.sdate,
			"productPriceSpecialEndDate" : param.edate,
			"status" : "true"
		};

		$http.post(resturl+"/admin/deals/updateorremove", payload).then(function(resp){
			$('#addDealModal').modal('hide');
			if(resp.data.status=="true"){	
		dealsuccmsg(resp.data.successMsg)		
		}
		else{
			dealerrmsg(resp.data.errorMesg)
		}
					
		});

		}

	  };

	  chkdate(param.sdate,param.edate);

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
			console.log(resp.data.responseData);
		
		$scope.addnewdealgrid.data = resp.data.responseData;
		
		$scope.addnewDtotalCount=resp.data.paginationData.totalCount; 
		});
	}else{
		$scope.subCatValueEnb = true;
		$scope.categorySub  = {};
	}
	
	}
	$scope.subCatChange = function(){
		$http.get(resturl+"/categories/" + $scope.subCatValue +"?"+"pageNumber=1&pageSize=15").then(function(resp) {
			
		$scope.addnewdealgrid.data = resp.data.responseData;
		$scope.addnewDtotalCount=resp.data.paginationData.totalCount; 
		});
	}
	$scope.UpPagingAct = function(page, pageSize, total) {
				$http.get(resturl+"/categories/" + $scope.subCatValue +"?"+"pageNumber="+page+"&pageSize=15").then(function(resp) {
			$window.scrollTo(60, 0);
			$scope.addnewdealgrid.data = resp.data.responseData;
			
			$scope.addnewDtotalCount=resp.data.paginationData.totalCount;
	});
	}

	
	
	
  });
