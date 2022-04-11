import {data} from"./data.js"

function createCard(obj) {

    const card = document.createElement("div");

    card.classList.add("student-card");

    card.id=obj.email;

    card.innerHTML = `
    <img src="${obj.picture.thumbnail}" class="card-image">
    <h5 class="card-name">${obj.name.first} ${obj.name.last}</h5>
    <p class="card-email">${obj.email}</p>
    <hr>
    <p class="joined">joined ${obj.registered.date}</p>`

    return card;
}


//functie ce primeste ca parametru un arr de objects si atasam pe pagina cardurile


function atachCards(arr ,nrPag){

    arr=pagination(arr,nrPag);


    

    const cardContainer = document.querySelector(".card-container");

    cardContainer.innerHTML="";

    for(let i=0; i< arr.length ; i++){
        cardContainer.appendChild(createCard(arr[i]));
    }


    atachButtons();
}

function atachButtons(){
    
const pagination = document.querySelector(".pagination");
pagination.innerHTML = "";
    for(let i = 0 ; i < createPages(data.length); i++){
        const page = document.createElement("div");
        page.classList.add("page-number");
        pagination.appendChild(page);
        page.textContent = i +1;
    }

}

function createPages(allElements){
    const pageSize = 9;

    return allElements/pageSize;
}

//arr ->vaectorul de date  nrPag->numarul paginii  nrCarduri-->numarul de carduri de pe pagina

//[12,32,4,54,65,7,68,89,80,12]     2    4
function pagination(arr ,nrPag){

    const pageSize = 9;

    let cards = [];

    for(let i = 9*(nrPag-1);  i < arr.length && i < 9*nrPag; i++) {
        
        cards.push(arr[i])

    }

    return cards;
}

function createModal(user){
    const modal = document.createElement("article");

    modal.innerHTML = 
    `
    <section class="left-arrow">
    <p>&lAarr;</p>
    </section>
    <section class="user-details">
    <img src="${user.picture.thumbnail}">
    <h2>${user.name.first} ${user.name.last}</h2>
    <p>username</p>
    <p>${user.email}</p>
    <p>location</p>
    <hr>
    <p>phone number</p>
    <p>Age: ${user.registered.age}</p>
    <p>Joined: ${user.registered.date}</p>
    </section>
    
    <section class="right-arrow">
                <p>&rAarr;</p>
            </section>`

    return modal;
}

function atachModal(user){

   
    const modalContainer = document.querySelector(".modal");

    const modal = createModal(user);

    modal.classList.add("card-modal");

    clearModal();

    modalContainer.appendChild(modal);

    modalContainer.classList.remove("hidden");

    modal.addEventListener("click",(e)=>{

        const obj = e.target;

        const nextUser = getNextUser(user);

        if(obj.parentNode.classList.contains("right-arrow")){
            clearModal();
            atachModal(getNextUser(user));
        }else if(obj.parentNode.classList.contains("left-arrow")){
            clearModal();
            atachModal(getPreviousUser(user));
        }
       
    });

    document.addEventListener("click", (e) => {
        const obj = e.target;
        
        if(obj.classList.contains("modal")){
            closeModal();
        }
    });


    
}

function clearModal(){
    const modalContainer = document.querySelector(".modal");

    
    modalContainer.innerHTML = " ";
}

function closeModal(){

    const cardModal = document.querySelector(".modal");
    
    cardModal.classList.add("hidden");
    clearModal();
}


function getUserByEmail(mail){


    return data.filter(e=>e.email==mail);
}

function getPreviousUser(user){
    let currentUser = 0;

    for(let i=0 ; i < data.length ; i++){
        if(data[i].email === user.email){
            currentUser = i;
        }
    }

    if(data[currentUser - 1] !== null){
        return data[currentUser - 1];
    }
}

function getNextUser(user){

    let currentUser = 0;

    for(let i=0; i< data.length ; i++){
        if(data[i].email === user.email){
            currentUser = i;
        }
    }

    if(data[currentUser + 1] !== null || data[currentUser + 1] !== undefined){
        return data[currentUser + 1];
    }
}


function searchByName(name) {
    let usersIndex = [];

    for(let i=0; i < data.length ; i++){
        if((data[i].name.first.concat(data[i].name.last)).includes(name)){
            usersIndex.push(i);
        }
    }

    return usersIndex;
}

function searchByAge(age){
    let usersIndex = [];

    for(let i = 0; i < data.length ; i++){
        if(data[i].registered.age == age){
            usersIndex.push(i);
        }
    }

    return usersIndex;
}

function searchByYear(year){
    let usersIndex = [];

    for(let i=0; i< data.length; i++) {
        if(data[i].registered.date.includes(year)){
            usersIndex.push(i);
        }
    }

    return usersIndex;
}

 function atachSearchedCards(arr){
     console.log(arr);
    const cardContainer = document.querySelector(".card-container");

    cardContainer.innerHTML = " ";

    for(let i = 0; i < arr.length ; i++){
        cardContainer.appendChild(createCard(data[arr[i]]));
    }
 }

export {createCard
     ,atachCards, 
     createPages, 
     atachModal 
     ,getUserByEmail
    ,clearModal
    ,getNextUser
    ,searchByName
    ,atachSearchedCards
    ,searchByAge
    ,searchByYear};