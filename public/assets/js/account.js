$(document).ready(function() {
    let planID;
    //when the page loads get the account information from stripe and our db
    //may just include this in the req.session info and import direclty to the html view

    //make it so the get isn't done until on this page, throwing an error in terminal due to no session data until logged in
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

    //if account is cancelled but before cycle end, display "Reactivate subscription" button in lieu of cancel option
    //may need to do a partial for the two different sub statuses on this page

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
            // to do: get page to refresh with updated name after update
            //or add message that changes will appear after next login (not ideal)
            console.log("customer info updated");
            $.get('/api/auth/session', (res, err) => {
                location.reload;  
            })
        })
    });

    // when submit change plan button send to the backend with new plan info, (user id is from sessions)
    $('#submitPlanChange').click(event => {
        event.preventDefault();

        const planData = {
            plan: $('#selectNewPlan').val()
        }
        console.log('new plan', planData);

        $.ajax('/api/subscription/change', {
            type: "PUT",
            data: planData
        })
        .then((res, err) => {
            if(err === "success") {
                // TODO: change to modal later
                alert('Plan Changed Successfully!');
            }
            else{
                console.log('error', err);
                //TODO: change to modal later
                alert('Something went wrong, please try again');
            }
        });
    });


    //when submit cancellation button send to backend tbe session subscription id (stripe)
    $('#submitCancellation').click(event => {
        event.preventDefault();
        const subObj = {
            subId: $('#submitCancellation').attr('data-subid')
        };

        console.log('sub ID Object', subObj);

        $.ajax('/api/subscription/cancel', {
            type: "PUT",
            data: subObj
        })
        .then((res, err) => {
            console.log('response from cancel sub:', res),
            console.log('err:', err);
            if(err === "success") {
                // TODO: change to modal later
                alert('Cancelled Subscription Successfully. If you wish to reactivate your subscription, you can do so before your cycle end date.');
            }
            else{
                console.log('error', err);
                //TODO: change to modal later
                alert('Something went wrong, please try again');
            }
        })
    });



})