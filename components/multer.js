import multer from "multer";

const storage = multer.memoryStorage();

const multerInstance = multer({
    storage,
    limits: {
        fileSize: 100 * 1024 * 1024, // 100 MB
    },
    fileFilter: (_req, file, callback) => {
        if (file.size === 0) {
            callback(new Error("No valid file uploaded."));
        }

        callback(null, true);
    },
});

export default multerInstance;

export { multerInstance };
