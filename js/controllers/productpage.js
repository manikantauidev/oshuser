angular.module('newapp') 
  .controller('ProductpageCtrl', function ($scope, $http, $location, $routeParams,resturl) {   
	$scope.typeOfSearch = [
		{name : "Category", value : "Category"},
		{name : "Brand", value : "Brand"},
		{name : "Product", value : "Product"}
	];
	if(localStorage.loggedInUser !=undefined) {
		$scope.loggedInUser=localStorage.loggedInUser;
		$scope.loggedInUserName=localStorage.loggedInUserName;
		$scope.loggedInuserId=localStorage.loggedInuserId;
		$scope.userlogged=true;
	} else {
		$scope.userlogged=false;
	}
	
	$scope.logout = function (){
		localStorage.clear();
		$location.path('/login');
	}
	$scope.myProfile = function () {
		$location.path('/myaccount');
	};
	$http.get(resturl+"/getAllCategories").then(function(resp) {
        console.log(resp);
        $scope.menuitem = resp.data.categoryData;
    });
	
	$http.get(resturl+"/products/"+ $routeParams.prodid).then(function(resp) {
		console.log(resp);
		$scope.ppage=resp.data;
		$scope.page=resp.data.discountPercentage;
		$scope.pagedescription=resp.data.productDescription;
		$scope.offerPrice=resp.data.productDiscountPrice;
		$scope.mainPrice=resp.data.productOriginalPrice;
		$scope.pointDescription=resp.data.productDescTitle;
		console.log($scope.page);
		$scope.showPrice = true;
		if($scope.page == 0 || $scope.page == null || $scope.offerPrice == $scope.mainPrice){
			$scope.showPrice = false;
			$scope.originalPriceValue = true;
		}
		if($scope.pointDescription != null){
			$scope.showDescPoints = true; 
			$scope.array = [];
			var numbers = $scope.pointDescription;
			var numbers1 = numbers.split('#');
			for (var i = 0; i < numbers1.length; i++) {
				var obj = {};
				var split = numbers1[i].split('*');
				obj['title'] = split[0];
				obj['value'] = split[1];
				$scope.array.push(obj);
			}
			console.log($scope.array);
		}
		else {
			$scope.showDescPoints = false;
		}
		
	});
	
		
	
	
		// Product Average Star Rating //
	
	
	$http.get(resturl+"/products/"+$routeParams.prodid+"/reviews?pageNumber=1&pageSize=5").then(function(resp) {
		console.log(resp);
		$scope.prod=resp.data.reviewList;
		$scope.totalCount=resp.data.paginationData.totalCount; 
		$scope.averagereview=resp.data.avgReview;
			console.log($scope.averagereview);
			$scope.userRatings=resp.data.reviewList;
			console.log($scope.userRatings);
		$scope.totalreview=resp.data.totalratingCount;
		 $scope.uptotalCount = resp.data.paginationData.totalCount;
		$scope.ratings = [{number:$scope.averagereview}];
	});
	$scope.page = 1;
	$scope.PagingAct = function(page, pageSize, total) {
  $http.get(resturl+"/products/"+$routeParams.prodid +"/reviews?pageNumber="+page+"&pageSize=5").then(function(resp) {
		console.log(resp);
		$scope.prod=resp.data.reviewList;
		$scope.totalCount=resp.data.paginationData.totalCount; 
		$scope.averagereview=resp.data.avgReview;
			console.log($scope.averagereview);
			$scope.userRatings=resp.data.reviewList;
			console.log($scope.userRatings);
		$scope.totalreview=resp.data.totalratingCount;
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
	if ($scope.userlogged==false) {
		$scope.showReview = false;
	}
	else {
		$scope.showReview = true;
	/* Save Review With Rating Service */
	$scope.onItemRating = function(rating){
		$scope.starValue = rating;
		console.log($scope.starValue);
	};
	$scope.submitReview = function(giveReview) {
		var reqObj ={
			"userId" : $scope.loggedInuserId,
			"productId" : $routeParams.prodid,
			"rating" : $scope.starValue,
			"description" : giveReview.description,
			"descriptionName": $scope.loggedInUserName
		};
		console.log(reqObj);
		$http.post(resturl+"/products/reviews/save", reqObj).then(function(resp) {
			console.log(resp);
			$http.get(resturl+"/products/"+$routeParams.prodid +"/reviews").then(function(resp) {
		console.log(resp);
		$scope.prod=resp.data;
		$scope.averagereview=resp.data.avgReview;
			console.log($scope.averagereview);
			$scope.userRatings=resp.data.productReviews;
			console.log($scope.reviewrate);
		$scope.totalreview=resp.data.totalRatingCount;
		$scope.ratings = [{number:$scope.averagereview}];
	});
		});
		location.reload(); 
	};
	}
	if(localStorage.loggedInUser !=undefined) {
		
	
	$http.get(resturl+"/pincodeWiseVendors/"+$routeParams.prodid+"?userId="+localStorage.loggedInuserId).then(function(resp) {
		console.log(resp);
		
		$scope.pagep= resp.data.vendorsDataForProduct;
		if(resp.data.vendorsDataForProduct == null){
			$scope.err = true
			$scope.msg = false
			$scope.successmsg = resp.data.status;
			console.log($scope.successmsg);
			
		}
		console.log($scope.pagep);
		$scope.productpageLoaded = true;
		if(resp.data.vendorsDataForProduct.length < 10) {
			$scope.slickproductpageConfig = {
				slidesToShow: 5,
				slidesToScroll: 5,
				prevNext: true,
				arrows: false,
				dots: true,
				autoplay: true,
				autoplayspeed: 600
			}
		}
		else { $scope.slickproductpageConfig = {
			dots: true,
			slidesPerRow: 5,
			rows: 2,
			responsive: [{
				breakpoint: 478,
				settings: {
					slidesPerRow: 1,
					rows: 1,
				}
			}]
		}
	}
	});
	}else{
		$scope.msg=true;
		$scope.err=false;
		$scope.msg = "Please login to view vendor(s) in your location (or) search for vendor(s) using Pincode..."
		console.log($scope.msg);
	}
		$scope.updateSelection = function(position, pagep, pagedesc) {
		console.log(pagedesc.userId);
		$scope.vendorIdValue = pagedesc.vendorId;
		console.log($scope.vendorIdValue);
		if ($(".vendorCheck").is(':checked')) {
		var id = $("#del_event").removeAttr('disabled');
		}else{
			var id =  $('#del_event').attr('disabled', 'disabled');
		}
		angular.forEach(pagep, function(pagedesc, index) {
		if (position != index)
			pagedesc.checked = false;
	});
	};
	$scope.addcart = function (quantity) {
	if ($scope.userlogged==false) {
		console.log($scope.userlogged);
		console.log("Not Logged");
		$location.path('/login');
	}
	else {
	var cartproduct = {
			"productId" : $routeParams.prodid,
			"quantity"  : quantity,
			"vendorId" : $scope.vendorIdValue
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
			autoplayspeed: 500
		};
	});
	$http.get(resturl+"/getRecentBought").then(function(resp) {
		console.log(resp);
		$scope.recently=resp.data.recentlyBought;		
	    $scope.RecentlyLoaded = true;
		$scope.slickrecentbroughtConfig = {
			dots: false,
			arrows: false,
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1, 
			autoplay: true,
			autoplayspeed: 500,		
		responsive: [
			{
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
		}]};
	});
	if(localStorage.loggedInuserId != "undefined") {
	}
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
	$scope.vendorPopInfo = function(pagedesc) {
		$scope.vendorDetails = {
			imagePath : pagedesc.vendorImageURL,
			address : pagedesc.vendorOfficeAddress,
			name : pagedesc.vendorName,
			mobileNum : pagedesc.vendorMobile,
			teleNum : pagedesc.vendorTelephone,
			email : pagedesc.email,
			firmInfo : pagedesc.vendorConstFirm
		};
	};
	
	$scope.getpincode=function(postalCode){
		$scope.postalCode=postalCode;
		console.log($scope.postalCode);
		$http.get(resturl+"/seachPincodeWiseVendors/"+$routeParams.prodid+"?postalCode="+$scope.postalCode).then(function(resp){
	console.log(resp);
		
	$scope.postalCode="";
	$scope.pagep= resp.data.vendorsDataForProduct;
		console.log($scope.pagep);
		$scope.err = false;
		if (resp.data.vendorsDataForProduct == null) {
			$scope.err = true;
			$scope.msg=false;
			              $scope.successmsg =resp.data.status;
                         }
		 $scope.productpageLoaded = true;
		if(resp.data.vendorsDataForProduct.length < 5) {
			$scope.slickproductpageConfig = {
				slidesToShow: 5,
				slidesToScroll: 5,
				prevNext: true,
				arrows: false,
				dots: true,
				autoplay: true,
				autoplayspeed: 600
			}
		}
		else { $scope.slickproductpageConfig = {
			dots: true,
			slidesPerRow: 5,
			rows: 2,
			responsive: [{
				breakpoint: 478,
				settings: {
					slidesPerRow: 1,
					rows: 1,
				}
			}]
		}
	}
	});
		
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