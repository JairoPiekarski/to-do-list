const lightTheme = document.querySelector('.light-theme');
const darkTheme = document.querySelector('.dark-theme');
const toDoInput = document.querySelector('.form__input');
const toDoBtn = document.querySelector('.form__btn');
const toDoList = document.querySelector('.todo-list');

toDoBtn .addEventListener('click', addToDo);
toDoList.addEventListener('click', deleteCheck);
document.addEventListener("DOMContentLoaded", getToDos);
lightTheme.addEventListener('click', () => changeTheme('light'));
darkTheme.addEventListener('click', () => changeTheme('dark'));

// ----------------- Change Theme -----------------

let savedTheme = localStorage.getItem('savedTheme');
savedTheme === null ? changeTheme('light') : changeTheme(localStorage.getItem('savedTheme'));

function changeTheme(color) {
    localStorage.setItem('savedTheme', color);
    savedTheme = localStorage.getItem('savedTheme');

    document.body.className = color;

    color === 'dark' ? document.getElementById('title').classList.add('dark-title') : document.getElementById('title').classList.remove('dark-title');

    document.querySelector('input').className = `${color}-input`;

    document.querySelectorAll('.todo').forEach(todo => {
        Array.from(todo.classList).some(item => item === 'completed') ? todo.className = `todo ${color}-todo completed` : todo.className = `todo ${color}-todo`;
    });

    document.querySelectorAll('button').forEach(button => {
        Array.from(button.classList).some(item => {
            if (item === 'check-btn') {
                button.className = `check-btn ${color}-button`;
            } else if(item === 'delete-btn') {
                button.className = `delete-btn ${color}-button`;
            } else if (item === 'form__btn') {
                button.className = `form__btn ${color}-button`;
            }
        });
    });
}

// ----------------- Add To Do -----------------

function addToDo(e){
    e.preventDefault();

    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add('todo', `${savedTheme}-todo`);

    const newToDo = document.createElement("li");
    if (toDoInput.value === ""){
        alert('Escreva o nome da tarefa, por favor!')
    }
    else {
        newToDo.innerText = toDoInput.value;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        saveLocal(toDoInput.value);

        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add('check-btn', `${savedTheme}-button`);
        toDoDiv.appendChild(checked);

        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add('delete-btn', `${savedTheme}-button`);
        toDoDiv.appendChild(deleted);

        toDoList.appendChild(toDoDiv);

        toDoInput.value = '';
    }
}

// ----------------- Local Storage -----------------

function saveLocal(todo){
    let todos;

    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// ----------------- Get Local Storage -----------------

function getToDos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        const toDoDiv = document.createElement('div');
        toDoDiv.classList.add('todo', `${savedTheme}-todo`);

        const newToDo = document.createElement('li');

        newToDo.innerText = todo;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add('check-btn', `${savedTheme}-button`);
        toDoDiv.appendChild(checked);

        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add('delete-btn', `${savedTheme}-button`);
        toDoDiv.appendChild(deleted);

        toDoList.appendChild(toDoDiv);
    });
}

// ----------------- Delete To Do -----------------

function deleteCheck(e){
    const item = e.target;

    if(item.classList[0] === 'delete-btn'){
        item.parentElement.classList.add('fall');

        removeLocalTodos(item.parentElement);

        item.parentElement.addEventListener('transitioned', function(){
            item.parentElement.remove();
        })
    }

    if(item.classList[0] === 'check-btn'){
        item.parentElement.classList.toggle('completed');
    }
}

// ----------------- Remove Local Storage -----------------

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const toDoIndex = todos.indexOf(todo.children[0].innerText);
    todos.splice(toDoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}