import ImageKit from "imagekit";
import CONFIG from "../config.js";
import { errorLog } from "timonjs";



const imagekit = new ImageKit({
    publicKey: CONFIG.IMAGEKIT.PUBLIC_KEY,
    privateKey: CONFIG.IMAGEKIT.PRIVATE_KEY,
    urlEndpoint: CONFIG.IMAGEKIT.URL_ENDPOINT
});



export default function uploadImage(base64, name, folder) {
    try {
        return new Promise((resolve, reject) => {
            imagekit.upload({
                file: base64,
                fileName: name.replace(/[:\/\\<>{}?]/g, "_").replaceAll(" ", "_"),
                folder: folder,
                useUniqueFileName: true
            }, (error, result) => {
                if (error) return reject(error);
    
                resolve(result);
            });
        });
    } catch (error) {
        errorLog(error);
        return null;
    }
}