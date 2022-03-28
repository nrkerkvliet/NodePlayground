
notifyCustomer();

async function notifyCustomer() {
  try {
    const customer = await getCustomer(1);
    if(customer.isGold) {
      const topMovies = await getTopMovies();
      await sendEmail(customer.email, topMovies);
    }
  } catch(err) {
    console.log('Error Caught', err);
  }
}

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(customer);
      resolve({id: 1, name: "Nate", isGold: true, email: "email"})
   }, 2000);
  }); 
};

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(topMovies);
      resolve(['movie1', 'movie2']);
    }, 2000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Email sent...');
      resolve();
    }, 2000);
  });
}