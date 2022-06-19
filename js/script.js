'use strict';

const title = document.getElementsByTagName('h1')[0],
    buttons = document.getElementsByClassName('handler_btn'),
    calc = buttons[0],
    reset = buttons[1],
    buttonPlus = document.querySelector('.screen-btn'),
    otherItemsPercent = document.querySelectorAll('.other-items.percent'),
    otherItemsNumber = document.querySelectorAll('.other-items.number'),
    range = document.querySelector('.rollback input[type="range"]'),
    rangeValue = document.querySelector('.rollback .range-value'),
    totalInputs = document.getElementsByClassName('total-input'),
    totalInputCost = totalInputs[0],
    totalInputScreens = totalInputs[1],
    totalInputServices = totalInputs[2],
    totalInputTotal = totalInputs[3],
    totalInputTotalRollback = totalInputs[4];
let screens = document.querySelectorAll('.screen');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    rollback: 0,
    adaptive: true,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    init: function () {
        appData.addTitle();
        calc.addEventListener('click', appData.start);
        buttonPlus.addEventListener('click', appData.addScreenBlock);
        range.addEventListener('input', appData.addRollback);
    },
    addTitle: function () {
        document.title = title.textContent;
    },
    showResult: function () {
        totalInputCost.value = appData.screenPrice;
        totalInputServices.value = appData.servicePricesPercent + appData.servicePricesNumber;
        totalInputTotal.value = appData.fullPrice;
    },
    addScreens: function () {
        screens = document.querySelectorAll('.screen');
        appData.screens = [];
        let count = 0;
        screens.forEach(function (screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;
            if (select.value === '' || +input.value < 1 || input.value === null) {
                appData.screens = [];
                return false;
            } else {
                count += +input.value;
                appData.screens.push({
                    id: index,
                    name: selectName,
                    price: +select.value * +input.value
                });
            }
        });
        totalInputScreens.value = count;
    },
    addServices: function () {
        otherItemsPercent.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }
        });
        otherItemsNumber.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }
        });
    },
    addScreenBlock: function () {
        const cloneScreen = screens[0].cloneNode(true);
        screens[screens.length - 1].after(cloneScreen);
    },
    addPrices: function () {
        appData.servicePricesPercent = 0;
        appData.servicePricesNumber = 0;
        appData.screenPrice = appData.screens.reduce((sum, current) => sum + current.price, 0);
        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];
        }
        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
        }
        appData.fullPrice = +appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;
        appData.servicePercentPrice = Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback / 100));
        totalInputTotalRollback.value = appData.servicePercentPrice;
        range.addEventListener('input', function () {
            appData.servicePercentPrice = Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback / 100));
            totalInputTotalRollback.value = appData.servicePercentPrice;
        });
    },
    addRollback: function () {
        appData.rollback = range.value;
        rangeValue.textContent = range.value + '%';
    },
    start: function () {
        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        // appData.logger();
        appData.showResult();
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

appData.init();