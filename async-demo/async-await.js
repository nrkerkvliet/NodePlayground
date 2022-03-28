
console.log('before');
displayCommits();
console.log('after');

// async await is promise based under the hood

async function displayCommits() {
    try{
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    } catch (err) {
        console.log('Error', err);
    }
    
}

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
           // resolve(['repo1', 'repo2', 'repo3']);
           reject(new Error('Could not get the repos.'));
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