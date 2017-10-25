exports.myMiddleware = (req, res, next) => {
    req.name = 'Justin';
    if(req.name === 'Wes') {
        throw new Error('That is a stupid name');
    }
    res.cookie('name', 'Justin is cool', { maxAge: 900000 });
    next();
}
exports.homePage = (req, res) => {
    console.log(req.name);
    res.render('index');
}