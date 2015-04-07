(function($) {
    'use strict';

    var currentBudgetApp = angular.module('CurrentBudgetCalcApp',[]);

    currentBudgetApp.controller('CurrentBudgetCalcCtrl', function($scope) {
        $scope.context = CurrentBudgetContext || {};
        $scope.templateUrl = CurrentBudgetContext.templateUrl || null;

        $scope.currentPeriod = {
            direct: $scope.context.direct || null,
            indirect: $scope.context.indirect || null,
            total: $scope.context.total || null
        };

        $scope.currentPeriodSnapshot = angular.copy($scope.currentPeriod);

        $scope.currentPeriodTotal = function() {
            $scope.currentPeriod.total = $scope.currentPeriod.direct + $scope.currentPeriod.indirect;
            return $scope.currentPeriod.total;
        };

        $scope.checkDirty = function () {
            return !angular.equals($scope.currentPeriod, $scope.currentPeriodSnapshot);
        };

        EntityView.onSubmit.done(function (event) {
            var validationResult;
            if ($scope.checkDirty()) {
                var dirtyBitField = document.forms[0].elements['_EntityView_DirtyBit'];
                if (typeof dirtyBitField !== 'undefined') {
                    var dirtyBitValue = parseInt(dirtyBitField.value);
                    dirtyBitField.value = (isNaN(dirtyBitValue) ? 1 : ++dirtyBitValue);
                }
            }
        });
    }); /* end controller */
})();
