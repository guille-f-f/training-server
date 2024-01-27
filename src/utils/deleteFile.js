import fs from "fs";

const deleteFile = (file) => {
  const path = `./src/uploads/${file}`;
  console.log(path);

  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`File ${path} deleted successfully.`);
  });
};

export default deleteFile;
