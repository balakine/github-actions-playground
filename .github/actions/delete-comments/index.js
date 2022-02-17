'use strict';

import { context, getOctokit } from '@actions/github';

const targetUserLogin = 'balakine';
const targetUserId = 9373325;
const targetUserType = 'User';
const substrings = [
  'blah',
];

const repo = context.repo; // is an object {owner: string; repo: string}
const comment = context.payload.comment;
const userLogin = comment.user.login;
const userId = comment.user.id;
const userType = comment.user.type;
const body = comment.body;
const commentId = comment.id;

console.log(`User login: ${userLogin}, user id: ${userId}, user type: ${userType}`);
if (userLogin === targetUserLogin && userId === targetUserId && userType === targetUserType) {
  console.log('✅ User matches');
} else {
  console.log(`⏭ Only looking for user login: ${targetUserLogin}, user id: ${targetUserId}, user type: ${targetUserType}`);
  process.exit(0);
}

if (isMatching(body, substrings)) {
  console.log('✅ Comment body matches');
} else {
  console.log('⏭ Comment body doesn\'t match');
  process.exit(0);
}

const octokit = getOctokit(process.env.GITHUB_TOKEN);
const request = {
  ...repo,
  comment_id: commentId,
};
console.log(`Request: ${ JSON.stringify(request) }`);

octokit.rest.issues.deleteComment(request)
.then(({ status, url, data }) => {
  console.log(`✅ Response: ${ JSON.stringify({ status, url, data }) }`);
})
.catch(error => {
  console.error(`🔥 Error: ${error}`);
});

function isMatching(body, substrings) {
  return substrings.every(s => {
    const f = body.includes(s);
    console.log(`${s}: ${f}`);
    return f;
  });
}
