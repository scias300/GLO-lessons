'use strict';

const title = document.getElementsByTagName('h1'),
    buttons = document.getElementsByClassName('handler_btn'),
    buttonPlus = document.querySelector('.screen-btn'),
    otherItemsPercent = document.querySelectorAll('.other-items.percent'),
    otherItemsNumber = document.querySelectorAll('.other-items.number'),
    range = document.querySelector('.rollback input[type="range"]'),
    rangeValue = document.querySelector('.rollback .range-value'),
    totalInputs = document.getElementsByClassName('total-input');
let screens = document.querySelectorAll('.screen');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    rollback: 50,
    adaptive: true,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    services: {},
    isNumber: function (num) {
        if (num === null) {
            return false;
        }
        return !isNaN(parseFloat(num)) && isFinite(num);
    },
    asking: function () {
        do {
            appData.title = prompt('Как называется ваш проект?', 'Название проекта');
        } while (!isNaN(appData.title));

        for (let i = 1; i <= 2; i++) {
            let name;
            let price = 0;
            do {
                name = prompt('Какие типы экранов нужно разработать?', 'Тип');
            } while (!isNaN(name));
            do {
                price = prompt('Сколько будет стоить данная работа?');
            }
            while (!appData.isNumber(price));
            appData.screens.push({ id: i, name: name, price: +price });
        }

        for (let i = 1; i <= 2; i++) {
            let name;
            let price = 0;
            do {
                name = prompt('Какой дополнительный тип услуги нужен?', 'Дополнительная услуга');
            } while (!isNaN(name));
            do {
                price = prompt('Сколько это будет стоить?');
            }
            while (!appData.isNumber(price));
            appData.services[name + i] = +price;
        }

        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    addPrices: function () {
        appData.screenPrice = appData.screens.reduce((sum, current) => sum + current.price, 0);
        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
    },
    getRollbackMessage: function (price) {
        if (price >= 30000) {
            return 'Даем скидку в 10%';
        }
        if (price < 30000 && price >= 15000) {
            return 'Даем скидку в 5%';
        }
        if (price < 15000 && price >= 0) {
            return 'Скидка не предусмотрена';
        }
        return 'Что то пошло не так';
    },
    getFullPrice: function () {
        appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
    },
    getTitle: function () {
        let newTitle = appData.title.trim();
        return newTitle[0].toUpperCase() + newTitle.slice(1).toLowerCase();
    },
    getServicePercentPrices: function () {
        appData.servicePercentPrice = Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback / 100));
    },
    start: function () {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice();
        appData.getServicePercentPrices();
        appData.logger();
    },
    logger: function () {
        console.log(appData.screens);
        console.log(appData.getRollbackMessage(appData.fullPrice));
        console.log(appData.servicePercentPrice);
        for (let key in appData) {
            console.log('Название ' + key + ' Значение ' + appData[key]);
        }
    }
};

appData.start();