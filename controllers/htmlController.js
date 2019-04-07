//this loads all the views/pages

module.exports = {
    //load main page
    loadHome: (req, res) => {
        res.render('index', {session: req.session.customer});
    },
    loadAbout: (req, res) => {
        res.render('about', {session: req.session.customer})
    },
    loadAccount: (req, res) => {
        //this passes the req.session data directly to the handlebars html view
        res.render('account', {session: req.session.customer});
        
    },
    loadMagView: (req, res) => {
        res.render('viewMag' , {session: req.session.customer})
    },
    loadSubscribe: (req, res) => {
        res.render('subscribe' , {session: req.session.customer})
    },
    //load 404 error page
    load404: (req, res) => {
        res.render('error404' , {session: req.session.customer});
    }
}