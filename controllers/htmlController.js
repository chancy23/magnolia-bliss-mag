//this loads all the views/pages

module.exports = {
    //load main page
    loadHome: (req, res) => {
        res.render('index');
    },
    loadMagView: (req, res) => {
        res.render('viewMag')
    },
    //load 404 error page
    load404: (req, res) => {
        res.render('error404');
    }
}