(function($) {
    var app = angular.module("EntireBudgetCalcApp",[]);

    app.controller("EntireBudgetCalcCtrl", function($scope) {
        $scope.context = EntireBudgetContext || {};
        $scope.templateUrl = EntireBudgetContext.templateUrl || null;

        $scope.entirePeriod = {
            direct: $scope.context.direct || null,
            indirect: $scope.context.indirect || null,
            total: $scope.context.total || null
        };

        $scope.entirePeriodSnapshot = angular.copy($scope.entirePeriod);

        $scope.entirePeriodTotal = function() {
            return $scope.entirePeriod.total = $scope.entirePeriod.direct + $scope.entirePeriod.indirect;
        };

        $scope.checkDirty = function () {
            return !angular.equals($scope.entirePeriod, $scope.entirePeriodSnapshot);
        };

        EntityView.onSubmit.done(function (event) {
            var validationResult;
            if ($scope.checkDirty()) {
                var dirtyBitField = document.forms[0].elements["_EntityView_DirtyBit"];
                if (typeof dirtyBitField != "undefined") {
                    var dirtyBitValue = parseInt(dirtyBitField.value);
                    dirtyBitField.value = (isNaN(dirtyBitValue) ? 1 : ++dirtyBitValue);
                }
            }
        });
    }); /* end controller */
})();

