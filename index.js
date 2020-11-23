// A NOTE-APP THAT REMEMBERS EVERYTHING YOU SAVE AS LONG AS U WANT IT

// ITEM MODEL
let cont = document.querySelector('ol');

function newItem(id, name) {
    let li = document.createElement('li');
    li.setAttribute('id', id);
    li.setAttribute('class', 'list_item');

    let span_name = document.createElement('span');
    span_name.innerHTML = name;
    span_name.setAttribute('class', 'name');

    let button_delete = document.createElement('button');
    button_delete.setAttribute('class', 'button');
    button_delete.innerHTML = "Delete";
    button_delete.style.float = 'right';

    // Delete handler
    button_delete.addEventListener('click', function () {
        let deleteId = Number(this.parentElement.id);
        updateRemove(deleteId);
    })

    // Merging
    li.appendChild(span_name);
    li.appendChild(button_delete);

    return li;
}

// INITIALIZING STORE
if (localStorage.getItem('store') === null) {
    localStorage.setItem('store', JSON.stringify([]));
}
let currentData = JSON.parse(localStorage.getItem('store'));

// API PROGRAMMING

// ADD ITEM
document.getElementById('add').addEventListener('click', addNote);
function addNote() {
    currentData = JSON.parse(localStorage.getItem('store'));
    let textinput = document.querySelector('#textinput');
    let name = textinput.value;
    let id = currentData.length;
    if (name !== "" && name !== null && name !== undefined) {
        // cont.appendChild(newItem(id, name));
        cont.insertBefore(newItem(id, name), cont.firstChild);
        updateAdd(name);
    }
    textinput.value = "";
    textinput.focus();
}

// STORE UPDATE LOGIC
function updateAdd(name) {
    let temp = localStorage.getItem('store');
    temp = JSON.parse(temp);
    temp.push(name);
    localStorage.setItem('store', JSON.stringify(temp));
    currentData = JSON.parse(localStorage.getItem('store'));
    loadStore();
}
function updateRemove(id) {
    currentData = currentData.filter((item, index) => {
        return !(index === id)
    });
    localStorage.setItem('store', JSON.stringify(currentData));
    loadStore();
}


// LOAD DATA
function loadStore() {
    cont.innerHTML = "";
    currentData = JSON.parse(localStorage.getItem('store'));
    currentData.reverse().forEach((item, index) => {
        cont.appendChild(newItem(index, item));
    });
    cont.scrollTop = cont.scrollHeight;
}
loadStore();

// CLEAR ALL HANDLER
document.getElementById('clear').addEventListener('click', () => {
    if (currentData.length > 0) {
        let flag = confirm('Are You sure?');
        if (flag === true) {
            localStorage.setItem('store', JSON.stringify([]));
            loadStore();
        }
    }
})


// Press Enter to Add
textinput.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        addNote();
    }
})