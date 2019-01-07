const test = {
  API_URL: 'http://localhost:3001',
};

const prod = {
  API_URL: 'http://ec2-34-248-234-92.eu-west-1.compute.amazonaws.com:3001',
};

const config = process.env.RUN === 'prod' ? prod : test;

export default {
  config,
};
