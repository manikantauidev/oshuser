 angular.module('newapp')
	.controller('wallpaperdetailsCtrl', function ($scope, $http, $location, $routeParams, resturl) {
		$scope.typeOfSearch = [
		{name : "Category", value : "Category"},
		{name : "Brand", value : "Brand"},
		{name : "Product", value : "Product"}
	];
		if (localStorage.loggedInUser != undefined) {
			$scope.loggedInUser = localStorage.loggedInUser;
			$scope.loggedInUserName = localStorage.loggedInUserName;
			$scope.loggedInuserId = localStorage.loggedInuserId;
			$scope.userlogged = true;
		} else {
			$scope.userlogged = false;
		}

		$scope.logout = function () {
			localStorage.clear();
			$location.path('/login');
		}
		$scope.myProfile = function () {
			$location.path('/myaccount');
		};
		$http.get(resturl + "/getAllCategories").then(function (resp) {
			console.log(resp);
			$scope.menuitem = resp.data.categoryData;
		});

           
		$scope.id = $routeParams.id;
		console.log($routeParams.id);
		if ($scope.userlogged == false) {
			$scope.showReview = false;
		} else {
			$scope.showReview = true;
			/* Save Review With Rating Service */
			$scope.onItemRating = function (rating) {
				$scope.starValue = rating;
				console.log($scope.starValue);
			};
			$scope.submitReview = function (giveReview) {
				var reqObj = {
					"customerId":$scope.loggedInuserId ,
					"vendorId":$routeParams.id ,
					"rating": $scope.starValue,
					"reviewTitle":"" ,
					"reviewDescription": giveReview.description
				};
				console.log(reqObj);
				$http.post(resturl + "/vendor/rating", reqObj).then(function (resp) {
					console.log(resp);
					if (resp.data.status == true) {
						$scope.errmsg = true;
						$scope.errmessage = resp.data.successMessage;
					} else {
						$scope.errmsg = true;
						$scope.errmessage = resp.data.errorMessage;
					}
				});

			};
		}
		
		var reqObj = {
			"portfolioId": $routeParams.pid,
		      
		};
		$http.post(resturl + "/getWallPaperDetails", reqObj).then(function (resp) {
			console.log(resp);
			$scope.Walldetails = resp.data.wallPaperDetails;
			$scope.detailimageUrl = resp.data.wallPaperDetails.imageURL;
			$scope.detailDescription = resp.data.wallPaperDetails.portfolioName;
			$scope.detailprice = resp.data.wallPaperDetails.price;
			$scope.size = resp.data.wallPaperDetails.size;
			$scope.thickness = resp.data.wallPaperDetails.thickness;
			$scope.brand = resp.data.wallPaperDetails.brand;
		});
			
	$scope.portfolioId=$routeParams.pid;
	   $scope.vendorId =$routeParams.venid ;
/**  retreval rating **/
		
		$http.get(resturl+"/vendor/"+$routeParams.id+"/reviews?pageNumber=1&pageSize=5").then(function(resp) {
		console.log(resp);
		$scope.prod=resp.data.reviewList;
		$scope.totalCount=resp.data.paginationData.totalCount; 
		$scope.averagereview=resp.data.avgReview;
			console.log($scope.averagereview);
			$scope.userRatings=resp.data.reviewList;
			console.log($scope.userRatings);
		$scope.totalreview=resp.data.totalratingCount;
		console.log($scope.totalreview )
		 $scope.uptotalCount = resp.data.paginationData.totalCount;
		$scope.ratings = [{number:$scope.averagereview}];
	});
	$scope.page = 1;
	$scope.PagingAct = function(page, pageSize, total) {
		$http.get(resturl+"/vendor/"+$routeParams.id+"/reviews?pageNumber="+page+"&pageSize=5").then(function(resp) {
		console.log(resp);
		$scope.prod=resp.data.reviewList;
		$scope.totalCount=resp.data.paginationData.totalCount; 
		$scope.averagereview=resp.data.avgReview;
			console.log($scope.averagereview);
			$scope.userRatings=resp.data.reviewList;
			console.log($scope.userRatings);
		$scope.totalreview=resp.data.totalratingCount;
		console.log($scope.totalreview )
		 $scope.uptotalCount = resp.data.paginationData.totalCount;
		$scope.ratings = [{number:$scope.averagereview}];
	});
	}
		
		$scope.getStars = function(rating) {
		// Get the value
		var val = parseFloat(rating);
		// Turn value into number/100
		var size = val/5*100;
		return size + '%';
	}
		// Product Average Star Rating //
		$scope.Booknowfun = function () {
			if ($scope.loggedInuserId == false) {
				$location.path('/login');
			} else {
				
				var reqObj = {
					"customerId":$scope.loggedInuserId ,
					"vendorId": $routeParams.id
				};
				$http.post(resturl +"/vendor/booking",reqObj).then(function (resp) {
					console.log(resp);
					if(resp.data.status == true){
						$scope.success = resp.data.successMessage;
						$('.successPopup').modal('show');
					}
					else{}
				});
			}
		}
	
		var reqObj = {
			"vendorId": $scope.vendorId,
		       "status" :"Y"
		};
		$http.post(resturl + "/getUserWallPaperPortfolio", reqObj).then(function (resp) {
			console.log(resp);
			$scope.walrecently = resp.data.responseData;
			$scope.Description = resp.data.responseData[0].vendorDescription;
			$scope.ShortDescription = resp.data.responseData[0].vendorShortDescription;
			$scope.imageUrl = resp.data.responseData[0].vendorImageURL;
			$scope.vendorName = resp.data.vendorName;
			
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
							slidesToShow: 2,
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
					}
				]
			};
		});
		if (localStorage.loggedInuserId != "undefined") {}
		$http.get(resturl + "/cart/displayCart?userId=" + localStorage.loggedInuserId).then(function (resp) {
			console.log(resp);
			$scope.cartlist = resp.data;
			console.log($scope.cartlist);
			if (resp.data.shoppingCartItems == null) {
				$scope.lengthofcart = 0;
			} else {
				$scope.lengthofcart = resp.data.shoppingCartItems.length;
			}
		});

		$http.get(resturl + "/vendortypes/4").then(function (resp) {
			console.log(resp);
			$scope.arclist = resp.data.responseData;
			$scope.totalCount = resp.data.paginationData.totalCount;

		});
			//wallpaper ad to cart
				$scope.addcart = function (quantity) {
	if ($scope.userlogged==false) {
		console.log($scope.userlogged);
		console.log("Not Logged");
		$location.path('/login');
	}
	else {
	var cartproduct = {
		      "category" : "Wallpaper",
			"productId" : $routeParams.pid,
			"quantity"  : quantity,
			"vendorId" : $routeParams.venid 
		}
	console.log(cartproduct);
		$http.post(resturl+"/cart/addShoppingCartItem?userId="+localStorage.loggedInuserId, cartproduct).then(function(resp) {
			console.log(resp);
			$scope.cartvalue=resp.data.cartQuantity;
			console.log($scope.cartvalue);
			$http.get(resturl+"/cart/displayCart?userId="+localStorage.loggedInuserId).then(function(resp){
				console.log(resp);
				$scope.cartlist=resp.data;
							$scope.lengthofcart = resp.data.shoppingCartItems.length;
			console.log($scope.lengthofcart);
				
		});
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