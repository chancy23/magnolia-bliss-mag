$(document).ready(function() {
    let firstName;
    let lastName;
    let email;
    let planID;
    //this is the id from our database (not stripes)
    let customerSubId;

    //not working if I say location.href === '/account'??? 
    if (location.href === 'http://localhost:3000/account') {
        getSubDetails()
    }

    //hide all but the starting form
    $('#updateAccount, #updatePayment, #changeSub, #cancellation').hide();
    
    // ======================== Functions ============================
    
    function getSubDetails() {
        //get customer etails
        $.get('api/customer/details', (res, err) => {
            console.log('res', res);
            console.log('sub ID', res.subscriptionData.subId)
            firstName = res.firstName;
            lastName = res.lastName;
            email = res.email;
            customerSubId = res.subscriptionData._id;
            $('#userName').append(firstName + ' ' + lastName);
            $('#userEmail').append(email);
            $('#submitCancellation').attr('data-subid', res.subscriptionData.subId);
            $('#submitReactivate').attr('data-subid', res.subscriptionData.subId)
        });

       //get sub details
        $.get('/api/subscription/details', (res, err) => {
            console.log('sub res', res);
            //update the account overview section with the details from the subscription
            $('#planName').append(res.planName);
            $('#dueDate').append(res.periodEnd);
            planID = res.planId;
        });
        // get invoice amount
         $.get('/api/subscription/invoice', (res, err) => {
            //  console.log('res from get invoice', res);
             //if no upcoming invoice (pending cancellation)
             if(res.statusCode === 404) {
                $('#nextInvoiceAmt').append('0.00');
             }
             else {
                //make the number into DD.cc format
                const nextInvoiceAmt = res.amountDue / 100;
                $('#nextInvoiceAmt').append(nextInvoiceAmt);
            };
        });
    };

    function createStripe() {
        var style = {
            base: {
                color: '#32325d',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aab7c4'
                }
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a'
            }
        };

        // Create a Stripe client.
        //see about using process.env here as well?
        var stripe = Stripe('pk_test_z3NBrSQZCOlhcTjNLJks2STL00Jirr8EqC');
        
        // Create an instance of Elements.
        var elements = stripe.elements();
        
        // Create an instance of the card Element.
        var card = elements.create('card', { style: style });

        // Add an instance of the card Element into the `card-element` <div>.
        card.mount('#update-card-element');

        // Handle real-time validation errors from the card Element.
        card.addEventListener('change', function (event) {
            var displayError = document.getElementById('card-errors');
            if (event.error) {
                displayError.textContent = event.error.message;
            } else {
                displayError.textContent = '';
            }
        });

        var form = document.getElementById('update-payment-form');
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            stripe.createToken(card).then(function (result) {
                if (result.error) {
                    // Inform the user if there was an error.
                    var errorElement = document.getElementById('card-errors');
                    errorElement.textContent = result.error.message;
                } else {
                    
                    console.log('token', result.token);
                    // Send the token to your server (along with id and email from our DB)
                    sendUpdate(result.token)
                }
            });
        });
    };
    
    function sendUpdate(token) {
        //need to send the token, planID, customer _id to /api/subscription/new
        const dataObj = {
            token: token.id
        };
        console.log('data Object to send to backend', dataObj)

        $.ajax('/api/subscription/updatePayment', {
            type: "PUT",
            data: dataObj
        })
        .then((err, res) => {
            // console.log('err', err);
            // console.log('res', res);
            if (res === 'success') {
                //TODO: create a success modal
                console.log('payment info updated');
                //clear form fields or hide forms or redirect to view the magazine
                // $('.InputElement').addClass('StripeElement is-empty');
                // location.href = '/magazine';
            }
            else {
                //TODO: load a failure modal
                console.log(err)
            }
        })
    };

    // ======================== Event Handlers ============================

    //depending one what option is pcked from starting form, display the appropriate section
    // if reselect a different option make sure to hide any other forms
    $('#accountAction').change((event) => {
        event.preventDefault();
        if ($('#accountAction').val() === 'accountInfo') {
            //show default values from database when form is displayed
            $('#firstName').val(firstName)
            $('#lastName').val(lastName);
            $('#email').val(email);

            $('#updateAccount').show();
            $('#updatePayment, #changeSub, #cancellation').hide();
        }
        else if ($('#accountAction').val() === 'plan') {
            $('#changeSub').show();
            $('#updateAccount, #updatePayment, #cancellation').hide();
            
            // console.log(planID);
            //for current plan make that option disabled in the plan change
            const selection = document.getElementById(planID)
            // console.log(selection);
            selection.disabled = true;
        }
        else if ($('#accountAction').val() === 'paymentInfo') {
            $('#updatePayment').show(); 
            $('#updateAccount, #changeSub, #cancellation').hide();
            createStripe();
        }
        else {
            $('#cancellation').show();
            $('#updateAccount, #updatePayment, #changeSub').hide();
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
            location.reload();  
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
                location.reload();
            }
            else {
                console.log('error', err);
                //TODO: change to modal later
                alert('Something went wrong, please try again');
            };
        });
    });

    //when submit cancellation button send to backend tbe session subscription id (stripe)
    $('#submitCancellation').click(event => {
        event.preventDefault();
        // TODO: change to modal with yes and no buttons
        alert("Please confirm that you would like to cancel your Magnolia Bliss subscription and Life Coaching package.")
        const subObj = {
            subId: $('#submitCancellation').attr('data-subid'),
            customerSubId: customerSubId
        };

        console.log('sub ID Object', subObj);

        $.ajax('/api/subscription/cancel', {
            type: 'PUT',
            data: subObj
        })
        .then((res, err) => {
            console.log('response from cancel sub:', res);
            // console.log('err:', err);
            if (res.pendingCancel === true) {
                // TODO: change to modal later and include a prompt to verify they want to continue
                alert('Cancelled Subscription Successfully. If you wish to reactivate your subscription, you can do so before your cycle end date.');
                location.reload()
            }
            else {
                //TODO: change to modal later
                alert('Something went wrong, please try again');
                // TODO: make a log in the error db
            };
        });
    });

    $('#submitReactivate').click(event => {
        event.preventDefault();

        const subObj = {
            subId: $('#submitReactivate').attr('data-subid'),
            customerSubId: customerSubId
        };

        console.log('subobj', subObj);

        $.ajax('api/subscription/reactivate', {
        type: 'PUT',
        data: subObj
        })
        .then((res, err) => {
            // console.log('err:', err);
            console.log('res:', res);
            if (res.pendingCancel === false) {
                // TODO: change to modal later and include a prompt to verify they want to continue
                alert('You have successfully reactivated your subscription. Enjoy!');
                location.reload();
            }
            else {
                // console.log('error', err);
                //TODO: change to modal later
                alert('Something went wrong, please try again');
            };
        });
    });

})