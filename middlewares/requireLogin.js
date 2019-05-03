module.exports = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).send({ error: "You must log in!" });
    }

    next();
};
