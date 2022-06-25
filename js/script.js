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
    totalInputTotalRollback = totalInputs[4],
    cmsOpen = document.querySelector('#cms-open'),
    cmsVariants = document.querySelector('.hidden-cms-variants'),
    cmsVariantsInput = cmsVariants.querySelector('.main-controls__input'),
    cmsSelect = document.querySelector('#cms-select'),
    cmsInput = document.querySelector('#cms-other-input');
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
        this.addTitle();
        const startApp = this.start.bind(appData);
        calc.addEventListener('click', startApp);
        buttonPlus.addEventListener('click', this.addScreenBlock);
        const appAddRollback = this.addRollback.bind(appData);
        range.addEventListener('input', appAddRollback);
        const appReset = this.reset.bind(appData);
        reset.addEventListener('click', appReset);
        cmsOpen.addEventListener('click', this.showCms);
        cmsSelect.addEventListener('input', this.chooseCMS);
    },
    addTitle: function () {
        document.title = title.textContent;
    },
    showResult: function () {
        totalInputCost.value = this.screenPrice;
        totalInputServices.value = this.servicePricesPercent + this.servicePricesNumber;
        totalInputTotal.value = this.fullPrice;
    },
    addScreens: function () {
        screens = document.querySelectorAll('.screen');
        this.screens = [];
        let count = 0;
        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;
            if (select.value === '' || +input.value < 1 || input.value === null) {
                this.screens = [];
                return false;
            } else {
                count += +input.value;
                this.screens.push({
                    id: index,
                    name: selectName,
                    price: +select.value * +input.value
                });
                this.disableFields();
            }
        });
        totalInputScreens.value = count;
    },
    addServices: function () {
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            }
        });
        otherItemsNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }
        });
    },
    addScreenBlock: function () {
        const cloneScreen = screens[0].cloneNode(true);
        screens[screens.length - 1].after(cloneScreen);
    },
    addPrices: function () {
        this.servicePricesPercent = 0;
        this.servicePricesNumber = 0;
        this.screenPrice = this.screens.reduce((sum, current) => sum + current.price, 0);
        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }
        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
        }
        this.fullPrice = +this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;
        this.fullPrice += this.fullPrice * (this.chooseCMS() / 100);
        this.servicePercentPrice = Math.ceil(this.fullPrice - this.fullPrice * (this.rollback / 100));
        totalInputTotalRollback.value = this.servicePercentPrice;
        range.addEventListener('input', () => {
            this.servicePercentPrice = Math.ceil(this.fullPrice - this.fullPrice * (this.rollback / 100));
            totalInputTotalRollback.value = this.servicePercentPrice;
        });
    },
    addRollback: function () {
        this.rollback = range.value;
        rangeValue.textContent = range.value + '%';
    },
    disableFields: function () {
        document.querySelectorAll('select').forEach((item) => item.disabled = true);
        document.querySelectorAll('input[type=text]').forEach((item) => item.disabled = true);
        calc.style.display = 'none';
        reset.style.display = 'block';
    },
    emptyObj: function () {
        this.title = '';
        this.screens = [];
        this.screenPrice = 0;
        this.rollback = 0;
        this.adaptive = true;
        this.servicePricesPercent = 0;
        this.servicePricesNumber = 0;
        this.fullPrice = 0;
        this.servicePercentPrice = 0;
        this.servicesPercent = {};
        this.servicesNumber = {};
    },
    makeDefault: function () {
        calc.style.display = 'block';
        reset.style.display = 'none';
        document.querySelectorAll('input[type=checkbox]').forEach((item) => item.checked = false);
        const screens = document.querySelectorAll('.screen');
        screens.forEach((screen, index) => {
            if (index === 0) {
                screen.querySelector('select').disabled = false;
                screen.querySelector('select').value = '';
                screen.querySelector('input[type=text]').disabled = false;
                screen.querySelector('input[type=text]').value = '';
            } else {
                screen.remove();
            }
        });
        for (let item of totalInputs) {
            item.value = 0;
        }
        range.value = this.rollback;
        rangeValue.textContent = range.value + '%';
        cmsSelect.disabled = false;
        cmsSelect.value = '';
        cmsInput.disabled = false;
        cmsInput.value = '';
        cmsVariantsInput.style.display = 'none';
    },
    reset: function () {
        this.emptyObj();
        this.makeDefault();
        this.showCms();
    },
    showCms: function () {
        if (cmsOpen.checked) {
            cmsVariants.style.display = 'flex';
        } else {
            cmsVariants.style.display = 'none';
        }
    },
    chooseCMS: function () {
        let cmsPrice = 0;
        if (cmsSelect.value === '50') {
            cmsPrice = 50;
        }
        if (cmsSelect.value === 'other') {
            cmsVariantsInput.style.display = 'flex';
            cmsPrice = +cmsInput.value;
        } else {
            cmsVariantsInput.style.display = 'none';
            cmsInput.value = '';
        }
        return cmsPrice;
    },
    start: function () {
        this.addScreens();
        this.addServices();
        this.addPrices();
        this.showResult();
        // const appLogger = this.logger.bind(appData);
        // appLogger();
    },
    logger: function () {
        for (let key in this) {
            console.log('Название ' + key + ' Значение ' + this[key]);
        }
    }
};

appData.init();