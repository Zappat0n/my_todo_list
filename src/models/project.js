import todo from './todo';
import designer from '../views/view_designer'

const project = (save, name, description, todos = []) => {
  const currentTodo = {};

  const addTodo = (elements, currentProject) => {
    if (elements != null) {
      const t = todo(elements.title.value, elements.description.value, elements.date.value,
        elements.priority.value);
      todos.push(t);
      saveAndRefresh(currentProject);
    }
  };

  const editTodo = (elements, controller, index) => {
    if (elements != null) {
      const t = todo(elements.title.value, elements.description.value, elements.date.value,
        elements.priority.value);
        console.log(controller);
        if (getIndex(t.title, index) === -1) {
        todos[index] = t;
        saveAndRefresh(controller.currentProject);
      }
    }
  };

  const getIndex = (title, removingThis) => {
    for (let index = 0; index < todos.length; index += 1) {
      if (title === todos[index].title && removingThis !== index) return index;
    }
    return -1;
  };

  const removeTodo = (index, currentProject) => {
    if (index !== -1) {
      todos.splice(index, 1);
      saveAndRefresh(currentProject);
    }
  };

  const saveAndRefresh = (currentProject) => {
    save();
    designer().updateTodos(currentProject);
    document.querySelector('.todo_container').innerHTML = '';
  }

  return {
    name, currentTodo, description, editTodo, getIndex, todos, addTodo, removeTodo,
  };
};

const projectFactory = (save, obj) => project(save, obj.name, obj.description, obj.todos);

export { projectFactory as default };
