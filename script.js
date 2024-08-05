const mainTodoElem = document.querySelector(".todo-lists-elem");
const inputValue = document.getElementById("inputValue");

const getTodoListFromLocal = () => {
    return JSON.parse(localStorage.getItem("youtubeTodoList"));
}
const addTodoListLocalStorage = (localTodoLists) =>{
    return localStorage.setItem("youtubeTodoList",JSON.stringify(localTodoLists));
};

let localTodoLists = getTodoListFromLocal() || [];
const  addTodoDynamicElement = (curElem) =>{
    const divElement = document.createElement("div");
    divElement.classList.add("main-todo-div");
    divElement.innerHTML = `<li>${curElem}</li><button class="deleteBtn">Delete</button>`;
    mainTodoElem.append(divElement);

};
const addTodoList = (e) => {
    e.preventDefault();
    const todoListValue = inputValue.value.trim();
    inputValue.value = "";
    if(todoListValue !=="" && !localTodoLists.includes(todoListValue)){
        localTodoLists.push(todoListValue);
        localTodoLists = [...new Set(localTodoLists)];
        console.log(localTodoLists);
        addTodoListLocalStorage(localTodoLists);
        addTodoDynamicElement(todoListValue);

        // Clear the input field after adding the todo
    }
};
const showTodoList = () =>{
    console.log(localTodoLists);
    localTodoLists.forEach((curElem) => {
        addTodoDynamicElement(curElem);
    });
};
showTodoList();
const removeTodoElem = (e) =>{
    const todoToRemove = e.target;
    let todoListContent = todoToRemove.previousElementSibling.innerText;
    let parentElem = todoToRemove.parentElement;
    console.log(todoListContent);
    localTodoLists = localTodoLists.filter((curTodo) => {
        return curTodo.toLowerCase() !== todoListContent.toLowerCase();
    });
    addTodoListLocalStorage(localTodoLists);
    parentElem.remove();
    console.log(localTodoLists);
};
mainTodoElem.addEventListener("click",(e) => {
    e.preventDefault();
    if(e.target.classList.contains("deleteBtn")) {
        removeTodoElem(e);
    }
});

document.querySelector(".btn").addEventListener("click", (e) => {
    addTodoList(e);
});