const storageManager = () => {
  const load = () => {
    const storage = localStorage.getItem('projects');

    try {
      return storage ? JSON.parse(storage) : [];
    } catch (ex) {
      return [];
    }
  };

  const save = () => {
    localStorage.setItem('projects', JSON.stringify(projects));
  };

  const projects = load();
  let currentProject;

  return { currentProject, load, projects, save };
};

const storage = storageManager();

export { storage as default };
