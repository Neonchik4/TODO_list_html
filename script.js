const form = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');

document.addEventListener('DOMContentLoaded', loadTodos);

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const input = document.getElementById('delo');
    const todoText = input.value.trim();

    if (todoText) {
        addTodoItem(todoText);
        input.value = '';
        saveTodos();
    }
}

function addTodoItem(text) {
    const listItem = document.createElement('li');
    listItem.textContent = text;

    const doneButton = document.createElement('button');
    doneButton.classList.add('btn', "btn-primary", "btn-sm");
    let sdelano = true;

    doneButton.textContent = 'Сделано';
    doneButton.onclick = () => {
        listItem.classList.toggle('done');
        if (sdelano) {
            doneButton.textContent = "Не сделано";
            sdelano = false;
        } else {
            doneButton.textContent = "Сделано";
            sdelano = true;
        }

        saveTodos();
    };

    const moveUpButton = document.createElement('button');
    moveUpButton.classList.add('btn', "btn-warning", "btn-sm");
    moveUpButton.textContent = 'Вверх';
    moveUpButton.onclick = () => {
        const prevItem = listItem.previousElementSibling;
        if (prevItem) {
            todoList.insertBefore(listItem, prevItem);
            saveTodos();
        }
    };

    const moveDownButton = document.createElement('button');
    moveDownButton.classList.add('btn', "btn-info", "btn-sm");
    moveDownButton.textContent = 'Вниз';
    moveDownButton.onclick = () => {
        const nextItem = listItem.nextElementSibling;
        if (nextItem) {
            todoList.insertBefore(nextItem, listItem);
            saveTodos();
        }
    };

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', "btn-danger", "btn-sm");
    deleteButton.textContent = 'Удалить';
    deleteButton.onclick = () => {
        todoList.removeChild(listItem);
        saveTodos();
    };

    listItem.appendChild(doneButton);
    listItem.appendChild(deleteButton);
    listItem.appendChild(moveUpButton);
    listItem.appendChild(moveDownButton);
    todoList.appendChild(listItem);
}

function saveTodos() {
    const todos = [];
    const items = todoList.querySelectorAll('li');

    items.forEach(item => {
        const text = item.firstChild.textContent;
        const done = item.classList.contains('done');
        todos.push({ text, done });
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const todosJSON = localStorage.getItem('todos');

    if (todosJSON) {
        const todos = JSON.parse(todosJSON);
        todos.forEach(todo => {
            addTodoItem(todo.text);
            const addedItem = todoList.lastChild;
            if (todo.done) {
                addedItem.classList.add('done');
                addedItem.querySelector('.btn-primary').textContent = 'Не сделано';
            }
        });
    }
}
