const path = require('path');
const fs = require('fs');

/**
 * Checks if the current directory is a git repository
 * @returns {boolean} true if the current directory is a git repository
 */
const isCurrentDirAGitRepo = () => {
    const gitDir = path.join(process.cwd(), '.git');
    return fs.existsSync(gitDir);
};

/**
 * Adds a file name to the .git/info/exclude file
 * @param {string} fileName The file name to add to the .git/info/exclude file
 * @returns True if the file name was added to the .git/info/exclude file
 */
const addFileNameToGitExclude = (fileName) => {
    if (!isFileBlinded(fileName)) {
        const gitExclude = path.join(process.cwd(), '.git/info/exclude');
        try {
            fs.appendFileSync(gitExclude, `\n${fileName}`);
            return true;
        }
        catch (err) {
            console.log(`There was an error writing to the .git/info/exclude file: ${err}`);
            return false;
        }
    }
    console.log(`The file or pattern "${fileName}" is already blinded`);
    return false;
};

/**
 * Lists the contents of the .git/info/exclude file
 * @returns {string} The contents of the .git/info/exclude file
 */
const listBlindedFiles = () => {
    const gitExclude = path.join(process.cwd(), '.git/info/exclude');

    try {
        return fs.readFileSync(gitExclude, 'utf8');
    }
    catch (err) {
        console.log(`There was an error reading the .git/info/exclude file: ${err}`);
        return false;
    }
};

/**
 * Removes a file name from the .git/info/exclude file
 * @param {string} fileName The file name to remove from the .git/info/exclude file
 * @returns True if the file name was removed from the .git/info/exclude file
 */
const removeBlindedFile = (fileName) => {
    const gitExclude = path.join(process.cwd(), '.git/info/exclude');

    if (!isFileBlinded(fileName)) {
        console.log(`The file or pattern "${fileName}" is not blinded`);
        return false;
    }

    try {
        const content = fs.readFileSync(gitExclude, 'utf8');
        const newContent = content.replace(fileName, '');
        fs.writeFileSync(gitExclude, newContent);
        return true;
    }
    catch (err) {
        console.log(`There was an error reading the .git/info/exclude file: ${err}`);
        return false;
    }
};

/**
 * Checks if a file name is already in the .git/info/exclude file
 * @param {string} fileName The file name to check if it is blinded
 * @returns True if the file name is already in the .git/info/exclude file
 */
const isFileBlinded = (fileName) => {
    const gitExclude = path.join(process.cwd(), '.git/info/exclude');

    try {
        const content = fs.readFileSync(gitExclude, 'utf8');
        return content.includes(fileName);
    }
    catch (err) {
        console.log(`There was an error reading the .git/info/exclude file: ${err}`);
        return false;
    }
};

/**
 * Resets the .git/info/exclude file
 * @returns True if the .git/info/exclude file was reset
 */
const resetGitExclude = () => {
    const gitExclude = path.join(process.cwd(), '.git/info/exclude');

    try {
        fs.writeFileSync(gitExclude, '');
        return true;
    }
    catch (err) {
        console.log(`There was an error resetting the .git/info/exclude file: ${err}`);
        return false;
    }
};

module.exports = {
    isCurrentDirAGitRepo,
    addFileNameToGitExclude,
    listBlindedFiles,
    removeBlindedFile,
    isFileBlinded,
    resetGitExclude,
};