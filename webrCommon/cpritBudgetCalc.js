(function($) {
    'use strict';

    var cpritBudgetApp = angular.module('CpritBudgetCalcApp',[]);

    cpritBudgetApp.controller('CpritBudgetCalcCtrl', function($scope) {
        $scope.context = CpritBudgetContext || {};
        $scope.templateUrl = CpritBudgetContext.templateUrl || null;

        $scope.cpritPeriod = {
            direct: $scope.context.direct || 0,
            indirect: $scope.context.indirect || 0,
            total: $scope.context.total || 0
        };

        $scope.cpritPeriodSnapshot = angular.copy($scope.cpritPeriod);

        $scope.cpritPeriodTotal = function() {
            $scope.cpritPeriod.total = $scope.cpritPeriod.direct + $scope.cpritPeriod.indirect;
            return $scope.cpritPeriod.total;
        };

        $scope.checkDirty = function () {
            return !angular.equals($scope.cpritPeriod, $scope.cpritPeriodSnapshot);
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
