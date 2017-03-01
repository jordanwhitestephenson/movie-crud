
$(document).ready(function() {

 var myLocation = decodeURIComponent(window.location.search).split("=")[1]
  // window.location = `/edit.html?id=${movieID}`
  // var getmovieID = getParameterByName('id', `/edit.html?id=${movieID}`)
  console.log(myLocation)

    $.ajax({
            method: 'GET',
            url: `/movies/${myLocation}`,
            contentType: "application/json",
            // data: JSON.stringify()
          }).then(function(success) {
            console.log(success)
            console.log(success.Title)
            // var editMovieTitle = $('#editmovietitle').val()
            // editMovieTitle = success.Title;

              $('#editmovietitle').val(success.Title)
              $('#editmoviedirector').val(success.Director)
              $('#editmoviedate').val(success.Year)
              $('#editrating').val(success.MyRating)
              $('#editurl').val(success.PosterURL)
              // $('#editposter').attr("src", success.poster)
            })
            .catch(err => {console.log(err)});

            $('#submitButton').on('click', function(event) {
                event.preventDefault();
                myNewMovie = {
                    id: `${myLocation}`,
                    Title: $('#editmovietitle').val(),
                    Director: $('#editmoviedirector').val(),
                    Year: $('#editmoviedate').val(),
                    MyRating: $('#editrating').val(),
                    PosterURL: $('#editurl').val()
                };
                $.ajax({
                        method: "PUT",
                        url: `/movies/${myLocation}`,
                        data: JSON.stringify(myNewMovie),
                        contentType: "application/json"
                    })
                    .then(response => {
                        window.location = "/movies.html";
                    });
            });


  });
