var websitesModule = angular.module('websitesModule', ['angularUtils.directives.dirPagination']);

websitesModule.controller("websitesController", function ($scope, $http, $sce, $window) {

	//get data
	$scope.getdata = function () {
		$http.get('http://localhost:3000/website').then(function (response) {
			console.log(response);
			$scope.websites = response.data;
		})

		$scope.trustSrc = function (src) {
			return $sce.trustAsResourceUrl(src);
		}
	};
	// and fire it after definition
	$scope.getdata();

	//Insert 
	$scope.ButtonClick = function () {
		var post = $http({
			method: "POST",
			url: "http://localhost:3000/website",
			dataType: 'json',
			data: { title: $scope.title, body: $scope.body, category: $scope.category, subjecturl: $scope.subjecturl },
			headers: { "Content-Type": "application/json" }
		});

		post.success(function (data, status) {
			$scope.message = "Successful registration!";
			$scope.failedmessage = null;
			$scope.clearForm();
			$scope.getdata();
		});

		post.error(function (data, status) {
			$scope.failedmessage = "Failed registration!";
			$scope.message = null;
		});
	}

	//clear form
	$scope.clearForm = function () {
		$scope.title = "";
		$scope.body = "";
		$scope.category = "";
		$scope.subjecturl = "";
	}

    $scope.data = [];
    $http.get("category.json").success(function(response){ 
        $scope.data = response;
    });
});




