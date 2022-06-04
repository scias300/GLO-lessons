'use strict';

let title,
    screens,
    screenPrice,
    rollback = 50,
    adaptive,
    service1,
    service2;

const isNumber = function (num) {
    if (num === null) {
        return false;
    }
    return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
    title = prompt('Как называется ваш проект?', 'Название проекта');
    screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные');

    do {
        screenPrice = prompt('Сколько будет стоить данная работа?');
    }
    while (!isNumber(screenPrice));
    screenPrice = +screenPrice.trim();

    adaptive = confirm('Нужен ли адаптив на сайте?');
};

const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
};
const getRollbackMessage = function (price) {
    if (price >= 30000) {
        return 'Даем скидку в 10%';
    } else if (price < 30000 && price >= 15000) {
        return 'Даем скидку в 5%';
    } else if (price < 15000 && price >= 0) {
        return 'Скидка не предусмотрена';
    } else {
        return 'Что то пошло не так';
    }
};
const getAllServicePrices = function () {
    let sum = 0;
    let num1,
        num2;

    for (let i = 0; i < 2; i++) {

        if (i === 0) {
            service1 = prompt('Какой дополнительный тип услуги нужен?', 'Дополнительная услуга 1');

            do {
                num1 = prompt('Сколько это будет стоить?');
            }
            while (!isNumber(num1));

        } else if (i === 1) {
            service2 = prompt('Какой дополнительный тип услуги нужен?', 'Дополнительная услуга 2');

            do {
                num2 = prompt('Сколько это будет стоить?');
            }
            while (!isNumber(num2));
        }
    }
    num1 = num1.trim();
    num2 = num2.trim();
    sum = +num1 + (+num2);
    return sum;
};

asking();

const allServicePrices = getAllServicePrices();

function getFullPrice() {
    return +screenPrice + allServicePrices;
}
const fullPrice = getFullPrice();

const getTitle = function () {
    let newTitle = title.trim();
    return newTitle[0].toUpperCase() + newTitle.slice(1).toLowerCase();
};

const getServicePercentPrices = function () {
    return Math.ceil(fullPrice - fullPrice * (rollback / 100));
};

const servicePercentPrice = getServicePercentPrices();

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);
console.log(screens.toLowerCase().split(', '));
console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice);