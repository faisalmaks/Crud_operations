const fs = require("fs");
const path = require("path");

/**
 * Read JSON data from a file.
 * If file does not exist, return fallback data.
 */
function readJsonFile(filePath, fallbackData = []) {
  try {
    const absolutePath = path.resolve(filePath);

    if (!fs.existsSync(absolutePath)) {
      fs.writeFileSync(absolutePath, JSON.stringify(fallbackData, null, 2));
      return fallbackData;
    }

    const fileData = fs.readFileSync(absolutePath, "utf-8");

    if (!fileData.trim()) {
      return fallbackData;
    }

    return JSON.parse(fileData);
  } catch (error) {
    console.error("Error reading JSON file:", error.message);
    return fallbackData;
  }
}

/**
 * Write JSON data to a file.
 */
function writeJsonFile(filePath, data) {
  try {
    const absolutePath = path.resolve(filePath);
    fs.writeFileSync(absolutePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing JSON file:", error.message);
  }
}

module.exports = {
  readJsonFile,
  writeJsonFile,
};
