const path = require('path');

const pathToDocsDir = path.join(__dirname, '../../docs');
const pathToApiSpec = path.join(pathToDocsDir, 'openApi3.yml');

module.exports = {
    pathToDocsDir,
    pathToApiSpec,
};
