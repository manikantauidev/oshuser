angular.module('newapp')
  .controller('DashboardCtrl', function($scope, $http, $location, $interval, resturl, $rootScope) {
	if(localStorage.loggedInUser !=undefined){
		$scope.loggedInUser=localStorage.loggedInUser;
		$scope.loggedInUserName=localStorage.loggedInUserName;
		$scope.loggedInUserType=localStorage.loggedInUserType;
		$scope.loggedInuserId=localStorage.loggedInuserId;
		$scope.userlogged=true;
	} else {
		$scope.userlogged=false;
	}
	/*
	$scope.mouseIn = function(){
		$scope.showDiv = true;
	}
	$scope.mouseOut = function(){
		$scope.showDiv = false;
	}*/
	
	$scope.typeOfSearch = [
		{name : "Category", value : "Category"},
		{name : "Brand", value : "Brand"},
		{name : "Product", value : "Product"}
	];
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
	$scope.topslides = [{
		"img1": "img/Hero-Banners-Hall-530x922_1.jpg",
		"img2": "img/Hero-Banners-kitchen-265x926_1.jpg",
		"img3": "img/Hero-Banners-bedroom-265x926_1.jpg"
	},
	{
		"img1": "img/Hero-Banners-Hall-530x922_2.jpg",
		"img2": "img/Hero-Banners-kitchen-265x926_2.jpg",
		"img3": "img/Hero-Banners-bedroom-265x926_3.jpg"
	},
	{
		"img1": "img/Hero-Banners-Hall-530x922_3.jpg",
		"img2": "img/Hero-Banners-kitchen-265x926_3.jpg",
		"img3": "img/Hero-Banners-bedroom-265x926_3.jpg"
	},
	{
		"img1": "img/Hero-Banners-Hall-530x922_4.jpg",
		"img2": "img/Hero-Banners-kitchen-265x926_4.jpg",
		"img3": "img/Hero-Banners-bedroom-265x926_4.jpg"
	}];
	$scope.slicktopslideConfig = {
		dots: true,
		arrows: false,
		infinite: true,
		autoplay: true,
		autoplayspeed: 1000
	};
	$http.get(resturl+"/getAllCategories").then(function(resp) {
		console.log(resp);
		$scope.menuitem = resp.data.categoryData;
	});
	
	$http.get(resturl+"/getDealOfDay").then(function(resp) {
		console.log("deal",resp);
		$scope.dealday = resp.data.dealOfDay;
			var disArray = [];
			for(abc=0; abc<resp.data.dealOfDay.length; abc++) {
				disArray[abc] = "display"+abc;
			}
			for(i=0; i<resp.data.dealOfDay.length; i++){
				if(resp.data.responseData[i].discountPercentage == undefined || resp.data.responseData[i].discountPercentage == null) {
					$scope.showTag = disArray[i];
					$scope[$scope.showTag] = false;
				}
				else{
					$scope.showTag = disArray[i];
					$scope[$scope.showTag] = true;
				}
			}
		//var countDownDate = new Date(resp.data.dealOfDay.productPriceSpecialEndDate).getTime();
		
		if(resp.data.dealOfDay!=undefined&&resp.data.dealOfDay!=null&&resp.data.dealOfDay.productPriceSpecialStartDate!=undefined&&resp.data.dealOfDay.productPriceSpecialStartDate!=null){
			var dd=new Date(resp.data.dealOfDay.productPriceSpecialStartDate);
		
		dd.setDate(dd.getDate()+1);
        var dateobj=(dd.getMonth() + 1) + '/' + dd.getDate() + '/' +  dd.getFullYear();	
		var countDownDate = new Date(dateobj).getTime();
			/*---=== DEAL OF THE DAY "TIMER" STARTS ===--- */
            // Update the count down every 1 second
            $interval(function() {
                    // Get todays date and time
                    var now = new Date().getTime();
                    // Find the distance between now and the count down date
                    var distance = countDownDate - now;
                    // Time calculations for days, hours, minutes and seconds
                    //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    $scope.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    $scope.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    $scope.seconds = Math.floor((distance % (1000 * 60)) / 1000);
					var hoursValue = Math.log($scope.hours) * Math.LOG10E + 1 | 0;
					var minutesValue = Math.log($scope.minutes) * Math.LOG10E + 1 | 0;
					var secondsValue = Math.log($scope.seconds) * Math.LOG10E + 1 | 0;
					if(hoursValue<2){
						$scope.hours = "0"+$scope.hours;
					}
					if(minutesValue<2){
						$scope.minutes = "0"+$scope.minutes;
					}
					if(secondsValue<2){
						$scope.seconds = "0"+$scope.seconds;
					}
                },
                1000);
        }
            /*---=== DEAL OF THE DAY "TIMER" ENDS ===--- */
	});
	$http.get(resturl+"/getNewProduct").then(function(resp) {
		console.log(resp);
		$scope.products = resp.data.newProducts;
		$scope.NewproductsLoaded = true;
		$scope.slicknewproductsConfig = {
			dots: true,
			arrows: false,
			infinite: true,
			slidesToShow: 2,
			slidesToScroll: 1
		};
		var disArray = [];
			for(abc=0; abc<resp.data.newProducts.length; abc++) {
				disArray[abc] = "display"+abc;
			}
			for(i=0; i<resp.data.newProducts.length; i++){
				console.log(resp.data.newProducts[i].discountPercentage);
				if(resp.data.newProducts[i].discountPercentage == "0"|| resp.data.newProducts[i].discountPercentage == null) {
					$scope.showTag = disArray[i];
					$scope[$scope.showTag] = false;
				}
				else{
					$scope.showTag = disArray[i];
					$scope[$scope.showTag] = true;
				}
			}
	});
	$http.get(resturl+"/getRecommendedProduct").then(function(resp) {
		console.log("recommend",resp);
		$scope.recommend = resp.data.recommendedProducts;
		
			for(i=0; i<resp.data.recommendedProducts.length; i++){
				console.log(resp.data.recommendedProducts[i].productDiscountPrice);
				if(resp.data.recommendedProducts[i].productDiscountPrice == null) {
					$scope.productprce = true;
					$scope.produdsctprice = false;
					
				}
				else{
					$scope.productprce = false;
					$scope.produdsctprice = true;
				}
			}
		$scope.RecomendLoaded = true;
		$scope.slickrecommendedprocutsConfig = {
			dots: false,
			arrows: true,
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
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
				centerPadding: '0px',
				slidesToShow: 3,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				arrows: false,
				centerMode: true,
				centerPadding: '0px',
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 500,
			settings: {
				arrows: false,
				centerMode: true,
				centerPadding: '0px',
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
		]
		};
	});
	$http.get(resturl+"/getFeatureProduct").then(function(resp) {
		console.log(resp);
		$scope.feature = resp.data.feaureProducts;
		$scope.FeaturedLoaded = true;
		$scope.slickfeatureproductsConfig = {
			dots: true,
			arrows: false,
			infinite: true,
			slidesToShow: 2,
			slidesToScroll: 1
		};
	});
	$http.get(resturl+"/services").then(function(resp) {
		console.log(resp);
		$scope.deal = resp.data.services;
		$scope.SreviceLoaded = true;
		$scope.slickServiceConfig = {
			dots: false,
			arrows: false,
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 3,
			autoplay: true,
		    autoplayspeed: 600
		};
	});
	$http.get("js/controllers/whatwedo.json").then(function(resp){
		console.log(resp);
		$scope.whatWeDoResp = resp.data.whatWeDoResponse;
		$scope.getProdImgPath = resp.data.whatWeDoResponse[0].imageURL1;
		$scope.serviceDescription = resp.data.whatWeDoResponse[0].description;
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
	//For Display Sub Categories
	$http.get(resturl+"/getAllSubCatImages").then(function(resp) {
		console.log("subcat",resp);
		console.log(resp);
		$scope.catImageData=resp.data.subCatagoryImgsObjByCatagory;
		$scope.subCatagoryImgsLoaded = true;
		$scope.slickSubCatConfig = {
			dots: false,
			arrows: false,
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplayspeed:700
		};
	});

	//For Get Testimonials And Brands
	var postObj={
		"status":"Y"
	}
	$http.post(resturl+"/getTestimonials",postObj).then(function(res) {
		console.log("Testimonials",res);
		$scope.testimonialData=res.data.responseData;
	});
	$http.post(resturl+"/getBrandImages",postObj).then(function(res) {
		console.log("brands",res);
		$scope.brandData=res.data.responseData;
	});

	//Route to deal of day page list
	$scope.getDealDayPage=function(productId){
		if(productId!=undefined){
		$location.path("/productpage/"+productId);
		}
	}
	//For Sub Cat. Route
	$scope.getSubCatPage=function(key, item){
		console.log(key);
		console.log(item);
		/*if(item.subCategoryName!=undefined){
		   let url=item.subCategoryName.split(" ");
		   let urlPath='';
		   for(let i=0;i<url.length;i++){
		   	urlPath=urlPath+url[i];
		   	if(i!=url.length-1){
		   		urlPath=urlPath+"_";
		   	}
		   }
			$location.path("sub_category/Building%20Materials/categories/"+urlPath);
		}*/
		$location.path("sub_category/"+key+"/categories/"+item.subCategoryName);
	}

	//For Get Recommende Product And Service about wwhat we do Page
	$scope.getProductServicePage=function(item,flag){
		if(item!=undefined&&item.productId!=undefined&&flag){
			$location.path("productpage/"+item.productId);
		}else if(!flag&&item!=undefined&&item.serviceType!=undefined){
			$location.path("detailservices/"+item.serviceType+"/"+item.id);
		}
	}

	//Product Description
	$scope.getProductImage=function(item){
		console.log(item);
		$scope.getProdImgPath=item.imageURL1;
		$scope.serviceDescription = item.description;
	}
	if ($scope.userlogged==false) {
		$scope.testmonialView = false;
	}
	else {
		$scope.testmonialView = true;
	}
	$scope.submitTestimonial = function(testimonialComment){
		var reqPayload = {
			"customerId" : $scope.loggedInuserId,
			"testmonialDescription" : testimonialComment
		};
		console.log(reqPayload);
		$http.post(resturl+"/testimonial/save", reqPayload).then(function(resp){
			console.log(resp);
			if(resp.data.status == "true"){
					$scope.success = resp.data.successMessage;
					$('.successPopup').modal('show');
				}
				else{
					$scope.failure = resp.data.errorMessage;
					$('.errorPopup').modal('show');
				}
				testmonialDescription="";
		});
	}
	
	// Advertisement Section API Call //
	$http.get(resturl+"/getHomePageOffers").then(function(resp){
		console.log("HomePageOffers", resp);
		$scope.offersData = resp.data.responseData;
	});
	
	
	// Email Notifications //
	$scope.getNotifications = function(emailAddress){
		console.log(emailAddress);
		var request = { emailAddress : emailAddress }
		$http.post(resturl+"/saveExternalUser", request).then(function(resp){
			console.log(resp);
			$rootScope.subscriptionData = {};
			$rootScope.subscriptionData = resp.data;
			$location.path('/subscribed');
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