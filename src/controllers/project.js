import projectFactory from '../models/project';
import storageManager from '../db/storage';
import designer from '../views/view_designer';

const projectController = () => {
  const projects = storageManager().load();
  let currentProject;

  const addTodo = (elements) => {
    currentProject.addTodo(elements);
  };

  const getIndex = (name) => {
    for (let index = 0; index < projects.length; index += 1) {
      if (name === projects[index].name) return index;
    }
    return -1;
  };

  const save = () => {
    const index = getIndex(currentProject.name);
    if (index === -1) {
      projects.push(currentProject);
    } else {
      projects[index] = currentProject;
    }
    storageManager().save(projects);
    designer().updateTodos(currentProject);
  };

  const createProject = (_name, _description, manager) => {
    const todos = [];
    const obj = { name: _name, description: _description, todos };
    currentProject = projectFactory(save, obj);
    projects.push(currentProject);
    storageManager().save(projects);
    designer().updateCurrentProject(_name);
    designer().updateProjects(manager);
    return currentProject;
  };

  const addProject = (elements, manager) => {
    if (elements != null && getIndex(elements.name.value) === -1) {
      createProject(elements.name.value, elements.description.name, manager);
    }
  };

  const getProject = (name) => {
    currentProject = {};
    const index = getIndex(name);
    currentProject = index !== -1 ? projectFactory(save, projects[index]) : createProject('default', null);
    designer().updateCurrentProject(name);
    return currentProject;
  };

  const getProjects = () => projects;

  return {
    addProject, addTodo, createProject, currentProject, getProject, getProjects, save,
  };
};

const projectControllerFactory = () => projectController();

export { projectControllerFactory as default };
