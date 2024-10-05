const reset = document.getElementById('reset');
reset.addEventListener('click', Reset);

function Reset() {
    tip.innerText = "0.00";
    total.innerText = "0.00";
    bill.value = "";
    people.value = "";
    Button.classList.remove('active');
    reset.classList.remove('hover');
    reset.classList.add('reseted');
    custom.value = "";
    Button = null;
    customInput = null;
}

let Button = null;
let count = 0;
const custom = document.querySelector('.custom');

function handleButtonClick(element) {
    custom.value = "";
    let value = element.value;
    reset.classList.add('hover');
    reset.classList.remove('reseted');
    let percentageValue = parseFloat(value) / 100;

    if (Button) {
        Button.classList.remove('active');
    }

    if (Button === element) {
        if (count % 2 === 0) {
            percentageValue = 0;
            Button.classList.remove('active');
            count++;
        } else {
            Button.classList.add('active');
        }
    } else {
        element.classList.add('active');
        count = 0;
    }
    Button = element;
    tipAmount(percentageValue);
}

let customInput = null;

function handleCustomInput(element) {
    let value = element.value;
    reset.classList.add('hover');
    reset.classList.remove('reseted');
    let customValue = parseFloat(value) / 100;

    if (Button) {
        Button.classList.remove('active');
    }

    customInput = element;
    tipAmount(customValue);
}

const tip = document.getElementById('tip');
const total = document.getElementById('total');

function tipAmount(percentage) {
    const person = getPersonCount();
    const bill = getBillValue();

    if (person === 0 || isNaN(person) || isNaN(percentage)) {
        tip.innerText = "0.00";
        total.innerText = "0.00";
    } else {
        let tipPerPerson = (bill * percentage) / person;
        let totalPerPerson = (bill / person) + tipPerPerson;
        tip.innerText = (Math.round(tipPerPerson * 100) / 100).toFixed(2);
        total.innerText = (Math.round(totalPerPerson * 100) / 100).toFixed(2);
    }
}

const percentElements = document.querySelectorAll('.percent');
percentElements.forEach(element => {
    if (element.type === 'button') {
        element.classList.remove('active');
        element.addEventListener('click', () => {
            handleButtonClick(element);
        });
    } else if (element.type === 'text') {
        element.addEventListener('input', () => {
            handleCustomInput(element);
        });
    }
});

const bill = document.getElementById('bill');
bill.addEventListener('input', (e) => {
    let percentButton = Button ? parseFloat(Button.value) / 100 : 0;
    let percentInput = customInput ? parseFloat(customInput.value) / 100 : 0;
    reset.classList.add('hover');
    reset.classList.remove('reseted');
    
    if (percentButton === 0) {
        tipAmount(percentInput);
    } else if (people.value === "") {
        reset.classList.remove('hover');
        reset.classList.add('reseted');
    } else {
        tipAmount(percentButton);
    }
});

function getBillValue() {
    return parseFloat(bill.value) || 0;
}

const people = document.getElementById('people');
people.addEventListener('input', (e) => {
    if (people.value === "0" || people.value === "") {
        document.querySelector('#tip').innerText = "0.00";
        document.querySelector('.right').style.display = "inline";
    } else {
        document.querySelector('.right').style.display = "none";
    }

    let percentButton = Button ? parseFloat(Button.value) / 100 : 0;
    let percentInput = customInput ? parseFloat(customInput.value) / 100 : 0;
    reset.classList.add('hover');
    reset.classList.remove('reseted');
    
    if (percentButton === 0) {
        tipAmount(percentInput);
    } else if (people.value === "") {
        reset.classList.remove('hover');
        reset.classList.add('reseted');
    } else {
        tipAmount(percentButton);
    }
});

function getPersonCount() {
    return parseFloat(people.value) || 0;
}
