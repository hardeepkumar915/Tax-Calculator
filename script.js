// for initialize the tooltip
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

const submit = document.getElementById('submit');

submit.addEventListener("click", calculateTax, false)


// function for calculate the Tax
function calculateTax(event) {
    event.preventDefault();
    const annualIncome = parseFloat(document.getElementById('annualIncome').value || 0);
    const extraIncome = parseFloat(document.getElementById('extraIncome').value || 0);
    const ageGroup = document.getElementById('ageGroup').value;
    const deduction = parseFloat(document.getElementById('deduction').value || 0);

    if (isNaN(annualIncome) || isNaN(extraIncome) || ageGroup == 0 || isNaN(deduction)) {
        if (isNaN(annualIncome)) showTooltip(".annualIncomeTooltip");

        if (isNaN(extraIncome)) showTooltip(".extraIncomeTooltip");

        if (ageGroup == 0) showTooltip(".ageGroupTooltip");

        if (isNaN(deduction)) showTooltip(".deductionTooltip");

        return;
    } else {

        let tax = 0;
        let overallIncome = annualIncome + extraIncome - deduction;

        // Tax calculation logic goes here
        // This is just a placeholder calculation, you need to replace it with your actual tax calculation logic
        if (overallIncome > 800000) {
            if (ageGroup == 1) {
                tax = (overallIncome - 800000) * 0.3;
            } else if (ageGroup == 2) {
                tax = (overallIncome - 800000) * 0.4;
            } else {
                tax = (overallIncome - 800000) * 0.1;
            }
        } else {
            tax = "Your overall income is less then 800000 so there will be no tax";
        }
        // Display result in modal
        document.getElementById('result').innerHTML = overallIncome - tax + " Rs.";

        $('#resultModal').modal('show');
        console.log("tax -> " + tax);
    }


}

// function for show and hide the error tooltip
function showTooltip(elementClass) {
    $(elementClass).tooltip('show');
    setTimeout(() => {
        $(elementClass).tooltip('hide');
    }, 3000);
}