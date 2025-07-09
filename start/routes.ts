/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const UsersController = () => import('#controllers/users/users_controller')
const OauthController = () => import('#controllers/users/oauth_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('signup', [UsersController, 'signup'])
router.post('login', [UsersController, 'login'])
router.get('verify-email/:token', [UsersController, 'emailVerify'])

router.get('users', [UsersController, 'index']).use(middleware.auth({ guards: ['api'] }))
router
  .group(() => {
    router.patch('change-full-name', [UsersController, 'changeFullName'])
    router.patch('change-email', [UsersController, 'changeEmail'])
    router.patch('change-password', [UsersController, 'changePassword'])
  })
  .prefix('/users/me')
  .use(middleware.auth({ guards: ['api'] }))

router.get('/:provider/redirect', [OauthController, 'redirect']).where('provider', /github|google/)
router
  .get('/:provider/auth/callback', [OauthController, 'callback'])
  .where('provider', /github|google/)
