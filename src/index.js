import './css/style.scss';
import designer from './designer';
import { fieldsForNewProjectForm, fieldsForNewTodoForm } from './design_data';
import projectManager from './project_manager';

const body = document.querySelector('body');
designer().addElement(body, 'h1', 'My Todo List');
const container = designer().addElement(body, 'div', null, ['container']);

const leftSide = designer().addElement(container, 'div', null, ['left_side']);

designer().addElement(leftSide, 'h2', 'Projects');
designer().createForm(leftSide, 'form_new_project', 'form', fieldsForNewProjectForm, projectManager().addProject);

const ulProject = designer().addElement(leftSide, 'ul');
projectManager().getProjects().forEach(project => {
  const li = designer().addElement(ulProject, 'li', project.name, ['project']);
  li.addEventListener('click', (e) => {
    const currentProject = projectManager().getProject(e.target.textContent);
    designer().updateTodos(currentProject);
  });
});


const rightSide = designer().addElement(container, 'div', null, ['right_side']);
const currentProject = projectManager().getProject('default');
designer().createForm(rightSide, 'form_new_todo', 'form', fieldsForNewTodoForm, currentProject.addTodo);

designer().addElement(rightSide, 'div', null, ['todos']);
designer().updateTodos(projectManager().getProject('default'));
