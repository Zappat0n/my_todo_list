import './css/style.scss';

const body = document.querySelector('body');

const element = document.createElement('div');

const h1 = document.createElement('h1');
h1.textContent = 'My Todo List';
element.appendChild(h1);
body.appendChild(element);
