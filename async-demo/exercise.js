function timeout(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

async function getCustomer(id, callback) {
  await timeout(4000);
  return {
    id: 1,
    name: 'Mosh Hamedani',
    isGold: true,
    email: 'email'
  }
}

async function getTopMovies(callback) {
  await timeout(4000);
  return ['movie1', 'movie2'];
}

async function sendEmail(email, movies, callback) {
  await timeout(4000);
  return;
}

async function execute() {
  try {
    const customer = await getCustomer(1);
    console.log('Customer: ', customer);
    if(customer.isGold) {
      const movies = await getTopMovies();
      console.log('Top movies: ', movies);
      await sendEmail(customer.email, movies);
      console.log('Email sent...');
    }
  } catch(error) {
    console.error(error);
  }
}

execute();