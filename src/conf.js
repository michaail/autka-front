const test = {
  API_URL: 'http://35.225.156.136:3001',
};

const prod = {
  API_URL: 'http://35.225.156.136:3001',
};

const config = process.env.NODE_ENV === 'production' ? prod : test;

// const config = prod;

export default {
  config,
};
