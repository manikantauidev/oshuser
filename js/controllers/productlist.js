angular.module('newapp')
  .controller('ProductlistCtrl', function( $scope, $http, $routeParams, $location,$window,resturl )  {   
	$scope.typeOfSearch = [
		{name : "Category", value : "Category"},
		{name : "Brand", value : "Brand"},
		{name : "Product", value : "Product"}
	];
	if(localStorage.loggedInUser !=undefined){
		$scope.loggedInUser=localStorage.loggedInUser;
		$scope.loggedInUserName=localStorage.loggedInUserName;
		$scope.loggedInUserType=localStorage.loggedInUserType;
		$scope.loggedInuserId=localStorage.loggedInuserId;
		$scope.userlogged=true;
	if($scope.customertype=="5"){
		$scope.categorytype = "Machinery & Equipment"
	}
	
	if($scope.loggedInUserType=="VENDOR" &&$location.path().split("/")[1]=="vendorcategories"){
		$scope.vendorproductadd =true;
		$scope.vendoradd=true;
		$scope.vendorwishproductadd =true;
	}
	else{
		$scope.vendorproductadd =false;
		$scope.vendoradd=true;
		$scope.vendorwishproductadd =true;
	}
	if( $location.path().split("/")[1]=="vendorcategories") {
	//$scope.vendoradd=true;
		$http.get(resturl+"/vendor/"+$scope.loggedInuserId+"/categories/"+$routeParams.cid+"?"+"pageNumber=1&pageSize=15").then(function(resp) {
			$scope.routedata=resp;
			console.log(resp);
			$scope.plist = resp.data.responseData;
				if(resp.data.responseData.length == "0"){
				$scope.prodshow = true;
				
			}else{
			$scope.prodshow = false;	
			}
			$scope.totalCount=resp.data.paginationData.totalCount;
		});
	}
	else{
		$scope.vendoradd=false;
		 $scope.vendorwishproductadd =false;
		 $scope.vendorproductadd =false;
	}
	}
	else {
		$scope.userlogged=false;
	}
	$scope.logout = function () {
		localStorage.clear();
		$location.path('/login');
	}
	$scope.myProfile = function () {
		$location.path('/myaccount');
	};
	$scope.categorytype = $routeParams.cid.replace(/_/g, " ");
	if ($routeParams.sid == "" || $routeParams.sid == undefined) {
		$scope.subcattype = true;
	} else {
		$scope.subcategorytype = $routeParams.sid. replace(/_/g, " ");
		$scope.subcattype = true;
	}
	
	$http.get(resturl+"/getAllCategories").then(function(resp) {
    $scope.menuitem = resp.data.categoryData;
	var menudata = resp.data.categoryData;
    var index = menudata.findIndex(function(item, i) {
        return item.title === $scope.categorytype;
    });
    $scope.categorySub = $scope.menuitem[index].subCategory;
    var sindex = $scope.categorySub.findIndex(function(item, i) {
        return item.title === $scope.subcategorytype;
		$scope.subcategorytype = $routeParams.sid.replace(/_/g, " ");
		$scope.subcattype = false;
    });
    if ($routeParams.sid == "" || $routeParams.sid == undefined) {
        $scope.categorySub[0].checked = true;
		$scope.routeurl=$scope.categorySub[0].url;
		$scope.subcategorytype=$scope.categorySub[0].title;
    } else {
        $scope.categorySub[sindex].checked = true;
		$scope.routeurl=$scope.categorySub[sindex].url;
    }
	console.log($scope.routeurl);
	if( $location.path().split("/")[1]=="vendorcategories") {
			//$scope.vendoradd=true;
			$http.get(resturl+"/vendor/"+$scope.loggedInuserId+"/categories/"+$routeParams.cid+"?"+"pageNumber=1&pageSize=15").then(function(resp) {
				$scope.routedata=resp;
				console.log(resp);
				$scope.plist = resp.data.responseData;
				if(resp.data.responseData.length == "0"){
				
				$scope.prodshow = true;
				
			}else{
			$scope.prodshow = false;	
			}
				$scope.totalCount=resp.data.paginationData.totalCount;
			});
		}else{
		$http.get(resturl+"/"+$scope.routeurl +"?"+"pageNumber=1&pageSize=15").then(function(resp) {
		$scope.routedata=resp;
		console.log(resp);
			$scope.plist = resp.data.responseData;
			if(resp.data.responseData.length == "0"){
				
				$scope.prodshow = true;
				
			}else{
			$scope.prodshow = false;	
			}
			$scope.totalCount=resp.data.paginationData.totalCount;
			$scope.maxProductPrice = resp.data.maxProductPrice;
			// if(resp.data.responseData.length == "0"){
				
				// $scope.prodshow = true;
				
			// }else{
			// $scope.prodshow = false;	
			// }
			console.log($scope.maxProductPrice);
			var disArray = [];
			for(abc=0; abc<resp.data.responseData.length; abc++) {
				disArray[abc] = "display"+abc;
			}
			for(i=0; i<resp.data.responseData.length; i++){
				if(resp.data.responseData[i].discountPercentage == undefined || resp.data.responseData[i].discountPercentage == null) {
					$scope.showTag = disArray[i];
					$scope[$scope.showTag] = false;
				}
				else{
					$scope.showTag = disArray[i];
					$scope[$scope.showTag] = true;
				}
			}
		});
		}
	
	filterparam($scope.routeurl);
	});
	
	if($location.path().split("/")[1]=="vendorcategories") {
			//$scope.vendoradd=true;
			$scope.page = 1;
			$scope.PagingAct = function(page, pageSize, total) {
			$http.get(resturl+"/vendor/"+$scope.loggedInuserId+"/"+$scope.routeurl+"?"+"pageNumber="+page+"&pageSize=15").then(function(resp) {
				$scope.routedata=resp;
				console.log(resp);
				$scope.plist = resp.data.responseData;
				$scope.totalCount=resp.data.paginationData.totalCount;
			});
			}
	}else{
	$scope.page = 1;
	$scope.PagingAct = function(page, pageSize, total) {
				$http.get(resturl+"/"+$scope.routeurl +"?"+"pageNumber="+page+"&pageSize=15").then(function(resp) {
		$window.scrollTo(0, 0);
			$scope.plist = resp.data.responseData;
			$scope.totalCount=resp.data.paginationData.totalCount; 
			if(resp.data.responseData.length == "0"){
				
				$scope.prodshow = true;
				
			}else{
			$scope.prodshow = false;	
			}
	var disArray = [];
			for(abc=0; abc<resp.data.responseData.length; abc++) {
				disArray[abc] = "display"+abc;
			}
			for(i=0; i<resp.data.responseData.length; i++){
				if(resp.data.responseData[i].discountPercentage == undefined || resp.data.responseData[i].discountPercentage == null) {
					$scope.showTag = disArray[i];
					$scope[$scope.showTag] = false;
				}
				else{
					$scope.showTag = disArray[i];
					$scope[$scope.showTag] = true;
				}
			}
	});
	}
	}
	
	$scope.fil = function(subfil) {
    angular.forEach($scope.categorySub, function(item) {
        item.checked = false;
		  $scope.subcategorytype = subfil.title;
    });
    subfil.checked = true;
		$scope.subcattype = true;
	$scope.routeurl=subfil.url;
	filterparam($scope.routeurl)
	
	if($routeParams.cid == "3"){
			$scope.arc = true;
			$scope.list = false;
			$scope.Novels = false;
			$scope.loc = true;
			$scope.mechinory =false;
			$scope.wal =false;
			
		}else if($routeParams.cid == "4"){
			$scope.arc = false;
			$scope.list = false;
			$scope.Novels = false;
			$scope.loc = true;
			$scope.mechinory =false;
			$scope.wal =true;
		}else if ($routeParams.cid == "5"){
			
			$scope.arc = false;
			$scope.list = false;
			$scope.Novels = false;
			$scope.loc = true;
			$scope.mechinory =true;
			$scope.wal =false;
			
	
		}else{
				$scope.list = true;
			$scope.Novels = true;
			$scope.loc = false;
			$scope.arc = false;
			$scope.mechinory =false;
			$scope.wal =false;
		
		}
	
	
	if( $location.path().split("/")[1]=="vendorcategories") {
		//$scope.vendoradd=true;
		$http.get(resturl+"/vendor/"+$scope.loggedInuserId+"/"+$scope.routeurl+"?"+"pageNumber=1&pageSize=15").then(function(resp) {
			$scope.routedata=resp;
			console.log(resp);
			$scope.plist = resp.data.responseData;
			if(resp.data.responseData.length == "0"){
				$scope.prodshow = true;
				
			}else{
			$scope.prodshow = false;	
			}
			$scope.totalCount=resp.data.paginationData.totalCount;
		});
	}
	else{
		$location.path('/sub_category/'+$scope.categorytype+$scope.routeurl)
		if($routeParams.catid != "Architects" ){
			$http.get(resturl+"/" + $scope.routeurl+"?"+"pageNumber=1&pageSize=15").then(function(resp) {
			$scope.routedata=resp;
			$scope.plist = resp.data.responseData;
			$scope.totalCount=resp.data.paginationData.totalCount;
if(resp.data.responseData.length == "0"){
				
				$scope.prodshow = true;
				
			}else{
			$scope.prodshow = false;	
			}			
				var disArray = [];
				for(abc=0; abc<resp.data.responseData.length; abc++) {
					disArray[abc] = "display"+abc;
				}
			for(i=0; i<resp.data.responseData.length; i++){
				if(resp.data.responseData[i].discountPercentage == undefined || resp.data.responseData[i].discountPercentage == null) {
					$scope.showTag = disArray[i];
					$scope[$scope.showTag] = false;
				}
				else{
					$scope.showTag = disArray[i];
					$scope[$scope.showTag] = true;
				}
			}
		});
		}
		
		
	}
	};
	$scope.vendoraddprod=function(){
		var productId = $(".vendor-chk-select input:checkbox:checked").map(function(){
      return $(this).val();
    }).get();
		var reqobj={"vendorId":$scope.loggedInuserId,"productId":productId}
	$http.post(resturl+"/addVendorProducts", reqobj).then(function(resp) {
	console.log(resp)
	if (resp.data.status == "true") {
					$scope.successmessage = resp.data.successMessage;
					$('.successPopup').modal('show');
					} else {
						$scope.errmessage = resp.data.errorMessage;
					$('.errorPopup').modal('hide');
					}
					$http.get(resturl+"/"+$scope.routeurl +"?"+"pageNumber=1&pageSize=15").then(function(resp) {
		$scope.routedata=resp;
		console.log(resp);
			$scope.plist = resp.data.responseData;
			$scope.totalCount=resp.data.paginationData.totalCount;
			$scope.maxProductPrice = resp.data.maxProductPrice;
					});
	});		
	}
	var filterIds = [];
	$scope.filteritem = function(filparam, paramval) {
    if (paramval == true)
        //if (filterIds.indexOf(filparam) == -1) {}
        filterIds.push(filparam)
    else {
        filterIds = jQuery.grep(filterIds, function(a) {
            return a !== filparam;
        });
    }
	console.log(filterIds.length);
	if(filterIds.length !=0){
	var reqobj={"filterIds":filterIds}
	$scope.filterArr = reqobj;
	var priceRange = {
		"minPrice" : $scope.minRangeSlider.minPrice,
		"maxPrice" : $scope.maxProductPrice  ,
	     "filterIds":filterIds,
		 "categoryCode":$scope.subcategorytype,
	      "productRating":""
	};
	console.log(priceRange);
	$http.post(resturl+"/getProductsByFiltersAndPrice", priceRange).then(function(resp) {
		
		if(resp.data.paginationData == null){
				$scope.totalCount=0;
				$scope.plist="";
			}
		
		  $scope.plist = resp.data.filteredProducts;
		 
			$scope.totalCount=resp.data.paginationData.totalCount; 	
			if(resp.data.responseData.length == "0"){
				
				$scope.prodshow = true;
				
			}else{
			$scope.prodshow = false;	
			}
			var disArray = [];
			for(abc=0; abc<resp.data.responseData.length; abc++) {
				disArray[abc] = "display"+abc;
				//console.log(disArray[abc]);
			}
			for(i=0; i<resp.data.responseData.length; i++){
//console.log(resp.data.responseData[i].discountPercentage);
				if(resp.data.responseData[i].discountPercentage == undefined || resp.data.responseData[i].discountPercentage == null) {
					$scope.showTag = disArray[i];
					$scope[$scope.showTag] = false;
					
				}
				else{
					$scope.showTag = disArray[i];
					$scope[$scope.showTag] = true;
				}
			}
		
	});

	}
	else{		
		$scope.plist = $scope.routedata.data.responseData;
			$scope.totalCount=resp.$scope.routedata.paginationData.totalCount;
	}
	};
	$http.get(resturl+"/getRecommendedProduct").then(function(resp) {
		console.log(resp);
		$scope.recommend = resp.data.recommendedProducts;
		$scope.RecomendLoaded = true;
		$scope.slickrecommendedprocutsConfig = {
			dots: false,
			arrows: false,
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: true,
		    autoplayspeed: 600
		};
	});
	$http.get(resturl+"/getRecentBought").then(function(resp) {
		console.log(resp);
		$scope.recently = resp.data.recentlyBought;
		$scope.RecentlyLoaded = true;
		$scope.slickrecentbroughtConfig = {
			dots: false,
			arrows: false,
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: true,
		    autoplayspeed: 500,
		responsive: [{
			breakpoint: 1024,
			settings: {
				arrows: false,
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 3,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 800,
			settings: {
				arrows: false,
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 3,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				arrows: false,
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}]};
	});
	
			
			
				
	$http.get(resturl+"/cart/displayCart?userId="+localStorage.loggedInuserId).then(function(resp){
		console.log(resp);
		$scope.cartlist=resp.data;
		console.log($scope.cartlist);
		if(resp.data.shoppingCartItems == null) {
			$scope.lengthofcart = 0;
		} else {
			$scope.lengthofcart = resp.data.shoppingCartItems.length;
		}
	});
	$scope.lengthofcart = 0;
	function filterparam(rparams){
	console.log(rparams.split("/")[2]);
	var rparam=rparams.split("/")[2];
	$http.get(resturl+"/getFiltersByCategory/"+rparam).then(function(resp) {
		console.log(resp);
		
		$scope.branditem = resp.data.filters;
		$scope.selection = [];
		$scope.toggleSelection = function toggleSelection(branditem) {
    var idx = $scope.selection.indexOf(branditem);
    // is currently selected
      if (idx > -1) {
        $scope.selection.splice(idx, 1);
      }
      // is newly selected
      else {
        $scope.selection.push(branditem);
      }
    };
	});
	}
	$scope.hide=true;
	$scope.vendorselect = function(pl){
		$scope.hide=false;
		if(pl.checked){
			$scope.hide=false;
		}else{
		$scope.hide=true;	
		}
	}
	$scope.vendoraddwish=function(){		
		var productId = $(".vendor-chk-select input:checkbox:checked").map(function(){
      return $(this).val();
    }).get();		
		var addWishList={"vendorId":$scope.loggedInuserId,"productId":productId}
	$http.post(resturl+"/addVendorWishListProducts", addWishList).then(function(resp) {
	console.log(resp)
	if (resp.data.status == "true") {
					$scope.successmessage = resp.data.successMessage;
					$('.successPopup').modal('show');
					} else {
						$scope.errmessage = resp.data.errorMessage;
					$('.errorPopup').modal('hide');
					}
					$http.get(resturl+"/"+$scope.routeurl +"?"+"pageNumber=1&pageSize=15").then(function(resp) {
		$scope.routedata=resp;
		console.log(resp);
			$scope.plist = resp.data.responseData;
			$scope.totalCount=resp.data.paginationData.totalCount;
			$scope.maxProductPrice = resp.data.maxProductPrice;
					});
	
	});
	
	}
	myEndListener = function() {
		console.log($scope.minRangeSlider.minPrice);
		console.log($scope.minRangeSlider.maxPrice);
	var priceRange = {
		"minPrice" : $scope.minRangeSlider.minPrice,
		"maxPrice" : $scope.maxProductPrice ,
	     "filterIds":filterIds,
		 "categoryCode":$scope.subcategorytype,
	      "productRating":""
	};
	console.log(priceRange);
	$http.post(resturl+"/getProductsByFiltersAndPrice", priceRange).then(function(resp) {
		  $scope.plist = resp.data.filteredProducts;
		 	 if(resp.data.paginationData == null){
				$scope.totalCount=0;
				$scope.plist="";
			}
			if(resp.data.filteredProducts.length == "0"){
				
				$scope.prodshow = true;
				
			}else{
			$scope.prodshow = false;	
			}
			$scope.totalCount=resp.data.paginationData.totalCount;
			
	});
	};
	$scope.pricing =  function(priceValue){
		console.log(priceValue.minPrice);
		console.log(priceValue.maxPrice);
		var minAmount = priceValue.minPrice;
		var maxAmount = priceValue.maxPrice;
		var temp;
		if(minAmount>maxAmount) {
			temp = maxAmount;
			maxAmount = minAmount;
			minAmount = temp;
		}
		console.log(minAmount);
		console.log(maxAmount);
		var priceRange = {
			"minPrice" : minAmount,
			"maxPrice" : maxAmount ,
			"filterIds":filterIds,
			"categoryCode":$scope.subcategorytype,
			"productRating":""
		};
		console.log(priceRange);
		$http.post(resturl+"/getProductsByFiltersAndPrice", priceRange).then(function(resp) {
			
			
			if(resp.data.filteredProducts.length == "0"){
				
				$scope.prodshow = true;
				
			}else{
			$scope.prodshow = false;	
			}
		  $scope.plist = resp.data.filteredProducts;
		 if(resp.data.paginationData == null){
				$scope.totalCount=0;
				$scope.plist="";
			}
			$scope.totalCount=resp.data.paginationData.totalCount;; 	
		
	});
	priceValue.minPrice="";
	priceValue.maxPrice="";
	console.log(priceValue.minPrice);
	console.log(priceValue.maxPrice);
	};
	$scope.minRangeSlider =  {
   minPrice: 0,
   maxPrice: $scope.maxProductPrice ,
  options: {
   floor: 0,
   ceil: $scope.maxProductPrice ,
   step:10,
   noSwitching: true,
      hideLimitLabels:true,
	  onEnd: myEndListener
  }
  
 };

	$scope.firstRate = 0;
    $scope.secondRate = 0;
    $scope.readOnly = true;
    $scope.onItemRating = function(rating){
      //alert('On Rating: ' + rating);
	  console.log(rating)
	   var rateingarr=rating
 $scope.rating=rateingarr;
 console.log($scope.rating);
 	var priceRange = {
		"minPrice" : $scope.minRangeSlider.minPrice,
		"maxPrice" : $scope.maxProductPrice ,
	     "filterIds":filterIds,
		 "categoryCode":$scope.subcategorytype,
	      "productRating":$scope.rating
	};
	console.log(priceRange);
	$http.post(resturl+"/getProductsByFiltersAndPrice", priceRange).then(function(resp) {
		if(resp.data.filteredProducts.length == "0"){
				
				$scope.prodshow = true;
				
			}else{
			$scope.prodshow = false;	
			}
		
		  $scope.plist = resp.data.filteredProducts;
		 if(resp.data.paginationData == null){
				$scope.totalCount=0;
				$scope.plist="";
			}
			$scope.totalCount=resp.data.paginationData.totalCount; 	
		
	});
    };	

$scope.resetSlider=function () {
console.log($scope.minRangeSlider.minPrice);
		console.log($scope.maxProductPrice);
		console.log($scope.rating);
		if($scope.minRangeSlider.minPrice != 0){
			$scope.minRangeSlider.minPrice=0;
		}
		if($scope.maxProductPrice!= $scope.maxProductPrice){
			$scope.maxProductPrice="";
		}
		if($scope.rating != 0){
			$scope.rating = 0;
		}
		if($scope.searchStr != undefined){
			$scope.searchStr ="";
			
		}
		
		if($routeParams.cid == "3"){
		 if($routeParams.sid != undefined){
		 var payload = {
					"code": $routeParams.sid
				};
				$http.post(resturl+"/getVendorsList"+"?"+"pageNumber=1&pageSize=5",payload).then(function(resp) {
					$scope.arc=true;
					
					console.log(resp);
					$scope.arclist = resp.data.responseData;
					if(resp.data.responseData.length == "0"){
				
				$scope.arclistshow = true;	
			}else{
			$scope.arclistshow = false;	
			}
					$scope.Count=resp.data.paginationData.totalCount;
				});
		 }else{
			 var payload = {
					"code": "Civil"
				};
				$http.post(resturl+"/getVendorsList"+"?"+"pageNumber=1&pageSize=5",payload).then(function(resp) {
					$scope.arc=true;
					
					$scope.searchloc=true;
					console.log(resp);
					$scope.arclist = resp.data.responseData;
					if(resp.data.responseData.length == "0"){
				
				$scope.arclistshow = true;	
			}else{
			$scope.arclistshow = false;	
			}
					$scope.Count=resp.data.paginationData.totalCount;
				});	
		 }
		 }
		
			//m
				if($routeParams.cid == "5"){
		 if($routeParams.sid != undefined){
		 var payload = {
					"code": $routeParams.sid
				};
				$http.post(resturl+"/getVendorsList"+"?"+"pageNumber=1&pageSize=5",payload).then(function(resp) {
					
					
					console.log(resp);
					$scope.mechlist = resp.data.responseData;
					if(resp.data.responseData.length == "0"){
				$scope.mechlistshow = true;
			}else{
			$scope.mechlistshow = false;	
			}
					$scope.mechCount=resp.data.paginationData.totalCount;
				});
		 }else{
			 var payload = {
					"code": "Slab Equipment"
				};
				$http.post(resturl+"/getVendorsList"+"?"+"pageNumber=1&pageSize=5",payload).then(function(resp) {
					
					
					$scope.searchloc=true;
					console.log(resp);
					$scope.mechlist = resp.data.responseData;
					if(resp.data.responseData.length == "0"){
				$scope.mechlistshow = true;
			}else{
			$scope.mechlistshow = false;	
			}
					$scope.mechCount=resp.data.paginationData.totalCount;
				});	
		 }
		 }
		 //w
		 	if($routeParams.cid == "Wall Paper"){
		 if($routeParams.sid != undefined){
		 var payload = {
					"code": $routeParams.sid
				};
				$http.post(resturl+"/getVendorsList"+"?"+"pageNumber=1&pageSize=5",payload).then(function(resp) {
					
					
					console.log(resp);
					$scope.wallist = resp.data.responseData;
						if(resp.data.responseData.length == "0"){
				
				$scope.walllistshow = true;
				
			}else{
			$scope.walllistshow = false;	
			}
					$scope.walCount=resp.data.paginationData.totalCount;
				});
		 }else{
			 var payload = {
					"code": "Wall Papers"
				};
				$http.post(resturl+"/getVendorsList"+"?"+"pageNumber=1&pageSize=5",payload).then(function(resp) {
					
					
					$scope.searchloc=true;
					console.log(resp);
					$scope.wallist = resp.data.responseData;
					if(resp.data.responseData.length == "0"){
				
				$scope.walllistshow = true;
				
			}else{
			$scope.walllistshow = false;	
			}
					$scope.walCount=resp.data.paginationData.totalCount;
				});	
		 }
		 }
		
			$http.get(resturl+"/"+$scope.routeurl +"?"+"pageNumber=1&pageSize=15").then(function(resp) {
		$scope.routedata=resp;
		console.log(resp);
			$scope.plist = resp.data.responseData;
			if(resp.data.responseData.length == "0"){
				
				$scope.prodshow = true;
				
			}else{
			$scope.prodshow = false;	
			}
			$scope.totalCount=resp.data.paginationData.totalCount;
			$scope.maxProductPrice = resp.data.maxProductPrice;
			});

		
		
		console.log($scope.minRangeSlider.minPrice);
		console.log($scope.minRangeSlider.maxPrice);
		 console.log($scope.rating);
		 console.log($scope.searchStr);
};
/*$scope.searchFun = function(searchString) {
	var stringLength = searchString.length;
	console.log(stringLength);
	var searchRequest = {
		searchString : searchString
	};
	if(stringLength >= 3){
		$http.post(resturl+"/getProductsBySearch", searchRequest).then(function(resp){
			console.log(resp);
			$scope.searchResults = resp.data.filteredProducts;
			$scope.array = [];
			for(i=0; i<$scope.searchResults.length; i++){
				$scope.array.push($scope.searchResults[i].productName);
			}
			console.log($scope.array);
		});
	}
};*/
    

	// $scope.submit = function(searchStr){
		// console.log(searchStr);
		// var searchRequest = {
			// searchString : searchStr
		// };
		// $http.post(resturl+"/getProductsBySearch", searchRequest).then(function(resp){
			// console.log(resp);
			// $scope.plist = resp.data.filteredProducts;
			// $scope.totalCount=resp.data.paginationData.totalCount;
		// });
	// };
	
	/******mechinary******/
	if($routeParams.cid == "Machinery & Equipment"){
		$scope.categorytype ="Machinery & Equipment";
		
		
		
			if($routeParams.sid != undefined){
		 var payload = {
					"code": $routeParams.sid
				};
				$http.post(resturl+"/getVendorsList"+"?"+"pageNumber=1&pageSize=5",payload).then(function(resp) {
					console.log(resp);
					$scope.mechinory = true;
		$scope.Novels = false;
		$scope.list = false;
		$scope.searchloc=true;
					$scope.mechlist = resp.data.responseData;
						if(resp.data.responseData.length == "0"){
				$scope.mechlistshow = true;
			}else{
			$scope.mechlistshow = false;	
			}
					$scope.mechCount=resp.data.paginationData.totalCount;
				});
				$scope.page = 1;
				
				$scope.MechAct = function(page, pageSize, total) {
				 var payload = {
					"code": $routeParams.sid
				};
				$http.post(resturl+"/getVendorsList"+"?"+"pageNumber="+page+"&pageSize=5",payload).then(function(resp) {
					console.log(resp);
					$scope.mechinory = true;
		$scope.Novels = false;
		$scope.list = false;
		$scope.searchloc=true;
					$scope.mechlist = resp.data.responseData;
					$scope.mechCount=resp.data.paginationData.totalCount;
				});
				}
				
			}
				
							//rating filter
	$scope.firstRate = 0;
    $scope.secondRate = 0;
    $scope.readOnly = true;
    $scope.onItemRating = function(rating){
		 var rateingarr=rating
 $scope.rating=rateingarr;
 console.log($scope.rating);
 	if($routeParams.catid !=undefined){
		var vendorRating = {
			rating : rating,
			searchSubCategory:$routeParams.sid,
			vendorType : "5"
			
		};
		}else{
			var vendorRating = {
			rating : rating,
			searchtype:$scope.categorySub[0].title,
			vendorType : "5"
			
		};			
		}
	console.log(vendorRating);
	$http.post(resturl+"/getVendorPortFoliosByRating", vendorRating).then(function(resp) {
		  
		 $scope.mechlist = resp.data.responseData;
		 	if(resp.data.responseData.length == "0"){
				$scope.mechlistshow = true;
			}else{
			$scope.mechlistshow = false;	
			}
			$scope.mechCount=resp.data.paginationData.totalCount; 	
		
	});
	
	}
			//Location Based Vendors Retrieval //
	
	$scope.searchVendor = function(searchStr){
		console.log(searchStr);
			if($routeParams.catid !=undefined){
		var searchRequest = {
			searchString : searchStr,
			searchSubCategory:$routeParams.sid,
			customerType : "5"
			
		};
		}
		else{
			var searchRequest = {
			searchString : searchStr,
			searchSubCategory:$scope.categorySub[0].title,
			customerType : "5"
			
		};			
		}
		$http.post(resturl+"/getVendorsByLocation"+"?"+"pageNumber=1&pageSize=5", searchRequest).then(function(resp){
			console.log(resp);
			 $scope.mechlist = resp.data.responseData;
			 	if(resp.data.responseData.length == "0"){
				$scope.mechlistshow = true;
			}else{
			$scope.mechlistshow = false;	
			}
			$scope.mechCount=resp.data.paginationData.totalCount;
		});
		
		
		$scope.page = 1;
	$scope.MechAct = function(page, pageSize, total) {
		if($routeParams.catid !=undefined){
		var searchRequest = {
			searchString : searchStr,
			searchSubCategory : $routeParams.sid,
			customerType : "5"
			
		};
		}
		else{
			var searchRequest = {
			searchString : searchStr,
			searchSubCategory : $scope.categorySub[0].title,
			customerType : "5"
			
		};			
		}
			$http.post(resturl+"/getVendorsByLocation"+"?"+"pageNumber="+page+"&pageSize=5", searchRequest).then(function(resp){
			console.log(resp);
			 $scope.mechlist = resp.data.responseData;
			 	if(resp.data.responseData.length == "0"){
				$scope.mechlistshow = true;
			}else{
			$scope.mechlistshow = false;	
			}
			$scope.mechCount=resp.data.paginationData.totalCount;
		});
	};
	};
		
				
				
	}
	
	
	/***********wall paper***************/
	if($routeParams.cid == "Wall Paper"){
		
		$scope.categorytype ="Wall Paper";
		if($routeParams.sid != undefined){
		 var payload = {
					"code": $routeParams.sid
				};
				$http.post(resturl+"/getVendorsList"+"?"+"pageNumber=1&pageSize=5",payload).then(function(resp) {
					$scope.wal = true;
		      $scope.Novels = false;
		$scope.list = false;
		$scope.walcat = true;
		$scope.searchloc=true;;
					console.log(resp);
					$scope.wallist = resp.data.responseData;
						if(resp.data.responseData.length == "0"){
				$scope.walllistshow = true;
			}else{
			$scope.walllistshow = false;	
			}
					$scope.walCount=resp.data.paginationData.totalCount;
				});
				
				$scope.page=1;
					$scope.walAct = function(page, pageSize, total) {
				 var payload = {
					"code": $routeParams.sid
				};
				$http.post(resturl+"/getVendorsList"+"?"+"pageNumber=1&pageSize=5",payload).then(function(resp) {
					$scope.wal = true;
		       $scope.Novels = false;
		$scope.list = false;
		$scope.walcat = true;
		$scope.searchloc=true;
					console.log(resp);
					$scope.wallist = resp.data.responseData;
					$scope.walCount=resp.data.paginationData.totalCount;
				});
					}
		}
		
				
							//rating filter
	$scope.firstRate = 0;
    $scope.secondRate = 0;
    $scope.readOnly = true;
    $scope.onItemRating = function(rating){
		 var rateingarr=rating
 $scope.rating=rateingarr;
 console.log($scope.rating);
 	if($routeParams.catid !=undefined){
		var vendorRating = {
			rating : rating,
			searchSubCategory:$routeParams.sid,
			vendorType : "4"
			
		};
		}else{
			var vendorRating = {
			rating : rating,
			searchSubCategory:$scope.categorySub[0].title,
			vendorType : "4"
			
		};			
		}
	console.log(vendorRating);
	$http.post(resturl+"/getVendorPortFoliosByRating", vendorRating).then(function(resp) {
		  
		 $scope.wallist = resp.data.responseData;
		 	if(resp.data.responseData.length == "0"){
				$scope.walllistshow = true;
			}else{
			$scope.walllistshow = false;	
			}
			$scope.walCount=resp.data.paginationData.totalCount; 	
		
	});
	
	}
	
		//Location Based Vendors Retrieval //
	
	$scope.searchVendor = function(searchStr){
		console.log(searchStr);
			if($routeParams.catid !=undefined){
		var searchRequest = {
			searchString : searchStr,
			searchSubCategory:$routeParams.sid,
			customerType : "4"
			
		};
		}
		else{
			var searchRequest = {
			searchString : searchStr,
			searchSubCategory:$scope.categorySub[0].title,
			customerType : "4"
			
		};			
		}
		$http.post(resturl+"/getVendorsByLocation"+"?"+"pageNumber=1&pageSize=5", searchRequest).then(function(resp){
			console.log(resp);
			 $scope.wallist = resp.data.responseData;
			 	if(resp.data.responseData.length == "0"){
				$scope.walllistshow = true;
			}else{
			$scope.walllistshow = false;	
			}
			$scope.walCount=resp.data.paginationData.totalCount;
		});
		
		
		$scope.page = 1;
	$scope.PagingAct = function(page, pageSize, total) {
		if($routeParams.catid !=undefined){
		var searchRequest = {
			searchString : searchStr,
			searchSubCategory : $routeParams.sid,
			customerType : "4"
			
		};
		}
		else{
			var searchRequest = {
			searchString : searchStr,
			searchSubCategory : $scope.categorySub[0].title,
			customerType : "4"
			
		};			
		}
			$http.post(resturl+"/getVendorsByLocation"+"?"+"pageNumber="+page+"&pageSize=5", searchRequest).then(function(resp){
			console.log(resp);
			 $scope.wallist = resp.data.responseData;
			 	if(resp.data.responseData.length == "0"){
				$scope.walllistshow = true;
			}else{
			$scope.walllistshow = false;	
			}
			$scope.walCount=resp.data.paginationData.totalCount;
		});
	};
	};
	
				
	}
	/*****Architects *******/
	if($routeParams.cid == "3"){
		$scope.arc = true;
		$scope.Novels = false;
		$scope.list = false;
		$scope.searchloc=true;
		$scope.categorytype ="Architects";
		 $scope.categorySub = $routeParams.subid ;
		 
		 //retraval
		 if($routeParams.sid != undefined){
		 var payload = {
					"code": $routeParams.sid
				};
				$http.post(resturl+"/getVendorsList"+"?"+"pageNumber=1&pageSize=5",payload).then(function(resp) {
					$scope.arc=true;
					
					console.log(resp);
					$scope.arclist = resp.data.responseData;
			if(resp.data.responseData.length == "0"){
				$scope.arclistshow = true;
				}else{
			$scope.arclistshow = false;	
			}
					$scope.Count=resp.data.paginationData.totalCount;
				});
		}
		$scope.page=1;
		$scope.arcPagingAct = function(page, pageSize, total) {
		 var payload = {
					"code": $routeParams.sid
				};
				$http.post(resturl+"/getVendorsList"+"?"+"pageNumber="+page+"&pageSize=5",payload).then(function(resp) {
					$scope.arc=true;
					
					console.log(resp);
					$scope.arclist = resp.data.responseData;
			if(resp.data.responseData.length == "0"){
				$scope.arclistshow = true;
				}else{
			$scope.arclistshow = false;	
			}
					$scope.Count=resp.data.paginationData.totalCount;
				});
		};
	
		
		
							//rating filter
	$scope.firstRate = 0;
    $scope.secondRate = 0;
    $scope.readOnly = true;
    $scope.onItemRating = function(rating){
		 var rateingarr=rating
 $scope.rating=rateingarr;
 console.log($scope.rating);
 	if($routeParams.catid !=undefined){
		var vendorRating = {
			rating : rating,
			searchSubCategory:$routeParams.sid,
			vendorType : "3"
			
		};
		}else{
			var vendorRating = {
			rating : rating,
			searchtype:$scope.categorySub[0].title,
			vendorType : "3"
			
		};			
		}
	console.log(vendorRating);
	$http.post(resturl+"/getVendorPortFoliosByRating", vendorRating).then(function(resp) {
		  
		 $scope.arclist = resp.data.responseData;
		 if(resp.data.responseData.length == "0"){
				$scope.arclistshow = true;
				}else{
			$scope.arclistshow = false;	
			}
			$scope.Count=resp.data.paginationData.totalCount; 	
		
	});
	
	}
				
			//Location Based Vendors Retrieval //
	
	$scope.searchVendor = function(searchStr){
		console.log(searchStr);
			if($routeParams.catid !=undefined){
		var searchRequest = {
			searchString : searchStr,
			searchSubCategory:$routeParams.sid,
			customerType : "3"
			
		};
		}
		else{
			var searchRequest = {
			searchString : searchStr,
			searchSubCategory:$scope.categorySub[0].title,
			customerType : "3"
			
		};			
		}
		$http.post(resturl+"/getVendorsByLocation"+"?"+"pageNumber=1&pageSize=5", searchRequest).then(function(resp){
			console.log(resp);
			
			 $scope.arclist = resp.data.responseData;
			 if(resp.data.responseData.length == "0"){
				$scope.arclistshow = true;
				}else{
			$scope.arclistshow = false;	
			}
			$scope.Count=resp.data.paginationData.totalCount;
		});
		
		
		$scope.page = 1;
	$scope.PagingAct = function(page, pageSize, total) { 
		if($routeParams.catid !=undefined){
		var searchRequest = {
			searchString : searchStr,
			searchSubCategory : $routeParams.sid,
			customerType : "3"
			
		};
		}
		else{
			var searchRequest = {
			searchString : searchStr,
			searchSubCategory : $scope.categorySub[0].title,
			customerType : "3"
			
		};			
		}
			$http.post(resturl+"/getVendorsByLocation"+"?"+"pageNumber="+page+"&pageSize=5", searchRequest).then(function(resp){
			console.log(resp);
			 $scope.arclist = resp.data.responseData;
			$scope.Count=resp.data.paginationData.totalCount;
		});
	};
	};		
				
	}
	
	
	

		if($routeParams.cid == "3"){	

			if($routeParams.cid=="3" && $location.path().split("/")[1]=="vendortypes") {
	
	 			$scope.arc=true;
	            $scope.arccat=true;
	            $scope.list=false;
	            $scope.customertype=$routeParams.cid
             	console.log($scope.subcategorytype);
		
				//retravel
				
					var payload = {
					"code": "Civil"
				};
				$http.post(resturl+"/getVendorsList"+"?"+"pageNumber=1&pageSize=5",payload).then(function(resp) {
					$scope.arc=true;
					
					$scope.searchloc=true;
					console.log(resp);
					$scope.arclist = resp.data.responseData;
					 if(resp.data.responseData.length == "0"){
				$scope.arclistshow = true;
				}else{
			$scope.arclistshow = false;	
			}
					$scope.Count=resp.data.paginationData.totalCount;
				});

				$scope.page=1;
		$scope.arcPagingAct = function(page, pageSize, total) {
				
					var payload = {
					"code": "Civil"
				};
				$http.post(resturl+"/getVendorsList"+"?"+"pageNumber="+page+"&pageSize=5",payload).then(function(resp) {
					$scope.arc=true;
					
					$scope.searchloc=true;
					console.log(resp);
					$scope.arclist = resp.data.responseData;
					 if(resp.data.responseData.length == "0"){
				$scope.arclistshow = true;
				}else{
			$scope.arclistshow = false;	
			}
					$scope.Count=resp.data.paginationData.totalCount;
				});
		};
				
				
				//rating filter
				
	                    $scope.firstRate = 0;
                        $scope.secondRate = 0;
                        $scope.readOnly = true;
                        $scope.onItemRating = function(rating){
		      var rateingarr=rating
                        $scope.rating=rateingarr;
                        console.log($scope.rating);
 	if($routeParams.catid !=undefined){
		          var vendorRating = {
		               	rating : rating,
		               	searchSubCategory:$routeParams.sid,
		             	vendorType : "3"
		};
		}else{
			    var vendorRating = {
			              rating : rating,
			              searchSubCategory:$scope.categorySub[0].title,
			               vendorType : "3"
			
		};			
		}
	                     console.log(vendorRating);
	$http.post(resturl+"/getVendorPortFoliosByRating", vendorRating).then(function(resp) {
	           $scope.arclist = resp.data.responseData;
			    if(resp.data.responseData.length == "0"){
				$scope.arclistshow = true;
				}else{
			$scope.arclistshow = false;	
			}
		    	$scope.Count=resp.data.paginationData.totalCount; 	
		     
	});
	
	}
	//Location Based Vendors Retrieval //
	
	$scope.searchVendor = function(searchStr){
		console.log(searchStr);
			if($routeParams.catid !=undefined){
		               var searchRequest = {
		                          	searchString : searchStr,
			                         searchSubCategory:$routeParams.sid,
			                          customerType : "3"
			
		                           };
		              
			}else{
			           var searchRequest = {
			                       searchString : searchStr,
			                       searchSubCategory:$scope.categorySub[0].title,
			                       customerType : "3"
			
		                   };			
		                   }
		     $http.post(resturl+"/getVendorsByLocation"+"?"+"pageNumber=1&pageSize=5", searchRequest).then(function(resp){
		    	console.log(resp);
		    $scope.arclist = resp.data.responseData;
			 if(resp.data.responseData.length == "0"){
				$scope.arclistshow = true;
				}else{
			$scope.arclistshow = false;	
			}
			$scope.Count=resp.data.paginationData.totalCount;
		});
		
		
		$scope.page = 1;
	$scope.PagingAct = function(page, pageSize, total) {
		if($routeParams.catid !=undefined){
		var searchRequest = {
			      searchString : searchStr,
			       searchSubCategory : $routeParams.sid,
			      customerType : "3"
			
		};
		}
		else{
			var searchRequest = {
			searchString : searchStr,
			searchSubCategory : $scope.categorySub[0].title,
			customerType : "3"
			
		};			
		}
			$http.post(resturl+"/getVendorsByLocation"+"?"+"pageNumber="+page+"&pageSize=5", searchRequest).then(function(resp){
			console.log(resp);
			 $scope.arclist = resp.data.responseData;
			  if(resp.data.responseData.length == "0"){
				$scope.arclistshow = true;
				}else{
			$scope.arclistshow = false;	
			}
			$scope.Count=resp.data.paginationData.totalCount;
		});
	};
	};

	
		}
		
		else {
			$scope.list = true;
			$scope.arccat = false;
			// $scope.loc=false;
			$scope.arc=false;	
			// $scope.Novels = true;
			$scope.wal = false;
		}
	}else{
			if($routeParams.cid=="5" && $location.path().split("/")[1]=="vendortypes") {
				  
	                var payload = {
			                	"code":"Slab Equipment"
		                         	};
			//$scope.categorySub[0].title
				$http.post(resturl+"/getVendorsList"+"?"+"pageNumber=1&pageSize=5",payload).then(function(resp) {
					 $scope.mechinory=true;
					 $scope.Novels=false;
					$scope.searchloc=true;
				console.log(resp);
				$scope.mechlist = resp.data.responseData;
				$scope.mechCount=resp.data.paginationData.totalCount;
				
			});
			$scope.page = 1;
	$scope.MechAct = function(page, pageSize, total) {
			       var payload = {
			                	"code":"Slab Equipment"
		                         	};
			//$scope.categorySub[0].title
				$http.post(resturl+"/getVendorsList"+"?"+"pageNumber="+page+"&pageSize=5",payload).then(function(resp) {
					 $scope.mechinory=true;
					$scope.searchloc=true;
				console.log(resp);
				$scope.mechlist = resp.data.responseData;
				$scope.mechCount=resp.data.paginationData.totalCount;
				
			});
	};
				
			//filer rating	
	$scope.firstRate = 0;
    $scope.secondRate = 0;
    $scope.readOnly = true;
    $scope.onItemRating = function(rating){
		if($routeParams.catid !=undefined){
		var vendorRating = {
			rating : rating,
			searchSubCategory:$routeParams.sid,
			vendorType : "5"
			
		};
		}else{
			var vendorRating = {
			rating : rating,
			searchtype:$scope.categorySub[0].title,
			vendorType : "5"
			
		};			
		}
 	
	console.log(vendorRating);
	$http.post(resturl+"/getVendorPortFoliosByRating"+"?"+"pageNumber=1&pageSize=5", vendorRating).then(function(resp) {
		      $scope.mechlist = resp.data.responseData;
		  		 $scope.mechCount=resp.data.paginationData.totalCount; 	
		
	});
	}

	//location
		//Location Based Vendors Retrieval //
	
	$scope.searchVendor = function(searchStr){
		console.log(searchStr);
		if($routeParams.catid !=undefined){
		var searchRequest = {
			searchString : searchStr,
			searchSubCategory:$routeParams.sid,
			customerType : "5"
		};
		}else{
			var searchRequest = {
			searchString : searchStr,
			searchSubCategory:$routeParams.sid,
			customerType : "5"
		};
		}
		$http.post(resturl+"/getVendorsByLocation"+"?"+"pageNumber=1&pageSize=5", searchRequest).then(function(resp){
			console.log(resp);
			 $scope.mechlist = resp.data.responseData;
			$scope.mechCount=resp.data.paginationData.totalCount;
		});
		
			$scope.page = 1;
	$scope.MechAct = function(page, pageSize, total) {
		var searchRequest = {
			searchString : searchStr,
			customerType : "5"
		};
			$http.post(resturl+"/getVendorsByLocation"+"?"+"pageNumber="+page+"&pageSize=5", searchRequest).then(function(resp){
			console.log(resp);
			 $scope.mechlist = resp.data.responseData;
			$scope.mechCount=resp.data.paginationData.totalCount;
		});
	};
		
		
	};
			
			
	
			$scope.mechinory=true;
			$scope.arc=false;
			$scope.meccat=true;
			$scope.wal=false;
			$scope.loc=true;
			$scope.Novels = false;
			$scope.list=false;
			$scope.categorytype="Machinery & Equipment"
			console.log($scope.categorytype);
		
		
		}else  if($routeParams.cid=="4" && $location.path().split("/")[1]=="vendortypes") {
			if($routeParams.cid=="4"){
		$scope.categorytype = "Wall Paper"
	}
				 var payload = {
					"code": "Wall Papers"
				};
				$http.post(resturl+"/getVendorsList",payload).then(function(resp) {
					console.log(resp);
					$scope.wal=true;
					$scope.arc=false;
					$scope.searchloc=true;
					$scope.wallist = resp.data.responseData;
					$scope.Count=resp.data.paginationData.totalCount;
				});    
					$scope.page = 1;
	$scope.MechAct = function(page, pageSize, total) {
			       var payload = {
			                	"code":"Wall Papers"
		                         	};
			//$scope.categorySub[0].title
				$http.post(resturl+"/getVendorsList"+"?"+"pageNumber="+page+"&pageSize=5",payload).then(function(resp) {
					 $scope.wal=true;
					$scope.searchloc=true;
				console.log(resp);
				$scope.wallist = resp.data.responseData;
				$scope.mechCount=resp.data.paginationData.totalCount;
				
			});
	};
				//rating
			
					$scope.firstRate = 0;
    $scope.secondRate = 0;
    $scope.readOnly = true;
    $scope.onItemRating = function(rating){
 		if($routeParams.catid !=undefined){
		var vendorRating = {
			rating : rating,
			searchSubCategory:$routeParams.sid,
			vendorType : "4"
			
		};
		}else{
			var vendorRating = {
			rating : rating,
			searchtype:$scope.categorySub[0].title,
			vendorType : "4"
			
		};			
		}
	console.log(vendorRating);
	$http.post(resturl+"/getVendorPortFoliosByRating", vendorRating).then(function(resp) {
		$scope.wallist = resp.data;
		     $scope.wallist = resp.data.responseData;
		  $scope.totalCount=resp.data.paginationData.totalCount; 	
		
	});
	}
	
		//Location Based Vendors Retrieval //
	
	$scope.searchVendor = function(searchStr){
		console.log(searchStr);
			if($routeParams.catid !=undefined){
		var searchRequest = {
			searchString : searchStr,
			searchSubCategory:$routeParams.sid,
			customerType : "4"
		};
		}else{
			var searchRequest = {
			searchString : searchStr,
			searchSubCategory:$routeParams.sid,
			customerType : "4"
		};
		}
		$http.post(resturl+"/getVendorsByLocation"+"?"+"pageNumber=1&pageSize=5", searchRequest).then(function(resp){
			console.log(resp);
			 $scope.wallist = resp.data.responseData;

			$scope.totalCount=resp.data.paginationData.totalCount;
		});
				$scope.page = 1;
	$scope.PagingAct = function(page, pageSize, total) {
			if($routeParams.catid !=undefined){
		var searchRequest = {
			searchString : searchStr,
			searchSubCategory:$routeParams.sid,
			customerType : "4"
		};
		}else{
			var searchRequest = {
			searchString : searchStr,
			searchSubCategory:$routeParams.sid,
			customerType : "5"
		};
		}
			$http.post(resturl+"/getVendorsByLocation"+"?"+"pageNumber="+page+"&pageSize=5", searchRequest).then(function(resp){
			console.log(resp);
			 $scope.wallist = resp.data.responseData;
			$scope.totalCount=resp.data.paginationData.totalCount;
		});
	};
	};
	$scope.wal=true;
			$scope.walcat=true;
			$scope.mechinory=false;
			$scope.Novels = false;
			$scope.loc=true;
			$scope.list=false;
			$scope.customertype=$routeParams.cid
			console.log($scope.customertype);
		}else{
			$scope.list = true;
			$scope.wal=false;
			$scope.loc=false;
			$scope.mechinory=false;
			$scope.Novels = true;
		}
	}	
	
		// Page Navigation To Top Functionality //
	jQuery(window).scroll(function() {
		if (jQuery(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
			jQuery('#return-to-top').fadeIn(200);    // Fade in the arrow
		} else {
			jQuery('#return-to-top').fadeOut(200);   // Else fade out the arrow
		}
	});
	jQuery('#return-to-top').click(function() {      // When arrow is clicked
		jQuery('body,html').animate({
			scrollTop : 0                       // Scroll to top of body
		}, 500);
	});
});