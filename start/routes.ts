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
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'

const UsersController = () => import('#controllers/user/users_controller')
const OauthController = () => import('#controllers/user/oauth_controller')
const ProductsController = () => import('#controllers/product/products_controller')
const CategoriesController = () => import('#controllers/category/categories_controller')
const GetCategoriesWithLastThreeProducts = () =>
  import('#controllers/category/get_categories_with_last_three_products')
const UpdateProductStatusController = () =>
  import('#controllers/product/update_product_status_controller')
const AddProductToCartController = () =>
  import('#controllers/product/add_product_to_cart_controller')
const GetProductsInCartController = () =>
  import('#controllers/product/get_products_in_cart_controller')
const AttachCategoriesToProductController = () =>
  import('#controllers/product/attach_categories_to_product_controller')
const DetachCategoriesFromProductController = () =>
  import('#controllers/product/detach_categories_from_product_controller')

router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

router.get('/docs', async () => {
  // return AutoSwagger.default.ui("/swagger", swagger);
  return AutoSwagger.default.scalar('/swagger')
  // return AutoSwagger.default.rapidoc("/swagger", "view");
})

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.resource('products', ProductsController)
router
  .group(() => {
    router.post('/update-status/:id', [UpdateProductStatusController])
    router.post('/attach-categories/:id', [AttachCategoriesToProductController])
    router.post('/detach-categories/:id', [DetachCategoriesFromProductController])
  })
  .prefix('/products')

router
  .group(() => {
    router.post('/:id', [AddProductToCartController])
    router.get('', [GetProductsInCartController])
  })
  .prefix('/cart')
  .use(middleware.auth({ guards: ['api'] }))

router.resource('categories', CategoriesController)
router.get('categories-with-last-products', [GetCategoriesWithLastThreeProducts])

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
