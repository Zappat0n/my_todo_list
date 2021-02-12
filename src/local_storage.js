const storageManager = () => {
  const load = () => {
    const storage = localStorage.getItem('projects');

    try {
      return storage ? JSON.parse(storage) : [];
    } catch (ex) {
      return [];
    }
  };

  const save = (storage) => {
    localStorage.setItem('projects', JSON.stringify(storage));
  };

  return { load, save };
};

export { storageManager as default };
