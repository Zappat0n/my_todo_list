import './css/style.scss';
import designer from './designer';
import { fieldsForNewTodoForm } from './design_data';

const body = document.querySelector('body');

designer().createForm(body, 'form_new_todo', 'form', fieldsForNewTodoForm);


const element = document.createElement('div');

const h1 = document.createElement('h1');
h1.textContent = 'My Todo List';
element.appendChild(h1);
body.appendChild(element);
