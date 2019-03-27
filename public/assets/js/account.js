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
    $('#accountAction').change((event) => {
        event.preventDefault();
        if ($('#accountAction').val() === 'info') {
            $('#updateInfo').show();
            $('#changeSub, #cancellation').hide();
        }
        else if ($('#accountAction').val() === 'plan') {
            $('#updateInfo, #cancellation').hide();
            $('#changeSub').show();

            // console.log(planID);
            //for current plan make that option disabled in the plan change
            const selection = document.getElementById(planID)
            // console.log(selection);
            selection.disabled = true;
        }
        else {
            $('#cancellation').show();
            $('#updateInfo, #changeSub').hide();
        }
    });

    //when updating account info send the update object to the backend
    $('#submitUpdate').click(event => {
        event.preventDefault();
        const updatedInfo = {
            firstName: $('#firstName').val().trim(),
            lastName: $('#lastName').val().trim(),
            email: $('#email').val().trim(),
        }
        console.log("updated info", updatedInfo);
        //send this update to the custController via AJAX PUT
        $.ajax('/api/customer/update', {
            type: "PUT",
            data: updatedInfo
        }).then(() => {
            console.log("customer info updated");
            $.get('/api/auth/session', (res, err) => {
                window.reload;  
            })
        })
    });

    // when submit change plan button send to the backend with new plan info, (user id is from sessions)
    // $('#submitPlanChange').click(event => {

    // });
    //when submit cancellation button send to backend tbe session subscription id (stripe)
    // $('#submitCancellation').click(event => {

    // });



})