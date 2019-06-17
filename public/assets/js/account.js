$(document).ready(function() {
    let firstName;
    let lastName;
    let email;
    let planID;
    //this is the id from our database (not stripes)
    let customerSubId;
    let periodEndDate;
    let pendingCancel;

    if (location.pathname === '/account') {
        getSubDetails()
    }

    //hide all but the starting form
    $('#updateAccount, #updatePayment, #changeSub, #cancellation').hide();
    
    // ======================== Functions ============================
    //use this in the SetTimeout functions to reload page after various secess messages show
    function pageReload() {
        location.reload()
    };
    
    function getSubDetails() {

        //get customer etails
        $.get('api/customer/details', (res, err) => {
            console.log('res', res);
            console.log('sub ID', res.subscriptionData.subId)
            firstName = res.firstName;
            lastName = res.lastName;
            email = res.email;
            customerSubId = res.subscriptionData._id;
            pendingCancel = res.subscriptionData.pendingCancel;
            $('#userName').append(firstName + ' ' + lastName);
            $('#userEmail').append(email);
            $('#submitCancellation').attr('data-subid', res.subscriptionData.subId);
            $('#submitReactivate').attr('data-subid', res.subscriptionData.subId)

            if (pendingCancel) {
                $('#pendingCancelSection').show();
                $('#nextPaymentArea').hide();
            }
            else {
                $('#pendingCancelSection').hide();
            }
        });

        //get sub details
        $.get('/api/subscription/details', (res, err) => {
            console.log('sub res', res);

            periodEndDate = res.periodEnd;
            planID = res.planId;
            //update the account overview section with the details from the subscription
            $('#planName').append(res.planName);
            $('.dueDate').append(periodEndDate);
        });
        // get invoice amount
        $.get('/api/subscription/invoice', (res, err) => {
            // console.log('res from get invoice', res);
            //if no upcoming invoice (pending cancellation)
            if(res.statusCode === 404) {
                $('.nextInvoiceAmt').append('0.00');
            }
            else {
                //make the number into DD.cc format
                const nextInvoiceAmt = res.amountDue / 100;
                $('.nextInvoiceAmt').append(nextInvoiceAmt);
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
                    // Send the token to server
                    sendUpdate(result.token)
                }
            });
        });
    };
    
    function sendUpdate(token) {
        const dataObj = {
            token: token.id
        };
        console.log('data Object to send to backend', dataObj)

        $.ajax('/api/subscription/updatePayment', {
            type: "PUT",
            data: dataObj
        })
        .then((res, err) => {
            if (res === 'payment method updated') {
                
                console.log('payment info updated');
                $('#card-errors').empty().append('<p> Your payment information has been updated successfully.<p>');
                setTimeout(pageReload, 5000);
                //clear form fields or hide forms or redirect to view the magazine
                // $('.InputElement').addClass('StripeElement is-empty');
            }
            else {
                console.log(err)
                $('#card-errors').empty().append('<p>There was an issue updating your payment information. Please try again later. If the problem persists please contact the site admin.<p>')
                //TODO: send error to db
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
            console.log('res', res);
            if(res.message === "plan change success") {
                $('#planUpdateMsg').empty().append('<p> Your subscription plan has been updated successfully.<p>');
                //set a time out of 5 seconds then reload the page
                setTimeout(pageReload, 5000);
                
            }
            else {
                console.log('error', err);
                $('#planUpdateMsg').empty().append('<p>There was an issue updating your subscription. Please try again later. If the problem persists please contact the site admin.<p>')
                //TODO: send error and code to db
            };
        });
    });

    //when submit cancellation button send to backend tbe session subscription id (stripe)
    $('#submitCancellation').click(event => {
        event.preventDefault();

        //sub cancellation confirm modal
        const cancelConfirmModal = document.getElementById('cancelConfirmModal');
        //open modal
        cancelConfirmModal.style.display = 'block';

        //close modal when Yes or No button is hit
        const cancelConfirmYesBtn= document.getElementById('cancelConfirmYes');
        const cancelConfirmNoBtn= document.getElementById('cancelConfirmNo');
        
        //if hit Yes then hide modal continue with cancellation
        cancelConfirmYesBtn.onclick = function() {
            cancelConfirmModal.style.display = 'none';

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
                    $('#subCancelMsg').empty().append('<p> Your subscription has been cancelled successfully. If you wish to reactivate it, you can do so before your cycle end date on ' + periodEndDate + '.<p>');
                    //set a time out of 5 seconds then reload the page
                    setTimeout(pageReload, 5000);
                }
                else {
                    console.log(err);
                    $('#subCancelMsg').empty().append('<p>There was an issue cancelling your subscription. Please try again later. If the problem persists please contact the site admin.<p>')
                    //TODO: send error and code to db
                    
                };
            });
        };

        //if no, then close modal but don't contiue to send cancellation to backend
        cancelConfirmNoBtn.onclick = function() {
            cancelConfirmModal.style.display = 'none';
        };

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
                $('#subReactivateMsg').empty().append('<p>You have successfully reactivated your subscription. Enjoy!<p>');
                //set a time out of 5 seconds then reload the page
                setTimeout(pageReload, 5000)
            }
            else {
                console.log(err);
                $('#subReactivateMsg').empty().append('<p>There was an issue reactivating your subscription. Please try again later. If the problem persists please contact the site admin.<p>')
                //TODO: send error and code to db
            };
        });
    });

})