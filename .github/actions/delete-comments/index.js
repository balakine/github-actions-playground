'use strict';

//const core = require('@actions/core');
const github = require('@actions/github');

const payload = github.context.payload;
const user_login = payload.comment.user.login;
const user_id = payload.comment.user.id;
const user_type = payload.comment.user.type;

console.log(`User login: ${user_login}, user id: ${user_id}, user type: ${user_type}`);
if (user_login !== 'balakine' || user_id !== 9373325 || user_type !== 'User')
    process.exit()
console.log('New comment');
