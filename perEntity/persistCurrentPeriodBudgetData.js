/*
 * GB - JSON data is being stored in a hidden field in the view
 * we are grabbing that, parsing it, and storing it in the
 * appropriate properties on the project.
 * @param sch - Scripting Context Helper
 * @return void
 */
function persistCurrentPeriodBudgetData(sch) {
    var currentPeriodJsonDataAsString = sch.getFormVariable("currentPeriodBudgetData");
    var currentPeriodBudgetData = JSON.parse(currentPeriodJsonDataAsString, null);
    var currentPeriodBudgetIsValid = validateBudgetData(currentPeriodBudgetData);

    if (currentPeriodBudgetIsValid) {
        this.setQualifiedAttribute("customAttributes.budgetCurrentPeriod.customAttributes.direct", currentPeriodBudgetData.direct);
        this.setQualifiedAttribute("customAttributes.budgetCurrentPeriod.customAttributes.indirect", currentPeriodBudgetData.indirect);
        this.setQualifiedAttribute("customAttributes.budgetCurrentPeriod.customAttributes.total", currentPeriodBudgetData.total);
    } else {
        throw new Error (-1, "Please enter period budget data below. Budget data must be numeric.");
    }
}

function validateBudgetData(budget) {
    if (!budget || !budget.direct) return false;
    var isValid = true;
    for (var key in budget) {
        var currentValue = budget[key];

        if (!currentValue) isValid = false;
        if (isNaN(currentValue)) isValid = false;
        if (currentValue < 0) isValid = false;
    }
    return isValid;
}
