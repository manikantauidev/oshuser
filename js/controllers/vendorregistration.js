angular.module('newapp')
	.controller('vendorregCtrl', function ($scope, $http, $location, $route, resturl,$rootScope) {
		$http.get(resturl + "/getAllCategories").then(function (resp) {
			console.log(resp);
			$scope.menuitem = resp.data.categoryData;
		});
		$scope.isDisabled = false;
		$scope.typeOfSearch = [{
				name: "Category",
				value: "Category"
			},
			{
				name: "Brand",
				value: "Brand"
			},
			{
				name: "Product",
				value: "Product"
			}
		];
		$scope.mouseOver = function (param) {
			$scope.set_bg = function () {
				$scope.bgimg = param.imageURL;
				return {
					"background-image": "url(/clients/onesevenhome/img/" + $scope.bgimg + ".jpg)"
				};
			}
		}
		$scope.alerthide = function () {
			$scope.errmsg = false;
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
		// === Upload Functionality Starts === //
		$scope.files = [];
		$scope.$on("seletedFile", function (event, args) {
			$scope.$apply(function () {
				//add the file object to the scope's files collection
				$scope.files.push(args.file);
			});
		});
		/********** Register **********/
		$scope.example8model = [];
		$scope.example8settings = {
			checkBoxes: true,
			enableSearch: true
		};
		$scope.constitutionchange = function (param) {
			if (param == "Services") {
				$http.get(resturl + "/services").then(function (resp) {
					var resparr = resp.data.services;
					for (var i = 0; i < resparr.length; i++) {
						delete resparr[i]['imageURL1'];
						delete resparr[i]['imageURL2'];
						delete resparr[i]['description'];
						delete resparr[i]['new'];
						resparr[i].label = resparr[i]['serviceType']
						delete resparr[i]['serviceType'];
					}
					$scope.example8data = resparr;
					$scope.example8model = [$scope.example8data[0]]
				});
			}
			else if (param == "Architects") {
				var catpayload = {
					"searchString": "Architects"
				};
				$http.post(resturl + "/getCategoriesForCat", catpayload).then(function (resp) {
					$scope.menuitems = angular.copy(resp.data.categoryData);
					var resparr = $scope.menuitems[0].subCategory;
					console.log(resparr);
					for (var i = 0; i < resparr.length; i++) {
						delete resparr[i]['type'];
						resparr[i].label = resparr[i]['title']
						delete resparr[i]['title'];
						$scope.example8data = resparr;
						$scope.example8model = [$scope.example8data[0]]
						console.log($scope.example8data);
					}
				});
			}
			else if (param == "Machinery") {
				var catpayload = {
					"searchString": "MACHINERY & EQUIPMENT"
				};
				$http.post(resturl + "/getCategoriesForCat", catpayload).then(function (resp) {
					$scope.menuitems = angular.copy(resp.data.categoryData);
					var resparr = $scope.menuitems[0].subCategory;
					console.log(resparr);
					for (var i = 0; i < resparr.length; i++) {
						delete resparr[i]['type'];
						resparr[i].label = resparr[i]['title']
						delete resparr[i]['title'];
						$scope.example8data = resparr;
						$scope.example8model = [$scope.example8data[0]]
						console.log($scope.example8data);
					}
				});
			}
			else if (param == "Wallpaper") {
				var catpayload = {
					"searchString": "WALL PAPER"
				};
				$http.post(resturl + "/getCategoriesForCat", catpayload).then(function (resp) {
					$scope.menuitems = angular.copy(resp.data.categoryData);
					var resparr = $scope.menuitems[0].subCategory;
					console.log(resparr);
					for (var i = 0; i < resparr.length; i++) {
						delete resparr[i]['type'];
						resparr[i].label = resparr[i]['title']
						delete resparr[i]['title'];
						$scope.example8data = resparr;
						$scope.example8model = [$scope.example8data[0]]
						console.log($scope.example8data);
					}
				});
			}
		}
		$scope.regvendor = function (vendor) {
			vendor.userType = "VENDOR";
			$scope.vendor.country = "India";
			vendor.constFirm = vendor.vendorConstFirm;
			delete vendor.vendorConstFirm;
			console.log(vendor)
			registerapi(vendor);
		}

		$scope.Arcvendor = function (Architects) {
			Architects.userType = "ARCHITECTS";
			$scope.vendor.country = "India";
			Architects.constFirm = Architects.vendorConstFirm;
			delete Architects.vendorConstFirm;
			console.log(Architects)
			var temparr = [];
			for (i = 0; i < $scope.example8model.length; i++) {
				temparr.push($scope.example8model[i].id);
			}
			Architects.architectIds = temparr;
			console.log($scope.example8model);
			console.log(Architects);
			registerapi(Architects);
		}

		$scope.Machineryvendor = function (Machinery) {
			Machinery.userType = "MACHINERY & EQUIPMENT";
			$scope.vendor.country = "India";
			Machinery.constFirm = Machinery.vendorConstFirm;
			delete Machinery.vendorConstFirm;
			console.log(Machinery)
			var temparr = [];
			for (i = 0; i < $scope.example8model.length; i++) {
				temparr.push($scope.example8model[i].id);
			}
			Machinery.architectIds = temparr;
			console.log($scope.example8model);
			console.log(Machinery);
			registerapi(Machinery);
		}
		$scope.wallpapervendor = function (Wallpaper) {
			Wallpaper.userType = "WALL PAPER";
			$scope.vendor.country = "India";
			Wallpaper.constFirm = Wallpaper.vendorConstFirm;
			delete Wallpaper.vendorConstFirm;
			console.log(Wallpaper)
			var temparr = [];
			for (i = 0; i < $scope.example8model.length; i++) {
				temparr.push($scope.example8model[i].id);
			}
			Wallpaper.architectIds = temparr;
			console.log($scope.example8model);
			registerapi(Wallpaper);
		}
		$scope.regservices = function (services) {
			services.userType = "SERVICE";
			$scope.vendor.country = "India";
			services.constFirm = services.vendorConstFirm;
			delete services['vendorConstFirm'];
			var temparr = [];
			for (i = 0; i < $scope.example8model.length; i++) {
				temparr.push($scope.example8model[i].id);
			}
			services.serviceIds = temparr;
			console.log($scope.example8model);
			console.log(services);
			registerapi(services);
		}
		/***** Register API Call ***/
		function registerapi(vendor) {
			$scope.isDisabled = true;
			console.log(vendor);
			$rootScope.vendorName = vendor.companyName;
			$rootScope.usertype = vendor.userType;
			vendor.activationURL = "http://rainiersoft.com/clients/onesevenhome/#/activateuser";
			$http({
				method: 'POST',
				url: resturl + "/user/register",
				headers: {
					'Content-Type': undefined
				},
				transformRequest: function (data) {
					var formData = new FormData();
					formData.append("vendorRequest", JSON.stringify(vendor));
					if (data.file.length == 0) {
						formData.append("file", new File([""], "emptyFile.jpg", {
							type: "impage/jpeg"
						}));
					} else {
						for (var i = 0; i < data.file.length; i++) {
							// formData.append("file", data.file);
							formData.append("file", data.file[i]);
						}
					}
					return formData;
				},
				data: {
					fileInfo: vendor,
					file: $scope.files
				}
			}).
			success(function (resp, status, headers, config) {
				console.log(resp);
				console.log(resp.status);
				if (resp.status == "true") {
					$location.path('/conform');
				} else {
					$scope.errmsg = true;
					$scope.isDisabled = false;
					$location.path('/vendorreg');
					$scope.errmessage = resp.errorMessage;
				}
			}).error(function (data, status, headers, config) {
				$location.path('/vendorreg');
			});
		};
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
newapp.directive('uploadFiles', function () {
	return {
		//create a new scope
		scope: true,
		link: function (scope, el, attrs) {
			el.bind('change', function (event) {
				var files = event.target.files;
				//iterate files since 'multiple' may be specified on the element
				for (var i = 0; i < files.length; i++) {
					//emit event upward
					scope.$emit("seletedFile", {
						file: files[i]
					});
				}
			});
		}
	};
});