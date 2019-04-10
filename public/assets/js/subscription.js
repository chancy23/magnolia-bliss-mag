$(document).ready(function () {
    //hide the payments section until after customer creates account 
    $('#subscription').hide();

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
            } else {
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
                } else {
                    
                    console.log('token', result.token);
                    // Send the token to your server (along with id and email from our DB)
                    sendData(result.token, id, email)
                }
            });
        });
    }

    function sendData(token, id, email) {
        //need to send the token, planID, customer _id to /api/subscription/new
        const dataObj = {
            id: id,
            email: email,
            plan: $('#planLevel').val(),
            token: token.id
        };
        console.log('data Object to send to backend', dataObj)

        $.post('/api/subscription/new', dataObj, function(err, res){
            console.log('err', err);
            console.log('res', res);
            if (res === 'success') {
                //TODO: create a success modal
                console.log('subscription created');
                //clear form fields or hide forms or redirect to view the magazine
                $('.InputElement').addClass('StripeElement is-empty');
                location.href = '/magazine';
            }
            else {
                //load a failure modal
                console.log(err)
            }
        })
    };

    //  =================================== event handlers ===================================
    //cancel button clicks (clear forms) 
    $('#cancelCustomer').click(event => {
        event.preventDefault();
        $('#firstName').val('')
        $('#lastName').val('')
        $('#email').val('')
        $('#password').val('')
    })

    //if customer hits ancels before completing payment and subscribing
    $('#cancelPayment').click(event => {
        event.preventDefault();
        //send a delete to delete customer from DB and reload page
        $.ajax('/api/customer/delete', {
            type: "DELETE",
        })
        .then((res, err) => {
            console.log('res', res);
            location.reload();
        })
    });

    //when click the submit button to create an account
    // TODO: send a check to the API to see if in our db, if so, use that info instread of new values below
    $('#submitCustomer').click(event => {
        event.preventDefault();
        
        //if any field is blank stop and display message (ToDo change to modal from alert)
        if ($('#firstName').val() === '' ||
            $('#lastName').val() === '' ||
            $('#email').val() === '' ||
            $('#password').val() === '') {
            alert("all fields are required");
        }
        else {
            const signupData = {
                firstName: $('#firstName').val().trim(),
                lastName: $('#lastName').val().trim(),
                email: $('#email').val().trim(),
                password: $('#password').val().trim()
            };
            console.log('signup data from format', signupData);

            //send the data to our signup API route
            $.post('/api/auth/signup', signupData, function (res, err) {
                console.log('result:', res);
                console.log('status:', status);

                if(res === 'invalid') {
                    //modal to display that email is already registered
                    console.log('Email is already registered.')
                }
                else {
                    email = res.email;
                    id = res._id;
                    //show the next section on the page and create the stripe element
                    $('#subscription').show();
                    createStripe()
                    //hide the create account section or make fields disabled
                    $('#createAcct').hide();
                }
            })
        }
    });

})