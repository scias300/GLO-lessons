'use strict';

const title = prompt('Как называется ваш проект?'),
    screens = prompt('Какие типы экранов нужно разработать?'),
    screenPrice = +prompt('Сколько будет стоить данная работа?'),
    rollback = 50,
    adaptive = confirm('Нужен ли адаптив на сайте?'),
    service1 = prompt('Какой дополнительный тип услуги нужен?'),
    servicePrice1 = +prompt('Сколько это будет стоить?'),
    service2 = prompt('Какой дополнительный тип услуги нужен?'),
    servicePrice2 = +prompt('Сколько это будет стоить?');

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
    return servicePrice1 + servicePrice2;
};
const allServicePrices = getAllServicePrices();
function getFullPrice() {
    return screenPrice + allServicePrices;
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