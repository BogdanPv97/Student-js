import { data } from "./data.js";
import { atachCards, createPages, atachModal, getUserByEmail, clearModal, getNextUser, searchByName, atachSearchedCards, searchByAge, searchByYear } from "./utility.js";

const pagination = document.querySelector(".pagination");

const cardContainer = document.querySelector(".card-container");

const nextUser = document.querySelector(".right-arrow");

const search = document.querySelector(".search");

const filterYear = document.querySelector(".search-year");

const filterAge = document.querySelector(".search-age");



//functie prineste ca si paramteru un obiect si returneaza un card

pagination.addEventListener("click", (e) => {
    const obj = e.target;

    if(obj.classList.contains("page-number")){


        atachCards(data,+obj.textContent)
    }
});

cardContainer.addEventListener("click", (e) =>{
    const obj = e.target;
   

   
    if(obj.parentNode.classList.contains("student-card")){
        let card=obj.parentNode;

    //   atachModal(getUserByEmail(card.id)[0]);
    
        atachModal(getUserByEmail(card.id)[0]);
    }
});

search.addEventListener("keyup", function (event) {
    const name = search.value;

    if(event.key === 'Enter'){
        atachSearchedCards(searchByName(name));
    }

});

filterYear.addEventListener("keyup", function (event) {
    const input = filterYear.value;

    if(event.key === "Enter"){
        atachSearchedCards(searchByYear(input));
    }
});

filterAge.addEventListener("keyup", function (event) {
    const input = filterAge.value;

    if(event.key === "Enter"){
        atachSearchedCards(searchByAge(input));
    }
});





atachCards(data,3);







