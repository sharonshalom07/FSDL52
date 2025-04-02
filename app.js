var app = angular.module('studentApp', []);

app.controller('studentCtrl', ['$scope', function ($scope) {
    $scope.student = {}; // Object to store student data
    $scope.studentSubmitted = false; // To display student data after form submission

    // Function to handle form submission
    $scope.submitForm = function () {
        if ($scope.studentForm.$valid) {
            $scope.studentSubmitted = true;
            console.log('Form Submitted', $scope.student);
        } else {
            $scope.studentSubmitted = false;
            alert('Please fill out the form correctly.');
        }
    };
}]);
