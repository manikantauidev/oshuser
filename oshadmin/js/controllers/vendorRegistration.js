angular.module('newapp') 
  .controller('vendorRegistrationCtrl', function ($scope, $http, $location, $route,resturl) {
	
	// === Upload Functionality Starts === //
	$scope.files = [];
	$scope.$on("seletedFile", function (event, args) {
        $scope.$apply(function () {
            //add the file object to the scope's files collection
            $scope.files.push(args.file);
        });
    });
	$scope.example8model = [];
	$scope.example8settings = { checkBoxes: true,enableSearch: true };
	$scope.constitutionchange = function(param) {
		if(param == "Services") {
			$http.get(resturl+"/services").then(function(resp) {
				var resparr=resp.data.services;
				for(var i = 0; i < resparr.length; i++) {
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
	}	
	$scope.regvendor = function (vendor) {
		vendor.userType = "VENDOR";
		$scope.vendor.country="India";
		vendor.constFirm = vendor.vendorConstFirm;
		delete vendor.vendorConstFirm;
		console.log(vendor)
		registerapi(vendor);
	}
	$scope.Arcvendor = function (Architects) {
	Architects.userType = "ARCHITECTS";
		$scope.vendor.country="India";
		Architects.constFirm = Architects.vendorConstFirm;
		delete Architects.vendorConstFirm;
		console.log(Architects)
		registerapi(Architects);
	}
	$scope.Machineryvendor = function (Machinery) {
	Machinery.userType = "MACHINERY & EQUIPMENT";
		$scope.vendor.country="India";
		Machinery.constFirm = Machinery.vendorConstFirm;
		delete Machinery.vendorConstFirm;
		console.log(Machinery)
		registerapi(Machinery);
	}
	$scope.wallpapervendor = function (Wallpaper) {
	Wallpaper.userType = "WALL PAPER";
		$scope.vendor.country="India";
		Wallpaper.constFirm = Wallpaper.vendorConstFirm;
		delete Wallpaper.vendorConstFirm;
		console.log(Wallpaper)
		registerapi(Wallpaper);
		
	}
	$scope.regservices = function (services) {
		services.userType = "SERVICE";
		$scope.vendor.country="India";
		services.constFirm = services.vendorConstFirm;
		delete services['vendorConstFirm'];
		var temparr=[];
		for (i=0;i<$scope.example8model.length;i++){
			temparr.push($scope.example8model[i].id);
		}
		services.serviceIds=temparr;
		console.log($scope.example8model);
		console.log(services);
		registerapi(services);
	}
	/***** Register API Call ***/
	function registerapi(vendor){
		console.log(vendor);
	vendor.activationURL="http://rainiersoft.com/clients/onesevenhome/#/activateuser";
	$http({
            method: 'POST',
            url: resturl+"/user/register",
            headers: { 'Content-Type': undefined },
            transformRequest: function (data) {
			var formData = new FormData();
			formData.append("vendorRequest", JSON.stringify(vendor));
				if(data.file.length == 0) {
                	formData.append("file",new File([""], "emptyFile.jpg", {type: "impage/jpeg"}));
                }
				else {
                	for (var i = 0; i < data.file.length; i++) {
                		// formData.append("file", data.file);
                		formData.append("file", data.file[i]);
                	}
                }
                return formData;
            },
            data: { fileInfo: vendor, file: $scope.files }
        }).
        success(function (resp, status, headers, config) {
			console.log(resp);
		if(resp.status == "true"){
		
	}
	else {
	  }
	}).error(function (data, status, headers, config) {
            $location.path('/vendorreg');
        });
	};
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
                scope.$emit("seletedFile", { file: files[i] });
              }
          });
		}
	};
});