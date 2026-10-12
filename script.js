
const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("people");
const customTipInput = document.getElementById("customTip");
const tipButtons = document.querySelectorAll(".tip-btn");
const tipAmountDisplay = document.getElementById("tipAmount");
const totalBillDisplay = document.getElementById("totalBill");
const tipPerPersonDisplay = document.getElementById("tipPerPerson");
const totalPerPersonDisplay = document.getElementById("totalPerPerson");
const message = document.getElementById("message");
const resetBtn = document.getElementById("resetBtn");

let selectedTip = 10;

function formatCurrency(amount) {
    return "₹" + amount.toFixed(2);
}

function calculateTip() {
    const bill = Number(billInput.value);
    const people = Number(peopleInput.value);
    const tipPercentage = customTipInput.value.trim() !== ""
        ? Number(customTipInput.value)
        : selectedTip;

    message.textContent = "";

    if (billInput.value.trim() === "" || bill < 0) {
        message.textContent = "Please enter a valid bill amount.";
        displayResults(0, 0, 0, 0);
        return;
    }

    if (!Number.isInteger(people) || people < 1) {
        message.textContent = "Please enter at least one person.";
        displayResults(0, 0, 0, 0);
        return;
    }

    if (!Number.isFinite(tipPercentage) || tipPercentage < 0 || tipPercentage > 100) {
        message.textContent = "Tip percentage must be between 0 and 100.";
        displayResults(0, 0, 0, 0);
        return;
    }

    const tip = bill * tipPercentage / 100;
    const total = bill + tip;

    displayResults(tip, total, tip / people, total / people);
}

function displayResults(tip, total, tipPerPerson, totalPerPerson) {
    tipAmountDisplay.textContent = formatCurrency(tip);
    totalBillDisplay.textContent = formatCurrency(total);
    tipPerPersonDisplay.textContent = formatCurrency(tipPerPerson);
    totalPerPersonDisplay.textContent = formatCurrency(totalPerPerson);
}

tipButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedTip = Number(button.dataset.tip);
        customTipInput.value = "";

        tipButtons.forEach(item => item.classList.remove("active"));
        button.classList.add("active");

        calculateTip();
    });
});

customTipInput.addEventListener("input", () => {
    tipButtons.forEach(button => button.classList.remove("active"));
    calculateTip();
});

billInput.addEventListener("input", calculateTip);
peopleInput.addEventListener("input", calculateTip);

resetBtn.addEventListener("click", () => {
    billInput.value = "";
    peopleInput.value = "1";
    customTipInput.value = "";
    selectedTip = 10;

    tipButtons.forEach(button => {
        button.classList.toggle("active", Number(button.dataset.tip) === 10);
    });

    message.textContent = "";
    calculateTip();
});

calculateTip();
