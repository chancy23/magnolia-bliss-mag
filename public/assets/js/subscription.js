$(document).ready(function () {
    //hide the payments section until after customer creates account;
    $('#activeSubscriptionMsg').hide()
    $('#checkCustomer').hide();
    $('#createAcct').hide();
    $('#subscription').hide();
    $('#emailNotFoundMsg').hide();
    $('#passwordNoMatchMsg').hide();

    

    //set global variable for user ID or email to be used when subscription is sent to backend
    let email = '';
    let id = '';

    // =================================== functions ===================================
    // Create a Stripe client.
    function createStripe() {
        //see about using process.env here as well?
        var stripe = Stripe('pk_test_z3NBrSQZCOlhcTjNLJks2STL00Jirr8EqC');

        // Create an instance of Elements.
        var elements = stripe.elements();

        // Custom styling can be passed to options when creating an Element.
        // (Note that this demo uses a wider set of styles than the guide below.)
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

        // Create an instance of the card Element.
        var card = elements.create('card', { style: style });
        // Add an instance of the card Element into the `card-element` <div>.
        card.mount('#card-element');

        // Handle real-time validation errors from the card Element.
        card.addEventListener('change', function (event) {
            var displayError = document.getElementById('card-errors');
            if (event.error) {
                displayError.textContent = event.error.message;
            } 
            else {
                displayError.textContent = '';
            }
        });

        // Handle form submission.
        //need to change so that its onclick of the paymentSubmit button vs just submit on form
        //so can do a clear button and clear fields
        var form = document.getElementById('payment-form');
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            stripe.createToken(card).then(function (result) {
                if (result.error) {
                    // Inform the user if there was an error.
                    var errorElement = document.getElementById('card-errors');
                    errorElement.textContent = result.error.message;
                }
                else {
                    console.log('token', result.token);
                    sendData(result.token, id, email)
                }
            });
        });
    }

    //sends the data from the form to stripe and to the db to create the subscription
    function sendData(token, id, email) {
        const dataObj = {
            id: id,
            email: email,
            plan: $('#planLevel').val(),
            token: token.id
        };
        console.log('data Object to send to backend', dataObj);

        $.post('/api/subscription/new', dataObj, function(res, err){
            console.log('err', err);
            console.log('res', res);
            if (res.message === 'subscription created') {
                console.log('subscription created');
               
                //sub success modal
                const subSuccessModal = document.getElementById('subSuccessModal');
                //open modal
                subSuccessModal.style.display = 'block';

                //close modal when Close button is hit
                const subSuccessCloseBtn = document.getElementById('closeSuccess');
                
                subSuccessCloseBtn.onclick = function() {
                    subSuccessModal.style.display = 'none';
                    location.href = '/magazine';
                };

                //close modal when clicked outside of it try making a function and then passing in an arg as the modal ID
                window.onclick = function(event) {
                    if (event.target !== subSuccessModal) {
                        subSuccessModal.style.display = 'none';
                        location.href = '/magazine';
                    }
                };

                //clear form fields or hide forms or redirect to view the magazine
                // $('.InputElement').addClass('StripeElement is-empty');
            }
            else {
                //display an error message and log the error message to db
                console.log(err);
                $('#subErrorMessage').empty().append('<p>It looks like there was a problem creating your subscription in our system. Please try again. If you continue to have problems contact the site administrator. Details:</p>' + err);
            };
        });
    };

    //  =================================== event handlers ===================================
    //cancel button clicks (clear forms) 
    $('#cancelCustomer').click(event => {
        event.preventDefault();
        $('#firstName').val('');
        $('#lastName').val('');
        $('#email').val('');
        $('#password').val('');
        $('#validatePassword').val('');
        location.reload();
    })

    //if customer hits cancel before completing payment and subscribing
    $('#cancelPayment').click(event => {
        event.preventDefault();
        //send a delete to delete customer from DB and logout of sessions
        //backend logic in place to determine if they have subscription data (from previous subscription)
        //if so then won't delete customer from db.
        $.ajax('/api/customer/delete', {
            type: "DELETE",
        })
        .then(() => {
            $.get('/api/auth/logout', () => {
                // location.href = '/';
                location.reload();
            })
        })
    });

    $('#createAcctLink').click(() => {
        $('#checkCustomer').hide();
        $('#createAcct').show();

    });

    $('.prevAcct').click(event => {
        event.preventDefault();
        if (event.target.value === 'yes') {
            //if yes is selceted then show #checkCustomer section
            $('#subscribeStart').hide();
            $('#createAcct').hide();
            $('#checkCustomer').show();
        }
        else if (event.target.value === 'no') {
            //if no then display the #createAcct section
            $('#subscribeStart').hide();
            $('#checkCustomer').hide();
            $('#createAcct').show();
        }
    });

    $('#submitCheckCustomer').click(event => {
        event.preventDefault();

        const validateData = {
            email: $('#emailCheck').val().trim(),
            password: $('#passwordCheck').val().trim() 
        }
        //send the email and passowrd to the db to check if customer is in it
        $.post('/api/auth/validateCredentials', validateData, (res, err) => {
            console.log('res:', res);

            let acctStatusMsg;

            if (res.msg === 'active subscription found') {
                acctStatusMsg = "<p>It looks like you already have an active subscription. <br> <a href='/magazine'>Go to the Magazine</a>.</p>"
            }
            else if (res === 'invalid email') {
                acctStatusMsg =  "<p>We are unable to find the email you provided. Please try again or start over and create a new Account.</p>";
            }
            else if (res === 'invalid password') {
                acctStatusMsg = "<p>The password you provided doesn't match our records. <br> Please try again or you can <a href='/forgot-password'>reset it</a>.</p>";
            }
            else {
                email = res.email;
                id = res._id;
                //show the next section on the page and create the stripe element;
                $('#subscription').show();
                createStripe();
                //disable the input and buttons on this form;
                $('#checkCustomerForm :input').prop('disabled', true);
                // change button and add class for css to format;
                $('#submitCheckCustomer').empty().append('<i class="far fa-check-circle"></i>').addClass('after-submit');
                $('#cancelCheck').hide();
            }
            //show the correct error message on page;
            $('#accountStatusMsg').empty().append(acctStatusMsg);
        })
        
    });

    //when click the submit button to create an account;
    // TODO: send a check to the API to see if in our db, if so, use that info instead of new values below;
    $('#submitCreateCustomer').click(event => {
        event.preventDefault();
        let errorMessage;
        
        //if any field is blank stop and display message (ToDo change to modal from alert);
        if ($('#firstName').val() === '' ||
        $('#lastName').val() === '' ||
        $('#email').val() === '' ||
        $('#password').val() === '' ||
        $('#validatePassword').val() === '') {

            errorMessage = '<p>All fields are required.</p>';
        }
        //if password and validate password don't match
        else if ($('#password').val().trim() !== $('#validatePassword').val().trim()) {
            errorMessage = '<p>Your passwords do not match. Please re-enter.</p>';
        }
        else {
            const signupData = {
                firstName: $('#firstName').val().trim(),
                lastName: $('#lastName').val().trim(),
                email: $('#email').val().trim(),
                password: $('#password').val().trim()
            };

            console.log('signup data from format', signupData);

            //send the data to our signup API route;
            $.post('/api/auth/signup', signupData, function (res, err) {
                console.log('result:', res);
                // console.log('status:', status);

                if(res === 'invalid') {
                    console.log('Email is already registered');

                    errorMessage = '<p>It looks like that email is already registered with us. <br>' +
                    'Please use a different one, or if you can start over and select that you have had an account with us before.</p>';
                    $('#message').empty().append(errorMessage);
                }
                else {
                    email = res.email;
                    id = res._id;
                    $('#subscription').show();
                    createStripe();
                    // disable customer information form, but still display on page;
                    $('#customerDetails :input').prop('disabled', true);

                    // change class to display updated css properties;
                    
                    $('#submitCreateCustomer').empty().append('<i class="far fa-check-circle"></i>').addClass('after-submit');
                    $('#cancelCustomer').hide();
                };
            });
        };
        //display applicable error messages
        $('#message').empty().append(errorMessage);
    });

})