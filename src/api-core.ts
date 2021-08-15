// var findInFiles = require('find-in-files');
const fs = require("fs");
import { findPatternsInFiles } from "./utils/system";
import { PATH_TO_APIS_OUTPUT, URL_REGEX } from './consts';
var urljoin = require('url-join');
const chalk = require('chalk');



// const _getDomains = () => {
//     var apis = JSON.parse(fs.readFileSync(PATH_TO_APIS_OUTPUT, 'utf-8'))
//     return apis.reduce((agg, item) => agg.concat(item.domains || []), []);
// };

const _getDomainsMap = () => {
    var apis = JSON.parse(fs.readFileSync(PATH_TO_APIS_OUTPUT, 'utf-8'))
    return apis.reduce((agg, item) => {
        for (const domain of item.domains) {
            agg[domain] = item;
        }
        return agg;
    }, {});
};

interface FileRes{
    isOfficial: boolean
    apiItem: any
    text: string
    fileName: string
}



export async function scanApiInDir(workingDir: string): Promise<FileRes[]>{
    const action = 'lint';
    const patterns = [URL_REGEX];
    const domainsMap = _getDomainsMap();
    const domains = Object.keys(domainsMap).reverse(); // reverse to get specific results first
    console.log(`loaded ${domains.length} domains`)

    console.log('scanning', workingDir, '...');
    const results = await findPatternsInFiles(
        patterns,
        workingDir
    )

    const files = [];
    for (const fileName of Object.keys(results)) {
        for (let text of results[fileName].line) {
            text = text.toLowerCase();
            const matched = [];

            let found = false;

            // find all items
            while (!found) {
                const domainsSearchPat: string = '(' + domains.filter(d => matched.indexOf(d) < 0).join('|') + ')'
                const matches = text.match(domainsSearchPat);
                if (!!matches) {
                    const matchedUrl = matches[0];
                    const apiItem = domainsMap[matchedUrl];

                    // so we won't match it again
                    matched.push(matchedUrl);

                    const paths = Array.from(apiItem.paths)
                        .map((p: string) => p.toLowerCase())
                        .map((p: string) => p.replace(/{.*?}/ig, '[^/]+'))
                        .sort().reverse(); // dup

                    for (const _p of paths) {
                        const url = urljoin(matchedUrl, _p)
                        if (text.search(`^${url}$`) >= 0) {
                            files.push({
                                isOfficial: true,
                                apiItem,
                                text,
                                fileName
                            })
                            found = true;
                            break;
                        }
                    }
                } else {
                    break;
                }
            }
            if (!found) {
                
                files.push({
                    isOfficial: false,
                    apiItem: null,
                    text,
                    fileName
                })
            }
        }
    }
    
    return files;
}


export function listFilesResults(files: FileRes[]): {
    counterTotal: number
    counterUnofficial: number
}{
    let counterTotal = 0, counterUnofficial = 0;
    for (const fileRes of files){
      counterTotal++;

      const {isOfficial, text, fileName, apiItem} = fileRes;
      if (isOfficial){
        console.log('📗', '  official url', '"' + text + '"', 'in', '"' + fileName + '"', 'from', '"' + apiItem.info.title + '"');
      } else {
        counterUnofficial++;
        console.error('📕', '  unofficial url in', fileName, ' - ', text);
      }
    }
    return {
        counterTotal,
        counterUnofficial
    }
}