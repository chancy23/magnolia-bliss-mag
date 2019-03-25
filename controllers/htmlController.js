//this loads all the views/pages

module.exports = {
    //load main page
    loadHome: (req, res) => {
        res.render('index');
    },
    loadAbout: (req, res) => {
        res.render('about')
    },
    loadAccount: (req, res) => {
        res.render('account')
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