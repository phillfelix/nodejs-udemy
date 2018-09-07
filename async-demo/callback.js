console.log('Before');
getUser(1, getUserRepos);
console.log('After');

function getUserRepos(user) {
  getRepositories(user.username, getRepoCommits);
  console.log(user);
}

function getRepoCommits(repos) {
  getCommits(repos, displayCommits);
  console.log('Repos: ', repos);
}

function displayCommits(commits) {
  console.log('Commits: ', commits);
}

function getUser(id, callback) {
  setTimeout(() => {
    console.log(`Retrieving user with id ${id} from the database`);
    callback({
      id: id,
      username: 'pfelix'
    });
  }, 2000);
}

function getRepositories(username, callback) {
  const repos = ['repo1', 'repo2', 'repo3'];
  setTimeout(() => {
    console.log(`Retrieving repositories for user ${username}`);
    callback(repos);
  }, 2000);
}

function getCommits(repositories, callback) {
  const commits = ['commit1', 'commit2', 'commit3'];
  setTimeout(() => {
    console.log(`Retrieving commits for repositories ${repositories.join(', ')}`);
    callback(repositories.map((repository) => ({ repository, commits })));
  }, 2000);
}