'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on    ('/home').render('home');

Route.on    ('/info').render('info');

Route.on    ('/FAQ').render('FAQ');



Route.on    ('/').render('index');

Route.on    ('/login').render('auth.login');

Route.on    ('/signup').render('auth.signup.home');
Route.on    ('/signup/phys_person').render('auth.signup.phys_person');
Route.on    ('/signup/legal_entity').render('auth.signup.legal_entity');



Route.on    ('/cart').render('user.cart');
Route.on    ('/cart/make_order').render('order.form');


Route.on    ('/catalog').render('product.catalog');
Route.on    ('/catalog/:category').render('product.list');
Route.on    ('/catalog/:category/:id').render('product.card');


Route.on    ('/orders/:id').render('order.card');


Route.on    ('/account').render('user.card');
Route.on    ('/account/edit').render('user.form');
Route.on    ('/account/orders').render('order.list');


// Administration panel


Route.on    ('/administration').render('admin.home');

Route.on    ('/administration/users').render('admin.user.list');

Route.on    ('/administration/orders').render('admin.order.list');

Route.on    ('/administration/products').render('admin.prdouct.list');

Route.on    ('/administration/templates').render('admin.template.list');

Route.on    ('/administration/categories').render('admin.category.list');

Route.on    ('/administration/news').render('admin.news.list');

/* Simple Blog 
Route.on    ('/signup').render('auth.signup');
Route.on    ('/login').render('auth.login');

Route.get   ('/', 'PostController.home');

Route.post  ('/signup', 'UserController.create')
    .validator('CreateUser')
    .as('CreateUser');

Route.post  ('/login', 'UserController.login')
    .validator('LoginUser')
    .as('LoginUser');

Route.get   ('/logout', async ({ auth, response }) => {
    await auth.logout();
    return response.redirect('/');
});

Route.get   ('/user_posts', 'PostController.userPosts');
Route.post  ('/user_posts', 'PostController.create')
    .validator('CreatePost')
    .as('CreatePost');

Route.get   ('/user_posts/delete/:id', 'PostController.delete');
Route.get   ('/user_posts/edit/:id', 'PostController.edit');
Route.post  ('/posts/update/:id', 'PostController.update');


Route.get   ('/ajax/posts_by_date', async ({ request, response }) => {
    const posts = await Post.query()
        .with('user')
        .where('created_at', request.all().date)
        .fetch();
    return response.json({ posts: posts.toJSON() })
});

Route.get   ('/ajax/posts_by_user', async ({ request, response }) => {
    const posts = await Post.query()
        .with('user')
        .where('user_id', 2)
        .fetch();
    return response.json({ posts: posts.toJSON() })
}); 

Route.on    ('/forgotPassword').render('auth.password-recover');
Route.post  ('/forgotPassword', 'UserController.resetToken');
Route.get   ('/forgotPassword/:id/:token', async ({ request, view, params, response }) => {
    return view.render('auth.new-password', { _id : params.id, _token : params.token })
}); 
Route.post  ('/forgotPassword/:id/:token', 'UserController.resetPassword');

*/