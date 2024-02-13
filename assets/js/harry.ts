// All the typescript I've written for this project

$(document).ready(function() {
    $('#darkMode').on('click', function() {
        $('.banner, .spotlight, .wrapper').toggleClass('invert')
    }); 
    $('#generate').on('click',function() {
        $('#mon1').text('New Text');
    });
});