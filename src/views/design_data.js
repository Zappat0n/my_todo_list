const fieldsForNewTodoForm = [
  {
    field: 'title',
    text: 'Title: ',
    type: 'text',
    required: 'true',
  },
  {
    field: 'description',
    text: 'Description: ',
    type: 'text',
    required: 'true',
  },
  {
    field: 'date',
    text: 'Due date: ',
    type: 'date',
    required: 'true',
  },
  {
    field: 'priority',
    text: 'Priority: ',
    type: 'number',
    required: 'true',
  },
];

const fieldsForNewProjectForm = [
  {
    field: 'name',
    text: 'Name: ',
    type: 'text',
    required: 'true',
  },
  {
    field: 'description',
    text: 'Description: ',
    type: 'text',
    required: 'true',
  },
];


export { fieldsForNewProjectForm, fieldsForNewTodoForm };
