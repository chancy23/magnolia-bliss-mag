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
        //call the api to generate email with the email address entred
        const userData = {
            email: $('#email').val().trim()
        };

        $.post('/api/password/forgot', userData)
        .then((res, err) => {
            console.log('res:', res);
            console.log('err:', err);
        })
    });

    $('#submitNewPassword').click(event => {
        event.preventDefault();

        const newPassword = $('#newPassword').val().trim();
        const validatePassword = $('#validateNewPassword').val().trim();

        if (newPassword === validatePassword) {
            const resetData = {
                password: newPassword,
                token: token
            };

            //call the update password api with new value
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
                    //redirect to home page to login
                    location.href = '/';
                }
                else {
                    // TODO: make a modol or on page message
                    alert('It looks like there was an error, please try again.')
                }
            })
        }
        else {
            // TODO: make a modol or on page message
            alert('Your passwords do not match, please re-enter.')
        } 
    });

})