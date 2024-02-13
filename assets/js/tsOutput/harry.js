"use strict";
// All the typescript I've written for this project
$(document).ready(function () {
    $('#darkMode').on('click', function () {
        $('.banner, .spotlight, .wrapper').toggleClass('invert');
    });
    $('#generate').on('click', function (event) {
        console.log('clicked!');
        // Prevent the default button click behavior
        event.preventDefault();

        // Your code to handle button click goes here
        generatePlans();
    });
});

function generatePlans() {
    // Your code to generate plans goes here
    console.log("Generating plans...");
}
