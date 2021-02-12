import projectFactory from './project';
import storageManager from './storage';

const projectManager = () => {
  const projects = storageManager().load();
  let currentProject;

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
  };

  const createProject = (name, description) => {
    const obj = { name, description };
    currentProject = projectFactory(save, obj);
    projects.push(currentProject);
    storageManager().save(projects);
    return currentProject;
  };

  const addProject = (elements) => {
    if (elements != null && getIndex(elements.name.value) === -1) {
      createProject(elements.name.value, elements.description.name);
    } else {
      console.log('Error');
    }
  };

  const getProject = (name) => {
    currentProject = {};
    const index = getIndex(name);
    currentProject = index !== -1 ? projectFactory(save, projects[index]) : createProject('default', null);
    return currentProject;
  };

  const getProjects = () => projects;

  return {
    addProject, createProject, currentProject, getProject, getProjects, save,
  };
};

export { projectManager as default };
