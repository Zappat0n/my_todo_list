import './css/style.scss';
import designer from './designer';
import { fieldsForNewProjectForm, fieldsForNewTodoForm } from './design_data';
import projectManagerFactory from './project_manager';


const manager = projectManagerFactory();

const body = document.querySelector('body');
designer().addElement(body, 'h1', 'My Todo List');
const container = designer().addElement(body, 'div', null, ['container']);

const leftSide = designer().addElement(container, 'div', null, ['left_side']);

designer().addElement(leftSide, 'h2', 'Projects');
designer().addElement(leftSide, 'h3', null, ['current_project']);
designer(manager).createForm(leftSide, 'form_new_project', 'form', fieldsForNewProjectForm, manager.addProject);

designer().addElement(leftSide, 'ul', null, ['ul_projects']);
designer().updateProjects(manager);

const rightSide = designer().addElement(container, 'div', null, ['right_side']);
manager.getProject('default');
designer().createForm(rightSide, 'form_new_todo', 'form', fieldsForNewTodoForm, manager.addTodo);

designer().addElement(rightSide, 'div', null, ['todos']);
designer().updateTodos(manager.getProject('default'));
