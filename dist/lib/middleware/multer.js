"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initMulterMiddleware = exports.multerOptions = exports.generatePhotoFilename = void 0;
const multer_1 = __importDefault(require("multer"));
const mime_1 = __importDefault(require("mime"));
const crypto_1 = require("crypto");
const generatePhotoFilename = (mimeType) => {
    const randomFilname = `${(0, crypto_1.randomUUID)()}`;
    const fileExtension = mime_1.default.getExtension(mimeType);
    const filename = `${randomFilname}.${fileExtension}`;
    return filename;
};
exports.generatePhotoFilename = generatePhotoFilename;
const storage = multer_1.default.diskStorage({
    destination: "uploads/",
    filename: (request, file, callback) => {
        return callback(null, (0, exports.generatePhotoFilename)(file.mimetype));
    }
});
const MAX_SIZE_IN_MEGABYTES = 1000 * 1024 + 1024;
const VALID_NAME_TYPES = ["image/png", "image/jpeg"];
const fileFilter = (request, file, callback) => {
    if (VALID_NAME_TYPES.includes(file.mimetype)) {
        callback(null, true);
    }
    else {
        callback(new Error("Error: The uploaded file must be a JPG or a PNG image"));
    }
};
exports.multerOptions = {
    fileFilter,
    limits: {
        fileSize: MAX_SIZE_IN_MEGABYTES,
    }
};
const initMulterMiddleware = () => {
    return (0, multer_1.default)(Object.assign({ storage }, exports.multerOptions));
};
exports.initMulterMiddleware = initMulterMiddleware;
//# sourceMappingURL=multer.js.map