let Button = null;
function handleButtonClick(element) {
    const custom = document.querySelector('.custom');
    custom.value = "";
    let value = element.value;
    if (Button) {
        Button.classList.remove('active');
    }
    element.classList.add('active');
    Button = element;
    let percentageValue = parseFloat(value) / 100;
    tipAmount(percentageValue);
}


const buttons = document.querySelectorAll('.button');

function handleCustomInput(e) {
    var value = e.target.value;
    buttons.forEach(button => {
        Button.classList.remove('active');
    })
    var customValue = parseFloat(value) / 100;
    tipAmount(customValue);

}

const tip = document.getElementById('tip');
const total = document.getElementById('total');

function tipAmount(percentage) {
    const person = getPersonCount();
    const bill = getBillValue();
    if (person == 0 || isNaN(person) || isNaN(percentage)) {
        tip.innerText = "0.00";
        total.innerText = "0.00";
    } else {
        let tipPerPerson = bill * percentage / person;
        let totalPerPerson = (bill / person) + tipPerPerson;
        tip.innerText = (Math.round(tipPerPerson * 100) / 100).toFixed(2);
        total.innerText = (Math.round(totalPerPerson * 100) / 100).toFixed(2);
    }
}

const reset = document.getElementById('reset');
reset.addEventListener('click', Reset);

function Reset() {
    tip.innerText = "0.00";
    total.innerText = "0.00";
    bill.value = "";
    people.value = "";
    buttons.forEach(button => {
        Button.classList.remove('active');
    })
}

const percentElements = document.querySelectorAll('.percent');
percentElements.forEach(element => {
    if (element.type === 'button') {
        element.classList.remove('active');
        element.addEventListener('click', () => {
            handleButtonClick(element)
        });
    } else if (element.type === 'text') {
        element.addEventListener('input', handleCustomInput);
    }
});

const bill = document.getElementById('bill');
bill.addEventListener('input', (e) => {
    let percentage = Button ? parseFloat(Button.value) / 100 : 0;
    tipAmount(percentage);
})

function getBillValue() {
    return parseFloat(bill.value) || 0;
}

const people = document.getElementById('people');
people.addEventListener('input', (e) => {
    if (people.value == "0") {
        document.querySelector('#tip').innerText = "0.00";
        document.querySelector('.right').style.display = "inline";
    } else {
        document.querySelector('.right').style.display = "none";
    }
    let percentage = Button ? parseFloat(Button.value) / 100 : 0;
    tipAmount(percentage);
})

function getPersonCount() {
    return parseFloat(people.value);
}
