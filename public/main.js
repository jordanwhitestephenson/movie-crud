var count = 0;
var newID = 0;
var myNewMovie = {};

$(document).ready(function() {

    //get all the movies!//

    $.get('/movies', function(data) {
        for (var i = 0; i < data.length; i++) {

            count++
            newID = data.length;

            $('tbody').append(
                '<tr id=' + count + '>' +
                `<td class="titleClass"><a class="posterClass" href="${data[i].PosterURL}">` +
                data[i].Title +
                '</a></td>' +
                '<td class="directorClass">' +
                data[i].Director +
                '</td>' +
                '<td class="yearClass">' +
                data[i].Year +
                '</td>' +
                '<td class="ratingClass">' +
                data[i].MyRating + '</td>' +
                '<td>' + '<button type="button" data-id = "' + data[i].id + '"class="edit-btn"><span data-id = "' + data[i].id + '" class="glyphicon glyphicon-edit" aria-hidden="true"></span></button>' + '</td>' +

                '<td>' + '<button type="button" class="delete-btn"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>' + '</td>' +
                '</tr>'

            ); //end append
        }
    });
});

$('#submitButton').on('click', function(event) {
    event.preventDefault();
    myNewMovie = {
        id: newID += 1,
        Title: $('#movietitle').val(),
        Director: $('#moviedirector').val(),
        Year: $('#moviedate').val(),
        MyRating: $('#rating').val(),
        PosterURL: $('#url').val()
    };
    $.ajax({
            method: "POST",
            url: '/movies',
            data: JSON.stringify(myNewMovie),
            contentType: "application/json"
        })
        .then(response => {
            window.location = "/movies.html";
        });
});

$('body').on('click', '.delete-btn', function(e) {
    console.log('whyisthisgettingintodelete');
    e.preventDefault();

    $.ajax({
        method: 'DELETE',
        url: `/movies/${newID}`,
        contentType: "application/json",
        success: function() {
            console.log('Movie was REMOVED YA!');
            $('#' + newID).remove();
        }
    });
});

$('body').on('click', '.edit-btn', function(e) {
    e.preventDefault();
    localStorage.setItem('movieID', e.target.dataset.id);
    var movieID = localStorage.getItem('movieID');
    window.location = `/edit.html?id=${movieID}`
    var getmovieID = getParameterByName('id', `/edit.html?id=${movieID}`)
    console.log(getmovieID)

    function getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
        }


    $.ajax({
            method: 'GET',
            url: `/edit/${getmovieID}`,
            contentType: "application/json",
            data: JSON.stringify()
          }).then(function(success) {
            console.log(success)
            console.log(success.Title)
              // $('#editaddMovie').text(success.Title)
              $('#editmovietitle').val(success.Title)
              $('#editmoviedirector').val(success.Director)
              $('#editmoviedate').val(success.Year)
              $('#editrating').val(success.MyRating)
              $('#editurl').val(success.PosterURL)
              // $('#editposter').attr("src", success.poster)
            })
            .catch(err => {console.log(err)})
    });
