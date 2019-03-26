$(document).ready(function() {
    let planID;
    //when the page loads get the account information from stripe and our db
    //may just include this in the req.session info and import direclty to the html view

    // $('#navAdmin').click(() => {
       
        // $.get()
        $.get('/api/subscription/details', (res, err) => {
            console.log('res', res);
            //update the account overview section with the details from the subscription
            $('#planName').append(res.planName);
            $('#dueDate').append(res.periodEnd);
            planID = res.planId;
            // return res;
            //saying the items in the ${} is not a function
            // $('#subOverview').append(
            //     `<p>Your current plan is the ${res.planName}<p>`
            //     `<p>Your next payment is on ${res.periodEnd}<p>`
            //     `<p>Your next payment amount is $ ${res.invoice}<p>`
            // )
        });
    // });


    //hide all but the starting form
    $('#updateInfo, #changeSub, #cancellation').hide();

    //depending one what option is pcked from starting form, display the appropriate section
    // if reselect a different option make sure to hide any other forms
    $('#accountAction').change((event, planID) => {
        event.preventDefault();
        if ($('#accountAction').val() === 'info') {
            $('#updateInfo').show();
            $('#changeSub, #cancellation').hide();
        }
        else if ($('#accountAction').val() === 'plan') {
            $('#updateInfo, #cancellation').hide();
            $('#changeSub').show();
        
            //for current plan make that option disabled in the plan change form
            if ($('#selectNewPlan').val() === planID) {
                //how to make that option disabled in the form selection
                console.log('this option', $(this).option);
                $(this).option.attr('disabled', true);  
            }
        }
        else {
            $('#cancellation').show();
            $('#updateInfo, #changeSub').hide();
        }
    });

    // when submit change plan button send to the backend with new plan info, (user id is from sessions)
    
    //when submit cancellation button send to backend tbe session subscription id (stripe)




})