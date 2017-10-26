const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
    console.log(req.name);
    res.render('index');
};

exports.addStore = (req, res) => {
    res.render('editStore', { title: 'Add Store' });
};

exports.createStore = async (req, res) => {
    const store = await (new Store(req.body)).save();
    req.flash('success', `Successfully created ${store.name}. Care to leave a review?`);
    res.redirect(`/add/${store._id}`);
};

exports.getStores = async(req, res) => {
    // 1. Query the db for a list of all stores
    const stores = await Store.find();
    res.render('stores', { title: 'Stores', stores });
};

exports.editStore = async (req, res) => {
    // 1. Find the store given the ID
    const store = await Store.findOne({ _id: req.params.id });

    // 2. Confirm they are the owner of the store
    // TODO

    // 3. Render out the edit form so the user can update their store
    res.render('editStore', { title: `Edit ${store.name}`, store });
};

exports.updateStore = async (req, res) => {
    // Set the location data to be a point
    req.body.location.type = 'Point';
    // Find and update the store
    const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true, // Return the new store instead of the old store
        runValidators: true, // Force model to run required validators against it
    }).exec();
    // Redirect them to the storea nd tell them it worked
    req.flash('success', `Successfully updated <strong>${store.name}<strong>. <a href="/stores/${store.slug}">view Store</a>`);
    res.redirect(`/stores/${store._id}/edit`);
};