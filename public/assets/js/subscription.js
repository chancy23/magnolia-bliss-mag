$(document).ready(function () {

    //hide the payments section until after customer creates account 
    $('#subscription').hide();

    //set global variable for user ID or email to be used when subscription is sent to backend
    let email = '';
    let id = '';

     //when click the submit button to create an account
     $('#submitCustomer').on('click', function (event) {
        event.preventDefault();
        //get the form data and send to the backend (use ajax or axios?)
        //this is our req.body data
        const signupData = {
            firstName: $('#firstName').val().trim(),
            lastName: $('#lastName').val().trim(),
            email: $('#email').val().trim(),
            password: $('#password').val().trim()
        };
        console.log('signup data from format', signupData);

        //send the data to our signup API route
        $.post('/api/auth/signup', signupData, function (data, status) {
            console.log('response from backend', data);
            console.log('status', status);
            email = data.email;
            id = data._id
        })
        //show the next section on the page
        $('#subscription').show();
    })

    // Create a Stripe client.
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
    var form = document.getElementById('payment-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        stripe.createToken(card).then(function (result) {
            if (result.error) {
                // Inform the user if there was an error.
                var errorElement = document.getElementById('card-errors');
                errorElement.textContent = result.error.message;
            } else {
                // Send the token to your server.
                console.log('token', result.token);
                // stripeTokenHandler(result.token);
                sendData(result.token, id, email)
            }
        });
    });

    //make own function to replace the one below to see how to send all the data needed
    //not just the token
    function sendData(token, id, email) {
        //need to send the token, planID, customer _id to /api/subscription/new
        const dataObj = {
            id: id,
            email: email,
            plan: $('#planLevel').val(),
            token: token.id
        }

        console.log('data Object to send to backend', dataObj)

        $.post('/api/subscription/new', dataObj, function(err, result){
            console.log('result of post for sub', result);
        })

    };

    // Submit the form with the token ID.
    function stripeTokenHandler(token) {
        // Insert the token ID into the form so it gets submitted to the server
        var form = document.getElementById('payment-form');
        var hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'stripeToken');
        hiddenInput.setAttribute('value', token.id);
        form.appendChild(hiddenInput);

        // Submit the form
        form.submit();
    }


    //for the strips payment and subscription
    //get the form data from views: Customer Info > send to Customer Model
    //then get the subscription planID (need to assgin values from Stripe dashboard)
    //then get the payment info and send to stripe to get token to send to our controller/route

   

    // $('#submitPayment').on('click', function (event) {
    //     console.log('submit payment button clicked');
    //     //get the plan id from the the dropdown
    //     //send the cc data to stripe.js and get a token back
    //     //send token and other cusotmer data to the subscription controller
    // })

})