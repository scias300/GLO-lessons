'use strict';

let allServicePrices,
    fullPrice,
    servicePercentPrice;

const isNumber = function (num) {
    if (num === null) {
        return false;
    }
    return !isNaN(parseFloat(num)) && isFinite(num);
};
const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    rollback: 50,
    adaptive: true,
    service1: '',
    service2: '',
    asking: function () {
        appData.title = prompt('Как называется ваш проект?', 'Название проекта');
        appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные');

        do {
            appData.screenPrice = prompt('Сколько будет стоить данная работа?');
        }
        while (!isNumber(appData.screenPrice));
        appData.screenPrice = +appData.screenPrice.trim();

        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    getRollbackMessage: function (price) {
        if (price >= 30000) {
            return 'Даем скидку в 10%';
        } else if (price < 30000 && price >= 15000) {
            return 'Даем скидку в 5%';
        } else if (price < 15000 && price >= 0) {
            return 'Скидка не предусмотрена';
        } else {
            return 'Что то пошло не так';
        }
    },
    getAllServicePrices: function () {
        let sum = 0;
        let num1,
            num2;

        for (let i = 0; i < 2; i++) {

            if (i === 0) {
                appData.service1 = prompt('Какой дополнительный тип услуги нужен?', 'Дополнительная услуга 1');

                do {
                    num1 = prompt('Сколько это будет стоить?');
                }
                while (!isNumber(num1));

            } else if (i === 1) {
                appData.service2 = prompt('Какой дополнительный тип услуги нужен?', 'Дополнительная услуга 2');

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
    },
    getFullPrice: function () {
        return +appData.screenPrice + allServicePrices;
    },
    getTitle: function () {
        let newTitle = appData.title.trim();
        return newTitle[0].toUpperCase() + newTitle.slice(1).toLowerCase();
    },
    getServicePercentPrices: function () {
        return Math.ceil(fullPrice - fullPrice * (appData.rollback / 100));
    },
    start: function () {
        appData.asking();
        allServicePrices = appData.getAllServicePrices();
        fullPrice = appData.getFullPrice();
        servicePercentPrice = appData.getServicePercentPrices();
        appData.logger();
    },
    logger: function () {
        console.log(appData.screens.toLowerCase().split(', '));
        console.log(appData.getRollbackMessage(fullPrice));
        console.log(servicePercentPrice);
        for (let key in appData) {
            console.log('Название ' + key + ' Значение ' + appData[key]);
        }
    }
};

appData.start();