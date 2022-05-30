const title = "project",
    screens = "Простые, Сложные, Интерактивные",
    screenPrice = 12345,
    rollback = 50,
    fullPrice = 54321,
    adaptive = true;
alert('Любой текст!');
console.log('Сообщение с любым текстом');
console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log("Стоимость верстки экранов " + screenPrice + " долларов");
console.log("Стоимость разработки сайта " + fullPrice + " долларов");
console.log(screens.toLowerCase().split(', '));
console.log("Процент отката посреднику за работу " + fullPrice * (rollback / 100));