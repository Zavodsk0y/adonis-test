import path from 'node:path'
import url from 'node:url'

export default {
  path: path.dirname(url.fileURLToPath(import.meta.url)) + '/../',
  title: 'AdonisTest',
  version: '0.0.1',
  description: "I'm just learning this framework",
  tagIndex: 2,
  productionEnv: 'development',
  snakeCase: false,

  debug: true,
  ignore: ['/swagger', '/docs'],
  preferredPutPatch: 'PATCH',
  common: {
    parameters: {},
    headers: {},
  },
  securitySchemes: {},
  authMiddlewares: ['auth', 'auth:api'],
  defaultSecurityScheme: 'BearerAuth',
  persistAuthorization: true,
  showFullPath: false,
}
