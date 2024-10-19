export default function notAuth(req, res, next) {
    if (req.session.auth === true) return res.redirect("/admin");

    next();
}