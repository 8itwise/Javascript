if(process.env.NODE_ENV === 'production'){
  module.exports = {
    mongoURI: 'mlab MongoDB URI'
  }

} else {
  module.exports = {mongoURI: 'mongodb://localhost/Project Name'}
}
