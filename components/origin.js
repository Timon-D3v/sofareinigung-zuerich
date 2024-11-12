import CONFIG from "../config.js";



export default function origin(req, res, next) {
    if (CONFIG.ENV === "dev") return next();

    const get = req.get.bind(req);

    req.get = (...args) => {
        if (args[0] === "host") return CONFIG.PROD_ORIGIN;

        return get(...args);
    };

    next();
}