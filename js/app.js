var newapp=angular.module('newapp',['ngRoute','slickCarousel','ui.grid','bw.paging','ngScrollbars','rzModule','jkAngularRatingStars','angularjs-dropdown-multiselect','ngPatternRestrict','ui.bootstrap']);
 newapp.config(['$routeProvider','ScrollBarsProvider',function($routeProvider,ScrollBarsProvider){
  $routeProvider
	.when('/', {
		templateUrl: 'views/dashboard.html',
		controller: 'DashboardCtrl'
	})
	.when('/login', {
		templateUrl: 'views/login.html',
		controller: 'LoginCtrl'
	})
	.when('/vendorlogin', {
		templateUrl: 'views/vendorlogin.html',
		controller: 'vendorlogCtrl'
	})
	.when('/activateuser', {
		templateUrl: 'views/vendorlogin.html',
		controller: 'activateuserCtrl'
	})
	.when('/registration', {
		templateUrl: 'views/registration.html',
		controller: 'RegistrationCtrl'
	})
	.when('/vendorreg',{
		templateUrl: 'views/vendorregistration.html',
		controller: 'vendorregCtrl'
	})
	.when('/forgetpassword',{
		templateUrl: 'views/forgetpassword.html',
		controller: 'forgetPassCtrl'
	})
	.when('/newpassword',{
		templateUrl: 'views/newpassword.html',
		controller: 'newPassCtrl'
	})
	.when('/dashboard', {
		templateUrl: 'views/dashboard.html',
		controller: 'DashboardCtrl'
	})
	.when('/contact', {
		templateUrl: 'views/contact.html',
		controller: 'ContactCtrl'
	})
	.when('/services', {
		templateUrl: 'views/services.html',
		controller: 'ServicesCtrl'
	})
	.when('/detailservices/:sid/:serviceid', {
		templateUrl: 'views/detailservices.html',
		controller: 'DetailservicesCtrl'
	})
	.when('/todaydeals', {
		templateUrl: 'views/todaydeals.html',
		controller: 'TodaydealsCtrl'
	})
	.when('/productpage/:prodid', {
		templateUrl: 'views/productpage.html',
		controller: 'ProductpageCtrl'
	})
	.when('/categories/:cid', {
		templateUrl: 'views/productlist.html',
		controller: 'ProductlistCtrl'
	})
	.when('/sub_category/:cid/categories/:sid', {
		templateUrl: 'views/productlist.html',
		controller: 'ProductlistCtrl'
	})
	.when('/vendorcategories/:cid', {
		templateUrl: 'views/productlist.html',
		controller: 'ProductlistCtrl'
	})
	.when('/myaccount', {
		templateUrl: 'views/myaccount.html',
		controller: 'myaccountCtrl'
	})
	.when('/profile', {
		templateUrl: 'views/profile.html',
		controller: 'profileCtrl'
	})
	.when('/cart', {
		templateUrl: 'views/cart.html',
		controller: 'cartctrl'
	})
    .when('/delivery', {
		templateUrl: 'views/delivery.html',
		controller: 'deliveryctrl'
	})
	.when('/payment', {
		templateUrl: 'views/payment.html',
		controller: 'paymentctrl'
	})
	.when('/viewmsg', {
		templateUrl: 'views/viewmsg.html',
		controller: 'viewmsgctrl'
	})
	.when('/conform', {
		templateUrl: 'views/conform.html',
		controller: 'conformCtrl'
	})
	.when('/postrequire', {
		templateUrl: 'views/postrequire.html',
		controller: 'postrequirectrl'
	})
	.when('/home', {
		templateUrl: 'views/newhome.html',
		controller: 'newhomectrl'
	})
	.when('/searchresults', {
		templateUrl: 'views/searchresults.html',
		controller: 'searchResultsCtrl'
	})
	.when('/searchresults/:searchValue', {
		templateUrl: 'views/searchresults.html',
		controller: 'searchResultsCtrl'
	})
	.when('/searchresults/:category/:searchValue', {
		templateUrl: 'views/searchresults.html',
		controller: 'searchResultsCtrl'
	})
	.when('/vendortypes/:cid', {
		templateUrl: 'views/productlist.html',
		controller: 'ProductlistCtrl'
	})
	.when('/sub_category/:catid/vendortypes/:cid/:sid', {
		templateUrl: 'views/productlist.html',
		controller: 'ProductlistCtrl'
	})	
	.when('/arcproduct/:id', {
		templateUrl: 'views/arcproduct.html',
		controller: 'arcproductCtrl'
	})
	.when('/mechinerylist/:id', {
		templateUrl: 'views/mechinerylist.html',
		controller: 'mechinerylistCtrl'
	})
	.when('/wallpaperlist/:id', {
		templateUrl: 'views/wallpaperlist.html',
		controller: 'wallpaperlistCtrl'
	})
	.when('/wallpaperdetails/:venid/:pid', {
		templateUrl: 'views/wallpaperdetails.html',
		controller: 'wallpaperdetailsCtrl'
	})
	.when('/subscribed', {
		templateUrl: 'views/subscribed.html',
		controller: 'subscribedCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
	ScrollBarsProvider.defaults = {
				 scrollButtons: {
      scrollAmount: 'auto', // scroll amount when button pressed
      enable: true //  scrolling buttons by default
    },    
 scrollInertia: 0,
    axis: 'y'
		 };
}]).controller('categoryCtrl',['$scope', function($scope){
	$scope.scrollbarConfig = {
			autoHideScrollbar: false,
	theme: 'light-3',
	 callbacks: {
        /*onScroll: function() {
            scrollIt(this);
        }*/
    },
	advanced:{
		updateOnContentResize: true
	},		
		scrollInertia: 0
			}
			$scope.topPosition=$(".cat-link").offset().top+55+"px";
	
	var scrollbarDnBtn=$(".mCSB_buttonDown");
$("body").on("mouseover",".scroll-down",function(){
   $( ".mCSB_buttonDown" ).triggerHandler( "mousedown" );
}).on("mouseout",function(){

   $( ".mCSB_buttonDown" ).triggerHandler("mouseup");
});

// Scroll up
var scrollbarUpBtn=$(".mCSB_buttonUp");
$("body").on("mouseover",".scroll-up",function(){
    $( ".mCSB_buttonUp" ).triggerHandler("mousedown");
}).on("mouseout",function(){
    $(".mCSB_buttonUp").triggerHandler("mouseup");
});

$("body").on("mouseover",".sub-scroll-up",function(){
	 var sum = 0;
    $(this).parent().next().children('li').each(function() {
       sum += $(this).height(); 
    });
    $('.subcategory-scroll span').animate({scrollTop : 0},'fast');
});
$("body").on("mouseover",".sub-scroll-down",function(){
   var sum = 0;
    $(this).parent().prev().children('li').each(function() {
       sum += $(this).height(); 
    });
    $('.subcategory-scroll span').animate({scrollTop : sum/9},'fast');
});

$scope.mouseOverCat = function(param,event) {
	var sum = 0;
    $(".submenuitem"+event.target.id).find('span').children('li').each(function() {
       sum += $(this).height(); 
    });
	if(sum > 320){
		$(".sub-scroll-up,.sub-scroll-down").attr("style", "display: inline-block !important");
	}
	else{
		$(".sub-scroll-up,.sub-scroll-down").attr("style", "display: none !important");
	}
	$scope.set_bg = function() {
	$scope.bgimg = param.imageURL;
		return {
			"background-image": "url(/clients/onesevenhome/img/"+$scope.bgimg+".jpg)"
			};
		}
	}
	$scope.mouseOver = function(param) {
		$scope.set_bg = function() {
		$scope.bgimg = param.imageURL;
			return {
				"background-image": "url(/clients/onesevenhome/img/"+$scope.bgimg+".jpg)"
			};
		}
	}
}]).controller('TypeSearchCtrl',['$scope','$http','resturl','$location','sharedList', function($scope, $http,resturl,$location,sharedList){
	$scope.getSearch = function(searchStr, searchType) {
		if(searchType == "Category"){
			var request = {
				searchString : searchStr
			};
			return $http.post(resturl+"/getProductByCategory", request).then(function(resp){
				console.log(resp);
				Searchresp=resp.data.categoryData;
				Searchresponse=resp;
				$scope.sharedCategoryData = Searchresp;
				var item = [];
				var titleArray = [];
				angular.forEach(resp.data.categoryData, function(value, key){
					$scope.categoryName = value.title;
					this.push(value.title);
					var n = value.title.search(new RegExp(searchStr, "i"));
					console.log(n);
					if(n>=0){
						item.push(value.title);
					}
					angular.forEach(value.subCategory, function(value, key){
						// this.push(value.title);
						var x = value.title.search(new RegExp(searchStr, "i"));
						console.log(x);
						if(x>=0){
							item.push(value.title);
						}
					}, item);
				}, titleArray);
				console.log(item);
				console.log(titleArray);
				return item;
				return titleArray;
			});
		}
		if(searchType == "Brand"){
			var request = {
				searchFilterString : searchStr
			};
			return $http.post(resturl+"/getFiltersBySearch", request).then(function(resp){
				console.log(resp);
				Searchresp=resp.data.filteredData;
				Searchresponse=resp;
				$scope.sharedFilterData = Searchresp;
				var item = [];
				var titleArray = [];
				angular.forEach(resp.data.filteredData, function(value, key){
					console.log(value, key)
					$scope.filterName = value.filterName;
					this.push(value.filterName);
					var n = value.filterName.search(new RegExp(searchStr, "i"));
					console.log(n);
					if(n>=0){
						item.push(value.filterName);
					}
					angular.forEach(value.filterTypes, function(value, key){
						this.push(value.filterTypeName);
					}, item);
				}, titleArray);
				return item;
				return titleArray;
			});
		}
		else {
			var searchRequest = {
				searchString : searchStr
			}
			return $http.post(resturl+"/getProductsBySearch", searchRequest).then(function(response){
				Searchresp=response.data.filteredProducts;
				Searchresponse=response;
				return response.data.filteredProducts.map(function(item){
					return item.productName;
				});
			});
		}
	};
	$scope.onSearchSelect = function (searchSelected, $item, $model, $label, $event, searchType, titleArray) {
		var model = $('#modalValue').val();
		console.log(model);
		if(searchType == "Category"){
			var request = {
				searchString : searchSelected
			};
			return $http.post(resturl+"/getProductByCategorySelection",request).then(function(response){
				console.log(response);
				response.data.searchparamSelected=searchSelected;
				response.data.searchType=searchType;
				sharedList.addItem(response.data);
				var indexMap=0;
				var subIndex=0;
				angular.forEach(response.data.categoryData, function(item){
					var br=true;
					if(item.subCategory.length>0){
					angular.forEach(item.subCategory,function(item1){
						if(br){
							if(item1.title === $model){
								subIndex++;
								br=false;
							}
						}
					});
					if(br && item.title === $model){
						subIndex++;
						br=false;
					}
					}else{
						if(br && item.title === $model){
							br=false;
						}
					}
					if(subIndex === 0){
						indexMap++;
					}
				});
				console.log(indexMap);
				var categoryTitle =  response.data.categoryData[indexMap].title.replace(/ /g, "_");
				var mapVariable = $model.replace(/ /g, "_");
				$location.path('/searchresults/'+categoryTitle+"/"+mapVariable);
			});
		}
		if(searchType == "Brand"){
			var request = {
				searchFilterString : searchSelected
			};
			return $http.post(resturl+"/getFiltersBySearch",request).then(function(response){
				response.data.searchparamSelected=searchSelected;
				response.data.searchType=searchType;
				sharedList.addItem(response.data);
				var mapVariable = $model.replace(/ /g, "_");
				$location.path('/searchresults/'+mapVariable);
			});
		}
		else{
			var Sindex = Searchresp.findIndex(function(item, i){
				return item.productName === $model;
			});
			$location.path('/productpage/'+Searchresp[Sindex]["productId"]);	
		}
	};
	$scope.clearString = function(searchSelected){
		console.log(searchSelected);
		$scope.searchSelected = "";
	}
	$scope.getsearchResults = "";
	$scope.searchFunction = function(searchSelected, searchType, $model){
		var n = searchSelected.length;
		if(n>2){
			if(searchType == "Category"){
				var request = {
					searchString : searchSelected
				};
				return $http.post(resturl+"/getProductByCategory", request).then(function(response){
					response.data.searchparamSelected=searchSelected;
					response.data.searchType=searchType;
					sharedList.addItem(response.data);
					console.log(response);
					if(response.data.categoryData != "null"){
						var categoryTitle =  response.data.categoryData[0].title.replace(/ /g, "_");
						var mapVariable = response.data.categoryData[0].subCategory[0].title.replace(/ /g, "_");
						console.log(categoryTitle, mapVariable);
						$location.path('/searchresults/'+categoryTitle+"/"+mapVariable);
					}
					else{
						$location.path('/searchresults');
					}
				});
			}
			if(searchType == "Brand"){
				var request = {
					searchFilterString : searchSelected
				};
				return $http.post(resturl+"/getFiltersBySearch", request).then(function(response){
					console.log(response);
					Searchresp=response.data.filteredData;
					response.data.searchparamSelected=searchSelected;
					response.data.searchType=searchType;
					sharedList.addItem(response.data);
					$location.path('/searchresults');
				});
			}
			else{
				console.log(searchSelected);
				var searchRequest = {
					searchString : searchSelected
				};
				$http.post(resturl+"/getProductsBySearch", searchRequest).then(function(response){
					response.data.searchparamSelected=searchSelected;
					response.data.searchType=searchType;
					sharedList.addItem(response.data);
					$location.path('/searchresults');
				});
			}
		}
	}
	$scope.searchFunctions = function(searchSelected,keyEvent, searchType, $model){
		console.log(searchType);
		var n = searchSelected.length;
		if(n>2){
			if (keyEvent.which === 13){
				if(searchType == "Category"){
					var request = {
						searchString : searchSelected
					};
					return $http.post(resturl+"/getProductByCategory", request).then(function(response){
						response.data.searchparamSelected=searchSelected;
						response.data.searchType=searchType;
						sharedList.addItem(response.data);
						console.log(response);
						if(response.data.categoryData != "null"){
							var categoryTitle =  response.data.categoryData[0].title.replace(/ /g, "_");
							var mapVariable = response.data.categoryData[0].subCategory[0].title.replace(/ /g, "_");
							console.log(categoryTitle, mapVariable);
							$location.path('/searchresults/'+categoryTitle+"/"+mapVariable);
						}
						else{
							$location.path('/searchresults');
						}
					});
				}
				if(searchType == "Brand"){
					var request = {
						searchFilterString : searchSelected
					};
					return $http.post(resturl+"/getFiltersBySearch", request).then(function(response){
						response.data.searchparamSelected=searchSelected;
						response.data.searchType=searchType;
						sharedList.addItem(response.data);
						$location.path('/searchresults');
					});
				}
				else{
				console.log(searchSelected);
					var searchRequest = {
						searchString : searchSelected
					};
					$http.post(resturl+"/getProductsBySearch", searchRequest).then(function(response){
						response.data.searchparamSelected=searchSelected;
						response.data.searchType=searchType;
						sharedList.addItem(response.data);
						$location.path('/searchresults');
					});
				}
			}
		}
	}
}])
angular.module('newapp').factory('sharedList', function() {
  var list = [];

  return {
    addItem: addItem,
    getList: getList
  };

  function addItem(item) {
	   list = [];
    list.push(item);
  }

  function getList() {
    return list;
  }
});
angular.module('newapp')
    .directive('loading',   ['$http' ,function ($http)
    {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs)
            {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v)
                {
                    if(v){
                        elm.show();
                    }else{
                        elm.hide();
                    }
                });
            }
        };
    }]);