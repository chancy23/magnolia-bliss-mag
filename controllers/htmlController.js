//this loads all the views/pages

module.exports = {
    //load main page
    loadHome: (req, res) => {
        res.render('index');
    },
    loadAbout: (req, res) => {
        res.render('about')
    },
    //user admin page need to get the req.session data passed in from login/home page
    loadAccount: (req, res) => {
        //this passes the req.session data directyy to the handlebars html view
        res.render('account', {session: req.session.customer});
        
    },
    loadMagView: (req, res) => {
        res.render('viewMag')
    },
    loadSubscribe: (req, res) => {
        res.render('subscribe')
    },
    //load 404 error page
    load404: (req, res) => {
        res.render('error404');
    }
}