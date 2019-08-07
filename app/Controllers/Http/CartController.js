'use strict'

const User = use('App/Models/User');
const Product = use('App/Models/Product');
const UserProduct = use('App/Models/UserProduct');
const Database = use('Database')

class CartController {
    async index({ request, view,  auth, session, response }) {
        const user = await User
            .find(auth.user.id)
            .catch( function(e) {
                session.put('error', e.toString());
                session.put('error_code', e.code);
                session.put('error_message', e.sqlMessage);
                session.put('error_beauti_message', "Failed to find User");
                console.error(e);
                return response.status(404).redirect('/home');
            });
        if(!user) {
            session.put('error_beauti_message', "User not founded");
            console.error(session.get('error_beauti_message'));
            return response.status(404).redirect('/home');
        }

        const products = await user.products()
            .withPivot('quantity')
            .fetch()
            .catch( function(e) {
                session.put('error', e.toString());
                session.put('error_code', e.code);
                session.put('error_message', e.sqlMessage);
                session.put('error_beauti_message', "Failed to load Cart products");
                console.error(e);
                return response.status(404).send( session.get('error_beauti_message') + '. ' + session.get('error_message') )
            });

        return view.render('user.cart', { 
            products : products.toJSON(),
            points : user.points
         });
    }

    async insert({ request,  auth, session, response }) {

        const user = await User
            .find(auth.user.id)
            .catch( function(e) {
                session.put('error', e.toString());
                session.put('error_code', e.code);
                session.put('error_message', e.sqlMessage);
                session.put('error_beauti_message', "Failed to find User");
                console.error(e);
                return response.status(404).send( session.get('error_beauti_message') + '. ' + session.get('error_message') )
            });
        if(!user) {
            session.put('error_beauti_message', "User not founded");
            console.error(session.get('error_beauti_message'));
            return response.status(404).send(session.get('error_beauti_message'));
        }

        const { product_id } = request.all();
        if(!product_id) {
            session.put('error_beauti_message', "Product id not founded");
            console.error(session.get('error_beauti_message'));
            return response.status(404).send(session.get('error_beauti_message'));
        }

        if ( await Product.find(product_id) ) {

            const exising_user_product = await Database
                .from('user_products')
                .where(function () {
                    this
                    .where('user_id', user.id)
                    .where('product_id', product_id);
                })
                .first()
                .catch( function(e) {
                    session.put('error', e.toString());
                    session.put('error_code', e.code);
                    session.put('error_message', e.sqlMessage);
                    session.put('error_beauti_message', "Failed to load Products data");
                    console.error(e);
                    return response.status(404).send( session.get('error_beauti_message') + '. ' + session.get('error_message') );
                });
            
            if(exising_user_product) { 

                const user_product = await UserProduct.find(exising_user_product.id);
                user_product.quantity++;
                await user_product.save();

            } else {

                await user.products()
                    .attach([product_id])
                    .catch( function(e) {
                        session.put('error', e.toString());
                        session.put('error_code', e.code);
                        session.put('error_message', e.sqlMessage);
                        session.put('error_beauti_message', "Failed to add Product into the Cart");
                        console.error(e);
                        return response.status(404).send( session.get('error_beauti_message') + '. ' + session.get('error_message') );
                    });

            }
        }
        else {
            session.put('error_beauti_message', "Product not found");
            console.error(session.get('error_beauti_message'));
            return response.status(404).send(session.get('error_beauti_message'));
        }
        
        session.put('message', 'Product added successfully');
        return response.status(202).send('Product added successfully');
    }

    async remove({ request, auth, session, response }) {
        
        const user = await User
            .find(auth.user.id)
            .catch( function(e) {
                session.put('error', e.toString());
                session.put('error_code', e.code);
                session.put('error_message', e.sqlMessage);
                session.put('error_beauti_message', "Failed to find User");
                console.error(e);
                return response.status(404).send( session.get('error_beauti_message') + '. ' + session.get('error_message') )
            });
        if(!user) {
            session.put('error_beauti_message', "User not found");
            console.error(session.get('error_beauti_message'));
            return response.status(404).send(session.get('error_beauti_message'));
        }

        const { product_id } = request.all();
        if(!product_id) {
            session.put('error_beauti_message', "Parameter Product_id not found");
            console.error(session.get('error_beauti_message'));
            return response.status(404).send(session.get('error_beauti_message'));
        }

        await user.products()
            .detach([product_id])
            .catch( function(e) {
                session.put('error', e.toString());
                session.put('error_code', e.code);
                session.put('error_message', e.sqlMessage);
                session.put('error_beauti_message', "Failed to delete Cart product");
                console.error(e);
                return response.status(404).send( session.get('error_beauti_message') + '. ' + session.get('error_message') )
            });

        session.put('message', 'Product removed successfull');
        return response.status(202).send('Product removed successfull');

    }

    async increase({ request, auth, session, response }) {

        const user = await User
            .find(auth.user.id)
            .catch( function(e) {
                session.put('error', e.toString());
                session.put('error_code', e.code);
                session.put('error_message', e.sqlMessage);
                session.put('error_beauti_message', "Failed to find User");
                console.error(e);
                return response.status(404).send( session.get('error_beauti_message') + '. ' + session.get('error_message') )
            });
        if(!user) {
            session.put('error_beauti_message', "User not founded");
            console.error(session.get('error_beauti_message'));
            return response.status(404).send(session.get('error_beauti_message'));
        }

        const { product_id } = request.all();
        if(!product_id) {
            session.put('error_beauti_message', "Parameter Product_id not found");
            console.error(session.get('error_beauti_message'));
            return response.status(404).send(session.get('error_beauti_message'));
        }

        if ( await Product.find(product_id) ) {

            const exising_user_product = await Database
                .from('user_products')
                .where(function () {
                    this
                    .where('user_id', user.id)
                    .where('product_id', product_id);
                })
                .first()
                .catch( function(e) {
                    session.put('error', e.toString());
                    session.put('error_code', e.code);
                    session.put('error_message', e.sqlMessage);
                    session.put('error_beauti_message', "Failed to load Products data");
                    console.error(e);
                    return response.status(404).send( session.get('error_beauti_message') + '. ' + session.get('error_message') );
                });
            
            if(exising_user_product) { 

                const user_product = await UserProduct.find(exising_user_product.id); 
                user_product.quantity++;
                await user_product.save();

            } else 
                return response.status(404).send( session.get('error_beauti_message') + '. ' + session.get('error_message') );

        }
        else {
            session.put('error_beauti_message', "Product not found");
            console.error('Product not found');
            return response.status(404).send('Product not found');
        } 
        
        return response.status(202).send('Product quatity increased successfull');

    }

    async reduce({ request, auth, session, response }) {
        const user = await User
            .find(auth.user.id)
            .catch( function(e) {
                session.put('error', e.toString());
                session.put('error_code', e.code);
                session.put('error_message', e.sqlMessage);
                session.put('error_beauti_message', "Failed to find User");
                console.error(e);
                return response.status(404).send( session.get('error_beauti_message') + '. ' + session.get('error_message') )
            });
        if(!user) {
            session.put('error_beauti_message', "User not founded");
            console.error(session.get('error_beauti_message'));
            return response.status(404).send(session.get('error_beauti_message'));
        }

        const { product_id } = request.all();
        if(!product_id) {
            session.put('error_beauti_message', "Parameter Product_id not found");
            console.error(session.get('error_beauti_message'));
            return response.status(404).send(session.get('error_beauti_message'));
        }

        if ( await Product.find(product_id) ) {

            const exising_user_product = await Database
                .from('user_products')
                .where(function () {
                    this
                    .where('user_id', user.id)
                    .where('product_id', product_id);
                })
                .first()
                .catch( function(e) {
                    session.put('error', e.toString());
                    session.put('error_code', e.code);
                    session.put('error_message', e.sqlMessage);
                    session.put('error_beauti_message', "Failed to load Products data");
                    console.error(e);
                    return response.status(404).send( session.get('error_beauti_message') + '. ' + session.get('error_message') );
                });
            
            if(exising_user_product) { 

                const user_product = await UserProduct.find(exising_user_product.id); 
                if(user_product.quantity === 0) {   // If product quantity < 1 ...

                    await user.products()           // ... remove product from cart
                        .detach([product_id])
                        .catch( function(e) {
                            session.put('error', e.toString());
                            session.put('error_code', e.code);
                            session.put('error_message', e.sqlMessage);
                            session.put('error_beauti_message', "Failed to delete Cart product");
                            console.error(e);
                            return response.status(404).send( session.get('error_beauti_message') + '. ' + session.get('error_message') )
                        });

                    session.put('message', 'Product removed successfull');
                    return response.status(202).send('Product removed successfull');

                } else {
                    user_product.quantity--;
                    await user_product
                        .save()
                        .catch( function(e) {
                            session.put('error', e.toString());
                            session.put('error_code', e.code);
                            session.put('error_message', e.sqlMessage);
                            session.put('error_beauti_message', "Failed to save product");
                            console.error(e);
                            return response.status(404).send( session.get('error_beauti_message') + '. ' + session.get('error_message') )
                        });
                }

            } else 
                return response.status(404).send( session.get('error_beauti_message') + '. ' + session.get('error_message') );

        }
        else {
            session.put('error_beauti_message', "Product not found");
            console.error('Product not found');
            return response.status(404).send('Product not found');
        } 
        return response.status(202).send('Product quatity reduced successfull');
    }
}

module.exports = CartController
