angular.module('newapp')
    .controller('catalogueCtrl', function($scope, $http, $location, $window, resturl) {
        $scope.columnDefs = [{
                name: 'productId'
            },
            {
                name: 'productName'
            },
            {
                name: 'productPrice'
            }
        ];
        $http.get(resturl + "/getAllCategories").then(function(resp) {
            $scope.menuitem = angular.copy(resp.data.categoryData);
            $scope.menuitems = angular.copy(resp.data.categoryData);
            $scope.catvalue = $scope.menuitems[0].title;
            $scope.prodcatvalue = $scope.menuitems[0].title;
            $scope.filcatvalue = $scope.menuitems[0].title;
            $scope.cfilname = $scope.menuitems[0].title;
            $scope.pfcatvalue = $scope.menuitems[0].title;
            $scope.upImgcatvalue = $scope.menuitems[0].title;

            /**** Update Prod ********/
            if ($scope.menuitems[0].subCategory != null) {
                $scope.subCatValueEnb = false;
                $scope.categorySub = $scope.menuitems[0].subCategory;
                $scope.subCatValue = $scope.categorySub[0].title;
                $scope.upImgsubCatValue = $scope.categorySub[0].title;
                $scope.filnamecategorySub = $scope.categorySub[0].title;
                $scope.assFilProdSubCat = $scope.categorySub[0].title;
                $http.get(resturl + "/categories/" + $scope.subCatValue + "?" + "pageNumber=1&pageSize=15").then(function(resp) {
                    $scope.Updateproductgrid.data = resp.data.responseData;
                    $scope.upImgproductgrid.data = resp.data.responseData;
                    $scope.filproductgrid.data = resp.data.responseData;
                    $scope.uptotalCount = resp.data.paginationData.totalCount;
                    $scope.filtotalCount = resp.data.paginationData.totalCount;
                });
            } else {
                $scope.subCatValueEnb = true;
                $scope.categorySub = {};
            }
            /**** create Prod ********/
            if ($scope.menuitems[0].subCategory != null) {
                $scope.prodsubCatValueEnb = false;
                $scope.prodcategorySub = $scope.menuitems[0].subCategory;
                $scope.prodsubcatvalue = $scope.prodcategorySub[0].title;

            } else {
                $scope.prodsubCatValueEnb = true;
                $scope.prodcategorySub = {};
            }
			
			/**** Product Images ****/
			if ($scope.menuitems[0].subCategory != null) {
                $scope.prodsubCatValueEnb = false;
                $scope.upImgSubCat = $scope.menuitems[0].subCategory;
                $scope.upImgsubCatValue = $scope.upImgSubCat[0].title;
			}
			else {
				$scope.prodsubCatValueEnb = true;
                $scope.prodcategorySub = {};
			}
			/**** Create New Filter ****/
			if ($scope.menuitems[0].subCategory != null) {
                $scope.prodsubCatValueEnb = false;
                $scope.filnamecategorySub = $scope.menuitems[0].subCategory;
                $scope.filsubCatValue = $scope.filnamecategorySub[0].title;
			}
			else {
				$scope.prodsubCatValueEnb = true;
                $scope.prodcategorySub = {};
			}
			/**** Add Filter Values ****/
			if ($scope.menuitems[0].subCategory != null) {
                $scope.prodsubCatValueEnb = false;
                $scope.filcategorySub = $scope.menuitems[0].subCategory;
                $scope.filsubCatValue = $scope.filcategorySub[0].title;
			}
			else {
				$scope.prodsubCatValueEnb = true;
                $scope.prodcategorySub = {};
			}
			/**** Assign Filter Values To Products ****/
			if ($scope.menuitems[0].subCategory != null) {
                $scope.prodsubCatValueEnb = false;
                $scope.assFilProdSubCat = $scope.menuitems[0].subCategory;
                $scope.filsubCatValue = $scope.assFilProdSubCat[0].title;
			}
			else {
				$scope.prodsubCatValueEnb = true;
                $scope.prodcategorySub = {};
			}
            var temp = [];
            var catdata = {
                "title": "Root",
                "url": ""
            };
            catdata.subCategory = resp.data.categoryData;
            temp.push(catdata);
            $scope.treedata = temp;
            /**** Crate Category *******/
            var temparr = resp.data.categoryData;
            var categdata = {
                "title": "Root"
            };
            temparr.unshift(categdata);
            $scope.categarry = temparr;
            $scope.categvalue = $scope.categarry[0].title;


        });
        $scope.treesel = function(param) {
            if (param != undefined) {
                selectedcategory = param;
                $http.get(resturl + "/categories/" + param + "?" + "pageNumber=" + 1 + "&pageSize=100").then(function(resp) {
                    $scope.productdata = resp.data.responseData;
                    $scope.totalCount = resp.data.paginationData.totalCount;
                });
            }
        }
        $scope.page = 1;
        $scope.PagingAct = function(page, pageSize, total) {
            $http.get(resturl + "/categories/" + selectedcategory + "?" + "pageNumber=" + page + "&pageSize=15").then(function(resp) {
                $window.scrollTo(60, 0);
                $scope.productdata = resp.data.responseData;
                $scope.totalCount = resp.data.paginationData.totalCount;

            });
        }
        /**** Add/Update/Delete Products***/
        $scope.Updateproductgrid = {};
        $scope.Updateproductgrid.columnDefs = [{
                name: 'productId'
            },
            {
                name: 'productName'
            },
            {
                name: 'productPrice'
            },
            {
                name: 'Actions',
                width: 110,
                enableSorting: false,
                enableFiltering: false,
                cellTemplate: '<div class="text-center ui-grid-cell-contents"><button class="btn btn-primary"  ng-click="grid.appScope.updateRow(row)">Details</button></div>'
            }
        ];

        $scope.deleteRow = function(row) {
            $('#DelModal').modal('show');
        };
        $scope.updateRow = function(row) {
            $http.get(resturl + "/products/" + row.entity.productId).then(function(resp) {
                $scope.updateProd = {
                    productId: row.entity.productId,
                    productName: row.entity.productName,
                    productPrice: resp.data.productOriginalPrice,
                    discountPrice: resp.data.productDiscountPrice,
                    description: resp.data.productDescription,
                    title: resp.data.productTitle
                };
                $scope.updateProdImage = resp.data.defaultImage;
                $('#myModal').modal('show');
            });
        };

        $scope.catchange = function() {
            var index = $scope.menuitems.findIndex(function(item, i) {
                return item.title === $scope.catvalue;
            });
            if ($scope.menuitems[index].subCategory != null) {
                $scope.subCatValueEnb = false;
                $scope.categorySub = $scope.menuitems[index].subCategory;
                $scope.subCatValue = $scope.categorySub[0].title;
				$http.get(resturl + "/categories/" + $scope.subCatValue + "?" + "pageNumber=1&pageSize=15").then(function(resp) {
                    $scope.Updateproductgrid.data = resp.data.responseData;
                    $scope.uptotalCount = resp.data.paginationData.totalCount;
                });

            } else {
                $scope.subCatValueEnb = true;
                $scope.categorySub = {};
            }
        };
        $scope.subCatChange = function() {
            $http.get(resturl + "/categories/" + $scope.subCatValue + "?" + "pageNumber=1&pageSize=15").then(function(resp) {
                $scope.Updateproductgrid.data = resp.data.responseData;
                $scope.uptotalCount = resp.data.paginationData.totalCount;
            });
        }
        $scope.UpPagingAct = function(page, pageSize, total) {
            $http.get(resturl + "/categories/" + $scope.subCatValue + "?" + "pageNumber=" + page + "&pageSize=15").then(function(resp) {
                $window.scrollTo(60, 0);
                $scope.Updateproductgrid.data = resp.data.responseData;
                $scope.uptotalCount = resp.data.paginationData.totalCount;
            });
        }
        /**** Create Prod ****/
        $scope.prodcatchange = function() {
            var index = $scope.menuitems.findIndex(function(item, i) {
                return item.title === $scope.prodcatvalue;
            });
            //$scope.prodcategorySub = $scope.menuitem[index].subCategory;

            if ($scope.menuitems[index].subCategory != null) {
                $scope.prodsubCatValueEnb = false;
                $scope.prodcategorySub = $scope.menuitems[index].subCategory;
                $scope.prodsubcatvalue = $scope.prodcategorySub[0].title;

            } else {
                $scope.prodsubCatValueEnb = true;
                $scope.prodcategorySub = {};
            }
        }

        $scope.createprod = function(createprod) {
            console.log(createprod)
            console.log($scope.prodsubCatValueEnb);
            var reqobj = createprod;
            if ($scope.prodsubCatValueEnb == true) {
                reqobj.category = $scope.prodcatvalue;
            } else {
                reqobj.category = $scope.prodsubcatvalue;
            }
            $http.post(resturl+"/createProduct", reqobj).then(function(resp) {
                console.log(resp);
				if(resp.data.status == true) {
					cataloguesuccmsg("Product created Successfully")
				}
				else {
					catalogueerrmsg("Failed while creating Product")
				}
            });
        };
        $scope.updateProduct = function(updateprod) {
            console.log(updateprod)
            $('#myModal').modal('hide');
            $http.post(resturl + "/updateProduct", updateprod).then(function(resp) {
                if (resp.data.status == true) {
                    cataloguesuccmsg("Product Updated Sucessfully")
                } else {
                    catalogueerrmsg(resp.data.errorMessage)
                }

            });
        };
        $scope.delprod = function(updateProd) {
            var delreqobj = {
				"productId" : updateProd.productId
			};
			console.log(delreqobj);
            $('#DelModal').modal('hide');
            $http.post(resturl+"/deleteProduct", delreqobj).then(function(resp) {
				console.log(resp);
				$('#myModal').modal('hide');
				if(resp.data.status == true){
					cataloguesuccmsg("Product Deleted Sucessfully")
				}
				else {
					catalogueerrmsg("Failed while deleting the Product")
				}
           });
        };
        /***** Category ********/
        $scope.categchange = function() {
            var index = $scope.menuitem.findIndex(function(item, i) {
                return item.title === $scope.categvalue;
            });
            $scope.categSub = $scope.menuitem[index].subCategory;

            if ($scope.menuitem[index].subCategory != null) {
                $scope.categorySubEnb = false;
                $scope.subCategValue = $scope.menuitem[index].subCategory[0].title;
            } else {
                $scope.categorySubEnb = true;
            }
        }
        //Place Holder Change //
        $scope.somePlaceholder = 'Category Name';
        $scope.changePlaceholder = function() {
            if ($scope.categvalue == "Root") {
                $scope.somePlaceholder = 'Category Name';
            } else {
                $scope.somePlaceholder = 'Sub-Category Name';
            }
        }
        $scope.createcat = function(createcateg) {
            if ($scope.categvalue == "Root") {
                var req = {
                    "categoryName": createcateg.categoryName,
                    "parentName": ""
                }
            } else {
                var req = {
                    "categoryName": createcateg.categoryName,
                    "parentName": $scope.categvalue
                }
            }

            $http({
                method: 'POST',
                url: resturl + "/createCategoryWithImage",
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: function(data) {
                    var formData = new FormData();
                    formData.append("createCategoryRequest", JSON.stringify(req));
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
                    fileInfo: req,
                    file: $scope.files
                }
            }).
            success(function(resp, status, headers, config) {
                console.log(resp);
                console.log(resp.status);
				$scope.files = [];
                if (resp.status == true) {
					$location.path('/catalogue');
					cataloguesuccmsg("Category created Successfully")
                } else {
					$location.path('/catalogue');
					catalogueerrmsg("Error while creating Category")
                }
            }).error(function(data, status, headers, config) {
                $location.path('/catalogue');
            });
        };

        function catalogueerrmsg(param) {
            $scope.caterrmsg = param;
            $('#ErrdealModal').modal('show');
        }

        function cataloguesuccmsg(param) {
            $scope.catsuccmsg = param;
            $('#SuccessModal').modal('show');
        }
        /**********Create New Filter Name***********/


        $scope.filnamecatchange = function() {
            var index = $scope.menuitems.findIndex(function(item, i) {
                return item.title === $scope.cfilname;
            });
            if ($scope.menuitems[index].subCategory != null) {
                $scope.filnamesubCatValueEnb = false;
                $scope.filnamecategorySub = $scope.menuitems[index].subCategory;
                $scope.filsubCatValue = $scope.filnamecategorySub[0].title;
            } else {
                $scope.filnamesubCatValueEnb = true;
                $scope.filnamecategorySub = {};
            }
        }
        $scope.createfiltername = function(param) {
            console.log(param);
            if ($scope.filnamesubCatValueEnb == false) {
                var reqobj = {
                    "categoryName": $scope.filnamesubCatValue,
                    "filterName": param.filname
                }
            } else {
                var reqobj = {
                    "categoryName": $scope.cfilname,
                    "filterName": param.filname
                }
            }
            $http.post(resturl + "/createFilter", reqobj).then(function(resp) {
                $scope.newfilname = {};
                $scope.cfiltname.$setUntouched()
                if (resp.data.status == true) {
                    cataloguesuccmsg("New Filter Created Sucessfully")
                } else {
                    catalogueerrmsg(resp.data.errorMessage)
                }
            });
        }
        /**** Add Filter Types *****/

        $scope.filcatchange = function() {
            var index = $scope.menuitems.findIndex(function(item, i) {
                return item.title === $scope.filcatvalue;
            });
            if ($scope.menuitems[index].subCategory != null) {
                $scope.filsubCatValueEnb = false;
                $scope.filcategorySub = $scope.menuitems[index].subCategory;
                $scope.filsubCatValue = $scope.filcategorySub[0].title;

                $http.get(resturl + "/getFiltersByCategory/" + $scope.filsubCatValue).then(function(resp) {
                    if (resp.data.filters.length > 0) {
                        $scope.filternames = resp.data.filters;
                        $scope.filtername = resp.data.filters[0].filterName;
                    }
                });
            } else {
                $scope.filsubCatValueEnb = true;
                $scope.filcategorySub = {};
            }
        }
        $scope.filsubCatChange = function(param) {
            $http.get(resturl + "/getFiltersByCategory/" + param).then(function(resp) {
                if (resp.data.filters.length > 0) {
                    $scope.filternames = resp.data.filters;
                    $scope.filtername = resp.data.filters[0].filterName;
                }
            });
        }
        $scope.createfilter = function(param) {
            var addfiltypes = param.filtype.split(',');
            if ($scope.filsubCatValueEnb == false) {
                var reqobj = {
                    "categoryName": $scope.filsubCatValue,
                    "filterName": $scope.filtername,
                    "filterTypes": addfiltypes
                }
            } else {
                var reqobj = {
                    "categoryName": $scope.filcatvalue,
                    "filterName": $scope.filtername,
                    "filterTypes": addfiltypes
                }
            }
            $http.post(resturl + "/createFilterTypes", reqobj).then(function(resp) {
                $scope.newfil = {};
                $scope.filcategoryForm.$setUntouched()
                if (resp.data.status == true) {
                    cataloguesuccmsg(" Filter Type Created Sucessfully")
                } else {
                    catalogueerrmsg(resp.data.errorMessage)
                }
            });
        }
        /**** Add Products to Filters *****/

        $scope.filproductgrid = {};
        $scope.filproductgrid.columnDefs = [{
                name: 'productId'
            },
            {
                name: 'productName'
            },
            {
                name: 'productPrice'
            },
            {
                name: 'productDiscountPrice',
                displayName: 'Discount Price'
            },
            {
                name: 'Actions',
                width: 110,
                enableSorting: false,
                enableFiltering: false,
                cellTemplate: '<div class="text-center ui-grid-cell-contents"><button class="btn btn-primary"  ng-click="grid.appScope.updateprdfil(row)">Details</button></div>'
            }
        ];

        $scope.pfcatchange = function() {
            var index = $scope.menuitems.findIndex(function(item, i) {
                return item.title === $scope.pfcatvalue;
            });
            if ($scope.menuitems[index].subCategory != null) {
                $scope.pfsubCatValueEnb = false;
                $scope.assFilProdSubCat = $scope.menuitems[index].subCategory;
                $scope.filsubCatValue = $scope.assFilProdSubCat[0].title;
                $http.get(resturl + "/categories/" + $scope.filsubCatValue + "?" + "pageNumber=1&pageSize=15").then(function(resp) {
                    $scope.filproductgrid.data = resp.data.responseData;
                    $scope.filtotalCount = resp.data.paginationData.totalCount;
                });
            } else {
                $scope.pfsubCatValueEnb = true;
                $scope.pfcategorySub = {};
            }
        }
        $scope.pfsubCatChange = function(param) {
            $http.get(resturl + "/categories/" + param + "?" + "pageNumber=1&pageSize=15").then(function(resp) {
                $scope.filproductgrid.data = resp.data.responseData;
                $scope.filtotalCount = resp.data.paginationData.totalCount;
            });
        }

        $scope.filPagingAct = function(page, pageSize, total) {
            $http.get(resturl + "/categories/" + $scope.pfsubCatValue + "?" + "pageNumber=" + page + "&pageSize=15").then(function(resp) {
                $scope.filproductgrid.data = resp.data.responseData;
                $scope.filtotalCount = resp.data.paginationData.totalCount;
            });
        }

        $scope.updateprdfil = function(row) {
            $http.get(resturl + "/products/" + row.entity.productId).then(function(resp) {
                $scope.addprdfil = {
                    prodId: row.entity.productId,
                    prodname: row.entity.productName,
                    description: resp.data.productDescription
                };
                $scope.prodImage = resp.data.defaultImage;
				$scope.prodFilters = resp.data.productFilterTypeList;
				console.log($scope.prodFilters);
                $http.get(resturl+"/getFiltersByCategory/"+$scope.filsubCatValue).then(function(resp) {
                    $scope.branditem = resp.data.filters;
					console.log($scope.branditem);
                    $scope.selection = [];
                    $scope.toggleSelection = function toggleSelection(branditem) {
                        var idx = $scope.selection.indexOf(branditem);
                        if (idx > -1) {
                            $scope.selection.splice(idx, 1);
                        } else {
                            $scope.selection.push(branditem);
                        }
                    };
					$scope.checked = function(id){
						var check = false;
						angular.forEach($scope.prodFilters, function(item){
							//console.log(item.filterType.length);
							angular.forEach($scope.branditem, function(item1){
								angular.forEach(item1.filterType, function(item2){
								if(item.filterId === item2.id && id === item2.id){
									console.log(item.filterId);
									console.log(item2.id);
									check = true;
								}
								});
							});
						});
						return check;
					}
                });
                $('#prodfilModal').modal('show');
            });
        }
        var filterIds = [];
        $scope.filteritem = function(filparam, paramval) {
            if (paramval == true)
                filterIds.push(filparam)
            else {
                filterIds = jQuery.grep(filterIds, function(a) {
                    return a !== filparam;
                });
            }
        };
        $scope.setprdfil = function() {
			var filterIds = $(".vendor-chk-select input:checkbox:checked").map(function(){
        return $(this).val();
          }).get();
            if (filterIds.length != 0) {
                var reqobj = {
                    "productId": $scope.addprdfil.prodId,
                    "filterTypeIds": filterIds
                }
                $http.post(resturl + "/addProductToFilter", reqobj).then(function(resp) {
                    $('#prodfilModal').modal('hide');
                    if (resp.data.status == true) {
                        cataloguesuccmsg("Product Filter Assigned Sucessfully")
                    } else {
                        catalogueerrmsg(resp.data.errorMessage)
                    }
                });
            }
        }

        // Product Image Upload Service Starts //

        $scope.upImgproductgrid = {};
        $scope.upImgproductgrid.columnDefs = [{
                name: 'productId',
            },
            {
                name: 'productName'
            },
            {
                name: 'productPrice'
            },
            {
                name: 'Actions',
                width: 110,
                enableSorting: false,
                enableFiltering: false,
                cellTemplate: '<div class="text-center ui-grid-cell-contents"><button class="btn btn-primary"  ng-click="grid.appScope.upimgProduct(row)">Details</button></div>'
            }
        ];

        $scope.upimgProduct = function(row) {
            $http.get(resturl + "/products/" + row.entity.productId).then(function(resp) {
                $scope.addprdfil = {
                    prodId: row.entity.productId,
                    prodname: row.entity.productName,
                    description: resp.data.productDescription
                };
                $('#upImgModal').modal('show');
				$scope.imageArray = [];
                $scope.imageData = resp.data;
				$scope.imageArray.push(resp.data.defaultImage);
				for(i=0; i<resp.data.productImages.length; i++){
					$scope.imageArray.push(resp.data.productImages[i]);
				}
				
				// Hiding Default Image Upload Section //
				if(resp.data.defaultImage == null) {
					$scope.showDefaultImage = true;
				}
				else {
					$scope.showDefaultImage = false;
				}
            });
        };

        $scope.upImgcatchange = function() {
            var index = $scope.menuitems.findIndex(function(item, i) {
                return item.title === $scope.upImgcatvalue;
            });
            if ($scope.menuitems[index].subCategory != null) {
                $scope.upProdImgValueEnb = false;
                $scope.upImgSubCat = $scope.menuitems[index].subCategory;
                $scope.upImgsubCatValue = $scope.upImgSubCat[0].title;
                $http.get(resturl + "/categories/" + $scope.upImgsubCatValue + "?" + "pageNumber=1&pageSize=15").then(function(resp) {
                    $scope.upImgproductgrid.data = resp.data.responseData;
                    $scope.filtotalCount = resp.data.paginationData.totalCount;
                });
            } else {
                $scope.upProdImgValueEnb = true;
                $scope.pfcategorySub = {};
            }
        };
        $scope.upImgsubCatChange = function(param) {
            $http.get(resturl + "/categories/" + param + "?" + "pageNumber=1&pageSize=15").then(function(resp) {
                $scope.upImgproductgrid.data = resp.data.responseData;
                $scope.filtotalCount = resp.data.paginationData.totalCount;
            });
        };

        $scope.upImgPagingAct = function(page, pageSize, total) {
            $http.get(resturl + "/categories/" + $scope.upImgsubCatValue + "?" + "pageNumber=" + page + "&pageSize=15").then(function(resp) {

                $scope.upImgproductgrid.data = resp.data.responseData;
                $scope.filtotalCount = resp.data.paginationData.totalCount;
            });
        };
		
		// Delete Product Images //
		
		$scope.deleteImage = function(addprdfil, eachImage){
			var request = {
				"productId" : addprdfil.prodId,
				"imageURL" : eachImage
			};
			console.log(request);
			$http.post(resturl+"/deleteProductImage", request).then(function(resp){
				console.log(resp);
				if(resp.data.status == true) {
					$('#upImgModal').modal('hide');
					$('#SuccessModal').modal('show');
					$scope.catsuccmsg = "Image Deleted Successfully";
				}
				else {
					$('#upImgModal').modal('hide');
					$('#ErrdealModal').modal('show');
					$scope.caterrmsg = "Error while Deleting Image";
				}
					
			});
		};	
		
        // File Upload Functionality
        $scope.files = [];
        $scope.$on("seletedFile", function(event, args) {
            $scope.$apply(function() {
                //add the file object to the scope's files collection
                $scope.files.push(args.file);
            });
        });

        $scope.defaultProdImage = function() {
            var payload = {
                "productId": $scope.addprdfil.prodId,
                "defaultImage": "1"
            }
            console.log(payload);
            $http({
                method: 'POST',
                url: resturl+"/uploadProductImage",
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: function(data) {
                    var formData = new FormData();
                    formData.append("productImageRequest", JSON.stringify(payload));
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
                    fileInfo: payload,
                    file: $scope.files
                }
            }).
            success(function(resp, status, headers, config) {
                console.log(resp);
                console.log(resp.status);
                if (resp.status == true) {
                    $location.path('/catalogue');
					$scope.files = [];
					$('#upImgModal').modal('hide');
					cataloguesuccmsg("Product Image Uploaded Successfully")
                } else {
					$location.path('/catalogue');
					$scope.files = [];
					$("#upImgModal").modal('hide');
					catalogueerrmsg(resp.errorMessage)
                }
            }).error(function(data, status, headers, config) {
            });
        };

        // Count of the Images Selected //
        $scope.getFileDetails = function(e) {
            $scope.files = [];
            $scope.$apply(function() {
                // STORE THE FILE OBJECT IN AN ARRAY.
                for (var i = 0; i < e.files.length; i++) {
                    $scope.files.push(e.files[i])
                }
            });
        };

        // On Click Upload Function  //
        $scope.uploadFiles = function() {
            for (var i in $scope.files) {
                $scope.payload = {
                    productId: $scope.addprdfil.prodId,
                    defaultImage: "0"
                }
                // FILL FormData WITH FILE DETAILS.
                var data = new FormData();
                data.append("productImageRequest", JSON.stringify($scope.payload));
                // Http Request //
                var objXhr = new XMLHttpRequest();
                data.append("file", $scope.files[i]);
                // Invoking the REST API //
                objXhr.open("POST", resturl + "/uploadProductImage");
                objXhr.send(data);
                objXhr.onreadystatechange = function() {
					$scope.files = [];
					$('#upImgModal').modal('hide');
                    if (this.readyState == 4 && this.status == 200) {
                        $scope.output = this.responseText;
                        console.log($scope.output);
						cataloguesuccmsg("Product Image Uploaded Successfully")
                    }
					else {
						$('#upImgModal').modal('hide');
						catalogueerrmsg("Failed while Uploading Product Image")
					}
                };
            };
        };
    });
newapp.directive('uploadFiles', function() {
    return {
        //create a new scope
        scope: true,
        link: function(scope, el, attrs) {
            el.bind('change', function(event) {
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