import todo from './todo';
import designer from '../views/view_designer';
import storage from '../db/storage';

const project = (save, name, description, todos = []) => {
  const currentTodo = {};

  const saveAndRefresh = () => {
    save();
    designer().updateTodos(storage.currentProject);
    document.querySelector('.todo_container').innerHTML = '';
  };

  const addTodo = (elements) => {
    if (elements != null) {
      const t = todo(elements.title.value, elements.description.value, elements.date.value,
        elements.priority.value);
      todos.push(t);
      saveAndRefresh();
    }
  };

  const getIndex = (title, removingThis) => {
    for (let index = 0; index < todos.length; index += 1) {
      if (title === todos[index].title && removingThis !== index) return index;
    }
    return -1;
  };

  const editTodo = (elements, controller, index) => {
    if (elements != null) {
      const t = todo(elements.title.value, elements.description.value, elements.date.value,
        elements.priority.value);
      if (getIndex(t.title, index) === -1) {
        todos[index] = t;
        saveAndRefresh();
        designer().showTodo(elements.title.value, controller);
      }
    }
  };

  const removeTodo = (index) => {
    if (index !== -1) {
      todos.splice(index, 1);
      saveAndRefresh();
    }
  };

  return {
    name, currentTodo, description, editTodo, getIndex, todos, addTodo, removeTodo,
  };
};

const projectFactory = (save, obj) => project(save, obj.name, obj.description, obj.todos);

export { projectFactory as default };
