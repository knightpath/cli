const path = require("path");
var currentPath = process.cwd();

// export const APIS_DATA_URL = 'https://static.knightpath.io/apis.json';
export const PATH_TO_APIS_OUTPUT = path.join(currentPath, './src/resources/apis.json'); //path.join(os.tmpdir(), 'apis.json');

export const URL_REGEX = '(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?';