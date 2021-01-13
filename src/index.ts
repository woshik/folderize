import * as fs from "fs";
import * as path from "path";

const rootPaht = path.join(__dirname, "../data");

fs.readdir(rootPaht, (err, files) => {
  if (err) {
    console.log(err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(rootPaht, file);
    const fileStatus = fs.statSync(filePath);

    if (fileStatus.isFile()) {
      const splitArray = file.split(/_/gi);

      const fileInfo = path.parse(splitArray[0]);

      const directoryPath = path.join(rootPaht, fileInfo.name);

      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
      }

      fs.copyFileSync(filePath, path.join(directoryPath, splitArray[1] ? splitArray[1] : "1.mp3"))
    
      fs.unlinkSync(filePath);
    }
  });
});
