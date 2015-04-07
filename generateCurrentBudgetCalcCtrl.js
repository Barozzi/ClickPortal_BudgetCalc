/*
 * GB - generate the angular controller for currentPeriodBudgetData
 * @param void
 * @return string - an html string
 */
function generateCurrentBudgetCalcCtrl() {
    var sch = ShadowSCH.getRealOrShadowSCH();
    var readOnlyContext = wom.getContext('ReadOnly');
    var isReadOnly = !!(readOnlyContext == null || readOnlyContext == true);

    var CurrentBudgetContext = {
        readOnly: isReadOnly,
        templateUrl: sch.FullUrlFromAssetUrl("/Custom/Templates/currentBudgetCalc.html.txt"),
        direct: this.getQualifiedAttribute("customAttributes.budgetCurrentPeriod.customAttributes.direct"),
        indirect: this.getQualifiedAttribute("customAttributes.budgetCurrentPeriod.customAttributes.indirect"),
        total: this.getQualifiedAttribute("customAttributes.budgetCurrentPeriod.customAttributes.total")
    };

    return [
        '<script>',
        '    window.CurrentBudgetContext = ' + JSON.stringify(CurrentBudgetContext, null, '\t').replace(/\//g, '\\/') + ';',
        '</script>',
        '<div ng-app="CurrentBudgetCalcApp" ng-controller="CurrentBudgetCtrl">',
        '    <ng-include src="templateUrl"></ng-include>',
        '</div>'
    ].join('\n');
}
