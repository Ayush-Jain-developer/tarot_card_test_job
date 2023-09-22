// eslint-disable-next-line import/no-extraneous-dependencies
import multer from "multer";

const multerUpload = (fileName: string) => {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads");
    },
    filename(req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}.jpg`);
    },
  });

  const upload = multer({ storage });
  return upload.single(fileName);
};

export default multerUpload;