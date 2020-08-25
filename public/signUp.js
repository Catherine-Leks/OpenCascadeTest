'use strict';
let l = console.log;
const modal = document.querySelector('.alert-msg');
const modalUsers = document.querySelector('.alert-users');
let users = '';

// получение пользователей
const getUsers = fetch('http://localhost:3000/users');
getUsers
    .then(response =>{
        return response.json();
    })
    .then(data => {
        users = data;
        l(users);
    })
    .catch(err => {
        l('error!', err);
    });


document.getElementById('btn').onclick = function () {


    // поля ввода с клавиатуры
    const name = document.getElementById('name');
    const surname = document.getElementById('surname');
    const gender = document.getElementById('male').checked ? 'male' : 'female';
    const age = document.getElementById('age');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const passwordConf = document.getElementById('passwordConf');

    let currentUser = {};

// без проверок
//     name.value = 'Catherine';
//     surname.value = 'Leks';
//     email.value = 'myemail@gmail.com';
//     password.value = 'qwert';
//     passwordConf.value = 'qwert';

    let isValid = true;

    // добавление надписи с ошибкой и красной границы
    function addErrorAfter(elem, message) {
        const span = document.createElement('span');
        span.className = 'error';
        span.textContent = message;
        elem.classList.add('errorBorder');
        elem.parentElement.classList.add('forError');
        isValid = false;
        if (!elem.parentElement.querySelectorAll('.error').length) {
            elem.parentElement.appendChild(span);
        } else {
            elem.parentElement.querySelector('.error').innerHTML = message;
        }
    }

    // проверка почты
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!(EMAIL_REGEXP.test(email.value))) {
        addErrorAfter(email, 'Incorrect e-mail address');
    }
    // проверка паролей
    if (password.value !== passwordConf.value) {
        addErrorAfter(passwordConf, 'Password mismatch');
    }
     // проверка возраста
    if ((+age.value) < 10 || (+age.value) > 100) {
        addErrorAfter(age, 'Incorrect age');
    }

    // проверка полей на заполненность
    let validData = [
            [name, 'Enter your name'],
            [surname, 'Enter your surname'],
            [age, 'Enter your age'],
            [email, 'Enter your email'],
            [password, 'Create a password'],
            [passwordConf, 'Confirm password'],
        ];

    for (let i = 0; i < validData.length; i++) {
        if (!validData[i][0].value) {
            addErrorAfter(validData[i][0], validData[i][1]);
        }
    }


    // очистка ошибок
    function clearErrors(el) {
        if (el.nextElementSibling && el.nextElementSibling.classList.contains('error')) {
                el.nextElementSibling.remove();
            }
        if (el.classList.contains('errorBorder')) {
            el.classList.remove('errorBorder');
            }
    }
    // очистить на фокусе
    for (let i = 0; i < validData.length; i++) {
        validData[i][0].addEventListener('focus', function () {
            // l(this.nextElementSibling);
            clearErrors(this);
        });
    }

    // Итоговая проверка
    if (isValid) {
        // let elements = document.body.querySelectorAll('*');
        // for (let el of elements) {
        //     el.disabled = 'true';
        //         // }

        continueFunc();

        currentUser.id = users.length + 1;
        currentUser.name = name.value;
        currentUser.surname = surname.value;
        currentUser.gender = gender;
        currentUser.age = age.value;
        currentUser.email = email.value;

        users.push(currentUser);
        return false;
    }
    else {
        return false;
    }

// заполнение полей в окне после регистрации
    function continueFunc() {
        if (modal.classList.contains('close')) modal.classList.remove('close');
        if (!modal.classList.contains('open')) modal.classList.add('open');
        modal.style.bottom = '-10px';
        modal.style.visibility = 'visible';
        l(modal);
        const paragraphs = document.querySelectorAll('.p-result');
        const userData = [name.value, surname.value, gender, age.value, email.value ];
        for (let i = 0; i < paragraphs.length; i++) {
            paragraphs[i].textContent = userData[i];
        }
    }
};



// огранчение на ввод возраста
const age = document.getElementById('age');
age.onkeydown = function(e) {
    return (e.keyCode >= 37 && e.keyCode <= 46) ||    // стрелки и перемещения
        (e.keyCode >= 47 && e.keyCode <= 57) || // цифры
        (e.keyCode === 8) ; // backspace
};


// кнопка со стрелкой назад (без очистки полей)
document.getElementById('btn-back').onclick = function () {
    if (modal.classList.contains('open')) modal.classList.remove('open');
    if (!modal.classList.contains('close')) modal.classList.add('close');
        modal.style.bottom = '100%';
        modal.style.visibility = 'hidden';
    return false;
};

// кнопка для новой регистрации
document.getElementById('btn-new').onclick = function () {
    window.location.reload();
    return false;
};

// позазать пользователей
document.getElementById('btn-users').onclick = function () {
    let container = document.body.querySelector('.user-table'); // куда вставляем
    let text = '';
    // очистить, если уже кликали
    let rem = document.querySelectorAll('.rem');
    // l(rem);
    rem.forEach( e => e.remove() );
    // заполнить
    for (let i = 0; i < users.length; i++) {
        text += `<div class="rem">`+
                `<div class="user-w">${users[i].id}</div>`+
                `<div class="user-w">${users[i].name}</div>`+
                `<div class="user-w">${users[i].surname}</div>`+
                `<div class="user-w">${users[i].gender}</div>`+
                `<div class="user-w">${users[i].age}</div>`+
                `<div class="user-w">${users[i].email}</div>`+
                `</div>`;
    }


    // заполнить список
    try {
        container.insertAdjacentHTML('afterend', text);
            // `<button type="submit" id="btn-close" class="btn-users btn-bottom">Close</button>`);
    } catch (e) {
        l(e);
    }

    // показать окно с пользователями
    if (modalUsers.classList.contains('close')) modalUsers.classList.remove('close');
    if (!modalUsers.classList.contains('open')) modalUsers.classList.add('open');
    modalUsers.style.bottom = '20px';
    modalUsers.style.visibility = 'visible';

    return false;
};


// закрыть список пользователей
document.getElementById('btn-close').onclick = function () {
    if (modalUsers.classList.contains('open')) modalUsers.classList.remove('open');
    if (!modalUsers.classList.contains('close')) modalUsers.classList.add('close');
    modalUsers.style.bottom = '100%';
    modalUsers.style.visibility = 'hidden';
    return false;
};




