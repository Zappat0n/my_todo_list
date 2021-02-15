import projectFactory from '../models/project';
import storage from '../db/storage';
import designer from '../views/view_designer';

const projectController = () => {
  const addTodo = (elements) => {
    if ( storage.currentProject.getIndex(elements.title.value) === -1 ) {
      storage.currentProject.addTodo(elements, storage.currentProject);
    } else {
      designer().displayError(document.querySelector('.new_todo_warning'), 'That Todo name already exists')
    }
  };

  const getIndex = (name) => {
    for (let index = 0; index < storage.projects.length; index += 1) {
      if (name === storage.projects[index].name) return index;
    }
    return -1;
  };

  const save = () => {
    const index = getIndex(storage.currentProject.name);
    if (index === -1) {
      storage.projects.push(storage.currentProject);
    } else {
      storage.projects[index] = storage.currentProject;
    }
    storage.save();
    designer().updateTodos(storage.currentProject);
  };

  const createProject = (_name, _description, manager) => {
    const todos = [];
    const obj = { name: _name, description: _description, todos };
    storage.currentProject = projectFactory(save, obj);
    storage.projects.push(storage.currentProject);
    storage.save();
    designer().updateCurrentProject(_name);
    designer().updateProjects(manager);
    return storage.currentProject;
  };

  const addProject = (elements, manager) => {
    if (elements != null && getIndex(elements.name.value) === -1) {
      createProject(elements.name.value, elements.description.name, manager);
    } else {
      designer().displayError(document.querySelector('.new_project_warning'), 'That project name already exists')
    }
  };

  const getProject = (name) => {
    storage.currentProject = {};
    const index = getIndex(name);
    storage.currentProject = index !== -1 ? projectFactory(save, storage.projects[index]) : createProject('default', null);
    designer().updateCurrentProject(name);
    return storage.currentProject;
  };

  return {
    addProject, addTodo, createProject, getProject, save,
  };
};

const controller = projectController();

export { controller as default };
