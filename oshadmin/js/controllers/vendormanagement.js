angular.module('newapp')
.controller('vendorManagementCtrl', function ($scope, $http, $location, $window, resturl) {
	
//1st Tab - Register A Vendor Starts //
	// Options To Select Services or Architects Types //
	$scope.example8model = [];
	$scope.example8settings = {
		checkBoxes: true,
		enableSearch: true
	};
	$scope.fileOptions = [
		{ name: 'Certificate', value: 'certificate' },
		{ name: 'File 1', value: 'file1' },
		{ name: 'File 2', value: 'file2' },
		{ name: 'File 3', value: 'file3' }
	];
	
	// On Change of Constitution Of Firm //
	$scope.constitutionchange = function (param) {
		if (param == "Services") {
			$scope.example8model =[];
			$http.get(resturl+"/services").then(function (resp) {
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
			});
		}
		else if(param == "Architects"){
			$scope.example8model =[];
			var architectReq = {
				searchString : "Architects"
			};
			$http.post(resturl+"/getCategoriesForCat", architectReq).then(function(resp){
				console.log(resp);
				$scope.archtectData = angular.copy(resp.data.categoryData);
				var architectArray = $scope.archtectData[0].subCategory;
				for(var i = 0; i < architectArray.length; i++) {
					delete architectArray[i]['type'];
					architectArray[i].label = architectArray[i]['title']
					delete architectArray[i]['title'];
				}
				$scope.Architectdata = architectArray;
			});
		}
		else if(param == "WallPaper"){
			$scope.example8model =[];
			var wallpaperReq = {
				searchString : "WALL PAPER"
			};
			$http.post(resturl+"/getCategoriesForCat", wallpaperReq).then(function(resp){
				console.log(resp);
				$scope.wallpaperData = angular.copy(resp.data.categoryData);
				var wallpaperArray = $scope.wallpaperData[0].subCategory;
				for(var i = 0; i < wallpaperArray.length; i++) {
					delete wallpaperArray[i]['type'];
					wallpaperArray[i].label = wallpaperArray[i]['title']
					delete wallpaperArray[i]['title'];
				}
				$scope.wallpaperdata = wallpaperArray;
			});
		}
		else if(param == "Machinery"){
			$scope.example8model =[];
			var machEquipReq = {
				searchString : "MACHINERY & EQUIPMENT"
			};
			$http.post(resturl+"/getCategoriesForCat", machEquipReq).then(function(resp){
				console.log(resp);
				$scope.machineryData = angular.copy(resp.data.categoryData);
				var machineryArray = $scope.machineryData[0].subCategory;
				for(var i = 0; i < machineryArray.length; i++) {
					delete machineryArray[i]['type'];
					machineryArray[i].label = machineryArray[i]['title']
					delete machineryArray[i]['title'];
				}
				$scope.machinerydata = machineryArray;
			});
		}
	}
	
	// Vendor Registration API Call //
	$scope.regvendor = function (vendor) {
		vendor.userType = "VENDOR";
		$scope.vendor.country = "India";
		vendor.constFirm = vendor.vendorConstFirm;
		delete vendor.vendorConstFirm;
		console.log(vendor)
		registerapi(vendor);
	}
	// Architect Registration API Call //
	$scope.Arcvendor = function (Architects) {
		Architects.userType = "ARCHITECTS";
		$scope.vendor.country = "India";
		Architects.constFirm = Architects.vendorConstFirm;
		delete Architects.vendorConstFirm;
		var temparr = [];
		for (i = 0; i < $scope.example8model.length; i++) {
			temparr.push($scope.example8model[i].id);
		}
		Architects.architectIds = temparr;
		console.log(Architects)
		registerapi(Architects);
	}
	// Machinery & Equipment Vendor Registration API Call //
	$scope.Machineryvendor = function (Machinery) {
		Machinery.userType = "MACHINERY & EQUIPMENT";
		$scope.vendor.country = "India";
		Machinery.constFirm = Machinery.vendorConstFirm;
		delete Machinery.vendorConstFirm;
		var temparr = [];
		for (i = 0; i < $scope.example8model.length; i++) {
			temparr.push($scope.example8model[i].id);
		}
		Machinery.architectIds = temparr;
		console.log(Machinery)
		registerapi(Machinery);
	}
	// WallPaper Registration API Call //
	$scope.wallpapervendor = function (Wallpaper) {
		Wallpaper.userType = "WALL PAPER";
		$scope.vendor.country = "India";
		Wallpaper.constFirm = Wallpaper.vendorConstFirm;
		delete Wallpaper.vendorConstFirm;
			var temparr = [];
		for (i = 0; i < $scope.example8model.length; i++) {
			temparr.push($scope.example8model[i].id);
		}
		Wallpaper.architectIds = temparr;
		console.log(Wallpaper)
		registerapi(Wallpaper);
	}
	// Service Provider Registration API Call //
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

	// Resistration API Call //
	function registerapi(vendor) {
		console.log(vendor);
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
						formData.append("file", data.file[i]);
					}
				}
				return formData;
			},
			data: {
				fileInfo: vendor,
				file: $scope.files
			}
		})
		.success(function (resp, status, headers, config) {
			console.log(resp);
			if (resp.status == "true") {
				}
			else {
				
			}
		}).error(function (data, status, headers, config) {
	});
	};
	
	// Vendor Resistration Ends //
//1st Tab - Register A Vendor Ended //
	
// 2nd Tab - Registered Vendors //
	// Registered Vendors Listing Starts //
	$scope.options = [
		{ name: 'Pending', status: '0' },
		{ name: 'Approved', status: '1' },
		{ name: 'All', status: 'ALL' }
	];
	$scope.limits = [
		{ count: '10', value: '10' },
		{ count: '20', value: '20' },
		{ count: '50', value: '50' },
		{ count: '100', value: '100'}
	];
	$scope.vendorNames = [
		{ vendor: 'Product Vendors', value: '1' },
		{ vendor: 'Service Provider', value: '2' },
		{ vendor: 'Architects', value: '3'},
		{ vendor: 'WallPaper Vendors', value: '4'},
		{ vendor: 'Machinery & Equipment', value: '5'},
		{ vendor: 'All', value: 'ALL'}
	];
	$scope.searchBy = [
		{type: 'Vendor Name', value: 'VENDOR_NAME'},
		{type: 'Vendor Id', value: 'VENDOR_ID'}
	];
	// Default API Calling To Get Registered Vendors //	
	
	var request = {
		status : "0",
		customerType : "1"
	};
	
	$scope.pending = true;
	$scope.pageCount = 10;
	$http.post(resturl+"/getVendorForAdmin?pageNumber=1&pageSize="+$scope.pageCount, request).then(function(resp){
		console.log(resp);
		$scope.vendorsCount = resp.data.paginationData.totalCount;
		$scope.registerVendorsGrid.data = resp.data.responseData;
	});
	
	$scope.vendorListPaging = function(page, pageSize, total){
		$http.post(resturl+"/getVendorForAdmin?pageNumber="+page+"&pageSize="+pageSize, request).then(function(resp){
			console.log(resp);
			$scope.vendorsCount = resp.data.paginationData.totalCount;
			$scope.registerVendorsGrid.data = resp.data.responseData;
		});
	}
	
	/* Vendor Search API Call */
	$scope.getVendorByRegistration = function(searchType){
		if(searchType.value == "VENDOR_NAME"){
			var searchString = searchType.name
		}
		else {
			var searchString = searchType.id
		}
		var searchRequest = {
			searchFor : "REGISTERED_VENDOR",
			searchString : searchString,
			searchType : searchType.value
		}
		console.log(searchRequest);
		$http.post(resturl+"/vendorSearchForAdmin?pageNumber=1&pageSize=10", searchRequest).then(function(resp){
			console.log(resp);
			$scope.vendorsCount = resp.data.paginationData.totalCount;
			$scope.registerVendorsGrid.data = resp.data.responseData;
		});
	}
	
	/* Filter Based on Status Value */
	$scope.getVendorByType = function(status, vendor){
		console.log(status, vendor);
		var payload = {
			status : status,
			customerType : vendor
		}
		if(status == "0"){
			$scope.pending = true;
			$scope.approved = false;
			$scope.allVendors = false;
		}
		else if(status == "1"){
			$scope.pending = false;
			$scope.approved = true;
			$scope.allVendors = false;
		}
		else {
			$scope.pending = false;
			$scope.approved = false;
			$scope.allVendors = true;
		}
		$http.post(resturl+"/getVendorForAdmin?pageNumber=1&pageSize="+$scope.pageCount, payload).then(function(resp){
			console.log(resp);
			$scope.vendorsCount = resp.data.paginationData.totalCount;
			$scope.registerVendorsGrid.data = resp.data.responseData;
		});
		$scope.vendorListPaging = function(page, pageSize, total, status, value){
			var request = {
				status : status,
				customerType : value
			};
			console.log(request);
			$http.post(resturl+"/getVendorForAdmin?pageNumber="+page+"&pageSize="+$scope.pageCount, request).then(function(resp){
				console.log(resp);
				$scope.vendorsCount = resp.data.paginationData.totalCount;
				$scope.registerVendorsGrid.data = resp.data.responseData;
			});
		}
	};
	
	$scope.vendorsByCount = function(status, value, count){
		console.log(status, value, count);
		var request = {
			status : status,
			customerType : value
		};
		$http.post(resturl+"/getVendorForAdmin?pageNumber=1&pageSize="+count, request).then(function(resp){
			console.log(resp);
			$scope.vendorsCount = resp.data.paginationData.totalCount;
			$scope.registerVendorsGrid.data = resp.data.responseData;
		});
		$scope.vendorListPaging = function(page, pageSize, total, status, value){
			var request = {
				status : status,
				customerType : value
			};	
			$http.post(resturl+"/getVendorForAdmin?pageNumber="+page+"&pageSize="+count, request).then(function(resp){
				console.log(resp);
				$scope.vendorsCount = resp.data.paginationData.totalCount;
				$scope.registerVendorsGrid.data = resp.data.responseData;
			});
			$scope.pageCount = count;
		}
		$scope.pageCount = count;
	}
	
	$scope.registerVendorsGrid = {};
	$scope.registerVendorsGrid.columnDefs=[
	{name: 'vendorId', width: 140},
	{name: 'vendorName', displayName: 'Vendor'},
	{name: 'vendorType'},
	{name: 'status'},
	{name: 'Actions', width: 110, enableSorting:false, enableFiltering: false,
		cellTemplate: '<div class="text-center ui-grid-cell-contents"><button class="btn btn-primary"  ng-click="grid.appScope.vendorDetails(row)">Details</button></div>'
	}];
	$scope.servicessettings = {
		checkBoxes: true,
		enableSearch: true
	};
	$http.get(resturl+"/services").then(function (resp) {
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
	
	$scope.architectsettings = {
		checkBoxes: true,
		enableSearch: true
	};
	var architectReq = {
		searchString : "Architects"
	};
	$http.post(resturl+"/getCategoriesForCat", architectReq).then(function(resp){
		console.log(resp);
		$scope.archtectData = angular.copy(resp.data.categoryData);
		var architectArray = $scope.archtectData[0].subCategory;
		for(var i = 0; i < architectArray.length; i++) {
			delete architectArray[i]['type'];
			architectArray[i].label = architectArray[i]['title']
			delete architectArray[i]['title'];
		}
		$scope.Architectdata = architectArray;
	});
	
	$scope.wallpapersettings = {
		checkBoxes: true,
		enableSearch: true
	};
	var wallpaperReq = {
		searchString : "WALL PAPER"
	};
	$http.post(resturl+"/getCategoriesForCat", wallpaperReq).then(function(resp){
		console.log(resp);
		$scope.wallpaperData = angular.copy(resp.data.categoryData);
		var wallpaperArray = $scope.wallpaperData[0].subCategory;	
		console.log( wallpaperArray);
		for(var i = 0; i < wallpaperArray.length; i++) {
			delete wallpaperArray[i]['type'];
			wallpaperArray[i].label = wallpaperArray[i]['title']
			delete wallpaperArray[i]['title'];
			$scope.wallpaperdata = wallpaperArray;
			console.log($scope.wallpaperdata);
		}
	});
	
	$scope.machinerysettings = {
		checkBoxes: true,
		enableSearch: true
	};
	var machEquipReq = {
		searchString : "MACHINERY & EQUIPMENT"
	};
	$http.post(resturl+"/getCategoriesForCat", machEquipReq).then(function(resp){
		console.log(resp);
		$scope.machineryData = angular.copy(resp.data.categoryData);
		var machineryArray = $scope.machineryData[0].subCategory;
		for(var i = 0; i < machineryArray.length; i++) {
			delete machineryArray[i]['type'];
			machineryArray[i].label = machineryArray[i]['title']
			delete machineryArray[i]['title'];
		}
		$scope.machinerydata = machineryArray;
	});
	
	$scope.vendorDetails = function(row){
		$http.get(resturl+"/getUser/"+row.entity.vendorId).then(function(resp){
			if(row.entity.vendorType == "Service Provider"){
				$scope.serviceSelectDiv = true;
				$scope.architectSelectDiv = false;
				$scope.wallpaperSelectDiv = false;
				$scope.machinerySelectDiv = false;
				$scope.vendorProfile = resp.data.serviceDetails;
				$scope.vendorProfile.vendorId = row.entity.vendorId;
				$scope.vendorProfile.vendorType = row.entity.vendorType;
				$scope.vendorProfile.country = "India";
				$scope.showCertificate = true;
				$scope.hideUploadBtn = true;
					$scope.servicesmodel = [];
					$scope.selectedIds = [];
					for (i = 0; i < resp.data.serviceDetails.serviceIds.length; i++) {
						var num = resp.data.serviceDetails.serviceIds[i];
						$scope.selectedIds.push($scope.servicesdata[num]);
					}
					$scope.servicesmodel = $scope.selectedIds;
				}
			else if(row.entity.vendorType == "Architects"){
					$scope.architectSelectDiv = true;
					$scope.serviceSelectDiv = false;
					$scope.wallpaperSelectDiv = false;
					$scope.machinerySelectDiv = false;
					$scope.vendorProfile = resp.data.vendorDetails;
					$scope.vendorProfile.vendorId = row.entity.vendorId;
					$scope.vendorProfile.vendorType = row.entity.vendorType;
					$scope.vendorProfile.country = "India";
					$scope.showCertificate = true;
					$scope.hideUploadBtn = true;
					$scope.architectmodel = [];
					$scope.architectIds = [];
					for (i = 0; i < resp.data.vendorDetails.architectIds.length; i++) {
						$scope.architectIds.push($scope.Architectdata[i]);
						//$scope.architectIds.push($scope.Architectdata[num]);
					}
					$scope.architectmodel = $scope.architectIds;
				}
			else if(row.entity.vendorType == "WallPaper Vendors"){
					$scope.wallpaperSelectDiv = true;
					$scope.architectSelectDiv = false;
					$scope.serviceSelectDiv = false;
					$scope.machinerySelectDiv = false;
					$scope.vendorProfile = resp.data.vendorDetails;
					$scope.vendorProfile.vendorId = row.entity.vendorId;
					$scope.vendorProfile.vendorType = row.entity.vendorType;
					$scope.vendorProfile.country = "India";
					$scope.showCertificate = true;
					$scope.hideUploadBtn = true;
					$scope.wallpapermodel = [];
				$scope.architectIds = [];
				for (i = 0; i < resp.data.vendorDetails.architectIds.length; i++) {
					$scope.architectIds.push($scope.wallpaperdata[i]);
					
				}
					$scope.wallpapermodel = $scope.architectIds;
					
				}
			else if(row.entity.vendorType == "Machinery & Equipment"){
					$scope.machinerySelectDiv = true;
					$scope.serviceSelectDiv = false;
					$scope.wallpaperSelectDiv = false;
					$scope.architectSelectDiv = false;
					$scope.vendorProfile = resp.data.vendorDetails;
					$scope.vendorProfile.vendorId = row.entity.vendorId;
					$scope.vendorProfile.vendorType = row.entity.vendorType;
					$scope.vendorProfile.country = "India";
					$scope.showCertificate = true;
					$scope.hideUploadBtn = true;
					$scope.machinerymodel = [];
					$scope.architectIds = [];
				for (i = 0; i < resp.data.vendorDetails.architectIds.length; i++) {
						$scope.architectIds.push($scope.machinerydata[i]);
						//$scope.architectIds.push($scope.machinerydata[num]);
					}
					$scope.machinerymodel = $scope.architectIds;
				}
			else {
				$scope.machinerySelectDiv = false;
				$scope.serviceSelectDiv = false;
				$scope.wallpaperSelectDiv = false;
				$scope.architectSelectDiv = false;
				$scope.vendorProfile = resp.data.vendorDetails;
				console.log($scope.vendorProfile);
				$scope.vendorProfile.vendorId = row.entity.vendorId;
				$scope.vendorProfile.vendorType = row.entity.vendorType;
				$scope.vendorProfile.country = "India";
				$scope.showCertificate = true;
				$scope.noCertificate = false;
				$scope.hideUploadBtn = true;
			}
			if($scope.vendorProfile.vendorAuthCert == null || $scope.vendorProfile.vendorAuthCert == ""){
				console.log($scope.vendorProfile.vendorAuthCert);
				$scope.showCertificate = false;
				$scope.noCertificate = true;
			}
			if(row.entity.status == "Pending for Approval"){
				$scope.hideUploadBtn = false;
			}
			if(resp.status = "200"){
				$('.vendorDetailsPopup').modal('show');
			}
		});
		$scope.showApprove = false;
		$scope.showUpdate = true;
		if(row.entity.status == "Pending for Approval"){
			$scope.showApprove = true;
			$scope.showUpdate = false;
		}
	}
	
	// Approve Vendor Service //
	$scope.approveVendor = function(vendorProfile, status, vendor, count){
		$('.vendorDetailsPopup').modal('hide');
		var request = {
			status : "Approved",
			vendorId : vendorProfile.vendorId
		};
		$http.post(resturl+"/approveVendorByAdmin", request).then(function(resp){
			console.log(resp);
			if(resp.data.status == "true"){
				$scope.success = resp.data.successMessage;
				$('.successPopup').modal('show');
			}
			else{
				$scope.failure = resp.data.errorMessage;
				$('.errorPopup').modal('show');
			}
			var request = {
				status : status,
				customerType : vendor
			};
			$http.post(resturl+"/getVendorForAdmin?pageNumber=1&pageSize="+count, request).then(function(resp){
				console.log(resp);
				$scope.vendorsCount = resp.data.paginationData.totalCount;
				$scope.registerVendorsGrid.data = resp.data.responseData;
			});
			$scope.pageCount = count;
		});
	}
	
	$scope.declineVendor = function(){
		$('.vendorDetailsPopup').modal('hide');
		$('.confirmPopup').modal('show');
	}
	
	$scope.confirmDelete = function(vendorProfile, selectedValue){
		$('.confirmPopup').modal('hide');
		var request = {
			status : "Pending for Approval",
			vendorId : vendorProfile.vendorId
		};
		$http.post(resturl+"/approveVendorByAdmin", request).then(function(resp){
			console.log(resp);
			if(resp.data.status == "true" ){
				$scope.success = resp.data.successMessage;
				$('.successPopup').modal('show');
			}
			else{
				$scope.failure = resp.data.errorMessage;
				$('.errorPopup').modal('show');
			}
			if(selectedValue.status == "0"){
				var request = {
					status : "0"
				};
			}
			if(selectedValue.status == "1"){
				var request = {
					status : "1"
				};
			}
			else {
				var request = {
					status : "ALL"
				};
			}
			$http.post(resturl+"/getVendorForAdmin?pageNumber=1&pageSize=10",request).then(function(resp){
				console.log(resp);
				$scope.vendorsCount = resp.data.paginationData.totalCount;
				$scope.registerVendorsGrid.data = resp.data.responseData;
			});
		});
	}
	
	// Update Register Vendor //
	
	// $('.vendorpic').change(function() {
		// var filename = $('.vendorpic')[0].files[0].name;
		// $('#vendorpicselect_file').html(filename);
	// });
	// $('.vendorcert').change(function() {
		// var filename = $('.vendorcert')[0].files[0].name;
		// $('#vendorcert_select').html(filename);		
	// });
	
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
	$scope.updateVendor = function(vendorProfile){
		$('.vendorDetailsPopup').modal('hide');
		console.log(vendorProfile);
		if(vendorProfile.vendorType == "Product Vendors"){
			vendorProfile.userType = "VENDOR";
			
		}
		else if(vendorProfile.vendorType == "Service Provider"){
			vendorProfile.userType = "SERVICE";
			var serviceIdValues = [];
			for (i = 0; i < $scope.servicesmodel.length; i++) {
				serviceIdValues.push($scope.servicesmodel[i].id);
			}
			vendorProfile.serviceIds = serviceIdValues;
			delete vendorProfile.vendorType;
			
		}
		else if(vendorProfile.vendorType == "Architects"){
			vendorProfile.userType = "ARCHITECTS";
			var architectIdValues = [];
				for (i = 0; i < $scope.architectmodel.length; i++) {
					architectIdValues.push($scope.architectmodel[i].id);
				}
				vendorProfile.architectIds = architectIdValues;
				delete vendorProfile.vendorType;
				
				console.log(vendorProfile);
		}
		else if(vendorProfile.vendorType == "WallPaper Vendors"){
			vendorProfile.userType = "WALL PAPER";
				var architectIdValues = [];
				for (i = 0; i < $scope.wallpapermodel.length; i++) {
					architectIdValues.push($scope.wallpapermodel[i].id);
				}
				vendorProfile.architectIds = architectIdValues;
				delete vendorProfile.vendorType;
				
				console.log(vendorProfile);
		}
		else {
			vendorProfile.userType = "MACHINERY & EQUIPMENT";
				var architectIdValues = [];
				for (i = 0; i < $scope.machinerymodel.length; i++) {
					architectIdValues.push($scope.machinerymodel[i].id);
				}
				vendorProfile.architectIds = architectIdValues;
				delete vendorProfile.vendorType;
				
				console.log(vendorProfile);
		}
		vendorProfile.companyName = vendorProfile.vendorName
		vendorProfile.contactNumber = vendorProfile.vendorTelephone
		vendorProfile.serviceFax = vendorProfile.vendorFax
		vendorProfile.majorCust = vendorProfile.vendorMajorCust
		vendorProfile.expLine = vendorProfile.vendorExpLine
		vendorProfile.serviceTIN = vendorProfile.vendorTIN
		vendorProfile.license = vendorProfile.vendorLicense
		vendorProfile.servicePAN = vendorProfile.vendorPAN
		vendorProfile.registrationNo = vendorProfile.vendorRegistrationNo
		vendorProfile.companyNature = vendorProfile.vendorCompanyNature
		vendorProfile.constFirm = vendorProfile.vendorConstFirm
		delete vendorProfile.vendorName;
		delete vendorProfile.file1;
		delete vendorProfile.file2;
		delete vendorProfile.file3;
		delete vendorProfile.vendorName;
		delete vendorProfile.vendorName;
		delete vendorProfile.vendorMobile;
		delete vendorProfile.vendorTelephone;
		delete vendorProfile.vendorFax;
		delete vendorProfile.vendorMajorCust;
		delete vendorProfile.vendorExpLine;
		delete vendorProfile.vendorTIN;
		delete vendorProfile.vendorLicense;
		delete vendorProfile.vendorPAN;
		delete vendorProfile.vendorRegistrationNo;
		delete vendorProfile.vendorCompanyNature;
		delete vendorProfile.vendorName;
		delete vendorProfile.vendorConstFirm;
		delete vendorProfile.vendorOfficeAddress;
		delete vendorProfile.activationURL;
		delete vendorProfile.vendorAuthCert;
		delete vendorProfile.userProfile;
		delete vendorProfile.vendorId;
		delete vendorProfile.vendorType;
		delete vendorProfile.file1;
		delete vendorProfile.file2;
		delete vendorProfile.file3;
		console.log(vendorProfile);
		$http({
			method: 'POST',
			url: resturl + "/user/update",
				headers: {
					'Content-Type': undefined
				},
				transformRequest: function (data) {
					var fileIDs = data.fileIDs;
					var formData = new FormData();
					formData.append("vendorRequest", JSON.stringify(vendorProfile));
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
					fileInfo: vendorProfile,
					file: $scope.files,
					fileIDs: $scope.fileIDs
				}
			})
			.success(function (resp, status, headers, config) {
				console.log(resp);
				console.log(resp.status);
				if (resp.status == "true") {
					$scope.success = resp.successMessage;
					$('.successPopup').modal('show');
					$scope.files = [];
					$scope.fileIDs = [];
				}
				else {
					$scope.failure = resp.errorMessage;
					$('.errorPopup').modal('');
				}
			})
			.error(function (data, status, headers, config) {
		});
	}
	// Registered Vendors Ends //
//2nd Tab - Registered Vendors Ended //

// 3rd Tab - Approve Vendor Products Started //
	// Approve Vendor Products Starts //
		$http.get(resturl+"/getRequestedVendorForAdmin?pageNumber=1&pageSize=10").then(function(resp){
			console.log(resp);
			$scope.vendorProductsGrid.data = resp.data.responseData;
			$scope.vendorProductsCount = resp.data.paginationData.totalCount;
		});
	
	$scope.vendorProductsPaging = function(page, pageSize ,total){
		$http.get(resturl+"/getRequestedVendorForAdmin?pageNumber="+page+"&pageSize=10").then(function(resp){
			console.log(resp);
			$scope.vendorProductsGrid.data = resp.data.responseData;
			$scope.vendorProductsCount = resp.data.paginationData.totalCount;
		});
	}
	$scope.vendorProductsGrid = {};
	$scope.vendorProductsGrid.columnDefs = [
		{name: 'vendorId'},
		{name: 'vendorName', displayName: 'Vendor'},
		{name: 'count', displayName: 'Total Products'},
		{name: 'Actions', width: 110, enableSorting:false, enableFiltering: false,
			cellTemplate: '<div class="text-center ui-grid-cell-contents"><button class="btn btn-primary" ng-click="grid.appScope.getVendorProducts(row)">Details</button></div>'
		}
	];
	
	$scope.getProdVendorBySearch = function(prodVendorType){
		if(prodVendorType.value == "VENDOR_NAME"){
			var searchString = prodVendorType.name
		}
		else {
			var searchString = prodVendorType.id
		}
		var searchRequest = {
			searchFor : "VENDOR_PRODUCTS",
			searchString : searchString,
			searchType : prodVendorType.value
		}
		console.log(searchRequest);
		$http.post(resturl+"/vendorSearchForAdmin?pageNumber=1&pageSize=10", searchRequest).then(function(resp){
			console.log(resp);
			$scope.vendorProductsGrid.data = resp.data.responseData;
			$scope.vendorProductsCount = resp.data.paginationData.totalCount;
		});
	}
	
	$scope.getVendorProducts = function(row){
		$http.get(resturl+"/admin/vendor/products/"+row.entity.vendorId+"?pageNumber=1&pageSize=4").then(function(resp){
			console.log(resp);
			$scope.vendorProductDetails = resp.data.responseData;
			$scope.productsCount = resp.data.paginationData.totalCount;
			$scope.vendorProductDetails.vendorName = row.entity.vendorName;
			$scope.vendorProductDetails.vendorId = row.entity.vendorId;
			if(resp.status == "200"){
				$('.vendorProductsPopup').modal('show');
			}
		});
		$scope.productsPaging = function(page, pageSize, total){
			$http.get(resturl+"/admin/vendor/products/"+row.entity.vendorId+"?pageNumber="+page+"&pageSize=4").then(function(resp){
				console.log(resp);
				$scope.vendorProductDetails = resp.data.responseData;
				$scope.productsCount = resp.data.paginationData.totalCount;
				$scope.vendorProductDetails.vendorName = row.entity.vendorName;
				$scope.vendorProductDetails.vendorId = row.entity.vendorId;
				if(resp.status == "200"){
					$('.vendorProductsPopup').modal('show');
				}
			});
		}
	}
	
	$scope.approveProducts = function(){
		$('.vendorProductsPopup').modal('hide');
		var vendorProductIds = $(".vendor-chk-select input:checkbox:checked").map(function(){
			return $(this).val();
		}).get();
		var request = {
			vendorProductIds : vendorProductIds,
			status : true
		};
		console.log(request);
		$http.post(resturl+"/admin/vendorproducts/activate", request).then(function(resp){
			console.log(resp);
			if(resp.data.status == "true"){
				$scope.success = resp.data.successMsg;
				$('.successPopup').modal('show');
			}
			else{
				$scope.failure = resp.data.errorMessage;
				$('.errorPopup').modal('show');
			}
			$http.get(resturl+"/getRequestedVendorForAdmin?pageNumber=1&pageSize=10").then(function(resp){
				console.log(resp);
				$scope.vendorProductsGrid.data = resp.data.responseData;
				$scope.vendorProductsCount = resp.data.paginationData.totalCount;
			});
		});
	}
	
	$scope.declineProducts = function(){
		$('.vendorProductsPopup').modal('hide');
		$('.productsDecline').modal('show');
	}
	
	$scope.confirmDecline = function(){
		$('.productsDecline').modal('hide');
		var vendorProductIds = $(".vendor-chk-select input:checkbox:checked").map(function(){
			return $(this).val();
		}).get();
		var request = {
			vendorProductIds : vendorProductIds,
			status : false
		};
		console.log(request);
		$http.post(resturl+"/admin/vendorproducts/activate", request).then(function(resp){
			console.log(resp);
			if(resp.data.status == "true"){
				$scope.success = resp.data.successMsg;
				$('.successPopup').modal('show');
			}
			else{
				$scope.failure = resp.data.errorMessage;
				$('.errorPopup').modal('show');
			}
			$http.get(resturl+"/getRequestedVendorForAdmin?pageNumber=1&pageSize=10").then(function(resp){
				console.log(resp);
				$scope.vendorProductsGrid.data = resp.data.responseData;
				$scope.vendorProductsCount = resp.data.paginationData.totalCount;
			});
		});
	}
	// Approve Vendor Products Ends //
// 3rd Tab - Approve Vendor Products Ended //

// 4th Tab -  Vendor Payments Started //
	$scope.payments = [
		{ name: 'Due Vendors', state: 'N' },
		{ name: 'Paid Vendors', state: 'Y' },
		{ name: 'All', state: 'ALL' }
	];
	$scope.vendorTypes = [
		{ vendor: 'Product Vendors', value: '1' },
		{ vendor: 'Service Providers', value: '2' },
		{ vendor: 'Architects', value: '3'},
		{ vendor: 'WallPaper Vendors', value: '4'},
		{ vendor: 'Machinery & Equipment Vendors', value: '5'},
		{ vendor: 'All', value: 'ALL'}
	];
	$scope.vendorTotals = [
		{ count: '10', value: '10' },
		{ count: '20', value: '20' },
		{ count: '50', value: '50' },
		{ count: '100', value: '100'}
	];
	
	$scope.getPaymentVendorBySearch = function(paymentVendorType){
		if(paymentVendorType.value == "VENDOR_NAME"){
			var searchString = paymentVendorType.name
		}
		else {
			var searchString = paymentVendorType.id
		}
		var searchRequest = {
			searchFor : "PAYMENT_VENDOR",
			searchString : searchString,
			searchType : paymentVendorType.value
		}
		console.log(searchRequest);
		$http.post(resturl+"/vendorSearchForAdmin?pageNumber=1&pageSize=10", searchRequest).then(function(resp){
			console.log(resp);
			$scope.paidVendorsGrid.data = resp.data.responseData;
			$scope.paidVendorsCount = resp.data.paginationData.totalCount;
		});
	}
	
	$scope.due = true;
	// Default Vendors Loading Based On Payment Status //
	$scope.request = {
		status: "N",
		customerType: "1"
	};
	$scope.vendorCount = 10;
	$http.post(resturl+"/getPaidOrUnpaidVendors?pageNumber=1&pageSize="+$scope.vendorCount, $scope.request).then(function(resp){
		console.log(resp);
		$scope.paidVendorsGrid.data = resp.data.responseData;
		$scope.paidVendorsCount = resp.data.paginationData.totalCount;
	});
	$scope.paidVendorsGrid = {};
	$scope.paidVendorsGrid.columnDefs = [
		{name: 'vendorId',  width: 150,},
		{name: 'vendorName', displayName: 'Vendor'},
		{name: 'vendorType'},
		{name: 'status',  width: 110},
		{name: 'Actions', width: 110, enableSorting:false, enableFiltering: false,
			cellTemplate: '<div class="text-center ui-grid-cell-contents"><button class="btn btn-primary" ng-click="grid.appScope.paidVendorDetails(row)">Details</button></div>'
		}
	];
	
	$scope.paidVendorDetails = function(row){
		console.log(row.entity);
		$http.get(resturl+"/getUser/"+row.entity.vendorId).then(function(resp){
			if(row.entity.vendorType == "Service Provider"){
				$scope.serviceSelectDiv = true;
				$scope.architectSelectDiv = false;
				$scope.wallpaperSelectDiv = false;
				$scope.machinerySelectDiv = false;
				$scope.vendorProfile = resp.data.serviceDetails;
				$scope.vendorProfile.vendorId = row.entity.vendorId;
				$scope.vendorProfile.vendorType = row.entity.vendorType;
				$scope.vendorProfile.country = "India";
				$scope.showCertificate = true;
					$scope.servicesmodel = [];
					$scope.selectedIds = [];
					for (i = 0; i < resp.data.serviceDetails.serviceIds.length; i++) {
						var num = resp.data.serviceDetails.serviceIds[i];
						$scope.selectedIds.push($scope.servicesdata[num]);
					}
					$scope.servicesmodel = $scope.selectedIds;
				}
			else if(row.entity.vendorType == "Architects"){
					$scope.architectSelectDiv = true;
					$scope.serviceSelectDiv = false;
					$scope.wallpaperSelectDiv = false;
					$scope.machinerySelectDiv = false;
					$scope.vendorProfile = resp.data.vendorDetails;
					$scope.vendorProfile.vendorId = row.entity.vendorId;
					$scope.vendorProfile.vendorType = row.entity.vendorType;
					$scope.vendorProfile.country = "India";
					$scope.showCertificate = true;
					$scope.architectmodel = [];
					$scope.architectIds = [];
					for (i = 0; i < resp.data.vendorDetails.architectIds.length; i++) {
						$scope.architectIds.push($scope.Architectdata[i]);
						//$scope.architectIds.push($scope.Architectdata[num]);
					}
					$scope.architectmodel = $scope.architectIds;
				}
			else if(row.entity.vendorType == "WallPaper Vendors"){
					$scope.wallpaperSelectDiv = true;
					$scope.architectSelectDiv = false;
					$scope.serviceSelectDiv = false;
					$scope.machinerySelectDiv = false;
					$scope.vendorProfile = resp.data.vendorDetails;
					$scope.vendorProfile.vendorId = row.entity.vendorId;
					$scope.vendorProfile.vendorType = row.entity.vendorType;
					$scope.vendorProfile.country = "India";
					$scope.showCertificate = true;
					$scope.wallpapermodel = [];
				$scope.architectIds = [];
				for (i = 0; i < resp.data.vendorDetails.architectIds.length; i++) {
					$scope.architectIds.push($scope.wallpaperdata[i]);
				}
					$scope.wallpapermodel = $scope.architectIds;
					
				}
			else if(row.entity.vendorType == "Machinery & Equipment"){
					$scope.machinerySelectDiv = true;
					$scope.serviceSelectDiv = false;
					$scope.wallpaperSelectDiv = false;
					$scope.architectSelectDiv = false;
					$scope.vendorProfile = resp.data.vendorDetails;
					$scope.vendorProfile.vendorId = row.entity.vendorId;
					$scope.vendorProfile.vendorType = row.entity.vendorType;
					$scope.vendorProfile.country = "India";
					$scope.showCertificate = true;
					$scope.hideUploadBtn = true;
					$scope.machinerymodel = [];
					$scope.architectIds = [];
				for (i = 0; i < resp.data.vendorDetails.architectIds.length; i++) {
						$scope.architectIds.push($scope.machinerydata[i]);
					}
					$scope.machinerymodel = $scope.architectIds;
				}
			else {
				$scope.machinerySelectDiv = false;
				$scope.serviceSelectDiv = false;
				$scope.wallpaperSelectDiv = false;
				$scope.architectSelectDiv = false;
				$scope.vendorProfile = resp.data.vendorDetails;
				console.log($scope.vendorProfile);
				$scope.vendorProfile.vendorId = row.entity.vendorId;
				$scope.vendorProfile.vendorType = row.entity.vendorType;
				$scope.vendorProfile.country = "India";
				$scope.showCertificate = true;
				$scope.noCertificate = false;
			}
			if($scope.vendorProfile.vendorAuthCert == null || $scope.vendorProfile.vendorAuthCert == ""){
				console.log($scope.vendorProfile.vendorAuthCert);
				$scope.showCertificate = false;
				$scope.noCertificate = true;
			}
			$scope.showActivate = false;
			$scope.showInactivate = true;
			if(row.entity.status == "N"){
				$scope.showActivate = true;
				$scope.showInactivate = false;
			}
			if(resp.status = "200"){
				$('.paidVendorDetailsPopup').modal('show');
			}
		});
	}
	
	
	// Paid Vendors Pagination API Call //
	$scope.paidVendorsPaging = function(page, pageSize, total, state, vendorType, count){
		console.log(page, pageSize, total, state, vendorType, count);
		var request = {
			status : state,
			customerType : vendorType
		};
		$scope.vendorCount = count;
		console.log(request);
		$http.post(resturl+"/getPaidOrUnpaidVendors?pageNumber="+page+"&pageSize="+count, request).then(function(resp){
			console.log(resp);
			$scope.paidVendorsGrid.data = resp.data.responseData;
			$scope.paidVendorsCount = resp.data.paginationData.totalCount;
		});
	}
	
	// View Vendors Based On Type & State After Changing The Entries //
	$scope.getVendorByPayments = function(state, value, total){
		var request = {
			status : state,
			customerType : value			
		}
		console.log(request);
		$http.post(resturl+"/getPaidOrUnpaidVendors?pageNumber=1&pageSize="+total, request).then(function(resp){
			console.log(resp);
			$scope.paidVendorsGrid.data = resp.data.responseData;
			$scope.paidVendorsCount = resp.data.paginationData.totalCount;
		});
		$scope.vendorCount = total;
		if(state == "N"){
			$scope.due = true;			
			$scope.paid = false;			
			$scope.due_paid = false;			
		}
		else if(state == "Y"){
			$scope.due = false;			
			$scope.paid = true;			
			$scope.due_paid = false;
		}
		else{
			$scope.due = false;			
			$scope.paid = false;			
			$scope.due_paid = true;
		}
	};
	
	// Paid Vendors Listing Based On The Selected Count Of Vendors To Display //
	$scope.paymentVendorsByTotal = function(state, value, total){
		var request = {
			status : state,
			customerType : value
		}
		console.log(request);
		$http.post(resturl+"/getPaidOrUnpaidVendors?pageNumber=1&pageSize="+total, request).then(function(resp){
			console.log(resp);
			$scope.paidVendorsGrid.data = resp.data.responseData;
			$scope.paidVendorsCount = resp.data.paginationData.totalCount;
		});
		$scope.vendorCount = total;
	};
	// In Activate a Vendor //
	$scope.inactivateVendor = function(vendorProfile, state, vendorType, count, vendorCount){
		$('.paidVendorDetailsPopup').modal('hide');
		console.log(vendorProfile.vendorId, state, vendorType, count);
		var request = {
			vendorId: vendorProfile.vendorId
		};
		$http.post(resturl+"/inActivateVendor", request).then(function(resp){
			console.log(resp);
			if(resp.data.status == "true"){
				$scope.success = resp.data.successMessage;
				$('.successPopup').modal('show');
			}
			else{
				$scope.failure = resp.data.successMessage;
				$('.errorPopup').modal('show');
			}
			var payload = {
				status : state,
				customerType : vendorType
			}
			console.log(request);
			$http.post(resturl+"/getPaidOrUnpaidVendors?pageNumber=1&pageSize="+count, payload).then(function(resp){
				console.log(resp);
				$scope.paidVendorsGrid.data = resp.data.responseData;
				$scope.paidVendorsCount = resp.data.paginationData.totalCount;
			});
			$scope.vendorCount = count;
		});
	};
	
	// Activate A Vendor //
	$scope.activateVendor = function(vendorProfile, state, vendorType, count, vendorCount){
		$('.paidVendorDetailsPopup').modal('hide');
		console.log(vendorProfile.vendorId, state, vendorType, count);
		var request = {
			vendorId: vendorProfile.vendorId
		};
		$http.post(resturl+"/activateVendor", request).then(function(resp){
			console.log(resp);
			if(resp.data.status == "true"){
				$scope.success = resp.data.successMessage;
				$('.successPopup').modal('show');
			}
			else{
				$scope.failure = resp.data.successMessage;
				$('.errorPopup').modal('show');
			}
			var payload = {
				status : state,
				customerType : vendorType
			}
			console.log(request);
			$http.post(resturl+"/getPaidOrUnpaidVendors?pageNumber=1&pageSize="+count, payload).then(function(resp){
				console.log(resp);
				$scope.paidVendorsGrid.data = resp.data.responseData;
				$scope.paidVendorsCount = resp.data.paginationData.totalCount;
			});
			$scope.vendorCount = count;
		});
	};
	
// 4th Tab - Vendor Payments Endes //


});
// Custom Directive For Selecting & Uploading File //
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
                scope.$emit("seletedFile", { file: files[i] });
              }
          });
		}
	};
});