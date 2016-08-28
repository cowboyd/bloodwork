module.exports = function(deployTarget) {  
  return {
    pagefront: {
      app: 'bloodwork',
      key: process.env.PAGEFRONT_KEY
    }
  };
};
