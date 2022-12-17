import multer from "multer";
import mime from "mime";
import { randomUUID } from "crypto";

export const generatePhotoFilename = (mimeType: string) => {
    const randomFilname = `${randomUUID()}`
    const fileExtension = mime.getExtension(mimeType)
    const filename = `${randomFilname}.${fileExtension}`
    return filename;
}

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (request, file, callback) => {
        return callback(null, generatePhotoFilename(file.mimetype))
    }
})

// const MAX_SIZE_IN_MEGABYTES = 1000 * 1024 + 1024;
const VALID_NAME_TYPES = ["image/png", "image/jpeg"]

const fileFilter : multer.Options["fileFilter"]= (request, file, callback) => {
    if (VALID_NAME_TYPES.includes(file.mimetype)) {
        callback(null, true)
    } else {
        callback(new Error("Error: The uploaded file must be a JPG or a PNG image"))
    }
}

export const multerOptions = {
    fileFilter,
    // limits: {
    //     fileSize: MAX_SIZE_IN_MEGABYTES,
    // }
}
export const initMulterMiddleware = () => {
    return multer({storage, ...multerOptions})
}