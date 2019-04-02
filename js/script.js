"use strict";

let persons = [];

let test = '(^[a-zA-Z]+$).(^[a-zA-Z]{2,6})+$';
const letterPattern = /^[a-zA-Z]*$/;
const birthdayPattern = /([0-9]{4})-([0-9]{2})-([0-9]{2})/;
const emailPattern = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;

const inputName = document.forms["userForm"]["firstname"];
const inputSurname = document.forms["userForm"]["surname"];
const inputBirthday = document.forms["userForm"]["birthday"];
const inputEmail = document.forms["userForm"]["email"];

let ulPerson = document.querySelector("#person-list");
let deleteInput = document.querySelector("#deleteInput");


let Person = function (id, name, surname, birthday, email) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.birthday = birthday;
    this.age = 0;
    this.email = email;
    this.calculateAge = function () {

        let calculatedAge = new Date().getFullYear() - new Date(this.birthday).getFullYear();
        this.age = calculatedAge;
    };
};


let idCounter = (function () {
    var counter = 0;
    return function () {
        return counter += 1;
    }
})();



function validateForm() {
    if (inputName.value == "" || inputSurname.value == "" || inputBirthday.value == "" || inputEmail.value == "") {
        alert("Inputs shouldn't be empty");
        return false;
    }

    if (!inputName.value.match(letterPattern) || !inputSurname.value.match(letterPattern)) {
        alert("Name or surname should consist only letters");
        return false;
    }

    if (!inputBirthday.value.match(birthdayPattern) ) {
        alert("Birthday format not correct");
        return false;
    }

    if(new Date() < new Date(inputBirthday.value) ){
        alert("Birthday is wrong");
        return false;
    }

    if (!inputEmail.value.match(emailPattern)) {
        alert("Email format not correct");
        return false;
    }


    let createdPerson = new Person(idCounter(), inputName.value, inputSurname.value, inputBirthday.value, inputEmail.value);

    createdPerson.calculateAge();
    persons.push(createdPerson);
    displayList();
    resetInputs();

    return false;
}


function displayList() {
    let lists = '';
    for (let i = 0; i < persons.length; i++) {
        lists += `<li class="list-group-item">${persons[i].id}. ${persons[i].name} ${persons[i].surname} - ${persons[i].age} ${persons[i].email}</li>`;
    }
    ulPerson.innerHTML = lists;
}


function resetInputs() {
    inputName.value = "";
    inputSurname.value = "";
    inputBirthday.value = "";
    inputEmail.value = "";
}

function deletePerson() {
    if (!isNaN(deleteInput.value)) {
        let id = deleteInput.value;

        for (let i = 0; i < persons.length; i++) {
            if (persons[i].id == id) {
                persons.splice(i, 1);
                break;
            }
        }
        deleteInput.value = "";
        displayList();
    }
}

function sortById(){
    persons.sort(function(a,b){return a.id-b.id});
    displayList();
}
function sortByName(){
    persons.sort(function(a,b){
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if(x < y){
            return -1;
        } else if(x > y){
            return 1;
        } else {
            return 0;
        }
    });
    displayList();
}
function sortBySurname(){
    persons.sort(function(a,b){
        let x = a.surname.toLowerCase();
        let y = b.surname.toLowerCase();
        if(x < y){
            return -1;
        } else if(x > y){
            return 1;
        } else {
            return 0;
        }
    });
    displayList();
}