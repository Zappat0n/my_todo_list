import { fieldsForNewTodoForm } from './design_data';
import storage from '../db/storage';

const designer = (controller = null) => {
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

  const createForm = (container, id, className, fields, callback, values, index) => {
    const addButton = () => {
      const button = document.createElement('input');
      button.setAttribute('type', 'submit');
      button.classList.add('btn');
      return button;
    };

    const addField = (field, text, type, required, value) => {
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
      if (value != null) {
        input.setAttribute('value', value);
      }
      div.appendChild(label);
      div.appendChild(input);
      return div;
    };

    const form = document.createElement('form');
    container.appendChild(form);
    form.setAttribute('id', id);
    form.classList.add(className);
    let i = 0;
    fields.forEach(element => {
      const value = values != null ? values[i] : null;
      const field = addField(element.field, element.text, element.type, element.required, value);
      form.appendChild(field);
      i += 1;
    });
    form.appendChild(addButton());
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      callback(e.target.elements, controller, index);
      form.classList.add('d-none');
    });
    return form;
  };

  const displayError = (container, message) => {
    container.innerHTML = '';
    addElement(container, 'p', message, ['warning']);
    setTimeout(() => {
      container.innerHTML = '';
    }, 3000);
  };

  const showTodo = (title, controller) => {
    const index = storage.currentProject.getIndex(title);
    if (index !== -1) {
      storage.currentProject.currentTodo = storage.currentProject.todos[index];
      const container = document.querySelector('.todo_container');
      container.innerHTML = '';
      addElement(container, 'p', `Title:   ${storage.currentProject.currentTodo.title}`);
      addElement(container, 'p', `Description: ${storage.currentProject.currentTodo.description}`);
      addElement(container, 'p', `Date: ${storage.currentProject.currentTodo.dueDate}`);
      addElement(container, 'p', `Priority: ${storage.currentProject.currentTodo.priority}`);
      const bRemove = addElement(container, 'button', 'Remove');
      const bEdit = addElement(container, 'button', 'Edit');
      bRemove.addEventListener('click', () => {
        storage.currentProject.removeTodo(index);
        document.querySelector('.todo_container').innerHTML = '';
      });
      bEdit.addEventListener('click', () => {
        container.innerHTML = '';
        designer(controller).createForm(container, 'form_edit_todo', 'form', fieldsForNewTodoForm, storage.currentProject.editTodo, [storage.currentProject.currentTodo.title, storage.currentProject.currentTodo.description, storage.currentProject.currentTodo.dueDate, storage.currentProject.currentTodo.priority], index);
      });
    }
  };

  const updateTodos = (controller) => {
    const container = document.querySelector('.todos');
    container.innerHTML = '';
    const ulTodo = addElement(container, 'ul');
    if (storage.currentProject != null) {
      storage.currentProject.todos.forEach(value => {
        const element = addElement(ulTodo, 'li', value.title, ['todo']);
        element.addEventListener('click', e => {
          showTodo(e.target.textContent, controller);
        });
      });
    }
  };

  const updateProjects = (controller) => {
    const container = document.querySelector('.ul_projects');
    container.innerHTML = '';
    storage.projects.forEach(project => {
      const li = addElement(container, 'li', project.name, ['project']);
      li.addEventListener('click', (e) => {
        storage.currentProject = controller.getProject(e.target.textContent);
        updateTodos(controller);
        document.querySelector('.todo_container').innerHTML = '';
      });
    });
  };

  const updateCurrentProject = (name) => {
    const h3 = document.querySelector('.current_project');
    h3.textContent = name;
  };

  return {
    addElement,
    createForm,
    displayError,
    showTodo,
    updateCurrentProject,
    updateProjects,
    updateTodos,
  };
};

export { designer as default };
