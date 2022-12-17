"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = require("./multer");
describe("generatePhotoFilename", () => {
    test.each([
        ["image/png", "png"],
        ["image/jpeg", "jpeg"],
    ])("Generates filename with correct extension when passed mimeType '%s'", (mimeType, expectedFileExtension) => {
        const fullFilename = (0, multer_1.generatePhotoFilename)(mimeType);
        const [, fileExtension] = fullFilename.split(".");
        expect(fileExtension).toEqual(expectedFileExtension);
    });
});
//# sourceMappingURL=multer.test.js.map