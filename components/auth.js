export default function auth(req, res, next) {
    if (req?.session?.auth === true) return next();

    return res.redirect("/auth/login");
}