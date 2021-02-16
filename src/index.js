import './css/style.scss';
import designer from './views/view_designer';
import { fieldsForNewProjectForm, fieldsForNewTodoForm } from './views/design_data';
import controller from './controllers/project';

const body = document.querySelector('body');
designer().addElement(body, 'h1', 'My Todo List');
const container = designer().addElement(body, 'div', null, ['container']);

const leftSide = designer().addElement(container, 'div', null, ['left_side']);
designer().addElement(leftSide, 'h2', 'Projects');
let titleAndButton = designer().addElement(leftSide, 'div', null, ['title_and_button']);
designer().addElement(titleAndButton, 'h3', null, ['current_project']);
let button = designer().addElement(titleAndButton, 'button', '+', ['show_project_form_button']);
const formProject = designer(controller).createForm(leftSide, 'form_new_project', 'form', fieldsForNewProjectForm, controller.addProject);
formProject.classList.add('d-none');
button.addEventListener('click', () => { formProject.classList.toggle('d-none'); });
designer().addElement(leftSide, 'div', null, ['new_project_warning']);
designer().addElement(leftSide, 'ul', null, ['ul_projects']);
designer().updateProjects(controller);

const centerSide = designer().addElement(container, 'div', null, ['center_side']);
designer().addElement(centerSide, 'h2', 'Todos');
titleAndButton = designer().addElement(centerSide, 'div', null, ['title_and_button']);
designer().addElement(titleAndButton, 'h3', 'Create Todo');
button = designer().addElement(titleAndButton, 'button', '+', ['show_project_form_button']);
controller.getProject('default');
const formTodo = designer().createForm(centerSide, 'form_new_todo', 'form', fieldsForNewTodoForm, controller.addTodo);
formTodo.classList.add('d-none');
button.addEventListener('click', () => { formTodo.classList.toggle('d-none'); });
designer().addElement(centerSide, 'div', null, ['new_todo_warning']);
designer().addElement(centerSide, 'div', null, ['todos']);
designer().updateTodos(controller.getProject('default'));

const rightSide = designer().addElement(container, 'div', null, ['right_side']);
designer().addElement(rightSide, 'h2', 'Current Todo');
designer().addElement(rightSide, 'div', null, ['todo_container']);
