var newapp=angular.module('newapp',['ngRoute','angularTreeview','ui.grid','ui.grid.autoResize','angularjs-dropdown-multiselect','ngPatternRestrict','bw.paging','ng-fusioncharts']);
newapp.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
	$routeProvider
	   .when('/', {
        templateUrl: 'views/adminlogin.html',
        controller: 'adminloginCtrl'
      })
	  .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'homeCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
	  .when('/store', {
        templateUrl: 'views/store.html',
        controller: 'storeCtrl'
      })
	 
	  .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'profileCtrl'
      })
	  .when('/Reports', {
        templateUrl: 'views/reports.html',
        controller: 'reportsCtrl'
      })
	  .when('/categorymanagement', {
		  templateUrl: 'views/categorymanagement.html',
	      controller: 'catMgmtCtrl'
	  })
	  .when('/testimonialmgmt', {
		  templateUrl: 'views/testimonialmanagement.html',
	      controller: 'testimonialMgmtCtrl'
	  })
	  .when('/changepassword', {
		  templateUrl : 'views/changepassword.html',
		  controller : 'changePassCtrl'
	  })
	  .when('/addproducts', {
		  templateUrl : 'views/addproducts.html',
		  controller : 'addProdCtrl'
	  })
	  .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
	  .when('/orders', {
        templateUrl: 'views/orders.html',
        controller: 'ordersCtrl'
      })
	  .when('/catalogue', {
        templateUrl: 'views/catalogue.html',
        controller: 'catalogueCtrl'
      })
	  .when('/approveproducts', {
        templateUrl: 'views/approveproducts.html',
        controller: 'approveProdCtrl'
      })
	  .when('/dealofday', {
        templateUrl: 'views/dealofday.html',
        controller: 'dealOfDayCtrl'
      })
	  .when('/dealmanagement', {
        templateUrl: 'views/dealmanagement.html',
        controller: 'dealmanagementCtrl'
      })
	  .when('/discmanagement', {
        templateUrl: 'views/discmanagement.html',
        controller: 'discmanagementCtrl'
      })
	  .when('/brandimageupload', {
        templateUrl: 'views/brandimage.html',
        controller: 'brandImageCtrl'
      })
	  .when('/postarequirement', {
		templateUrl : 'views/postarequirement.html',
		controller: 'postaRequirementCtrl'
	  })
	  .when('/serviceManagement', {
		templateUrl : 'views/servicemanagement.html',
		controller: 'serviceMgmtCtrl'
	  })
	  .when('/historyManagement', {
		templateUrl : 'views/historymanagement.html',
		controller: 'historyMgmtCtrl'
	  })
	  .when('/architectectsManagement', {
		templateUrl : 'views/architectmanagement.html',
		controller: 'architectsMgmtCtrl'
	  })
	  .when('/registeredVendors', {
		templateUrl : 'views/registeredVendors.html',
		controller: 'registeredVendorsCtrl'
	  })
	  .when('/vendorProducts', {
		templateUrl : 'views/vendorProducts.html',
		controller: 'vendorProductsCtrl'
	  })
	  .when('/vendorRegistration', {
		templateUrl: 'views/vendorRegistration.html',
		controller: 'vendorRegistrationCtrl'
      })	  
	  .when('/conform', {
		templateUrl: 'views/conform.html',
		controller: 'conformCtrl'
	  })
	  .when('/vendorsmanagement', {
		templateUrl: 'views/vendormanagement.html',
		controller: 'vendorManagementCtrl'
	  })
	  .when('/machinerymanagement', {
		  templateUrl: 'views/machinerymanagement.html',
		  controller: 'machineryMgmtCtrl'
	  })
	  .when('/wallpapermanagement', {
		  templateUrl: 'views/wallpapermanagement.html',
		  controller: 'wallpaperMgmtCtrl'
	  })
	  .when('/advertisements', {
		  templateUrl: 'views/advertisements.html',
		  controller: 'advertisementsCtrl'
	  })	  
      .otherwise({
        redirectTo: '/'
      });
}]);
newapp.controller('bodyController', function($scope, $location,$rootScope) {
	
$scope.location = $location.path(); 
$rootScope.$on('$routeChangeSuccess', function() { 
       $scope.location = $location.path();  
if(localStorage.OSHAdminName == undefined){
	 $location.path('/')
}	 
});
  $scope.logout = function() {
	  localStorage.clear();
	  $location.path('/');
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