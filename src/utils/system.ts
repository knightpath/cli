const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const findInFiles = require('find-in-files');


export const execCmd = (command: string) => new Promise((resolve, reject) => {
    exec(command, (error: any, stdout: any, stderr: any) => {
        if (error) {
            console.log(`error: ${error.message}`);
            reject(error.message);
            return;
        }
        const out = stdout || stderr;
        console.log(`stdout: ${out}`);
        resolve(out);
    });
});

export function* getAllFiles(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (let i = 0; i < files.length; i++) {
        if (files[i].isDirectory()) {
            yield* getAllFiles(path.join(dir, files[i].name));
        } else {
            yield path.join(dir, files[i].name);
        }
    }
}


export const findPatternsInFiles = async (patterns: string[], path: string, filter: string = '.*') => {
    const results =
        await findInFiles.find(
            { 'term': patterns.join('|'), 'flags': 'ig' }, path, filter)
    return results;
}

