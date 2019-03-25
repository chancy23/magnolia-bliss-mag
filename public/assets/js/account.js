$(document).ready(function() {

    //when the page loads get the account information from stripe and our db
    // $.get()
    // $.get('/api/subscription/details')
    //hide all but the starting form
    $('#updateInfo, #changeSub, #cancellation').hide();

    //depending one what option is pcked from starting form, display the appropriate section
    // if reselect a different option make sure to hide any other forms
    $('#accountAction').change(event => {
        event.preventDefault();
        if ($('#accountAction').val() === 'info') {
            $('#updateInfo').show();
            $('#changeSub, #cancellation').hide();
        }
        else if ($('#accountAction').val() === 'plan') {
            $('#changeSub').show();
            $('#updateInfo, #cancellation').hide();
        }
        else {
            $('#cancellation').show();
            $('#updateInfo, #changeSub').hide();
        }
    });

    // when submit change plan button send to the backend with new plan info, (user id is from sessions)

    //when submit cancellation button send to backend tbe session subscription id (stripe)




})