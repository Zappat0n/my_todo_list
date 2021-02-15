import './css/style.scss';
import designer from './views/view_designer';
import { fieldsForNewProjectForm, fieldsForNewTodoForm } from './views/design_data';
import projectControllerFactory from './controllers/project';

const controller = projectControllerFactory();
const body = document.querySelector('body');
designer().addElement(body, 'h1', 'My Todo List');
const container = designer().addElement(body, 'div', null, ['container']);

const leftSide = designer().addElement(container, 'div', null, ['left_side']);

designer().addElement(leftSide, 'h2', 'Projects');
designer().addElement(leftSide, 'h3', null, ['current_project']);
designer(controller).createForm(leftSide, 'form_new_project', 'form', fieldsForNewProjectForm, controller.addProject);
designer().addElement(leftSide, 'div', null, ['new_project_warning']);

designer().addElement(leftSide, 'ul', null, ['ul_projects']);
designer().updateProjects(controller);

const rightSide = designer().addElement(container, 'div', null, ['right_side']);
controller.getProject('default');
designer().createForm(rightSide, 'form_new_todo', 'form', fieldsForNewTodoForm, controller.addTodo);
designer().addElement(rightSide, 'div', null, ['new_todo_warning']);

designer().addElement(rightSide, 'div', null, ['todos']);
designer().updateTodos(controller.getProject('default'));
