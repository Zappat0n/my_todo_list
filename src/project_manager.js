import { projectFactory, emptyProjectObj } from './project';
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
    console.log(currentProject);
    console.log(index);
    if (index === -1) {
      projects.push(currentProject);
    } else {
      projects[index] = currentProject;
    }
    storageManager().save(projects);
  };

  const getProject = (name) => {
    currentProject = {};
    const index = getIndex(name);
    if (index !== -1) {
      currentProject = projectFactory(save, projects[index]);
    } else {
      const p = emptyProjectObj('default');
      currentProject = projectFactory(save, p);
    }
    return currentProject;
  };

  const getProjects = () => projects;

  return {
    getProject, currentProject, getProjects, save,
  };
};

export { projectManager as default };
