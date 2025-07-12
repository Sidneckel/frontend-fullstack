const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task');

const API_URL = 'http://191.52.55.181:30001';

const fetchTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/tasks`);
    if (!response.ok) throw new Error('Erro ao buscar tarefas');
    const tasks = await response.json();
    return tasks;
  } catch (error) {
    console.error('Erro no fetchTasks:', error);
    return [];
  }
};

const addTask = async (event) => {
  event.preventDefault();
  const task = { title: inputTask.value.trim() };
  if (!task.title) return;

  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Erro ao adicionar tarefa');
    inputTask.value = '';
    loadTasks();
  } catch (error) {
    console.error('Erro ao adicionar tarefa:', error);
  }
};

const deleteTask = async (id) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar tarefa');
    loadTasks();
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
  }
};

const updateTask = async ({ id, title, status }) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, status }),
    });
    if (!response.ok) throw new Error('Erro ao atualizar tarefa');
    loadTasks();
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
  }
};

const formatDate = (dateUTC) => {
  const options = { dateStyle: 'long', timeStyle: 'short' };
  return new Date(dateUTC).toLocaleString('pt-BR', options);
};

const createElement = (tag, innerText = '', innerHTML = '') => {
  const element = document.createElement(tag);
  if (innerText) element.innerText = innerText;
  if (innerHTML) element.innerHTML = innerHTML;
  return element;
};

const createSelect = (value) => {
  const options = `
    <option value="pendente">pendente</option>
    <option value="em andamento">em andamento</option>
    <option value="concluída">concluída</option>
  `;
  const select = createElement('select', '', options);
  select.value = value;
  return select;
};

const createRow = (task) => {
  const { id, title, created_at, status } = task;

  const tr = createElement('tr');
  const tdTitle = createElement('td', title);
  const tdCreatedAt = createElement('td', formatDate(created_at));
  const tdStatus = createElement('td');
  const tdActions = createElement('td');

  const select = createSelect(status);
  select.addEventListener('change', ({ target }) =>
    updateTask({ ...task, status: target.value })
  );

  const editButton = createElement('button', '', '<span class="material-symbols-outlined">edit</span>');
  const deleteButton = createElement('button', '', '<span class="material-symbols-outlined">delete</span>');

  const editForm = createElement('form');
  const editInput = createElement('input');
  editInput.value = title;
  editForm.appendChild(editInput);

  editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    updateTask({ id, title: editInput.value, status });
  });

  editButton.addEventListener('click', () => {
    tdTitle.innerText = '';
    tdTitle.appendChild(editForm);
  });

  editButton.classList.add('btn-action');
  deleteButton.classList.add('btn-action');
  deleteButton.addEventListener('click', () => deleteTask(id));

  tdStatus.appendChild(select);
  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);

  tr.appendChild(tdTitle);
  tr.appendChild(tdCreatedAt);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);

  return tr;
};

const loadTasks = async () => {
  const tasks = await fetchTasks();
  tbody.innerHTML = '';
  tasks.forEach((task) => {
    const tr = createRow(task);
    tbody.appendChild(tr);
  });
};

addForm.addEventListener('submit', addTask);
loadTasks();
