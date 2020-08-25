// const axios = require('axios');
import axios from 'axios';

let users = '';

axios
    // .get('http://api.kanye.rest')
    .get('http://localhost:3000/users')
    .then(response => {
        users = response.data;
        console.log(users);
        users.forEach(e => {
            console.log(`${e.first_name}, ${e.last_name}, ${e.email}`);
        });
    })
    .catch(error => {
        console.log(error);
    });

// let showUsers = function() {
//     return users;
// };
//
//
// module.exports = showUsers;