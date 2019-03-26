// import { format } from "url";

$(document).ready(function () {

    // =================== functions for customizing views based on a loggedin status =======================
    //might be able to do a if else based on if res.loggedIn show or hide buttons and page parts
    //before logged in view:
    $('#navAdmin').hide()
    $('#navLogoutBtn').hide()
    // $('#navSubscribe').show()
    // $('#navLoginBtn').show()

    //====================================for the magazine flipbook=================================

    $("#container").flipBook({
        pages:[
            {src:"/images/book/page1.jpg", 
            thumb:"/images/book/thumb1.jpg", 
            title:"Cover",
            // htmlContent:'<a href="3d.html">link to 3d flipbook</a><p style="color:#FFF">HTML Content on the page' +
            //     '</p><div style="position:absolute;top:400px;"><iframe width="640" height="390" src="https://www.youtube.com/embed/w53Lp1AFkpo" frameborder="0" allowfullscreen></iframe></div>'
        },
            {src:"/images/book/page2.jpg", thumb:"/images/book/thumb2.jpg", title:"Page two"},
            {src:"/images/book/page3.jpg", thumb:"/images/book/thumb3.jpg", title:"Page three"},
            {src:"/images/book/page4.jpg", thumb:"/images/book/thumb4.jpg", title:""},
            {src:"/images/book/page5.jpg", thumb:"/images/book/thumb5.jpg", title:"Page five"},
            {src:"/images/book/page6.jpg", thumb:"/images/book/thumb6.jpg", title:"Page six"},
            {src:"/images/book/page7.jpg", thumb:"/images/book/thumb7.jpg", title:"Page seven"},
            {src:"/images/book/page8.jpg", thumb:"/images/book/thumb8.jpg", title:"Last"}
        ],
        viewMode:'3d',
        // viewMode:'swipe',
        layout: 2
    });

    // ====================================login and check subscription status=================================

    $('#login').click(event => {
        event.preventDefault();

        const loginData = {
            email: $('#email').val().trim(),
            password: $('#password').val().trim()
        };

        console.log('login data', loginData);
        //send the form data to the login in auth controller
        $.post('/api/auth/login', loginData, (res, err) => {
            console.log('response:', res);
            console.log('err:', err);
            if (res === 'invalid email') {
                //replace with modal later
                alert('We are unable to find the email you provided. Please try again.')
            }
            else if (res === 'invalid password') {
                //replace with modal later
                alert("The password you provided doesn't match our records. Please try again")
            }
            else {
                console.log('successful login');
                //clear form fields
                $('#email, #password').val('');

                //change view to logged in state
                $('#navAdmin').show()
                $('#navLogoutBtn').show()
                $('#navSubscribe').hide()
                $('#navLoginBtn').hide()
            }
        })
    })

    //logout of session
    $('#navLogoutBtn').click(event => {
        event.preventDefault();
        //call the backend logout in auth controller
        $.get('/api/auth/logout', (res, err) => {
            console.log('response:', res);
            // console.log('err:', err);
            if (res === 'logged out') {
                //clear form fields
                $('#email, #password').val('');

                //reset view back to unlogged in state
                $('#navAdminBtn').hide()
                $('#navLogoutBtn').hide()
                $('#navSubscribeBtn').show()
                $('#navLoginBtn').show()

                //replace with modal later
                alert("You've been logged out successfully. May the Bliss be with you!");
            }
        })
    });
    
})