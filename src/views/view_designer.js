import todo from '../models/todo'
import { fieldsForNewTodoForm } from './design_data'

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

  const createForm = (container, id, className, fields, callback, values, index, manager) => {
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
      let value = values != null ? values[i] : null;
      const field = addField(element.field, element.text, element.type, element.required, value);
      form.appendChild(field);
      i += 1;
    });
    form.appendChild(addButton());
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      callback(e.target.elements, manager, index);
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

  const showTodo = (currentProject, title, manager) => {
    const index = currentProject.getIndex(title);
    if (index != -1) {
      currentProject.currentTodo = currentProject.todos[index];
      const container = document.querySelector('.todo_container');
      container.innerHTML = '';
      addElement(container, 'p', currentProject.currentTodo.title);
      addElement(container, 'p', currentProject.currentTodo.description);
      addElement(container, 'p', currentProject.currentTodo.dueDate);
      addElement(container, 'p', currentProject.currentTodo.priority);
      const bRemove = addElement(container, 'button', 'Remove');
      const bEdit = addElement(container, 'button', 'Edit');
      bRemove.addEventListener( 'click', e => {
        currentProject.removeTodo(index, currentProject);
        document.querySelector('.todo_container').innerHTML = '';
      });
      bEdit.addEventListener( 'click', e => {
        container.innerHTML = '';
        console.log(currentProject);
        createForm(container, 'form_edit_todo', 'form', fieldsForNewTodoForm, currentProject.editTodo, [currentProject.currentTodo.title, currentProject.currentTodo.description, currentProject.currentTodo.dueDate, currentProject.currentTodo.priority], index, manager);
      });
    }
  }

  const updateTodos = (currentProject, manager) => {
    const container = document.querySelector('.todos');
    container.innerHTML = '';
    const ulTodo = addElement(container, 'ul');
    if (currentProject != null) {
      currentProject.todos.forEach(value => {
        const element = addElement(ulTodo, 'li', value.title, ['todo']);
        element.addEventListener('click', e => {
          showTodo(currentProject, e.target.textContent, manager);
        })
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
        updateTodos(currentProject, manager);
        document.querySelector('.todo_container').innerHTML = '';
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
