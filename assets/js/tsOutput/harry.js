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
        const intMileage = parseInt(mileage);
        if (intMileage == 0 || intMileage == undefined || intMileage == Infinity || intMileage == -Infinity || Number.isNaN(intMileage)) {
            $("#returnMessage").text("Something went wrong, try again! Only enter a valid nonzero number");
            console.log("error found");
            return;
        }
        $("#returnMessage").text("Here's a few plans to hit  " + intMileage + "  miles!");
        if (rest && long) {
            // 6 days, long run
            generatePlanOne(6, true, intMileage);
            generatePlanTwo(6, true, intMileage);
            generatePlanThree(6, true, intMileage);
        }
        else if (rest) {
            // 6 days, no long run
            generatePlanOne(6, false, intMileage);
            generatePlanTwo(6, false, intMileage);
            generatePlanThree(6, false, intMileage);
        }
        else if (long) {
            // 7 days, long run
            generatePlanOne(7, true, intMileage);
            generatePlanTwo(7, true, intMileage);
            generatePlanThree(7, true, intMileage);
        }
        else {
            // 7 days, no long run
            generatePlanOne(7, false, intMileage);
            generatePlanTwo(7, false, intMileage);
            generatePlanThree(7, false, intMileage);
        }
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
        // algorithm to generate plan one, which aims to be the most balanced
        function generatePlanOne(days, long, mileage) {
            let res = new Int32Array(7);
            let weights = new Float32Array(7);
            if (days == 6) {
                // weights[0] and res[0] should already be 0, but this feels like a good practice
                weights[0] = 0;
                if (long) {
                    weights[6] = 1 / 4;
                    weights[1] = weights[2] = weights[3] = weights[4] = weights[5] = 3 / 20;
                }
                else {
                    // set all other weights to 1/6 if no long run
                    weights[1] = weights[2] = weights[3] = weights[4] = weights[5] = weights[6] = 1 / 6;
                }
            }
            else {
                if (long) {
                    weights[6] = 1 / 4;
                    weights[1] = weights[2] = weights[3] = weights[4] = weights[5] = 1 / 8;
                }
                else {
                    // simply set all weights to 1/7 if no long run
                    weights[0] = weights[1] = weights[2] = weights[3] = weights[4] = weights[5] = weights[6] = 1 / 7;
                }
            }
            let miles = 0;
            for (let i = 0; i < 7; i++) {
                res[i] = weights[i] * mileage;
                miles += res[i];
            }
            let curr = 0;
            while (miles < mileage) {
                // The idea is to spread the remaining mileage across the days (for example, if there are 2 miles
                // left over, don't put them both on the first day. or on the first 2 days)
                if (long && curr == 6 || rest && curr == 0) {
                    // don't add to the long run or the rest day. Do nothing in this case
                }
                else {
                    res[curr]++;
                }
                // If days are odd, increment by 2. If days are even, increment by 3. Then we will cycle through
                // But if there is a long run, reverse those because there's 1 less day we can actually add to
                // boolean tomfoolery
                if ((days % 2 == 0 && long) || (days % 2 == 1 && !long)) {
                    curr += 2;
                }
                else if ((days % 2 == 0 && !long) || (days % 2 == 1 && long)) {
                    curr += 3;
                }
                miles++;
            }
            $("#mon1").text(res[0]);
            $("#tue1").text(res[1]);
            $("#wed1").text(res[2]);
            $("#thu1").text(res[3]);
            $("#fri1").text(res[4]);
            $("#sat1").text(res[5]);
            $("#sun1").text(res[6]);
        }
        function generatePlanTwo(days, long, mileage) {
            let res = new Int32Array(7);
        }
        function generatePlanThree(days, long, mileage) {
            let res = new Int32Array(7);
        }
    });
});
