angular.module('newapp')
  .controller('DashboardCtrl', function($scope, $http, $location, $interval,resturl) {
	if(localStorage.loggedInUser !=undefined){
		$scope.loggedInUser=localStorage.loggedInUser;
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
	$scope.topslides = [{
		"img1": "img/pic1.png",
		"img2": "img/pic2.png",
		"img3": "img/pic3.png"
	},
	{
		"img1": "img/pic4.jpg",
		"img2": "img/pic5.jpg",
		"img3": "img/pic6.jpg"
	},
	{
		"img1": "img/pic7.jpg",
		"img2": "img/pic8.jpg",
		"img3": "img/pic9.jpg"
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
		$scope.RecomendLoaded = true;
		$scope.slickrecommendedprocutsConfig = {
			dots: false,
			arrows: true,
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1
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
	
	/*$http.get("js/controllers/subCategory.json").then(function(resp){
		console.log(resp);
		$scope.catImageData = resp.data.subCatagoryImgsObjByCatagory;
		$scope.subCatagoryImgsLoaded = true;
		$scope.slickSubCatConfig = {
			dots: false,
			arrows: false,
			infinite: true,
			slidesToShow: 6,
			slidesToScroll: 6,
			autoplay: true,
			autoplayspeed:600
		}
	});*/
	
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
			$location.path("detailservices/"+item.serviceType);
		}
	}

	//Product Description
	$scope.getProductImage=function(item){
		$scope.getProdImgPath=item.imageURL1?item.imageURL2:undefined;
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
		});
	}
});