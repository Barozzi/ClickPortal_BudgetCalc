/*
 * GB - generate the angular controller for cpritPeriodBudgetData
 * @param void
 * @return string - an html string
 */
function generateCpritBudgetCalcCtrl() {
    var sch = ShadowSCH.getRealOrShadowSCH();
    var readOnlyContext = wom.getContext('ReadOnly');
    var isReadOnly = !!(readOnlyContext == null || readOnlyContext == true);

    var CpritBudgetContext = {
        readOnly: isReadOnly,
        templateUrl: sch.FullUrlFromAssetUrl("/Custom/Agreements/BudgetDetails/cpritBudgetCalc.html.txt"),
        direct: this.getQualifiedAttribute("customAttributes.subagreementInformation.customAttributes.directBudget"),
        indirect: this.getQualifiedAttribute("customAttributes.subagreementInformation.customAttributes.indirectBudget"),
        total: this.getQualifiedAttribute("customAttributes.subagreementInformation.customAttributes.totalBudge")
    };

    return [
        '<script>',
        '    window.CpritBudgetContext = ' + JSON.stringify(CpritBudgetContext, null, '\t').replace(/\//g, '\\/') + ';',
        '</script>',
        '<span id="CpritBudgetCalcApp" ng-controller="CpritBudgetCalcCtrl">',
        '    <ng-include src="templateUrl"></ng-include>',
        '</span>',
        "<script>jQuery(document).ready(function(){angular.bootstrap(document.getElementById('CpritBudgetCalcApp'), ['CpritBudgetCalcApp'])});</script>"
    ].join('\n');
}

