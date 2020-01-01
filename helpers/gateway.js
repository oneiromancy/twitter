exports.redirectLoggedInUser = (req, res, next) => {
    const { session } = req;

    if (session && session.user) {
        res.redirect("/");
    }

    return next();
};

exports.requiresLogin = (req, res, next) => {
    const { session } = req;

    if (session && session.user) {
        return next();
    } else {
        res.redirect("/login");
    }
};
