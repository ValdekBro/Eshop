'use strict'

const User = use('App/Models/User');
const Product = use('App/Models/Product');
const UserProduct = use('App/Models/UserProduct');
const Database = use('Database')

class CartController {
	async index({ request, view, auth, session, response }) { try {
			const user = await User
				.findOrFail(auth.user.id)
				.catch(function (e) {
					session.put('error_beauti_message', "User not found");
					throw e;
				});

			const products = await user.products()
				.withPivot('quantity')
				.fetch()
				.catch(e => {
					session.put('error_beauti_message', "Failed to load Cart products");
					throw e;
				});

			if (request.ajax())
				return response.send({
					products: products.toJSON(),
					points: user.points
				});
			else
				return view.render('user.cart', {
					products: products.toJSON(),
					points: user.points
				});


		} catch (e) {
			session.put('error', e.toString());
			session.put('error_code', e.code);
			session.put('error_message', e.sqlMessage);
			console.error(e);

			if (request.ajax())
				return response.status(400)
					.send(session.get('error_beauti_message') + '. ' + session.get('error_message'));
			else
				return response.status(400).redirect('/home');

		}
	}

	async insert({ request, auth, session, response }) { try {
			const user = await User
				.findOrFail(auth.user.id)
				.catch(function (e) {
					session.put('error_beauti_message', "User not found");
					throw e;
				});

			const { product_id } = request.all();
			if (!product_id) {
				session.put('error_beauti_message', "Product id not founded");
				console.error(session.get('error_beauti_message'));
				return response.status(404).send(session.get('error_beauti_message'));
			}

			const product = await Product
				.findOrFail(product_id)
				.catch(function (e) {
					session.put('error_beauti_message', "Product not found");
					throw e;
				});

			const exising_user_product = await Database
				.from('user_products')
				.where(function () {
					this
						.where('user_id', user.id)
						.where('product_id', product_id);
				})
				.first()
				.catch(e => {
					session.put('error_beauti_message', "Failed to load Cart Products data");
					throw e;
				});

			if (exising_user_product) { // If product is already in the cart

				const user_product = await UserProduct.findOrFail(exising_user_product.id);
				user_product.quantity++;
				await user_product.save();

			} else {

				await user.products()
					.attach([product_id])
					.catch(e => {
						session.put('error_beauti_message', "Failed to add Product into the Cart");
						throw e;
					});

			}
			session.put('message', 'Product added successfully');
			return response.status(202).send('Product added successfully');

		} catch (e) {
			session.put('error', e.toString());
			session.put('error_code', e.code);
			session.put('error_message', e.sqlMessage);
			console.error(e);
			return response.status(400).send(session.get('error_beauti_message') + '. ' + session.get('error_message'));
		}
	}

	async remove({ request, auth, session, response }) { try {
			const user = await User
				.findOrFail(auth.user.id)
				.catch(function (e) {
					session.put('error_beauti_message', "User not found");
					throw e;
				});

			const { product_id } = request.all();
			if (!product_id) {
				session.put('error_beauti_message', "Parameter Product_id not found");
				console.error(session.get('error_beauti_message'));
				return response.status(404).send(session.get('error_beauti_message'));
			}

			await user.products()
				.detach([product_id])
				.catch(e => {
					session.put('error_beauti_message', "Failed to delete Cart product");
					throw e;
				});

			session.put('message', 'Product removed successfull');
			return response.status(202).send('Product removed successfull');

		} catch (e) {
			session.put('error', e.toString());
			session.put('error_code', e.code);
			session.put('error_message', e.sqlMessage);
			console.error(e);
			return response.status(400).send(session.get('error_beauti_message') + '. ' + session.get('error_message'));
		}
	}

	async increase({ request, auth, session, response }) { try {

			const user = await User
				.findOrFail(auth.user.id)
				.catch(function (e) {
					session.put('error_beauti_message', "User not found");
					throw e;
				});

			const { product_id } = request.all();
			if (!product_id) {
				session.put('error_beauti_message', "Parameter Product_id not found");
				console.error(session.get('error_beauti_message'));
				return response.status(404).send(session.get('error_beauti_message'));
			}

			const exising_user_product = await Database
				.from('user_products')
				.where(function () {
					this
						.where('user_id', user.id)
						.where('product_id', product_id);
				})
				.first()
				.catch(e => {
					session.put('error_beauti_message', "Failed to load Products data");
					throw e;
				});

			if (exising_user_product) {

				const user_product = await UserProduct.findOrFail(exising_user_product.id);
				user_product.quantity++;
				await user_product.save();

			} else {
				session.put('error_beauti_message', "Product not found in Cart");
				console.error(session.get('error_beauti_message'));
				return response.status(404).send(session.get('error_beauti_message'));
			}

			return response.status(202).send('Product quatity increased successfull');

		} catch (e) {
			session.put('error', e.toString());
			session.put('error_code', e.code);
			session.put('error_message', e.sqlMessage);
			console.error(e);
			return response.status(400).send(session.get('error_beauti_message') + '. ' + session.get('error_message'));
		}
	}

	async reduce({ request, auth, session, response }) { try {
			const user = await User
				.findOrFail(auth.user.id)
				.catch(function (e) {
					session.put('error_beauti_message', "User not found");
					throw e;
				});

			const { product_id } = request.all();
			if (!product_id) {
				session.put('error_beauti_message', "Parameter Product_id not found");
				console.error(session.get('error_beauti_message'));
				return response.status(404).send(session.get('error_beauti_message'));
			}

			const exising_user_product = await Database
				.from('user_products')
				.where(function () {
					this
						.where('user_id', user.id)
						.where('product_id', product_id);
				})
				.first()
				.catch( e => {
					session.put('error_beauti_message', "Failed to load Products data");
					throw e;
				});

			if (exising_user_product) {

				const user_product = await UserProduct.findOrFail(exising_user_product.id);
				if (user_product.quantity === 0) {   // If product quantity < 1 ...

					await user.products()           // ... remove product from cart
						.detach([product_id])
						.catch( e => {
							session.put('error_beauti_message', "Failed to delete Cart product");
							throw e;
						});

					session.put('message', 'Product removed successfull');
					return response.status(202).send('Product removed successfull');

				} else {
					user_product.quantity--;
					await user_product
						.save()
						.catch( e => { 
							session.put('error_beauti_message', "Failed to save product");
							throw e;
						});
				}

			} else {
				session.put('error_beauti_message', "Product not found in Cart");
				console.error(session.get('error_beauti_message'));
				return response.status(404).send(session.get('error_beauti_message'));
			}

			return response.status(202).send('Product quatity reduced successfull');

		} catch (e) {
			session.put('error', e.toString());
			session.put('error_code', e.code);
			session.put('error_message', e.sqlMessage);
			console.error(e);
			return response.status(400).send(session.get('error_beauti_message') + '. ' + session.get('error_message'));
		}
	}
}

module.exports = CartController
