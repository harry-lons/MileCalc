"use strict";
// All the typescript I've written for this project
$(document).ready(function () {
    $('#darkMode').on('click', function () {
        $('.banner, .spotlight, .wrapper').toggleClass('invert');
    });
    $('#generate').on('click', function (event) {
        // Prevent the default button click behavior
        event.preventDefault();
        // log that generate was clicked
        console.log("generating...");
        // clear the table for our new values
        clearTable();
        // get the mileage value from the mileage box
        const mileage = $('#mileage').val();
        // get rest day and long run booleans, and print to the console
        const rest = ($('#rest')).prop('checked');
        const long = ($('#long')).prop('checked');
        console.log("rest day: " + rest);
        console.log("long run: " + long);
        // parse the mileage to an int
        const intMileage = parseInt(mileage as string);
        if (intMileage == 0 || intMileage == undefined || intMileage == Infinity || intMileage == -Infinity || Number.isNaN(intMileage) ) { 
            $("#returnMessage").text("Something went wrong, try again! Only enter a valid nonzero number");
            console.log("error found");
            return;
        }
        $("#mon1").text(intMileage);
        $("#returnMessage").text("Here's a few plans to hit  " + intMileage + "  miles!");
        generatePlanOne();
        generatePlanTwo();
        generatePlanThree();

        function clearTable() {
            console.log("Yes chef, clearing table");
            const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
            daysOfWeek.forEach(day => {
                for (let i = 1; i <= 3; i++) {
                    // Construct the id for each day (e.g., mon1, mon2, mon3, tue1, tue2, ...)
                    const id = `#${day}${i}`;
                    $(id).text("0");
                }
            });
        }
        function generatePlanOne(){
            
        }
        function generatePlanTwo(){

        }
        function generatePlanThree(){
            
        }
    });
});
