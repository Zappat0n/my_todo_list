const designer = () => {
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
      /*if (required) {
        input.setAttribute('required');
      }*/
      div.appendChild(label);
      div.appendChild(input);
      container.appendChild(div);
    };

    const form = document.createElement('form');
    form.setAttribute('id', id);
    form.classList.add(className);
    fields.forEach(element => {
      addField(element.field, element.text, element.type, element.required);
    });
    container.appendChild(addButton());
    form.addEventListener('submit', e => callback(e));

    return form;
  };

  return { createForm };
};

export { designer as default };
