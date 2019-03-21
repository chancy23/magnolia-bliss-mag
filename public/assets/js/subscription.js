$(document).ready(function () {

    //hide the payments section until after customer creates account 
    $('#subscription').hide();

    //set global variable for user ID or email to be used when subscription is sent to backend
    let email = '';
    let id = '';

     //when click the submit button to create an account
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
            $.post('/api/auth/signup', signupData, function (result, status) {
                console.log('result:', result);
                console.log('status:', status);

                if(result === 'invalid') {
                    //modal to display that email is already registered
                    console.log('Email is already registered.')
                }
                else {
                    email = result.email;
                    id = result._id;

                    //show the next section on the page
                    $('#subscription').show();
                    //hide the create account section or make fields disabled
                    $('#createAcct').hide();
                }
            })
        }
    })

    // Create a Stripe client.
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

    function sendData(token, id, email) {
        //need to send the token, planID, customer _id to /api/subscription/new
        const dataObj = {
            id: id,
            email: email,
            plan: $('#planLevel').val(),
            token: token.id
        };
        console.log('data Object to send to backend', dataObj)

        $.post('/api/subscription/new', dataObj, function(err, result){
            if (result === 'success') {
                //load a success modal
                console.log('subscription created');
                //clear form fields or hide forms or redirect to somewhere TBD
                $('.InputElement').addClass('StripeElement is-empty');
            }
            else {
                //load a failure modal
                console.log(err)
            }
        })
    };

    //cancel button clicks (clear forms) 
    $('#cancelCustomer').click(event => {
        event.preventDefault();
        $('#firstName').val('')
        $('#lastName').val('')
        $('#email').val('')
        $('#password').val('')
    })

    $('#cancelPayment').click(event => {
        event.preventDefault();
        $('.InputElement').addClass('StripeElement is-empty');
    })



    // Submit the form with the token ID.
    // function stripeTokenHandler(token) {
    //     // Insert the token ID into the form so it gets submitted to the server
    //     var form = document.getElementById('payment-form');
    //     var hiddenInput = document.createElement('input');
    //     hiddenInput.setAttribute('type', 'hidden');
    //     hiddenInput.setAttribute('name', 'stripeToken');
    //     hiddenInput.setAttribute('value', token.id);
    //     form.appendChild(hiddenInput);

    //     // Submit the form
    //     form.submit();
    // }



})