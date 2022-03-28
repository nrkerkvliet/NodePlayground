
// CallBacks
console.log('before');
getUser(1, (user) => {
    getRepositories(user.gitHubUsername, (repositories) => {
        getCommits(repo, (commits) => {
        });
    });
});

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callback({ id: id, gitHubUsername: 'NateK' });
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Calling GitHub API...')
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}

console.log('after');

// using named function to prevent nested callback
/* console.log('before');
getUser(1, getRepositories);
console.log('after');


function displayCommits(commmits) {
    console.log(commits);
}

function getCommits(repo) {
    getCommits(repo, displayCommits);
}

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callback({ id: id, gitHubUsername: 'NateK' });
    }, 2000);
}

function getRepositories(user) {
    getRepositories(user, getCommits);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Calling GitHub API...')
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}
 */



// Promises
// Async/await


