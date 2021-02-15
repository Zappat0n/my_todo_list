const designer = (manager = null) => {
  const addElement = (container, type, _textContent, classes) => {
    const element = document.createElement(type);
    if (_textContent != null) {
      element.textContent = _textContent;
    }

    if (classes != null) {
      classes.forEach(value => element.classList.add(value));
    }
    container.appendChild(element);
    return element;
  };

  const createForm = (container, id, className, fields, callback) => {
    const addButton = () => {
      const button = document.createElement('input');
      button.setAttribute('type', 'submit');
      button.classList.add('btn');
      return button;
    };

    const addField = (field, text, type, required) => {
      const div = document.createElement('div');
      div.classList.add('form_field');
      const label = document.createElement('label');
      label.setAttribute('for', field);
      label.textContent = text;
      const input = document.createElement('input');
      input.setAttribute('type', type);
      input.setAttribute('name', field);
      input.setAttribute('id', field);
      if (required) {
        input.setAttribute('required', true);
      }
      div.appendChild(label);
      div.appendChild(input);
      return div;
    };

    const form = document.createElement('form');
    container.appendChild(form);
    form.setAttribute('id', id);
    form.classList.add(className);
    fields.forEach(element => {
      const field = addField(element.field, element.text, element.type, element.required);
      form.appendChild(field);
    });
    form.appendChild(addButton());
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      callback(e.target.elements, manager);
    });

    return form;
  };

  const displayError = (container, message) => {
    container.innerHTML = '';
    addElement(container, 'p', message, ['warning']);
    setTimeout(function(){
      container.innerHTML = '';
    }, 3000);
  }

  const updateTodos = (currentProject) => {
    const container = document.querySelector('.todos');
    container.innerHTML = '';
    const ulTodo = addElement(container, 'ul');
    if (currentProject != null) {
      currentProject.todos.forEach(value => {
        addElement(ulTodo, 'li', value.title, ['todo']);
      });
    }
  };

  const updateProjects = (manager) => {
    const container = document.querySelector('.ul_projects');
    container.innerHTML = '';
    manager.getProjects().forEach(project => {
      const li = addElement(container, 'li', project.name, ['project']);
      li.addEventListener('click', (e) => {
        const currentProject = manager.getProject(e.target.textContent);
        updateTodos(currentProject);
      });
    });
  };

  const updateCurrentProject = (name) => {
    const h3 = document.querySelector('.current_project');
    h3.textContent = name;
  };

  return {
    addElement, createForm, displayError, updateCurrentProject, updateProjects, updateTodos,
  };
};

export { designer as default };
