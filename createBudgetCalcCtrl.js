/*
 * GB - generate the angular controller for entirePeriodBudgetData
 * @param void
 * @return string - an html string
 */
function generateEntireBudgetCalcCtrl() {
    var sch = ShadowSCH.getRealOrShadowSCH();
    var readOnlyContext = wom.getContext("ReadOnly");
    var isReadOnly = !!(readOnlyContext == null || readOnlyContext == true);

    var EntireBudgetContext = {
        readOnly: isReadOnly,
        templateUrl: sch.FullUrlFromAssetUrl("/Custom/Templates/entireBudgetCalc.html.txt"),
        direct: this.getQualifiedAttribute("customAttributes.budgetEntirePeriod.customAttributes.direct"),
        indirect: this.setQualifiedAttribute("customAttributes.budgetEntirePeriod.customAttributes.indirect"),
        total: this.setQualifiedAttribute("customAttributes.budgetEntirePeriod.customAttributes.total")
    };

    return [
        '<script>',
        '    window.EntireBudgetContext = ' + JSON.stringify(EntireBudgetContext, null, '\t').replace(/\//g, '\\/') + ';',
        '</script>',
        '<div ng-app="EntireBudgetCalcApp" ng-controller="EntireBudgetCtrl">',
        '    <ng-include src="templateUrl"></ng-include>',
        '</div>'
    ].join('\n');
}
