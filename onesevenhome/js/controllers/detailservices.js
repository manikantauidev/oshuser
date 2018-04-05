angular.module('newapp')
  .controller('DetailservicesCtrl', function ($scope, $http, $routeParams, $location,resturl) {   
		$scope.typeOfSearch = [
		{name : "Category", value : "Category"},
		{name : "Brand", value : "Brand"},
		{name : "Product", value : "Product"}
	];
		if(localStorage.loggedInUser !=undefined){$scope.loggedInUser=localStorage.loggedInUser;
		$scope.loggedInUserName=localStorage.loggedInUserName;
		$scope.loggedInUserType=localStorage.loggedInUserType;
		$scope.loggedInuserId=localStorage.loggedInuserId;
		$scope.userlogged=true;
	} else {
		$scope.userlogged=false;
	}
	$scope.mouseOver = function(param) {
		$scope.set_bg = function() {
		$scope.bgimg = param.imageURL;
			return {
				"background-image": "url(/clients/onesevenhome/img/" + $scope.bgimg + ".jpg)"
			};
		}
	}
	$scope.logout = function (){
		localStorage.clear();
		$location.path('/login');
	}
	$scope.myProfile = function () {
		$location.path('/myaccount');
	};
		
  $scope.locvalue = false;
  var initializing = true;
  $scope.$watch('searchlocation', function() {
	  angular.element('#filterloc').val("");
      if (initializing) {
          initializing = false;
      } else {
          $scope.fillocation = $scope.searchlocation;
          if ($scope.fillocation != "") {
              $scope.locvalue = true;
              $scope.filterlocation = function(location) {
                  return function(userloc) {
                      return (userloc.street == location || userloc.area == location || userloc.city == location || userloc.state == location)
                  }
              }
          } else {
              $scope.locvalue = "";
              $scope.filterlocation = function(location) {
                  return function(userloc) {
                      return true;
                  }
              }
          }
      }
  });
  $scope.removelocation = function() {
      $scope.searchlocation = "";
  }
		if(localStorage.loggedInUser !=undefined){
			$scope.loggedInUser=localStorage.loggedInUser;
			$scope.loggedInUserName=localStorage.loggedInUserName;
			$scope.userlogged=true;
		}else{
			$scope.userlogged=false;
		}
		$scope.logout = function (){
			localStorage.clear();
			$location.path('/login');
		}
		$scope.myProfile = function () {
		$location.path('/myaccount');
	};
	$scope.id=$routeParams.serviceid;
	console.log($routeParams.serviceid);
	$scope.selectedtype=$routeParams.sid;
	$http.get(resturl+"/getAllCategories").then(function(resp) {
		console.log(resp);
		$scope.menuitem = resp.data.categoryData;
	});
	
	$http.get(resturl+"/services").then(function(resp) {
		console.log(resp);
		$scope.workers = resp.data.services;
		$("#"+$scope.selectedtype).prop('checked', true);
	});
	$http.get(resturl+"/services/"+$routeParams.sid+"/workers?pageNumber=1&pageSize=5").then(function(resp) {
            console.log(resp);
            $scope.servicedetails = resp.data.responseData;
            $scope.totalCount=resp.data.paginationData.totalCount;
			// $("#"+$scope.selectedtype).prop('checked', true);
			$( ".todaydeal-sorting label:contains("+$scope.selectedtype+")" ).prev().prop('checked', true);
	});
	$scope.page = 1;
	$scope.detailsPagingAct = function(page, pageSize, total) {
		$window.scrollTo(0,0);
		$http.get(resturl+"/services/"+$routeParams.sid+"/workers?pageNumber="+page+"&pageSize=5").then(function(resp) {
            console.log(resp);
            $scope.servicedetails = resp.data.responseData;
            $scope.totalCount=resp.data.paginationData.totalCount;
			// $("#"+$scope.selectedtype).prop('checked', true);
	});
	}
	$http.get(resturl+"/getRecommendedProduct").then(function(resp) {
		console.log(resp);
		$scope.recommend = resp.data.recommendedProducts;
		$scope.RecomendLoaded = true;
		$scope.slickrecommendedprocutsConfig = {
			dots: false,
			arrows: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1
		};
	});
	$http.get("/clients/onesevenhome/js/controllers/recommendedvendors.json").then(function(resp) {
		console.log(resp);
		$scope.vendorrecommended= resp.data.recommendedvendor;
		$scope.RecommendvendorLoaded = true;
		$scope.slickrecommendedvendorsConfig = {
			dots: false,
			arrows: false,
			infinite: true,
			slidesToShow: 5,
			slidesToScroll: 1,
			autoplay: true,
			autoplayspeed: 500
		};
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

    //Start --For Single Selection For Service Type In Service Screen
	
$scope.updateSelection = function(position, workers,workertype,workerid,checkval) {
		if($scope.selectedtype == workertype){
				$("#"+$scope.selectedtype).prop('checked', true);
		}
		else{
			$location.path('/detailservices/'+workertype+'/'+workerid);
		}
    }
    //End --For Single Selection For Service Type In Service Screen	
	
	/* Save Review & Rating For Service Providers */
	$scope.onItemRating = function(rating, detailsevice, id){
		console.log(rating);
		console.log(detailsevice);
		var reqObj ={
			"customerId" : $scope.loggedInuserId,
			"serviceId" : detailsevice.id,
			"serviceTypeId":$routeParams.serviceid,
			"rating" : rating,
			"reviewTitle" : "",
			"reviewDescription" : ""
		};
		console.log(reqObj);
		$http.post(resturl+"/servicerating/save", reqObj).then(function(resp) {
			console.log(resp);
		});
	};
	$scope.mechpopup = function (detailsevice) {
		 
			$scope.vendorName = detailsevice.companyName;
			$scope.customerName = $scope.loggedInUserName;
			$scope.id = detailsevice.id;
			$("#appointmentDate").datepicker({
				autoclose: true,
				format: "yyyy-mm-dd"
			});
			$('.bookNowPopup').modal('show');
	
	}
	
	
	
		$scope.detailsOfService = function(popupDetails) {
		var Details = {
			 "customerId":$scope.loggedInuserId,
           "serviceId":$scope.id,
          "serviceTypeId":$routeParams.serviceid,
			"contactInfo" :popupDetails.contactinformation,
			"appointmentDate" : popupDetails.appointmentDate,
			"query" :popupDetails.Descrption
		};
		console.log(Details);
		$http.post(resturl+"/services/booking",Details).then(function(resp) {
		console.log(resp);
	});
	};
		//location
	
	
	$scope.searchVendor = function(searchStr){
		console.log(searchStr);
		var searchRequest = {
			searchString : searchStr,
			customerType :$scope.selectedtype
		};
		console.log(searchRequest);
		$http.post(resturl+"/getServiceProvidersByLocation", searchRequest).then(function(resp){
			console.log(resp);
			 $scope.servicedetails = resp.data.responseData;
			  $scope.totalCount = resp.data.paginationData.totalCount;
			
		});
	
	};
	
});

angular.module('newapp')
.directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<i class="fa fa-star" ng-repeat="star in stars" ng-class="star" aria-hidden="true"></i>',
        scope: {
            ratingValue: '=',
            max: '=',
            onRatingSelected: '&'
        },
        link: function (scope, elem, attrs) {

            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        disabled: i > scope.ratingValue
                    });
                    if(i==scope.ratingValue){
                     scope.stars[i].disabled= true; 
                    }
                }
            };

            scope.toggle = function (index) {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1
                });
            };

            scope.$watch('ratingValue', function (oldVal, newVal) {
                if (!isNaN(newVal)) {
                    updateStars();
                }
            });
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




