angular.module('newapp')
  .controller('ordersCtrl', function($scope, $http, $location, resturl) {
	$("#ordersfromdate, #orderstodate").datepicker({
		autoclose: true,
		format: "yyyy-mm-dd",
		endDate: "today"
	});
	
	$scope.ordersByDate = function(orderDates){
		console.log(orderDates);
		if(orderDates.fromdate > orderDates.todate){
			$scope.failure = "FromDate should be Less than ToDate";
			$('.errorPopup').modal('show');
		}
		else{
			$http.post(resturl+"/order/adminViewOrders?page=0&size=10&fromDate="+orderDates.fromdate+"&toDate="+orderDates.todate).then(function(resp){
				$scope.allOrders = resp.data.orders;
				$scope.totalPages = resp.data.totalPages;
				for(i=0; i<$scope.allOrders.length; i++){
					$scope.allOrders[i].totalamt = resp.data.orders[i].total.value;
				}
			});
		}
	};
	$scope.orderPaging = function(page, size, total, orderDates) {
		console.log(page);
		$http.post(resturl+"/order/adminViewOrders?page="+page+"&size=10&fromDate=2017-10-30&toDate=2017-10-30").then(function(resp){
			$scope.allOrders = resp.data.orders;
			$scope.totalPages = resp.data.totalPages;
			for(i=0; i<$scope.allOrders.length; i++) {
				$scope.allOrders[i].totalamt = resp.data.orders[i].total.value;
			}
		});
	};
	$scope.viewOrder = function(orderDetails){
		console.log(orderDetails);
		$scope.orderInfo = {
			orderId : orderDetails.id,
			orderDate : orderDetails.datePurchased,
			orderAmount : orderDetails.totalamt,
			firstName : orderDetails.billing.firstName,
			lastName : orderDetails.billing.lastName,
			address : orderDetails.billing.address,
			city : orderDetails.billing.city,
			postalCode : orderDetails.billing.postalCode,
			area : orderDetails.billing.area,
			orderStatus : orderDetails.orderStatus
		};
		$scope.productList = orderDetails.products;
		console.log($scope.productList);
	};
});