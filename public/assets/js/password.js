$(document).ready(function() {

    // ============================== set intitial state =====================
    $('#changePassword').hide();
    $('#checkCode').show();

    // ============================= Global Variables=========================
    let token;

    // ============================ Event Handlers ===========================

    //validate provided code with one in db
    $('#submitCode').click(event => {
        event.preventDefault();
        token = $('#resetCode').val().trim();

        $.get('/api/password/reset/' + token, (res, err) => {
            console.log('res', res);
            // console.log('err', err);
            //if success display change password fields
            if (res ==="reset code valid") {
                $('#changePassword').show();
                $('#checkCode').hide();
                $('#resetCode').val('');
            }
            //else display error message.
            else {
                alert("Your code is not valid or has expired. Please verify its the correct code, or complete a forgot password again.");
            }

            
        })
    });

    $('#submitForgotPassword').click(event => {
        event.preventDefault();
        const userData = {
            email: $('#email').val().trim()
        };

        $.post('/api/password/forgot', userData)
        .then((res, err) => {
            console.log('res:', res);
            console.log('err:', err);

            let errorMessage;

            if (res === 'email sent') {
                location.href = '/reset-password';
            }
            else if (res === 'no user found') {
                errorMessage = $('<p>We are unable to find that email address in our system. Please verify you entered the correct email.</p>');
            }
            else if (res === 'email required') {
                errorMessage = $('<p>Please enter the email address for your account.</p>');
            }
            else {
                errorMessage = $('<p>It looks like there was an issue. Please contact the site administrator for assistance.</p>' + err.statusCode);
    
            }
            //display the correct error message on page (remove any previous message first).
            $('#message').empty().append(errorMessage);
        })
    });

    $('#submitNewPassword').click(event => {
        event.preventDefault();

        const newPassword = $('#newPassword').val().trim();
        const validatePassword = $('#validateNewPassword').val().trim();
        let errorMessage;

        if (newPassword === validatePassword) {
            const resetData = {
                password: newPassword,
                token: token
            };
            $.ajax('/api/password/update', {
                type: 'PUT',
                data: resetData
            })
            .then((res, err) => {
                console.log('res', res);
                console.log('err', err);
                if (res === 'password updated') {
                    // TODO: make a modol or on page message
                    alert('your password has been updated, please login to continue');
                    location.href = '/';
                }
                else {
                    errorMessage = $('<p>It looks like there was an error, please try again. If the problem persists, please contact the site administator</p>' + err)
                }
            })
        }
        else {
            errorMessage =$('<p>Your passwords do not match, please re-enter.</p>')
        };
        //display the correct error message on page (remove any previous message first).
        $('#message').empty().append(errorMessage);
    });

})