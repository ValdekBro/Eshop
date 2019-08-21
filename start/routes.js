'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const inflect = require( 'inflection' );


Route.get   ('/info', 'InfoController.index'); 	// render('info');

Route.get   ('/FAQ', 'InfoController.index'); 	// render('FAQ');

Route.on    ('/').render('index');

Route.on    ('/login').render('auth.login');
Route.post  ('/login', 'UserController.login');

Route.get   ('/logout', 'UserController.logout');

Route.on    ('/signup').render('auth.signup.home');
Route.on    ('/signup/phys_person').render('auth.signup.phys_person');
Route.on    ('/signup/legal_entity').render('auth.signup.legal_entity');
Route.post  ('/signup', 'UserController.store');

Route.group(() => {
	Route.get   ('/home', 'NewsController.index'); 	// render('home');

	Route.get   ('/cart', 'CartController.index'); 	// render('user.cart');
	Route.post  ('/cart/add', 'CartController.insert');         //ajax
	Route.post  ('/cart/remove', 'CartController.remove');      //ajax
	Route.post  ('/cart/increase', 'CartController.increase');  //ajax
	Route.post  ('/cart/reduce', 'CartController.reduce');    	//ajax

	Route.get   ('/catalog', 'CategoryController.index'); 				//render('product.catalog');
	Route.get   ('/catalog/:category', 'ProductController.index'); 		//render('product.list');
	Route.get   ('/catalog/:category/:id', 'ProductController.show'); 	//render('product.card');

	Route.get   ('/account', 'UserController.show'); 			//render('user.card');
	Route.get   ('/account/edit', 'UserController.edit'); 		//render('user.form');
	Route.post  ('/account/edit', 'UserController.update');
	Route.get   ('/account/orders', 'OrderController.index'); 	//render('order.list');

	Route.get   ('/order/create', 'OrderController.edit'); 		// render('order.form');
	Route.get   ('/order/:id', 'OrderController.show'); 		// render('order.card');
	Route.get   ('/order/:id/copy', 'OrderController.copy'); 
	Route.post  ('/order/create', 'OrderController.store');
}).middleware('auth');

// Administration panel
Route.group(() => {

	Route.on    ('/').render('admin.home');

	Route.get   ('/users', 'UserController.index'); 		//render('admin.user.list');
	Route.get   ('/user/:id', 'UserController.show'); 		//render('admin.user.card')
	Route.get   ('/user/:id/edit', 'UserController.edit'); 	//render('admin.user.form')
	Route.post  ('/user/:id/edit', 'UserController.update');
	Route.post  ('/user/:id/delete', 'UserController.destroy');			//ajax

	Route.get   ('/orders', 'OrderController.index'); 			//render('admin.order.list');
	Route.get   ('/order/:id', 'OrderController.show'); 		//render('admin.order.card')
	Route.get   ('/order/:id/edit', 'OrderController.edit'); 	//render('admin.order.form')
	Route.post  ('/order/:id/edit', 'OrderController.update');
	Route.post  ('/order/:id/delete', 'OrderController.destroy');		//ajax

	Route.get   ('/products', 'ProductController.index'); 			//render('admin.prdouct.list');
	Route.get   ('/product/:id', 'ProductController.show'); 		//render('admin.product.card')
	Route.get   ('/product/create', 'ProductController.create'); 	//render('admin.product.form')
	Route.post  ('/product/create', 'ProductController.store');
	Route.get   ('/product/:id/copy', 'ProductController.copy');
	Route.get   ('/product/:id/edit', 'ProductController.edit');
	Route.post  ('/product/edit', 'ProductController.update');
	Route.post  ('/product/delete', 'ProductController.destroy');					//ajax
	Route.post  ('/product/property/create', 'ProductPropertyController.store');	//ajax
	Route.post  ('/product/property/edit', 'ProductPropertyController.update');		//ajax
	Route.post  ('/product/property/delete', 'ProductPropertyController.destroy');	//ajax

	Route.get   ('/templates', 'TemplateController.index'); 		//render('admin.template.list');
	Route.post  ('/template/create', 'TemplateController.store');						//ajax
	Route.post  ('/template/edit', 'TemplateController.update');						//ajax
	Route.post  ('/template/delete', 'TemplateController.destroy');						//ajax
	Route.post  ('/template/property/create', 'TemplatePropertyController.store');		//ajax
	Route.post  ('/template/property/edit', 'TemplatePropertyController.update');		//ajax
	Route.post  ('/template/property/delete', 'TemplatePropertyController.destroy');	//ajax

	Route.get   ('/categories', 'CategoryController.index');		//render('admin.category.list');
	Route.post  ('/category/create', 'CategoryController.store');		//ajax
	Route.post  ('/category/:id/edit', 'CategoryController.update');	//ajax
	Route.post  ('/category/:id/delete', 'CategoryController.destroy');	//ajax

	// News

	const news = ['user_news', 'shop_news', 'discount_news', 'new_news'];

	Route.get   ('/news', 'NewsController.index'); 		//render('admin.news.list');
	
	for (let i in news) {
		let resource = news[i];
		let className = inflect.classify(resource);
		Route.resource(`/${resource}`, `${className}Controller`);
	}
	
	// // News AJAX

	// Route.post  ('/user_news/create', 'UserNewsController.store');			//ajax
	// Route.post  ('/user_news/:id/edit', 'UserNewsController.update');		//ajax
	// Route.post  ('/user_news/:id/delete', 'UserNewsController.destroy');		//ajax

	// Route.post  ('/shop_news/create', 'ShopNewsController.store');			//ajax
	// Route.post  ('/shop_news/:id/edit', 'ShopNewsController.update');		//ajax
	// Route.post  ('/shop_news/:id/delete', 'ShopNewsController.destroy');		//ajax

	// Route.post  ('/discount_news/create', 'DiscountNewsController.store');			//ajax
	// Route.post  ('/discount_news/:id/edit', 'DiscountNewsController.update');		//ajax
	// Route.post  ('/discount_news/:id/delete', 'DiscountNewsController.destroy');		//ajax

	// Route.post  ('/new_news/create', 'NewNewsController.store');			//ajax
	// Route.post  ('/new_news/:id/edit', 'NewNewsController.update');		//ajax
	// Route.post  ('/new_news/:id/delete', 'NewNewsController.destroy');	//ajax

}).prefix('/administration')
// .middleware('admin')
.namespace('Admin')
