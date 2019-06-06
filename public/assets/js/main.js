$(document).ready(function () {

    $('#detailsDaffodil, #detailsAzalea, #detailsDogwood, #detailsMagnolia').hide();
    //====================================for the magazine flipbook=================================
    // var options = {
    //     pdfUrl:"example.pdf",
    //     skin:"light"
    //   }
       
    //   options.mobile = {
    //     pageTextureSize:1500,
    //     btnPrint:{enabled:false},
    //     skin:"dark"
    //   }

    //make it so that it loops in images from a db based on the issue when a past issue is clicked on.
    //in menatime just make it so that the past image opens a pdf version
    
    $("#magContainer").flipBook({
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
        layout: 2,
        skin: 'light',
        mobile: {
            layout: 1,
            pageTextureSize:500,
            btnPrint:{enabled:false},
            btnDownloadPages:{enabled:false},
            btnDownloadPdf:{enabled:false}
        },
        google_plus: {enabled: false}
        // pinterest: {
        //     url: null,
        //     image: "/images/book/page1.jpg",
        //     description: null
        // }
    });

    // ==================================== Handle Nav Menu Links active state =================================

    if (location.pathname === '/') {
        $('.nav-link').removeClass('active');
        $('#navHome').addClass('active');
    };

    if (location.pathname === '/about') {
        $('.nav-link').removeClass('active');
        $('#navAbout').addClass('active');
    };

    if (location.pathname === '/account') {
        $('.nav-link').removeClass('active');
        $('#navAdmin').addClass('active');
    };

    if (location.pathname === '/magazine') {
        $('.nav-link').removeClass('active');
        $('#navMagazine').addClass('active');
    };

    if (location.pathname === '/subscribe') {
        $('.nav-link').removeClass('active');
        $('#navSubscribe').addClass('active');
    };

    // ==================================== Event Handlers for login/logout =================================

    $('#cancelLogin').click(event => {
        // TODO how to make it stop, when clicked puts a query string in the URL
        $('#email, #password').val('');
    });

    // const pendingSubCancelModal = document.getElementById('pendingSubCancelModal');
    $('#login').click(event => {
        event.preventDefault();

        const loginData = {
            email: $('#email').val().trim(),
            password: $('#password').val().trim()
        };

        console.log('login data', loginData);
        //send the form data to the login in auth controller
        $.post('/api/auth/login', loginData, (res, err) => {
            // console.log('response:', res);

            //error message for unsuccessful login 
            let loginErrorMessage;

            if (res === 'invalid email') {
                loginErrorMessage = '<p>We are unable to find the email you provided. Please try again.</p>';
            }
            else if (res === 'invalid password') {
                loginErrorMessage = "<p>The password you provided doesn't match our records. Please try again</p>";
            }
            else if (res === 'no subscription') {
                loginErrorMessage = "<p>Uh-oh! It looks like you no longer have an active subscription. " +
                "If you wish, you can <a href='/subscribe'>resubscribe</a>.</p>"
            }
            else {
                console.log('successful login');
                //clear form fields
                $('#email, #password').val('');

                //if res.subscriptionData.pendingCancel is true, then display modal advising them of such
                if (res.subscriptionData.pendingCancel === true) {
                    // declare and open modal
                    
                    const pendingSubCancelModal = document.getElementById('pendingSubCancelModal');
                    pendingSubCancelModal.style.display = 'block';

                    //close modal when Close button is hit
                    const pendingCancelCloseBtn = document.getElementById('closePendingSub');
                    pendingCancelCloseBtn.onclick = function() {
                        pendingSubCancelModal.style.display = 'none';
                        location.reload();
                    };
                    //close modal when clicked outside of it try making a function and then passing in an arg as the modal ID
                    window.onclick = function(event) {
                        console.log('event line 136', event.target);
                        if (event.target !== pendingSubCancelModal) {
                            pendingSubCancelModal.style.display = 'none';
                            location.reload();
                        }
                    };
                }
                else {
                    location.reload();
                }
            };
            //display the correct error message in the error message div
            $('#loginErrMessage').empty().append(loginErrorMessage);
        })
    });

  
    //logout of session
    $('#navLogoutBtn').click(event => {
        event.preventDefault();

        $.get('/api/auth/logout', (res, err) => {
            console.log('response:', res);
            if (res === 'logged out') {
                $('#email, #password').val('');
                //logout modal (when the user hits the logout button change the display to block from hidden)
                const logoutModal = document.getElementById('logoutModal');
                //open modal
                logoutModal.style.display = 'block';

                //close modal when Close button is hit
                const logoutCloseBtn = document.getElementById('closeLogout');
                //close modal when Close button is hit
                logoutCloseBtn.onclick = function() {
                    logoutModal.style.display = 'none';
                    location.href = '/';
                }

            }
        })
    });

    // ========================other event handlers ===========================================

    //click on animated arrow on main page to go see main page content
    $('.indicator').click(() => {
        $('html, body').animate({
            scrollTop: $('#sampleArticle').offset().top
        }, 500);
    });

    //show and hide details back of card for plans on main and subscription pages
    $('#showDaffodilDetails, #hideDaffodilDetails').click(() => {
        $('#detailsDaffodil').slideToggle('fast');
    });

    $('#showAzaleaDetails, #hideAzaleaDetails').click(() => {
        $('#detailsAzalea').slideToggle('fast');
    });

    $('#showDogwoodDetails, #hideDogwoodDetails').click(() => {
        $('#detailsDogwood').slideToggle('fast');
    });

    $('#showMagnoliaDetails, #hideMagnoliaDetails').click(() => {
        $('#detailsMagnolia').slideToggle('fast');
    });

    
})