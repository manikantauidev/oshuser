angular.module('newapp')
   .controller('catMgmtCtrl', function ($scope, $http, $location, resturl) {
      $http.get(resturl + "/getAllCategories").then(function (resp) {
         console.log(resp);
         $scope.menuitem = resp.data.categoryData;
      });
      $scope.catchange = function () {
         console.log($scope.catvalue);
         var index = $scope.menuitem.findIndex(function (item, i) {
            return item.title === $scope.catvalue;
         });
         $scope.categorySub = $scope.menuitem[index].subCategory
      }
      $scope.subCatChange = function () {
         console.log($scope.subCatValue);
      }

      $scope.files = [];
      $scope.$on("seletedFile", function (event, args) {
         $scope.$apply(function () {
            //add the file object to the scope's files collection
            if ($scope.files.length == 0) {
               $scope.files.push(args.file);
            } else {
               $scope.files.splice(0, 1);
               $scope.files.push(args.file);
            }
         });
      });

      $scope.proceed = function () {
         var request = {
            "categoryName": $scope.catvalue,
            "subCategoryName": $scope.subCatValue
         };
         console.log(request);
         $http({
               method: 'POST',
               url: resturl + "/uploadOrUpdateSubCatImage",
               headers: {
                  'Content-Type': undefined
               },
               transformRequest: function (data) {
                  var formData = new FormData();
                  formData.append("subCatImageRequest", JSON.stringify(request));
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
               if (resp.status == "true") {
                  $('.successPopup').modal('show');
                  $scope.success = resp.successMessage;
                  console.log($scope.success);
               } else {
                  $('#ErrdealModal').modal('show');
                  $scope.failure = resp.errorMessage;
               }
               $http.get(resturl + "/getAllSubCatImages").then(function (resp) {
                  console.log(resp);
                  $scope.respData = resp.data.subCatagoryImgsObjByCatagory;
               });
            })
            .error(function (data, status, headers, config) {
               $location.path('/categorymanagement');
            });
      };

      /*$scope.categoryListGrid = {};
      $scope.categoryListGrid.columnDefs = [
      	{ name: 'subCatagoryImgsObjByCatagory', displayName:'Category'},
      	{ name: 'subCategoryName', displayName:'Sub Category'},
      	{ name: 'subCategoryImageURL', displayName:'Image Path'},
      	{
      		name: 'Actions',width: 110, enableSorting : false, enableFiltering:false,
      		cellTemplate: '<div class="text-center ui-grid-cell-contents"><button class="btn btn-primary" ng-click="grid.appScope.getCategoryDetails(row)">Details</button></div>'
      	}
      	];
      	*/

      $http.get(resturl + "/getAllSubCatImages").then(function (resp) {
         console.log(resp);
         $scope.respData = resp.data.subCatagoryImgsObjByCatagory;
      });

      /*$scope.getCategoryDetails = function(row){
      $http.get(resturl+"/getAllSubCatImages").then(function(resp){
      	console.log(resp);
      	$scope.categoryListGrid.data = resp.data;
      	// $scope.allImages = resp.data.subCatagoryImgsObjByCatagory.Kitchen[0].subCategoryName;
      	// console.log($scope.allImages);
      });
      };*/

      $scope.getSubCatDetails = function (subCatData, catName) {
         $scope.subCatData = subCatData;
         $scope.key = catName;
      };
      // Delete Confirmation Popup //
      $scope.confirmDelete = function () {
         $('.getSubCatImgPopup').modal('hide');
         $('.confirmPopup').modal('show');
      };

      // Delete Popup //
      $scope.deleteSubCat = function (subCatData) {
         console.log(subCatData.subCategoryId);
         $http.get(resturl + "/deleteSubCatImage/" + subCatData.subCategoryId).then(function (resp) {
            console.log(resp);
            $scope.deleteResp = resp.data;
            $('.confirmPopup').modal('hide');
            if (resp.data.status == "true") {
               $('.successPopup').modal('show');
               $scope.success = resp.data.successMessage;
               console.log($scope.success);
            } else {
               $('#ErrdealModal').modal('show');
               $scope.failure = resp.data.errorMessage;
            }
            $http.get(resturl + "/getAllSubCatImages").then(function (resp) {
               console.log(resp);
               $scope.respData = resp.data.subCatagoryImgsObjByCatagory;
            });
         });
      };
   });

newapp.directive('categoryFiles', function () {
   return {
      require: 'ngModel',
      //create a new scope
      scope: true,
      link: function (scope, el, attrs, ngModel) {
         el.bind('change', function (event) {
            var files = event.target.files;
            //iterate files since 'multiple' may be specified on the element
            for (var i = 0; i < files.length; i++) {
               //emit event upward
               scope.$emit("seletedFile", {
                  file: files[i]
               });
            }
            scope.$apply(function () {
               console.log(el.val());
               ngModel.$setViewValue(el.val());
               ngModel.$render();
            })
         });
      }
   };
});