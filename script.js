const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };
    todos.push(newTodo);
    input.value = '';
    saveAndRender();
  }
});

function saveAndRender() {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderList();
}

function renderList() {
  list.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => {
      todo.completed = checkbox.checked;
      saveAndRender();
    });

    const span = document.createElement('span');
    span.textContent = todo.text;
    if (todo.completed) {
      span.classList.add('completed');
    }

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = '✏️';
    editBtn.addEventListener('click', () => {
      const editInput = document.createElement('input');
      editInput.type = 'text';
      editInput.className = 'edit-input';
      editInput.value = todo.text;


      li.replaceChild(editInput, span);
      li.replaceChild(saveBtn, editBtn);

      editInput.focus();

      editInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') saveBtn.click();
      });

      const newSpan = span; 
    });

    const saveBtn = document.createElement('button');
    saveBtn.className = 'edit-btn';
    saveBtn.textContent = '💾';
    saveBtn.addEventListener('click', () => {
      const editInput = li.querySelector('.edit-input');
      todo.text = editInput.value.trim() || 'Untitled Task';
      saveAndRender();
    });


    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '🗑️';
    deleteBtn.addEventListener('click', () => {
      todos = todos.filter(t => t.id !== todo.id);
      saveAndRender();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

renderList();
