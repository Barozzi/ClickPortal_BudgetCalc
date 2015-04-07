/*
 * GB - JSON data is being stored in a hidden field in the view
 * we are grabbing that, parsing it, and storing it in the
 * appropriate properties on the project.
 * @param sch - Scripting Context Helper
 * @return void
 */
function persistCpritBudgetData(sch) {
    var cpritJsonDataAsString = sch.getFormVariable("cpritBudgetData");
    var cpritBudgetData = JSON.parse(cpritJsonDataAsString, null);
    var cpritBudgetIsValid = validateBudgetData(cpritBudgetData);

    this.setQualifiedAttribute("customAttributes.subagreementInformation.customAttributes.directBudget", cpritBudgetData.direct);
    this.setQualifiedAttribute("customAttributes.subagreementInformation.customAttributes.indirectBudget", cpritBudgetData.indirect);
    this.setQualifiedAttribute("customAttributes.subagreementInformation.customAttributes.totalBudge", cpritBudgetData.total);

    if (!cpritBudgetIsValid) {
        throw new Error (-1, "Please enter period budget data below. Budget data must be numeric.");
    }
}

function validateBudgetData(budget) {
    if (!budget || !budget.direct) return false;
    var isValid = true;
    for (var key in budget) {
        var cpritValue = budget[key];

        if (!cpritValue && cpritValue != 0) isValid = false;
        if (isNaN(cpritValue)) isValid = false;
        if (cpritValue < 0) isValid = false;
    }
    return isValid;
}
