'use strict';

const books = document.querySelectorAll('.book');
const body = document.querySelector('body');
const adv = document.querySelector('.adv');
const book2Chapters = books[0].childNodes[3].children;
const book5Chapters = books[5].childNodes[3].children;

books[0].before(books[1]);
books[5].after(books[2]);
books[3].before(books[4]);

body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

books[4].childNodes[1].childNodes[1].textContent = 'Книга 3. this и Прототипы Объектов';

adv.remove();

book2Chapters[9].after(book2Chapters[2]);
book2Chapters[2].after(book2Chapters[5]);
book2Chapters[4].before(book2Chapters[7]);
book5Chapters[1].after(book5Chapters[9]);
book5Chapters[5].after(book5Chapters[3]);
book5Chapters[8].after(book5Chapters[6]);

let ch8 = book5Chapters[1].cloneNode(true);
ch8.textContent = 'Глава 8: За пределами ES6';
books[2].childNodes[3].children[8].after(ch8);