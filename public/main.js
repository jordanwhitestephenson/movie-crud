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
                '<td class="directorClass" contenteditable="true">' +
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
  

    });
