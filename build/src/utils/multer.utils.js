"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-extraneous-dependencies
const multer_1 = __importDefault(require("multer"));
const multerUpload = () => {
    const storage = multer_1.default.diskStorage({
        destination(req, file, cb) {
            cb(null, "uploads");
        },
        filename(req, file, cb) {
            cb(null, `${file.fieldname}-${Date.now()}.jpg`);
        },
    });
    const upload = (0, multer_1.default)({ storage });
    return upload.single("profile");
};
exports.default = multerUpload;
