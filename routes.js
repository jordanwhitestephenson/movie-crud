const express = require('express');
const router = express.Router();
const low = require('lowdb');
const fileAsync = require('lowdb/lib/storages/file-async');
const db = low('db/db.json', {
  storage: fileAsync
});

router.get('/movies', function(request,response) {
  const movies = db.get('movies');
  response.send(movies);
});

router.get('/movies/:id', function(request,response) {
  const movieID = parseInt(request.params.id)
  console.log(movieID)
  console.log(typeof movieID);
  const singleMovie = db.get('movies').find({id: movieID})
  console.log(singleMovie)
  response.send(singleMovie);
})

router.post('/movies', function (request,response){
  console.log(request.body);
  db.get('movies')
  .push(request.body)
  .write()
  .then(newMovie => {
    response.status(201).send(newMovie);
  })
  .catch(err => {
    console.log(err)
  });
});

router.put('/movies/:id', function(request, response){
  const movieID = parseInt(request.params.id);
  db.get('movies')
  .find({id: movieID})
  .assign(request.body)
  .write()
  .then(updatedMovie => {
    response.send(updatedMovie);
  })
  .catch(err => {
    console.log(err);
  });
});

router.get('/edit/:id', function(request, response){
const movieID = parseInt(request.params.id)
console.log(movieID)
console.log(typeof movieID);
const singleMovie = db.get('movies').find({id: movieID})
console.log(singleMovie)
response.send(singleMovie);
})

router.delete('/movies/:id', function(request,response) {
  const movieID = parseInt(request.params.id);
  db.get('movies')
  .remove({id: movieID})
  .write()
  .then(deleteMovie => {
    response.status(204).send();
  })
  .catch(err => {
    console.log(err);
  });
});

module.exports = router;
