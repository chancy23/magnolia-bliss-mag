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
                $('#PinMessage').empty().append('<p>Your code is not valid or has expired. ' + 
                'Please verify its the correct code, or complete the forgot password steps again.</p>')
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
                     //logout modal (when the user hits the logout button change the display to block from hidden)
                    const pwdResetSuccessModal = document.getElementById('pwdResetSuccessModal');
                    //open modal
                    pwdResetSuccessModal.style.display = 'block';

                    //close modal when Close button is hit
                    const closePwdSuccessBtn = document.getElementById('closePwdSuccess');
                    //close modal when Close button is hit and redirect user to the home page
                    closePwdSuccessBtn.onclick = function() {
                        pwdResetSuccessModal.style.display = 'none';
                        location.href = '/';
                    };
                    //close modal if clicked outside of modal and redirect to home page
                    window.onclick = function(event) {
                        if (event.target !== pwdResetSuccessModal) {
                            pwdResetSuccessModal.style.display = 'none';
                            location.href = '/';
                        }
                    };
                }
                else {
                    // removed the $() from around in case doesn't work later
                    errorMessage = '<p>It looks like there was an error, please try again. If the problem persists, please contact the site administator</p>' + err;
                }
            })
        }
        else {
            // removed the $() from around in case doesn't work later
            errorMessage ='<p>Your passwords do not match, please re-enter.</p>';
        };
        //display the correct error message on page (remove any previous message first).
        $('#message').empty().append(errorMessage);
    });

})