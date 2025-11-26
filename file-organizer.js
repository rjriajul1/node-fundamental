const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "output", "messy-file");
const organizeDir = path.join(__dirname, "output", "organized");

console.log("soruce", sourceDir, "org", organizeDir);

const categories = {
  images: [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg"],
  documents: [".pdf", ".doc", ".docx", ".txt", ".rtf", ".odt"],
  videos: [".mp4", ".mkv", ".mov", ".avi", ".wmv"],
  audio: [".mp3", ".wav", ".aac", ".flac", ".ogg"],
  code: [
    ".js",
    ".ts",
    ".jsx",
    ".tsx",
    ".html",
    ".css",
    ".json",
    ".py",
    ".java",
  ],
  archives: [".zip", ".rar", ".7zip", ".tar", ".gz"],
  spreadsheets: [".xls", ".xlsx", ".csv", ".ods"],
  others: [".exe", ".apk", ".bin", ".iso"],
};

const testFiels = [
  "vacation.jpg",
  "report.pdf",
  "presentation.pptx",
  "music.mp3",
  "video.mp4",
  "script.js",
  "data.csv",
  "archive.zip",
  "photo.png",
  "notes.txt",
  "app.py",
  "movie.avi",
  "song.wav",
  "backup.tar.gz",
  "random.xyz",
  "nodejs.zip",
];

function intializeDirectories() {
  if (!fs.existsSync(sourceDir)) {
    fs.mkdirSync(sourceDir, { recursive: true });

    testFiels.forEach((file) => {
      fs.writeFileSync(path.join(sourceDir, file), `Content of ${file}`);
    });
  }

  console.log("Messy directories files are created!!!");

  if (!fs.existsSync(organizeDir)) {
    fs.mkdirSync(organizeDir, { recursive: true });
  }
  Object.keys(categories).forEach((category) => {
    const categoryPath = path.join(organizeDir, category);
    if (!fs.existsSync(categoryPath)) {
      fs.mkdirSync(categoryPath);
    }
  });
}

// intializeDirectories()

function getCategory(fileName) {
  const ext = path.extname(fileName).toLowerCase(); // ".pdf", ".jpg"

  // [images: [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg"]],

  for (let [category, extentions] of Object.entries(categories)) {
    if (extentions.includes(ext)) {
      return category;
    }
  }
  return "others";
}

function organizerFile() {
  console.log("fiel organizer \n");
  console.log("Source", sourceDir);
  console.log("Destination", organizeDir);
  console.log("\n" + "-".repeat(50) + "\n");

  const files = fs.readdirSync(sourceDir);
  if (files.length === 0) {
    console.log("No files to work on!!");
    return;
  }
  console.log(`found ${files.length} files to  organize \n`);
  const stats = {
    total: 0,
    byCategroy: {},
  };

  files.forEach((file) => {
    const sourcePath = path.join(sourceDir, file);
    const stat = fs.statSync(sourcePath);
    if (stat.isDirectory()) {
      return;
    }

    const category = getCategory(file);
    const destDir = path.join(organizeDir, category);
    const destPath = path.join(destDir, file);

    fs.copyFileSync(sourcePath, destPath);

    stats.total++;
    stats.byCategroy[category] = (stats.byCategroy[category] || 0) + 1;
    console.log(`${file}`);
    console.log(`${category}`);
    console.log(`${stat.size}`);
  });
}

function showHelp() {
  console.log(`
          file organizer - usage: 

          commands:
          init - create files
          organize - organize fiels into categories

          example:
          node fiel-organizer init
          node file-organizer organize
        `);
}

const command = process.argv[2];
switch (command) {
  case "init":
    intializeDirectories();
    break;
  case "organize":
    organizerFile();
    break;
  default:
    showHelp();
    break;
}
