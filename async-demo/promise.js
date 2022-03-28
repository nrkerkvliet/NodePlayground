
/* const p = new Promise( (resolve, reject) => {
    // kick of asnyc work
    // ...
    setTimeout(() => {
       resolve(1); // pending= > resolved, fulfilled
       reject(new Error('message')); // pending => rejected
    }, 2000);


});

p
    .then(result => console.log('Result', result))
    .catch(err => console.log('Error', err.message));
 */


console.log('before');
/* getUser(1, (user) => {
    getRepositories(user.gitHubUsername, (repositories) => {
        getCommits(repo, (commits) => {
        });
    });
}); */
getUser(1)  
    .then(user => getRepositories(user.gitHubUsername))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log('Commits:', commits))
    .catch(err => console.log('Error:', err.message));
console.log('after');

function getUser(id) {
    return new Promise((resolve, reject) => {
        // kick off async work
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'NateK' });
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API for repos...')
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API for commits...')
            resolve(['commit1']);
        }, 2000);
    });
}