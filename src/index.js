import './css/style.scss';
import designer from './designer';
import { fieldsForNewTodoForm } from './design_data';
import projectManager from './project_manager';

const body = document.querySelector('body');
const currentProject = projectManager().getProject('default');
designer().createForm(body, 'form_new_todo', 'form', fieldsForNewTodoForm, currentProject.addTodo);


const element = document.createElement('div');

const h1 = document.createElement('h1');
h1.textContent = 'My Todo List';
element.appendChild(h1);
body.appendChild(element);
