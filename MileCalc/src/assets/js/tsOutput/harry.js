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
        if (rest) {
            // 6 days
            generatePlanOne(6, long, intMileage);
            generatePlanTwo(6, long, intMileage);
            generatePlanThree(6, long, intMileage);
        }
        else {
            // 7 days 
            generatePlanOne(7, long, intMileage);
            generatePlanTwo(7, long, intMileage);
            generatePlanThree(7, long, intMileage);
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
            console.log("generating plan one");
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
                    weights[0] = weights[1] = weights[2] = weights[3] = weights[4] = weights[5] = 1 / 8;
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
            console.log("miles = " + miles);
            console.log("target mileage = " + mileage);
            while (miles < mileage) {
                // The idea is to spread the remaining mileage across the days (for example, if there are 2 miles
                // left over, don't put them both on the first day. or on the first 2 days)
                if (long && curr == 6 || rest && curr == 0) {
                    // don't add to the long run or the rest day. Do nothing in this case
                }
                else {
                    res[curr % 7]++;
                    miles++;
                }
                // If days are odd, increment by 2. If days are even, increment by 3. Then we will cycle through
                // But if there is a long run, reverse those because there's 1 less day we can actually add to
                // boolean tomfoolery
                if ((days % 2 == 0 && long) || (days % 2 == 1 && !long)) {
                    curr += 2;
                    console.log("incrementing by 2");
                }
                else if ((days % 2 == 0 && !long) || (days % 2 == 1 && long)) {
                    curr += 3;
                    console.log("incrementing by 3");
                }
                console.log("miles = " + miles);
                console.log("target mileage = " + mileage);
            }
            $("#mon1").text(res[0]);
            $("#tue1").text(res[1]);
            $("#wed1").text(res[2]);
            $("#thu1").text(res[3]);
            $("#fri1").text(res[4]);
            $("#sat1").text(res[5]);
            $("#sun1").text(res[6]);
            return;
        }
        function generatePlanTwo(days, long, mileage) {
            // plan two, which aims to balance alternating longer and shorter days
            console.log("generating plan two");
            let res = new Int32Array(7);
            let weights = new Float32Array(7);
            if (days == 6) {
                // weights[0] and res[0] should already be 0, but this feels like a good practice
                weights[0] = 0;
                if (long) {
                    weights[6] = 1 / 5;
                    weights[1] = weights[2] = weights[3] = weights[4] = weights[5] = 4 / 25;
                }
                else {
                    // if no long run, let's change things up a bit from plan 1
                    weights[1] = weights[3] = weights[5] = 2 / 9;
                    weights[2] = weights[4] = weights[6] = 1 / 9;
                }
            }
            else {
                if (long) {
                    weights[6] = 1 / 5;
                    weights[0] = weights[1] = weights[2] = weights[3] = weights[4] = weights[5] = 1 / 8;
                }
                else {
                    weights[0] = weights[2] = weights[4] = weights[6] = 1 / 6;
                    weights[1] = weights[3] = weights[5] = 1 / 12;
                }
            }
            let miles = 0;
            for (let i = 0; i < 7; i++) {
                res[i] = weights[i] * mileage;
                miles += res[i];
            }
            let curr = 0;
            // console.log("miles = " + miles);
            // console.log("target mileage = " + mileage);
            while (miles < mileage) {
                // The idea is to spread the remaining mileage across the days (for example, if there are 2 miles
                // left over, don't put them both on the first day. or on the first 2 days)
                if (long && curr == 6 || rest && curr == 0) {
                    // don't add to the long run or the rest day. Do nothing in this case
                }
                else {
                    res[curr % 7]++;
                    miles++;
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
                // console.log("miles = " + miles);
                // console.log("target mileage = " + mileage);
            }
            $("#mon2").text(res[0]);
            $("#tue2").text(res[1]);
            $("#wed2").text(res[2]);
            $("#thu2").text(res[3]);
            $("#fri2").text(res[4]);
            $("#sat2").text(res[5]);
            $("#sun2").text(res[6]);
            return;
        }
        function generatePlanThree(days, long, mileage) {
            // Function to generate plan 3, which will use random weights for each day
            console.log("generating plan three. long = " + long + "days = " + days);
            let res = new Int32Array(7);
            let weights = new Float32Array(7);
            if (days == 6) {
                // weights[0] and res[0] should already be 0, but this feels like a good practice
                weights[0] = 0;
                if (long) {
                    weights[6] = 1.2;
                    for (let i = 1; i <= 5; i++) {
                        weights[i] = Math.random();
                    }
                    normalize(weights);
                }
                else {
                    for (let i = 1; i <= 6; i++) {
                        weights[i] = Math.random();
                    }
                    normalize(weights);
                }
            }
            else {
                if (long) {
                    weights[6] = 1.2;
                    for (let i = 0; i <= 5; i++) {
                        weights[i] = Math.random();
                    }
                    normalize(weights);
                }
                else {
                    for (let i = 0; i <= 6; i++) {
                        weights[i] = Math.random();
                    }
                    normalize(weights);
                }
            }
            let miles = 0;
            for (let i = 0; i < 7; i++) {
                res[i] = weights[i] * mileage;
                miles += res[i];
            }
            let curr = 0;
            // console.log("miles = " + miles);
            // console.log("target mileage = " + mileage);
            while (miles < mileage) {
                // The idea is to spread the remaining mileage across the days (for example, if there are 2 miles
                // left over, don't put them both on the first day. or on the first 2 days)
                if (long && curr == 6 || rest && curr == 0) {
                    // don't add to the long run or the rest day. Do nothing in this case
                }
                else {
                    res[curr % 7]++;
                    miles++;
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
                // console.log("miles = " + miles);
                // console.log("target mileage = " + mileage);
            }
            $("#mon3").text(res[0]);
            $("#tue3").text(res[1]);
            $("#wed3").text(res[2]);
            $("#thu3").text(res[3]);
            $("#fri3").text(res[4]);
            $("#sat3").text(res[5]);
            $("#sun3").text(res[6]);
            return;
        }
        function normalize(weights) {
            let sum = 0;
            for (let i = 0; i < weights.length; i++) {
                sum += weights[i];
                console.log("weights[" + i + "] = " + weights[i]);
            }
            console.log("sum = " + sum);
            for (let i = 0; i < weights.length; i++) {
                weights[i] = weights[i] / sum;
            }
        }
    });
});
