// ./graphql/resolvers/index.js/ts
import path from 'path';
import { mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const resolversArray = loadFilesSync(path.join(__dirname, './**/*.resolvers.*'));
const resolvers = mergeResolvers(resolversArray);

export default resolvers;
