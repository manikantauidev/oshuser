angular.module('newapp')
	.controller('myaccountCtrl', function ($scope, $http, $location, $routeParams, $filter, resturl) {
		$scope.typeOfSearch = [
			{name : "Category", value : "Category"},
			{name : "Brand", value : "Brand"},
			{name : "Product", value : "Product"}
		];
		$scope.fileOptions = [
  { name: 'Certificate', value: 'certificate' },
  { name: 'File 1', value: 'file1' },
  { name: 'File 2', value: 'file2' },
  { name: 'File 3', value: 'file3' }
 ];
		if (localStorage.loggedInUser != undefined) {
			$scope.loggedInUser = localStorage.loggedInUser;
			$scope.loggedInUserName = localStorage.loggedInUserName;
			$scope.loggedInUserType = localStorage.loggedInUserType;
			$scope.loggedInuserId = localStorage.loggedInuserId;
			$scope.userlogged = true;

			if ($scope.loggedInUserType == "CUSTOMER") {
               $scope.wishlist = true;
				$scope.userprofile = true;
				$scope.orderinvoice = true;
				$scope.inbox = true;
				$scope.addwishlist=true;
				$scope.actclass = "active";
			} else if ($scope.loggedInUserType == "SERVICE") {
				$scope.serviceprofile = true;
				$scope.orderinvoice = true;
				$scope.inbox = true;
				$scope.addwishlist=true;
				    $scope.wishlist = true;
				$scope.seractclass = "active";
			} else if ($scope.loggedInUserType == "ARCHITECTS") {

				$scope.arcprofile = true;
				$scope.Portfolio = true;
				$scope.abtarchitecture = true;
				$scope.inbox = true;
				$scope.orderinvoice = true;
				$scope.addwishlist=true;
				    $scope.wishlist = true;
				$scope.architectureactclass = "active";

			} else if ($scope.loggedInUserType == "MACHINERY & EQUIPMENT") {

				$scope.mechprofile = true;
				$scope.mechPortfolio = true;
				$scope.abtMachinery = true;
				$scope.orderinvoice = true;
				$scope.inbox = true;
				$scope.addwishlist=true;
				    $scope.wishlist = true;
				$scope.mechactclass = "active";

			} else if ($scope.loggedInUserType == "WALL PAPER") {

				$scope.wallpaperprofile = true;
				$scope.abtwal = true;
				$scope.wallPortfolio = true;
				$scope.wallpaperUpdate = true;
				$scope.wallpaperDelete = true;
				$scope.orderinvoice = true;
				$scope.inbox = true;
				$scope.addwishlist=true;
				    $scope.wishlist = true;
				$scope.wallpaperactclass = "active";

			} else {
				$scope.wishlist = true;
				$scope.vodtls = true;
				$scope.orderinvoice = true;
				$scope.profile = true;
				$scope.productlist = true;
				$scope.addproduct = true;
				$scope.inbox = true;
				$scope.reports = true;
				$scope.venactclass = "active";
			}

		} else {
			$scope.userlogged = false;
		}

		if ($scope.userlogged == true) {
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

			$http.get(resturl + "/getCategoryWithImages").then(function (resp) {
				console.log(resp);
				$scope.account = resp.data.categoryImagedata;
			});
			$http.get("js/controllers/todayorders.json").then(function (resp) {
				console.log(resp);
				$scope.todayorder = resp.data.torder;
			});
			
			$http.post(resturl+"/order/vendorOrderDetails/"+ localStorage.loggedInuserId +"?userId=" + localStorage.loggedInuserId + "&page=0&size=20").then(function (resp) {
				console.log(resp);
				$scope.vendororder = resp.data.orders;
				$scope.uptotalCount = resp.data.totalPages;
				for (i = 0; i < resp.data.orders.length; i++) {
					$scope.vendororder[i].totalamt = resp.data.orders[i].total.value;
				}
			});
			
			$scope.vendorgetOrder = function (vorderList) {
				
			$scope.orderid = vorderList.id;
				$scope.orderDate = vorderList.datePurchased;
				$scope.finalAmount = vorderList.totalamt;
				$http.post(resturl + "/order/orderDetails/" + $scope.orderid).then(function (resp) {
					console.log(resp);
					$scope.idOfOrder = resp.data.id;
					$scope.order = resp.data.products;
					for (i = 0; i < resp.data.products.length; i++) {
					$scope.order[i].vendor = resp.data.products[i].vendorDetails.vendorName;
					}
					console.log($scope.vedorname);
					$scope.shipaddress = resp.data.delivery;
					console.log($scope.shipaddress);
					console.log($scope.order);
				});
			};
			$http.post(resturl + "/order/allOrderDetails?userId=" + localStorage.loggedInuserId + "&page=0&size=20").then(function (resp) {
				console.log(resp);
				$scope.myorder = resp.data.orders;
				$scope.uptotalCount = resp.data.totalPages;
				for (i = 0; i < resp.data.orders.length; i++) {
					$scope.myorder[i].totalamt = resp.data.orders[i].total.value;
				}
			});
			$scope.page = 0;
			$scope.PagingAct = function (page, Size, total) {
				$http.post(resturl + "/order/allOrderDetails?userId=" + localStorage.loggedInuserId + "&page=" + page + "&size=20").then(function (resp) {
					console.log(resp);
					$scope.myorder = resp.data.orders;
					$scope.orderTotalCount = resp.data.totalPages;
					for (i = 0; i < resp.data.orders.length; i++) {
						$scope.myorder[i].totalamt = resp.data.orders[i].total.value;
					}
				});
			}

			$scope.getOrder = function (orderList) {
				$scope.orderid = orderList.id;
				$scope.orderDate = orderList.datePurchased;
				$scope.finalAmount = orderList.totalamt;
				$http.post(resturl + "/order/orderDetails/" + $scope.orderid).then(function (resp) {
					console.log(resp);
					$scope.idOfOrder = resp.data.id;
					$scope.order = resp.data.products;
					for (i = 0; i < resp.data.products.length; i++) {
					$scope.order[i].vendor = resp.data.products[i].vendorDetails.vendorName;
					}
					console.log($scope.vedorname);
					$scope.shipaddress = resp.data.delivery;
					console.log($scope.shipaddress);
					console.log($scope.order);
				});
			};
			
					$scope.hide=true;
	$scope.vendorproduct = function(macc){
		$scope.hide=false;
		if(macc.checked){
			$scope.hide=false;
		}else{
		$scope.hide=true;	
		}
	}
			
			
			$http.get(resturl + "/productList/" + $scope.loggedInuserId+"?pageNumber=1&pageSize=15").then(function (resp) {
				console.log(resp);
				$scope.mplist = resp.data.responseData;
				$scope.total=resp.data.paginationData.totalCount;
			});
			$scope.page = 1;
			$scope.productAct = function(page, pageSize, total) {
			$http.get(resturl + "/productList/" + $scope.loggedInuserId+"?pageNumber="+page+"&pageSize=15").then(function (resp) {
				console.log(resp);
				$scope.mplist = resp.data.responseData;
				$scope.total=resp.data.paginationData.totalCount;
			});
			};
					if($scope.loggedInUserType == "VENDOR"){
				$scope.whishcustomer = false;
				$scope.vendorcustomer = true;
				$scope.uncheck = true;
				console.log($scope.uncheck);
				
			}else{
					$scope.vendorcustomer = false;
				$scope.whishcustomer = true;
				$scope.uncheck = false;
				
			}
			$scope.hide=true;
	$scope.vendorselect = function(maccw){
		$scope.hide=false;
		if(maccw.checked){
			$scope.hide=false;
		}else{
		$scope.hide=true;	
		}
	}
			
			$http.get(resturl + "/wishlist/" + $scope.loggedInuserId+"?pageNumber=1&pageSize=15").then(function (resp) {
				console.log(resp);
				$scope.mwlist = resp.data.responseData;
				$scope.wishlisttotal=resp.data.paginationData.totalCount;
			});
			$scope.page = 1;
			$scope.wishAct = function(page, pageSize, total) {
			$http.get(resturl + "/wishlist/" + $scope.loggedInuserId+ "?pageNumber="+page+"&pageSize=15").then(function (resp) {
				console.log(resp);
				$scope.mwlist = resp.data.responseData;
				$scope.wishlisttotal=resp.data.paginationData.totalCount;
			});
			};
					//delete wishlist
			$scope.wishlistDel=function(){		
		var productId = $(".vendor-chk-select input:checkbox:checked").map(function(){
      return $(this).val();
    }).get();		
		var delWishList={"vendorId":$scope.loggedInuserId,"productId":productId}
	$http.post(resturl+"/deleteWishListProducts", delWishList).then(function(resp) {
	console.log(resp)
	if(resp.data.status == "true"){
					$scope.successmessage = resp.data.successMessage;
					$('.successPopup').modal('show');
				}
				else{
					$scope.errmessage = resp.data.errorMessage;
					$('.errorPopup').modal('hide');
				}
	
	$http.get(resturl + "/wishlist/" + $scope.loggedInuserId+"?pageNumber=1&pageSize=15").then(function (resp) {
				console.log(resp);
				$scope.mwlist = resp.data.responseData;
				$scope.wishlisttotal=resp.data.paginationData.totalCount;
			});
	
	});
		
	}
	
	//reports
	$("#historyfromdate, #historytodate").datepicker({
		autoclose: true,
		format: "yyyy-mm-dd",
		endDate: "today"
	});

$scope.historyByDate = function(reportDates){
	
	
var payload={
	"startDate":reportDates.startDate,
	"endDate":reportDates.endDate,
	"vendorId": localStorage.loggedInuserId
};
			$http.post(resturl+"/getProductRevenuesByVendor?pageNumber=1&pageSize=10",payload).then(function(resp){
		console.log(resp);
		$scope.vendorreportdata= resp.data.vendorProductRevenueData[0].vendorProducts;
		$scope.vendorsprodCount = resp.data.paginationData.totalCount;
	});
};
	
	
	
	
	
	
				//delete productlist
			$scope.productDel=function(){		
		var productId = $(".vendor-chk-select input:checkbox:checked").map(function(){
      return $(this).val();
    }).get();		
		var delproductList={"vendorId":$scope.loggedInuserId,"productId":productId}
	$http.post(resturl+"/deleteProductsFromProductList", delproductList).then(function(resp) {
	console.log(resp)
	if(resp.data.status == "true"){
					$scope.successmessage = resp.data.successMessage;
					$('.successPopup').modal('show');
				}
				else{
					$scope.errmessage = resp.data.errorMessage;
					$('.errorPopup').modal('hide');
				}
				
	$http.get(resturl + "/productList/" + $scope.loggedInuserId+"?pageNumber=1&pageSize=15").then(function (resp) {
				console.log(resp);
				$scope.mplist = resp.data.responseData;
				$scope.total=resp.data.paginationData.totalCount;
			});
	
	});
		
	}
			//msg inbox
				
			$http.get(resturl+"/getMessages/"+ $scope.loggedInuserId+"?pageNumber=1&pageSize=10").then(function(resp){
		console.log(resp);
		$scope.msgData = resp.data.responseData;
		$scope.msgCount = resp.data.paginationData.totalCount;
			});
	$scope.page = 0;
			$scope.msgPaging = function (page, Size, total) {
				$http.get(resturl+"/getMessages/"+ $scope.loggedInuserId+"?pageNumber="+page+"&pageSize=10").then(function(resp){
		console.log(resp);
		$scope.msgData = resp.data.responseData;
		$scope.msgCount = resp.data.paginationData.totalCount;
			});
			};
			
			
			
			
			$scope.getmsgService = function(bookedService){
		console.log(bookedService);
		$scope.bookedDetails = {
			"category" : bookedService.category,
			"dateAndTime" : bookedService.dateAndTime,
			"postRequirementId" : bookedService.postRequirementId,
			"query" : bookedService.query,
			"responseMessage" : bookedService.responseMessage,
			
			};
			};
			
			
				$scope.wishlist = function () {
			var productId = $(".vendor-chk-select input:checkbox:checked").map(function(){
      return $(this).val();
    }).get();
		var reqobj={"vendorId":$scope.loggedInuserId,"productId":productId}
	$http.post(resturl+"/addVendorProducts", reqobj).then(function(resp) {
	console.log(resp)
			});
			}
			
			// $scope.wishlist = function () {
			// var vendorProuctId = $(".vendor-chk-select input:checkbox:checked").map(function(){
      // return $(this).val();
    // }).get();
		// var reqobj={"vendorId":$scope.loggedInuserId,"productId":vendorProuctId}
			// $http.post(resturl+"/addWishListProductsToProductList" , reqobj).then(function (resp) {
				// console.log(resp);
			// });
			// }
			$http.get("js/controllers/inboxread.json").then(function (resp) {
				console.log(resp);
				$scope.readmsg = resp.data.read;
			});
			$http.get("js/controllers/inboxunread.json").then(function (resp) {
				console.log(resp);
				$scope.unreadmsg = resp.data.unread;
			});
			/** vendor description **/
			$scope.portfoliodescriptionFun = function (descript) {
				var reqObj = {
					"vendorId": $scope.loggedInuserId,
					"vendorShortDescription": descript.vendorShortDescription,
					"vendorDescription": descript.vendorDescription
				};
				$http.post(resturl + "/updateVendorDescription", reqObj).then(function (resp) {
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
			//**displayCart**//

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
		} else {
			$location.path('/login')
		}
		/**getUser**/
		
		/************Wallpaper Dropdown***************/
		$scope.wallsettings = {
			checkBoxes: true,
			enableSearch: true
		};
			var catpayload =
			{
    "searchString" : "WALL PAPER"
         };
		$http.post(resturl+"/getCategoriesForCat",catpayload).then(function(resp) {
	  $scope.menuitems = angular.copy(resp.data.categoryData);
  var resparr = $scope.menuitems[0].subCategory;
      console.log( resparr);
		
	for(var i = 0; i < resparr.length; i++) {
    delete resparr[i]['type'];
	resparr[i].label = resparr[i]['title']
	delete resparr[i]['title'];
	
$scope.walldata = resparr;
console.log($scope.walldata);
}
				});
		
		
		
		/************Mechinary Dropdown***************/
		$scope.mechinarysettings = {
			checkBoxes: true,
			enableSearch: true
		};
			var catpayload =
			{
    "searchString" : "MACHINERY & EQUIPMENT"
         };
		$http.post(resturl+"/getCategoriesForCat",catpayload).then(function(resp) {
	  $scope.menuitems = angular.copy(resp.data.categoryData);
  var resparr = $scope.menuitems[0].subCategory;
      console.log( resparr);
		
	for(var i = 0; i < resparr.length; i++) {
    delete resparr[i]['type'];
	resparr[i].label = resparr[i]['title']
	delete resparr[i]['title'];
	
$scope.Mechinarydata = resparr;
console.log($scope.Mechinarydata);
}
				});
		/************Archits Dropdown***************/
		$scope.Architectsettings = {
			checkBoxes: true,
			enableSearch: true
		};
			var catpayload =
			{
    "searchString" : "Architects"
         };
		$http.post(resturl+"/getCategoriesForCat",catpayload).then(function(resp) {
	  $scope.menuitems = angular.copy(resp.data.categoryData);
  var resparr = $scope.menuitems[0].subCategory;
      console.log( resparr);
		
	for(var i = 0; i < resparr.length; i++) {
    delete resparr[i]['type'];
	resparr[i].label = resparr[i]['title']
	delete resparr[i]['title'];
	
$scope.Architectdata = resparr;
console.log($scope.Architectdata);
}
				});
		/********** Services Dropdown **********/

		$scope.servicessettings = {
			checkBoxes: true,
			enableSearch: true
		};
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
			$scope.servicesdata = resparr;
		});
		$scope.Update = function (profile) {
			console.log(profile);
		};
		$http.get(resturl + "/getUser/" + localStorage.loggedInuserId).then(function (resp) {
			console.log(resp);
			if ($scope.loggedInUserType == "CUSTOMER") {
				$scope.userprofile = resp.data.customerDetails;
				$scope.userprofile.address = resp.data.customerDetails.billing.address;
				$scope.userprofile.state = resp.data.customerDetails.billing.stateProvince;
				$scope.userprofile.city = resp.data.customerDetails.billing.city;
				$scope.userprofile.phone = resp.data.customerDetails.billing.phone;
				$scope.userprofile.postalCode = resp.data.customerDetails.billing.postalCode;
				console.log($scope.userprofile);
				$scope.$watch('userprofile.dob', function (newValue) {
					$scope.userprofile.dob = $filter('date')(newValue, 'yyyy-MM-dd');
				});
			} else if ($scope.loggedInUserType == "SERVICE") {
				$scope.vendorprofile = resp.data.serviceDetails;
				$scope.vendorprofile.country = "India";
				console.log($scope.vendorprofile);
				var certficateValue = resp.data.serviceDetails.vendorAuthCert;
				$scope.cert = true;
				$scope.files1 = true;
				$scope.files2 = true;
				$scope.file3 = true;
				if (certficateValue == null) {
					$scope.cert = false;
				}
				if (resp.data.serviceDetails.file1 == null) {
					$scope.files1 = false;
				}
				if (resp.data.serviceDetails.file2 == null) {
					$scope.files2 = false;
				}
				if (resp.data.serviceDetails.file3 == null) {
					$scope.files3 = false;
				}
				$scope.servicesmodel = [];
				$scope.selectedIds = [];
				for (i = 0; i < resp.data.serviceDetails.serviceIds.length; i++) {
				$scope.selectedIds.push($scope.servicesdata[i]);
					 // var num = resp.data.serviceDetails.serviceIds[i];
					 // $scope.selectedIds.push($scope.servicesdata[num]);
					 $scope.servicesmodel = $scope.selectedIds;
				}
				
				console.log($scope.servicesmodel);
			} else if ($scope.loggedInUserType == "ARCHITECTS") {
				$scope.vendorprofile = resp.data.vendorDetails;
				$scope.vendorprofile.country = "India";
				console.log($scope.vendorprofile);
				var certficateValue = resp.data.vendorDetails.vendorAuthCert;
				$scope.cert = true;
				$scope.files1 = true;
				$scope.files2 = true;
				$scope.file3 = true;
				if (certficateValue == null) {
					$scope.cert = false;
				}
				if (resp.data.vendorDetails.file1 == null) {
					$scope.files1 = false;
				}
				if (resp.data.vendorDetails.file2 == null) {
					$scope.files2 = false;
				}
				if (resp.data.vendorDetails.file3 == null) {
					$scope.files3 = false;
				}
				$scope.architectmodel = [];
				$scope.architectIds = [];
				for (i = 0; i < resp.data.vendorDetails.architectIds.length; i++) {
					$scope.architectIds.push($scope.Architectdata[i]);
					//var num = resp.data.vendorDetails.categoryIds[i];
					//$scope.categoryIds.push($scope.Architectdata[num]);
				}
				$scope.architectmodel = $scope.architectIds;
				console.log($scope.architectmodel);
			} else if ($scope.loggedInUserType == "MACHINERY & EQUIPMENT") {
				$scope.vendorprofile = resp.data.vendorDetails;
				$scope.vendorprofile.country = "India";
				console.log($scope.vendorprofile);
				var certficateValue = resp.data.vendorDetails.vendorAuthCert;
				$scope.cert = true;
				$scope.files1 = true;
				$scope.files2 = true;
				$scope.file3 = true;
				if (certficateValue == null) {
					$scope.cert = false;
				}
				if (resp.data.vendorDetails.file1 == null) {
					$scope.files1 = false;
				}
				if (resp.data.vendorDetails.file2 == null) {
					$scope.files2 = false;
				}
				if (resp.data.vendorDetails.file3 == null) {
					$scope.files3 = false;
				}
				$scope.mechinarymodel = [];
				$scope.architectIds = [];
				for (i = 0; i < resp.data.vendorDetails.architectIds.length; i++) {
					$scope.architectIds.push($scope.Mechinarydata[i]);
					//var num = resp.data.vendorDetails.categoryIds[i];
					//$scope.categoryIds.push($scope.Architectdata[num]);
				}
				$scope.mechinarymodel = $scope.architectIds;
				console.log($scope.mechinarymodel);
			} else if ($scope.loggedInUserType == "WALL PAPER") {
				$scope.vendorprofile = resp.data.vendorDetails;
				$scope.vendorprofile.country = "India";
				console.log($scope.vendorprofile);
				var certficateValue = resp.data.vendorDetails.vendorAuthCert;
				$scope.cert = true;
				$scope.files1 = true;
				$scope.files2 = true;
				$scope.file3 = true;
				if (certficateValue == null) {
					$scope.cert = false;
				}
				if (resp.data.vendorDetails.file1 == null) {
					$scope.files1 = false;
				}
				if (resp.data.vendorDetails.file2 == null) {
					$scope.files2 = false;
				}
				if (resp.data.vendorDetails.file3 == null) {
					$scope.files3 = false;
				}
					$scope.wallmodel = [];
				$scope.architectIds = [];
				for (i = 0; i < resp.data.vendorDetails.architectIds.length; i++) {
					$scope.architectIds.push($scope.walldata[i]);
					//var num = resp.data.vendorDetails.categoryIds[i];
					//$scope.categoryIds.push($scope.Architectdata[num]);
				}
				$scope.wallmodel = $scope.architectIds;
				console.log($scope.wallmodel);
			} else {
				$scope.vendorprofile = resp.data.vendorDetails;
				$scope.vendorprofile.country = "India";
				console.log($scope.vendorprofile);
				var certficateValue = resp.data.vendorDetails.vendorAuthCert;
				$scope.cert = true;
				$scope.files1 = true;
				$scope.files2 = true;
				$scope.file3 = true;
				if (certficateValue == null) {
					$scope.cert = false;
				}
				if (resp.data.vendorDetails.file1 == null) {
					$scope.files1 = false;
				}
				if (resp.data.vendorDetails.file2 == null) {
					$scope.files2 = false;
				}
				if (resp.data.vendorDetails.file3 == null) {
					$scope.files3 = false;
				}
			}
		});
		$scope.alerthide = function () {
			$scope.errmsg = false;
		}
		
		
		//Profile Update
$('.vendorpic').change(function() {
        var filename = $('.vendorpic')[0].files[0].name;
        $('#vendorpicselect_file').html(filename);		
    });
	$('.vendorcert').change(function() {
        var filename = $('.vendorcert')[0].files[0].name;
        $('#vendorcert_select').html(filename);		
    });
		
		
		
		
		$scope.files = [];
		$scope.fileIDs = [];
		//3. listen for the file selected event which is raised from directive
		$("input[type='file']").on('change', function (e) {
			var files = event.target.files;
			//iterate files since 'multiple' may be specified on the element
			for (var i = 0; i < files.length; i++) {
				//emit event upward
				//scope.$emit("seletedFile", { file: files[i], event: event });
				$scope.files.push(files[i]);
				$scope.fileIDs.push(event.target.id);
			}
		});
		/** customer update**/

		if ($scope.loggedInUserType == "CUSTOMER") {
			$scope.Update = function (userprofile) {
				console.log(userprofile);
				delete userprofile.billing;
				delete userprofile.delivery;
				delete userprofile.activated;
				delete userprofile.password;
				delete userprofile.language;
				delete userprofile.customerType;
				delete userprofile.userName;
				console.log(userprofile);
				$http.post(resturl + "/customer/update", userprofile).then(function (resp) {
					if (resp.data.status == "true") {
						$scope.errmsg = true;
						$scope.errmessage = resp.data.successMessage;
					} else {
						$scope.errmsg = true;
						$scope.errmessage = resp.data.errorMessage;
					}
				});
			};
		}
		/** VENDOR update**/
		else if ($scope.loggedInUserType == "VENDOR") {
			$scope.vendorUpdate = function (vendorprofile) {
				vendorprofile.userType = "VENDOR";
				vendorprofile.companyName = vendorprofile.vendorName
				vendorprofile.contactNumber = vendorprofile.vendorTelephone
				vendorprofile.serviceFax = vendorprofile.vendorFax
				vendorprofile.majorCust = vendorprofile.vendorMajorCust
				vendorprofile.expLine = vendorprofile.vendorExpLine
				vendorprofile.serviceTIN = vendorprofile.vendorTIN
				vendorprofile.license = vendorprofile.vendorLicense
				vendorprofile.servicePAN = vendorprofile.vendorPAN
				vendorprofile.registrationNo = vendorprofile.vendorRegistrationNo
				vendorprofile.companyNature = vendorprofile.vendorCompanyNature
				vendorprofile.constFirm = vendorprofile.vendorConstFirm
				delete vendorprofile.vendorName;
				delete vendorprofile.vendorMobile;
				delete vendorprofile.vendorTelephone;
				delete vendorprofile.vendorFax;
				delete vendorprofile.vendorMajorCust;
				delete vendorprofile.vendorExpLine;
				delete vendorprofile.vendorTIN;
				delete vendorprofile.vendorLicense;
				delete vendorprofile.vendorPAN;
				delete vendorprofile.vendorRegistrationNo;
				delete vendorprofile.vendorCompanyNature;
				delete vendorprofile.vendorName;
				delete vendorprofile.vendorConstFirm;
				delete vendorprofile.vendorOfficeAddress;
				delete vendorprofile.activationURL;
				delete vendorprofile.vendorAuthCert;
				delete vendorprofile.userProfile;
				delete vendorprofile.file1;
				delete vendorprofile.file2;
				delete vendorprofile.file3;
				console.log(vendorprofile);
				$http({
					method: 'POST',
					url: resturl+"/user/update",
					headers: {
						'Content-Type': undefined
					},
					transformRequest: function (data) {
						var fileIDs = data.fileIDs;
						var formData = new FormData();
						formData.append("vendorRequest", JSON.stringify(vendorprofile));
						if(data.file.length == 0){
                	formData.append("file",new File([""], "emptyProfileFile.jpg", {type: "image/jpeg"}));
                	formData.append("file",new File([""], "emptycertificateFile.jpg", {type: "image/jpeg"}));
                	formData.append("file",new File([""], "emptyFile1.jpg", {type: "image/jpeg"}));
                	formData.append("file",new File([""], "emptyFile2.jpg", {type: "image/jpeg"}));
                	formData.append("file",new File([""], "emptyFile3.jpg", {type: "image/jpeg"}));
                }
				else {
					for(i=0; i<data.fileIDs.length; i++){
						if(data.fileIDs[i] == 'profilePic'){
							formData.append("file", data.file[i], "USER_PROFILE@"+data.file[i].name);
						}				
						else if(data.fileIDs[i] == 'certificate'){
							formData.append("file", data.file[i], "CERTIFICATE@"+data.file[i].name);
						}
						else if(data.fileIDs[i] == 'file1'){
							formData.append("file", data.file[i], "FILE_1@"+data.file[i].name);
						}
						else if(data.fileIDs[i] == 'file2'){
							formData.append("file", data.file[i], "FILE_2@"+data.file[i].name);
						}
						else {
							formData.append("file", data.file[i], "FILE_3@"+data.file[i].name);
						}
					}
				}
                return formData;
            },
					data: {
						fileInfo: vendorprofile,
						file: $scope.files,
						fileIDs: $scope.fileIDs
					}
				}).
				success(function (resp, status, headers, config) {
					console.log(resp);
					console.log(resp.status);
					if (resp.status == "true") {
						$scope.errmsg = true;
						$scope.errmessage = resp.successMessage;
						$scope.files = [];
						$scope.fileIDs = [];
						$http.get(resturl + "/getUser/" + localStorage.loggedInuserId).then(function (resp) {
							console.log(resp);
							$scope.vendorprofile = resp.data.vendorDetails;
							$scope.vendorprofile.country = "India";
							console.log($scope.vendorprofile);
						});
					} else {
						$scope.errmsg = true;
						$scope.errmessage = resp.data.errorMessage;
						$scope.files = [];
						$scope.fileIDs = [];
					}
				}).
				error(function (data, status, headers, config) {
					$location.path('/myaccount');
				});
			};
		}
		/** ARCHITECTS update**/
		else if ($scope.loggedInUserType == "ARCHITECTS") {
			$scope.ArcUpdate = function (vendorprofile) {
				vendorprofile.userType = "ARCHITECTS";
				vendorprofile.companyName = vendorprofile.vendorName
				vendorprofile.contactNumber = vendorprofile.vendorTelephone
				vendorprofile.serviceFax = vendorprofile.vendorFax
				vendorprofile.majorCust = vendorprofile.vendorMajorCust
				vendorprofile.expLine = vendorprofile.vendorExpLine
				vendorprofile.serviceTIN = vendorprofile.vendorTIN
				vendorprofile.license = vendorprofile.vendorLicense
				vendorprofile.servicePAN = vendorprofile.vendorPAN
				vendorprofile.registrationNo = vendorprofile.vendorRegistrationNo
				vendorprofile.companyNature = vendorprofile.vendorCompanyNature
				vendorprofile.constFirm = vendorprofile.vendorConstFirm
				delete vendorprofile.vendorName;
				delete vendorprofile.vendorMobile;
				delete vendorprofile.vendorTelephone;
				delete vendorprofile.vendorFax;
				delete vendorprofile.vendorMajorCust;
				delete vendorprofile.vendorExpLine;
				delete vendorprofile.vendorTIN;
				delete vendorprofile.vendorLicense;
				delete vendorprofile.vendorPAN;
				delete vendorprofile.vendorRegistrationNo;
				delete vendorprofile.vendorCompanyNature;
				delete vendorprofile.vendorName;
				delete vendorprofile.vendorConstFirm;
				delete vendorprofile.vendorOfficeAddress;
				delete vendorprofile.activationURL;
				delete vendorprofile.vendorAuthCert;
				delete vendorprofile.userProfile;
				delete vendorprofile.file1;
				delete vendorprofile.file2;
				delete vendorprofile.file3;
				var architectIdValues = [];
				for (i = 0; i < $scope.architectmodel.length; i++) {
					architectIdValues.push($scope.architectmodel[i].id);
				}
				vendorprofile.architectIds = architectIdValues;
				console.log(vendorprofile);
				
				$http({
					method: 'POST',
					url: resturl + "/user/update",
					headers: {
						'Content-Type': undefined
					},
					transformRequest: function (data) {
						var fileIDs = data.fileIDs;
						var formData = new FormData();
						formData.append("vendorRequest", JSON.stringify(vendorprofile));
						if(data.file.length == 0){
                	formData.append("file",new File([""], "emptyProfileFile.jpg", {type: "image/jpeg"}));
                	formData.append("file",new File([""], "emptycertificateFile.jpg", {type: "image/jpeg"}));
                	formData.append("file",new File([""], "emptyFile1.jpg", {type: "image/jpeg"}));
                	formData.append("file",new File([""], "emptyFile2.jpg", {type: "image/jpeg"}));
                	formData.append("file",new File([""], "emptyFile3.jpg", {type: "image/jpeg"}));
                }
				else {
					for(i=0; i<data.fileIDs.length; i++){
						if(data.fileIDs[i] == 'profilePic'){
							formData.append("file", data.file[i], "USER_PROFILE@"+data.file[i].name);
						}				
						else if(data.fileIDs[i] == 'certificate'){
							formData.append("file", data.file[i], "CERTIFICATE@"+data.file[i].name);
						}
						else if(data.fileIDs[i] == 'file1'){
							formData.append("file", data.file[i], "FILE_1@"+data.file[i].name);
						}
						else if(data.fileIDs[i] == 'file2'){
							formData.append("file", data.file[i], "FILE_2@"+data.file[i].name);
						}
						else {
							formData.append("file", data.file[i], "FILE_3@"+data.file[i].name);
						}
					}
				}
                return formData;
            },
					data: {
						fileInfo: vendorprofile,
						file: $scope.files,
						fileIDs: $scope.fileIDs
					}
				}).
				success(function (resp, status, headers, config) {
					console.log(resp);
					console.log(resp.status);
					$scope.files = [];
					$scope.fileIDs = [];
					if (resp.status == "true") {
						$scope.errmsg = true;
						$scope.errmessage = resp.successMessage;
						$http.get(resturl + "/getUser/" + localStorage.loggedInuserId).then(function (resp) {
							console.log(resp);
							$scope.vendorprofile = resp.data.vendorDetails;
							$scope.vendorprofile.country = "India";
							console.log($scope.vendorprofile);
						});
					} else {
						$scope.errmsg = true;
						$scope.errmessage = resp.data.errorMessage;
					}
				}).
				error(function (data, status, headers, config) {
					$location.path('/myaccount');
				});
			};
		}
		/**MACHINERY & EQUIPMENT update**/
		else if ($scope.loggedInUserType == "MACHINERY & EQUIPMENT") {
			$scope.ArcUpdate = function (vendorprofile) {
				vendorprofile.userType = "MACHINERY & EQUIPMENT";
				vendorprofile.companyName = vendorprofile.vendorName
				vendorprofile.contactNumber = vendorprofile.vendorTelephone
				vendorprofile.serviceFax = vendorprofile.vendorFax
				vendorprofile.majorCust = vendorprofile.vendorMajorCust
				vendorprofile.expLine = vendorprofile.vendorExpLine
				vendorprofile.serviceTIN = vendorprofile.vendorTIN
				vendorprofile.license = vendorprofile.vendorLicense
				vendorprofile.servicePAN = vendorprofile.vendorPAN
				vendorprofile.registrationNo = vendorprofile.vendorRegistrationNo
				vendorprofile.companyNature = vendorprofile.vendorCompanyNature
				vendorprofile.constFirm = vendorprofile.vendorConstFirm
				delete vendorprofile.vendorName;
				delete vendorprofile.vendorMobile;
				delete vendorprofile.vendorTelephone;
				delete vendorprofile.vendorFax;
				delete vendorprofile.vendorMajorCust;
				delete vendorprofile.vendorExpLine;
				delete vendorprofile.vendorTIN;
				delete vendorprofile.vendorLicense;
				delete vendorprofile.vendorPAN;
				delete vendorprofile.vendorRegistrationNo;
				delete vendorprofile.vendorCompanyNature;
				delete vendorprofile.vendorName;
				delete vendorprofile.vendorConstFirm;
				delete vendorprofile.vendorOfficeAddress;
				delete vendorprofile.activationURL;
				delete vendorprofile.vendorAuthCert;
				delete vendorprofile.userProfile;
				delete vendorprofile.file1;
				delete vendorprofile.file2;
				delete vendorprofile.file3;
					var architectIdValues = [];
				for (i = 0; i < $scope.mechinarymodel.length; i++) {
					architectIdValues.push($scope.mechinarymodel[i].id);
				}
				vendorprofile.architectIds = architectIdValues;
				console.log(vendorprofile);
				
				$http({
					method: 'POST',
					url: resturl + "/user/update",
					headers: {
						'Content-Type': undefined
					},
					transformRequest: function (data) {
						var fileIDs = data.fileIDs;
						var formData = new FormData();
						formData.append("vendorRequest", JSON.stringify(vendorprofile));
						if(data.file.length == 0){
                	formData.append("file",new File([""], "emptyProfileFile.jpg", {type: "image/jpeg"}));
                	formData.append("file",new File([""], "emptycertificateFile.jpg", {type: "image/jpeg"}));
                	formData.append("file",new File([""], "emptyFile1.jpg", {type: "image/jpeg"}));
                	formData.append("file",new File([""], "emptyFile2.jpg", {type: "image/jpeg"}));
                	formData.append("file",new File([""], "emptyFile3.jpg", {type: "image/jpeg"}));
                }
				else {
					for(i=0; i<data.fileIDs.length; i++){
						if(data.fileIDs[i] == 'profilePic'){
							formData.append("file", data.file[i], "USER_PROFILE@"+data.file[i].name);
						}				
						else if(data.fileIDs[i] == 'certificate'){
							formData.append("file", data.file[i], "CERTIFICATE@"+data.file[i].name);
						}
						else if(data.fileIDs[i] == 'file1'){
							formData.append("file", data.file[i], "FILE_1@"+data.file[i].name);
						}
						else if(data.fileIDs[i] == 'file2'){
							formData.append("file", data.file[i], "FILE_2@"+data.file[i].name);
						}
						else {
							formData.append("file", data.file[i], "FILE_3@"+data.file[i].name);
						}
					}
				}
                return formData;
            },
					data: {
						fileInfo: vendorprofile,
						file: $scope.files,
						fileIDs: $scope.fileIDs
					}
				}).
				success(function (resp, status, headers, config) {
					console.log(resp);
					console.log(resp.status);
					$scope.files = [];
					$scope.fileIDs = [];
					if (resp.status == "true") {
						$scope.errmsg = true;
						$scope.errmessage = resp.successMessage;
						$http.get(resturl + "/getUser/" + localStorage.loggedInuserId).then(function (resp) {
							console.log(resp);
							$scope.vendorprofile = resp.data.vendorDetails;
							$scope.vendorprofile.country = "India";
							console.log($scope.vendorprofile);
						});
					} else {
						$scope.errmsg = true;
						$scope.errmessage = resp.data.errorMessage;
					}
				}).
				error(function (data, status, headers, config) {
					$location.path('/myaccount');
				});
			};
		}
		/**Wall Paper update**/
		else if ($scope.loggedInUserType == "WALL PAPER") {
			$scope.wallpaperUpdate = function (vendorprofile) {
				vendorprofile.userType = "WALL PAPER";
				vendorprofile.companyName = vendorprofile.vendorName
				vendorprofile.contactNumber = vendorprofile.vendorTelephone
				vendorprofile.serviceFax = vendorprofile.vendorFax
				vendorprofile.majorCust = vendorprofile.vendorMajorCust
				vendorprofile.expLine = vendorprofile.vendorExpLine
				vendorprofile.serviceTIN = vendorprofile.vendorTIN
				vendorprofile.license = vendorprofile.vendorLicense
				vendorprofile.servicePAN = vendorprofile.vendorPAN
				vendorprofile.registrationNo = vendorprofile.vendorRegistrationNo
				vendorprofile.companyNature = vendorprofile.vendorCompanyNature
				vendorprofile.constFirm = vendorprofile.vendorConstFirm
				delete vendorprofile.vendorName;
				delete vendorprofile.vendorMobile;
				delete vendorprofile.vendorTelephone;
				delete vendorprofile.vendorFax;
				delete vendorprofile.vendorMajorCust;
				delete vendorprofile.vendorExpLine;
				delete vendorprofile.vendorTIN;
				delete vendorprofile.vendorLicense;
				delete vendorprofile.vendorPAN;
				delete vendorprofile.vendorRegistrationNo;
				delete vendorprofile.vendorCompanyNature;
				delete vendorprofile.vendorName;
				delete vendorprofile.vendorConstFirm;
				delete vendorprofile.vendorOfficeAddress;
				delete vendorprofile.activationURL;
				delete vendorprofile.vendorAuthCert;
				delete vendorprofile.userProfile;
				delete vendorprofile.file1;
				delete vendorprofile.file2;
				delete vendorprofile.file3;
				var architectIdValues = [];
				for (i = 0; i < $scope.wallmodel.length; i++) {
					architectIdValues.push($scope.wallmodel[i].id);
				}
				vendorprofile.architectIds = architectIdValues;
				console.log(vendorprofile);
			
				$http({
					method: 'POST',
					url: resturl + "/user/update",
					headers: {
						'Content-Type': undefined
					},
					transformRequest: function (data) {
						var fileIDs = data.fileIDs;
						var formData = new FormData();
						formData.append("vendorRequest", JSON.stringify(vendorprofile));
						if(data.file.length == 0){
                	formData.append("file",new File([""], "emptyProfileFile.jpg", {type: "image/jpeg"}));
                	formData.append("file",new File([""], "emptycertificateFile.jpg", {type: "image/jpeg"}));
                	formData.append("file",new File([""], "emptyFile1.jpg", {type: "image/jpeg"}));
                	formData.append("file",new File([""], "emptyFile2.jpg", {type: "image/jpeg"}));
                	formData.append("file",new File([""], "emptyFile3.jpg", {type: "image/jpeg"}));
                }
				else {
					for(i=0; i<data.fileIDs.length; i++){
						if(data.fileIDs[i] == 'profilePic'){
							formData.append("file", data.file[i], "USER_PROFILE@"+data.file[i].name);
						}				
						else if(data.fileIDs[i] == 'certificate'){
							formData.append("file", data.file[i], "CERTIFICATE@"+data.file[i].name);
						}
						else if(data.fileIDs[i] == 'file1'){
							formData.append("file", data.file[i], "FILE_1@"+data.file[i].name);
						}
						else if(data.fileIDs[i] == 'file2'){
							formData.append("file", data.file[i], "FILE_2@"+data.file[i].name);
						}
						else {
							formData.append("file", data.file[i], "FILE_3@"+data.file[i].name);
						}
					}
				}
                return formData;
            },
					data: {
						fileInfo: vendorprofile,
						file: $scope.files,
						fileIDs: $scope.fileIDs
					}
				}).
				success(function (resp, status, headers, config) {
					console.log(resp);
					console.log(resp.status);
					$scope.files = [];
					$scope.fileIDs = [];
					if (resp.status == "true") {
						$scope.errmsg = true;
						$scope.errmessage = resp.successMessage;
						$http.get(resturl + "/getUser/" + localStorage.loggedInuserId).then(function (resp) {
							console.log(resp);
							$scope.vendorprofile = resp.data.vendorDetails;
							$scope.vendorprofile.country = "India";
							console.log($scope.vendorprofile);
						});
					} else {
						$scope.errmsg = true;
						$scope.errmessage = resp.data.errorMessage;
					}
				}).
				error(function (data, status, headers, config) {
					$location.path('/myaccount');
				});
			};
		}
		/** Service Form **/
		else {
			$scope.serviceUpdate = function (vendorprofile) {
				vendorprofile.userType = "SERVICE";
				vendorprofile.companyName = vendorprofile.vendorName
				vendorprofile.contactNumber = vendorprofile.vendorTelephone
				vendorprofile.serviceFax = vendorprofile.vendorFax
				vendorprofile.majorCust = vendorprofile.vendorMajorCust
				vendorprofile.expLine = vendorprofile.vendorExpLine
				vendorprofile.serviceTIN = vendorprofile.vendorTIN
				vendorprofile.license = vendorprofile.vendorLicense
				vendorprofile.servicePAN = vendorprofile.vendorPAN
				vendorprofile.registrationNo = vendorprofile.vendorRegistrationNo
				vendorprofile.companyNature = vendorprofile.vendorCompanyNature
				vendorprofile.constFirm = vendorprofile.vendorConstFirm
				delete vendorprofile.vendorName;
				delete vendorprofile.vendorMobile;
				delete vendorprofile.vendorTelephone;
				delete vendorprofile.vendorFax;
				delete vendorprofile.vendorMajorCust;
				delete vendorprofile.vendorExpLine;
				delete vendorprofile.vendorTIN;
				delete vendorprofile.vendorLicense;
				delete vendorprofile.vendorPAN;
				delete vendorprofile.vendorRegistrationNo;
				delete vendorprofile.vendorCompanyNature;
				delete vendorprofile.vendorName;
				delete vendorprofile.vendorConstFirm;
				delete vendorprofile.activationURL;
				delete vendorprofile.vendorOfficeAddress;
				delete vendorprofile.vendorAuthCert;
				delete vendorprofile.userProfile;
				delete vendorprofile.file1;
				delete vendorprofile.file2;
				delete vendorprofile.file3;
				var serviceIdValues = [];
				for (i = 0; i < $scope.servicesmodel.length; i++) {
					serviceIdValues.push($scope.servicesmodel[i].id);
				}
				vendorprofile.serviceIds = serviceIdValues;
				console.log(vendorprofile);
				$http({
					method: 'POST',
					url: resturl + "/user/update",
					headers: {
						'Content-Type': undefined
					},
					transformRequest: function (data) {
						var fileIDs = data.fileIDs;
						var formData = new FormData();
						formData.append("vendorRequest", JSON.stringify(vendorprofile));
						if(data.file.length == 0){
                	formData.append("file",new File([""], "emptyProfileFile.jpg", {type: "image/jpeg"}));
                	formData.append("file",new File([""], "emptycertificateFile.jpg", {type: "image/jpeg"}));
                	formData.append("file",new File([""], "emptyFile1.jpg", {type: "image/jpeg"}));
                	formData.append("file",new File([""], "emptyFile2.jpg", {type: "image/jpeg"}));
                	formData.append("file",new File([""], "emptyFile3.jpg", {type: "image/jpeg"}));
                }
				else {
					for(i=0; i<data.fileIDs.length; i++){
						if(data.fileIDs[i] == 'profilePic'){
							formData.append("file", data.file[i], "USER_PROFILE@"+data.file[i].name);
						}				
						else if(data.fileIDs[i] == 'certificate'){
							formData.append("file", data.file[i], "CERTIFICATE@"+data.file[i].name);
						}
						else if(data.fileIDs[i] == 'file1'){
							formData.append("file", data.file[i], "FILE_1@"+data.file[i].name);
						}
						else if(data.fileIDs[i] == 'file2'){
							formData.append("file", data.file[i], "FILE_2@"+data.file[i].name);
						}
						else {
							formData.append("file", data.file[i], "FILE_3@"+data.file[i].name);
						}
					}
				}
                return formData;
            },
					data: {
						fileInfo: vendorprofile,
						file: $scope.files,
						fileIDs: $scope.fileIDs
					}
				}).
				success(function (resp, status, headers, config) {
					console.log(resp);
					console.log(resp.status);
					$scope.files = [];
					$scope.fileIDs = [];
					if (resp.status == "true") {
						$scope.errmsg = true;
						$scope.errmessage = resp.successMessage;
						$http.get(resturl + "/getUser/" + localStorage.loggedInuserId).then(function (resp) {
							console.log(resp);
							$scope.vendorprofile = resp.data.serviceDetails;
							$scope.vendorprofile.country = "India";
							console.log($scope.vendorprofile);
						});
					} else {
						$scope.errmsg = true;
						$scope.errmessage = resp.data.errorMessage;
					}
				}).
				error(function (data, status, headers, config) {
					$location.path('/myaccount');
				});
			};
		}
		
		// Profiles Updates Ends //
		
		// Architects Portfolio Complete Functionality Starts //
		// Retrieval Starts //
		var reqObj = {
		"vendorId": $scope.loggedInuserId,
		"status" :"ALL"
					};
		$http.post(resturl + "/getUserArchitectsPortfolio?"+ "pageNumber=1&pageSize=5", reqObj).then(function (resp) {
			console.log(resp);
			$scope.arcrecently = resp.data.responseData;
			$scope.totalCount=resp.data.paginationData.totalCount;
			$scope.descript = resp.data;
		});
		$scope.page = 1;
					$scope.PagingAct = function(page, pageSize, total) {
							var reqObj = {
		"vendorId": $scope.loggedInuserId,
		"status" :"ALL"
					};
					$http.post(resturl+"/getUserArchitectsPortfolio?"+ "pageNumber="+page+"&pageSize=5", reqObj).then(function (resp) {
						console.log(resp);
						$scope.arcrecently = resp.data.responseData;
						$scope.totalCount=resp.data.paginationData.totalCount;
					});
					}
		// Retrieval Ends //
		
		$scope.portfolioImagesFun = function (portfolioImages) {
			var request = {
				portfolioName: portfolioImages.portfolioName,
				vendorId: $scope.loggedInuserId
			};
			console.log(request);
			$http({
					method: 'POST',
					url: resturl + "/addArchitectsPortfolio",
					headers: {
						'Content-Type': undefined
					},
					transformRequest: function (data) {
						var formData = new FormData();
						formData.append("architectsRequest", JSON.stringify(request));
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
						fileInfo: request,
						file: $scope.files
					}
				})
				.success(function (resp, status, headers, config) {
					console.log(resp);
					console.log(resp.status);
					$scope.files = [];
					if (resp.status == true) {
						$scope.successmessage = resp.successMessage;
						$('.successPopup').modal('show');
					} else {
						$scope.errmessage = resp.errorMessage;
						$('.errorPopup').modal('show');
					}
					var reqObj = {
						"vendorId": $scope.loggedInuserId, 
						"status" :"ALL"
					}
					$http.post(resturl+"/getUserArchitectsPortfolio?"+ "&pageNumber=1&pageSize=5", reqObj).then(function (resp) {
						console.log(resp);
						$scope.arcrecently = resp.data.responseData;
						$scope.totalCount=resp.data.paginationData.totalCount;
					});
					
					
					
				}).error(function (data, status, headers, config) {});
		};
		
		// Popup Information ARc Retrieval Function //
		$scope.portfolioDetailsFun = function (archtectImages) {
			$scope.viewPortfolio = {
				imageURL: archtectImages.imageURL,
				portfolioId: archtectImages.architectPortfolioId,
				portfolioName: archtectImages.portfolioName
			};
		}

		// Portfolio architects Update Service Call Starts //
		$scope.files = [];
		$scope.$on("seletedFile", function (event, args) {
			$scope.$apply(function () {
				//add the file object to the scope's files collection
				$scope.files.push(args.file);
			});
		});

		$scope.updatePortImg = function (viewPortfolio) {
			var request = {
				portfolioId: viewPortfolio.portfolioId,
				vendorId: $scope.loggedInuserId,
				portfolioName: viewPortfolio.portfolioName
			};
			console.log(request);
			$http({
					method: 'POST',
					url: resturl + "/updateArchitectsPortfolio",
					headers: {
						'Content-Type': undefined
					},
					transformRequest: function (data) {
						var formData = new FormData();
						formData.append("architectsRequest", JSON.stringify(request));
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
						fileInfo: request,
						file: $scope.files
					}
				})
				.success(function (resp, status, headers, config) {
					$('.architectPopup').modal('hide');
					console.log(resp);
					console.log(resp.status);
					$scope.files = [];
					if (resp.status = true) {
						$scope.successmessage = resp.successMessage;
						$('.successPopup').modal('show');
					} else {
						$scope.errmessage = resp.errorMessage;
						$('.errorPopup').modal('show');
					}
					var reqObj = {
					

						"vendorId": $scope.loggedInuserId,
						"status" :"ALL"
					};
					$http.post(resturl+"/getUserArchitectsPortfolio",reqObj).then(function (resp) {
						console.log(resp);
						$scope.arcrecently = resp.data.responseData;
						$scope.totalCount=resp.data.paginationData.totalCount;
					});
				})
				.error(function (data, status, headers, config) {

				});
							
		}
		// Architect Portfolio Update Ends //
		
		// Delete Portfolio Confirm Popup //
		$scope.deleteProtImg = function(viewPortfolio){
			
		
			console.log(viewPortfolio);
			var reqObj = {
				portfolioId: viewPortfolio.portfolioId
			}
			$http.post(resturl + "/deleteArchitectsPortfolio", reqObj).then(function (resp) {
				console.log(resp);
				if(resp.data.status == true){
					$scope.successmessage = resp.data.successMessage;
					$('.successPopup').modal('show');
				}
				else{
					$scope.errmessage = resp.data.errorMessage;
					$('.errorPopup').modal('hide');
				}
				var reqObj = {
						"vendorId": $scope.loggedInuserId,
						"status" :"ALL"
					};
				$http.post(resturl + "/getUserArchitectsPortfolio", reqObj).then(function (resp) {
					console.log(resp);
					$scope.arcrecently = resp.data.vendorPortfolioList;
					$scope.totalCount=resp.data.paginationData.totalCount;
				});
			});
		}
		
		// Delete Architecture Portfolio Ends //
		
		// Architecture Retrieval, Upload, Update & Deletion Ends//
		
			$('.mechpic').change(function() {
        var filename = $('.mechpic')[0].files[0].name;
        $('#mechpicselect_file').html(filename);		
    });
		
		
		
		//mechinory retrival popup//
		$scope.mechDetailsFun = function (mechImages) {
			$scope.viewmechPortfolio = {
				imageURL: mechImages.imageURL,
				portfolioId: mechImages.machineryPortfolioId,
				portfolioName: mechImages.portfolioName
			};
		}
		
		
	
		
		
		
		
		/** mechinary portfolio **/
var reqObj = {
		"vendorId": $scope.loggedInuserId,
		"status" :"ALL"
					};
		$http.post(resturl + "/getUserMachineryPortfolio?"+ "pageNumber=1&pageSize=5", reqObj).then(function (resp) {
			console.log(resp);
			$scope.mechinaryuprecently = resp.data.responseData;
			$scope.totalCount=resp.data.paginationData.totalCount;
			$scope.descript = resp.data;
		});
		$scope.page = 1;
					$scope.PagingAct = function(page, pageSize, total) {
							var reqObj = {
		"vendorId": $scope.loggedInuserId,
		"status" :"ALL"
					};
					$http.post(resturl+"/getUserMachineryPortfolio?"+ "pageNumber="+page+"&pageSize=5", reqObj).then(function (resp) {
						console.log(resp);
						$scope.mechinaryuprecently = resp.data.responseData;
						$scope.totalCount=resp.data.paginationData.totalCount;
					});
					}
		
		
		$scope.mechineryFormImagesFun = function (mechineryFormportfolioImages) {
			var request = {
				portfolioName: mechineryFormportfolioImages.portfolioName,
				equipmentName: mechineryFormportfolioImages.equipmentName,
				equipmentPrice: mechineryFormportfolioImages.equipmentPrice,
				hiringType: mechineryFormportfolioImages.hiringType,
				vendorId: $scope.loggedInuserId
			};
			console.log(request);
			$http({
					method: 'POST',
					url: resturl + "/addMachineryPortfolio",
					headers: {
						'Content-Type': undefined
					},
					transformRequest: function (data) {
						var formData = new FormData();
						formData.append("machineryRequest", JSON.stringify(request));
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
						fileInfo: request,
						file: $scope.files
					}
				})
				.success(function (resp, status, headers, config) {
					console.log(resp);
					console.log(resp.status);
					$scope.files = [];

					if (resp.status = true) {
						$scope.successmessage = resp.successMessage;
						$('.successPopup').modal('show');
					} else {
						$scope.errmessage = resp.errorMessage;
						$('.errorPopup').modal('show');
					}

var reqObj = {
						"vendorId": $scope.loggedInuserId,
						"status" :"ALL"
					};
		$http.post(resturl + "/getUserMachineryPortfolio?"+ "pageNumber=1&pageSize=5", reqObj).then(function (resp) {
			console.log(resp);
			$scope.mechinaryuprecently = resp.data.responseData;
			$scope.totalCount=resp.data.paginationData.totalCount;
		});
		$scope.page = 1;
					$scope.PagingAct = function(page, pageSize, total) {
							var reqObj = {
		"vendorId": $scope.loggedInuserId,
		"status" :"ALL"
					};
					$http.post(resturl+"/getUserMachineryPortfolio?"+ "pageNumber="+page+"&pageSize=5", reqObj).then(function (resp) {
						console.log(resp);
						$scope.mechinaryuprecently = resp.data.responseData;
						$scope.totalCount=resp.data.paginationData.totalCount;
					});
					}
				}).error(function (data, status, headers, config) {

				});
		};
		// Portfolio mechinory Update Service Call Starts //
		
	
		$scope.files = [];
		$scope.$on("seletedFile", function (event, args) {
			$scope.$apply(function () {
				//add the file object to the scope's files collection
				$scope.files.push(args.file);
			});
		});
// update portfolio machinary
$scope.mechDetailsFun = function (mechImages) {
			$scope.viewmechPortfolio = {
				imageURL: mechImages.imageURL,
				portfolioId: mechImages.machineryPortfolioId,
				portfolioName: mechImages.portfolioName
			};
		}
		$scope.updatemechPortImg = function (viewmechPortfolio) {
			var request = {
				portfolioId: viewmechPortfolio.portfolioId,
				vendorId: $scope.loggedInuserId,
				portfolioName: viewmechPortfolio.portfolioName
			};
			console.log(request);
			$http({
					method: 'POST',
					url: resturl + "/updateMachineryPortfolio",
					headers: {
						'Content-Type': undefined
					},
					transformRequest: function (data) {
						var formData = new FormData();
						formData.append("machineryRequest", JSON.stringify(request));
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
						fileInfo: request,
						file: $scope.files
					}
				})
				.success(function (resp, status, headers, config) {
					console.log(resp);
					console.log(resp.status);
					$scope.files = [];
					$scope.errmsg = true;
					if (resp.status = true) {
						$scope.successmsg = resp.successMessage;
                          $('.successmechPopup').modal('show');
                                 }
                              else{
                           $scope.failuremsg = resp.errorMessage;
                                $('.errormechPopup').modal('show');
                                }
				})
				.error(function (data, status, headers, config) {

				});
		}
		/**mechinary Delete **/
		var reqObj = {
						"vendorId": $scope.loggedInuserId,
						"status" :"ALL"
					};
		$http.post(resturl + "/getUserMachineryPortfolio", reqObj).then(function (resp) {
			console.log(resp);
			$scope.mechinaryuprecently = resp.data.responseData;
		});

		$scope.mechportdel = function (viewmechPortfolio) {
             $('.mechPopup').modal('hide');
			 $('.confirmDelmechPopup').modal('show');
		 }
			 $scope.confirmDelete = function (viewmechPortfolio) {
			 $('.confirmDelmechPopup').modal('hide');
		
			var reqObj = {
				"portfolioId": viewmechPortfolio.portfolioId
			}
			$http.post(resturl + "/deleteMachineryPortfolio", reqObj).then(function (resp) {
				console.log(resp);
				if(resp.data.status == true){
					$scope.successmessage = resp.data.successMessage;
					$('.successmechPopup').modal('show');
				}
				else{
					$scope.errmessage = resp.data.errorMessage;
					$('.errormechPopup').modal('hide');
				}
			});
			var reqObj = {
						"vendorId": $scope.loggedInuserId,
						"status" :"ALL"
					};
			$http.post(resturl + "/getUserMachineryPortfolio", reqObj).then(function (resp) {
				console.log(resp);
				$scope.recently = resp.data.responseData;
			});
		};
		
		/**Wallpaper portfolio **/
var reqObj = {
		"vendorId": $scope.loggedInuserId,
		"status" :"ALL"
					};
		$http.post(resturl + "/getUserWallPaperPortfolio?"+ "pageNumber=1&pageSize=5", reqObj).then(function (resp) {
			console.log(resp);
			$scope.wallpaperresp = resp.data.responseData;
			$scope.waltotalCount=resp.data.paginationData.totalCount;
			$scope.descript = resp.data;
		});
		$scope.page = 1;
					$scope.walPagingAct = function(page, pageSize, total) {
							var reqObj = {
		"vendorId": $scope.loggedInuserId,
		"status" :"ALL"
					};
					$http.post(resturl+"/getUserWallPaperPortfolio?"+ "pageNumber="+page+"&pageSize=5", reqObj).then(function (resp) {
						console.log(resp);
						$scope.wallpaperresp = resp.data.responseData;
						$scope.waltotalCount=resp.data.paginationData.totalCount;
					});
					}
		
		
		
		
		$scope.walportfolioImagesFun = function (portfolioImages) {
			if(portfolioImages.price == undefined ){
				portfolioImages.price = "0";

			}
			console.log(portfolioImages.price);
			var request = {
				portfolioName: portfolioImages.portfolioName,
				brand: portfolioImages.brand,
				thickness: portfolioImages.thickness,
				size: portfolioImages.size,
				price: portfolioImages.price,
				vendorId: $scope.loggedInuserId
			};
			console.log(request);
			$http({
					method: 'POST',
					url: resturl + "/addWallPaperPortfolio",
					headers: {
						'Content-Type': undefined
					},
					transformRequest: function (data) {
						var formData = new FormData();
						formData.append("wallPaperRequest", JSON.stringify(request));
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
						fileInfo: request,
						file: $scope.files
					}
				})
				.success(function (resp, status, headers, config) {
					console.log(resp);
					console.log(resp.status);
					$scope.files = [];

					if (resp.status = true) {
						$scope.successmsg = resp.successMessage;
                          $('.successmechPopup').modal('show');
                                 }
                              else{
                           $scope.failuremsg = resp.errorMessage;
                                $('.errormechPopup').modal('show');
                                }
var reqObj = {
		"vendorId": $scope.loggedInuserId,
		"status" :"ALL"
					};
		$http.post(resturl + "/getUserWallPaperPortfolio?"+ "pageNumber=1&pageSize=5", reqObj).then(function (resp) {
			console.log(resp);
			$scope.wallpaperresp = resp.data.responseData;
			$scope.waltotalCount=resp.data.paginationData.totalCount;
			$scope.descript = resp.data;
		});
	
				}).error(function (data, status, headers, config) {

				});

		};

		/**wallpaper Delete **/
		var reqObj = {
			"vendorId": $scope.loggedInuserId
		};
		$http.post(resturl + "/getUserWallPaperPortfolio", reqObj).then(function (resp) {
			console.log(resp);
			$scope.wallrecently = resp.data.responseData;
		});

		$scope.waldeleteProd = function (wallpopPortfolio) {
          //$('.wallpaperPopup').modal('hide');
		//	$('.confirmDelmechPopup').modal('show');
		
			//$scope.confirmDelete = function (wallpopPortfolio) {
			//$('.confirmDelmechPopup').modal('hide');
			
			var reqObj = {
				"portfolioId": wallpopPortfolio.portfolioId
			}
			$http.post(resturl + "/deleteWallPaperPortfolio", reqObj).then(function (resp) {
				console.log(resp);
					if(resp.data.status == true){
					$scope.successmessage = resp.data.successMessage;
					$('.successPopup').modal('show');
				}
				else{
					$scope.errmessage = resp.data.errorMessage;
					$('.errorPopup').modal('hide');
				}
			});
			var reqObj = {
			"vendorId": $scope.loggedInuserId
		};
		$http.post(resturl + "/getUserWallPaperPortfolio", reqObj).then(function (resp) {
			console.log(resp);
			$scope.wallrecently = resp.data.responseData;
		});
		};
			// Wall paper update//
			
		$('.vendorpic').change(function() {
        var filename = $('.vendorpic')[0].files[0].name;
        $('#vendorpicselect_file').html(filename);		
    });
			

		$http.post(resturl + "/getUserWallPaperPortfolio", reqObj).then(function (resp) {
			console.log(resp);
			$scope.wallrecently = resp.data.responseData;
		});
		
		$('.walpic').change(function() {
        var filename = $('.waipaperpic')[0].files[0].name;
        $('#wallpicselect_file').html(filename);		
    });
		
		
		$scope.files = [];
		$scope.$on("seletedFile", function (event, args) {
			$scope.$apply(function () {
				//add the file object to the scope's files collection
				$scope.files.push(args.file);
			});
		});
$scope.portfolioDetailswalFun = function (wallImages) {
			$scope.wallpopPortfolio = {
				imageURL: wallImages.imageURL,
				portfolioId: wallImages.portfolioId,
				portfolioName: wallImages.portfolioName
			};
		}
		$scope.updatedwalpaperImg = function (wallpopPortfolio) {
			var request = {
				portfolioId: wallpopPortfolio.portfolioId,
				vendorId: $scope.loggedInuserId,
				portfolioName:wallpopPortfolio .portfolioName
			};
			console.log(request);
			$http({
					method: 'POST',
					url: resturl + "/updateWallPaperPortfolio",
					headers: {
						'Content-Type': undefined
					},
					transformRequest: function (data) {
						var formData = new FormData();
						formData.append("wallPaperRequest", JSON.stringify(request));
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
						fileInfo: request,
						file: $scope.files
					}
				})
				.success(function (resp, status, headers, config) {
					console.log(resp);
					console.log(resp.status);
					$scope.files = [];
					$scope.errmsg = true;
					if (resp.status = true) {
						$scope.successmsg = resp.successMessage;
                          $('.successmechPopup').modal('show');
                                 }
                              else{
                           $scope.failuremsg = resp.errorMessage;
                                $('.errormechPopup').modal('show');
                                }
				})
				.error(function (data, status, headers, config) {

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