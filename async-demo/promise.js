console.log('Before');

getUser(1)
  .then(getUserRepos)
  .then(getRepoCommits)
  .then(displayCommits)
  .catch(err => console.log('Error:', err));

console.log('After');

function getUserRepos(user) {
  console.log(user);
  return getRepositories(user.username);
}

function getRepoCommits(repos) {
  console.log('Repos: ', repos);
  return getCommits(repos);
}

function displayCommits(commits) {
  console.log('Commits: ', commits);
}

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Retrieving user with id ${id} from the database`);
      resolve({
        id: id,
        username: 'pfelix'
      });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    const repos = ['repo1', 'repo2', 'repo3'];
    setTimeout(() => {
      console.log(`Retrieving repositories for user ${username}`);
      resolve(repos);
    }, 2000);
  });
}

function getCommits(repositories) {
  return new Promise((resolve, reject) => {
    const commits = ['commit1', 'commit2', 'commit3'];
    setTimeout(() => {
      console.log(`Retrieving commits for repositories ${repositories.join(', ')}`);
      resolve(repositories.map((repository) => ({ repository, commits })));
    }, 2000);
  });
}