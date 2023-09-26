// eslint-disable-next-line import/no-extraneous-dependencies
import Messages from "@messages";
import multer from "multer";

const multerUpload = () => {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads");
    },
    filename(req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}.jpg`);
    },
  });

  const upload = multer({
    storage,
    fileFilter(req, file, cb) {
      const allowedTypes = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/svg+xml",
      ];

      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error(Messages.invalidFileType));
      }
    },
  });
  return upload.single("profile");
};

export default multerUpload;
