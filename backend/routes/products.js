const { Product } = require('../models/product');
const { Category } = require('../models/category');
const { Order } = require('../models/order');
const { OrderItem } = require('../models/order-item');

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if (isValid) {
            uploadError = null
        }
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {

        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
})

const uploadOptions = multer({ storage: storage })

router.get(`/:businessId`, async (req, res) => {
    const products = await Product.find({ "business": mongoose.Types.ObjectId(req.params.businessId)})
    .populate('business', {
        "address": 1,
        "coverImage": 1,
        "delivery": 1,
        "pickup": 1,
        "name": 1,
        "rating": 1,
    })
    .populate('category', {
        "name": 1
    });

    if (!products) {
        return res.status(400).send('Invalid Business');
    }

    res.send(products);
})

router.get(`/topProducts/:businessId`, async (req, res) => {
    Order.aggregate([
        {
            $match: { business: mongoose.Types.ObjectId(req.params.businessId) }
        },
        {
            $lookup: {
                from: OrderItem.collection.name,
                localField: "orderItems",
                foreignField: "_id",
                as: "orderItems"
            }
        },
        {
            $unwind: "$orderItems"
        },
        {
            $group: {
                _id: "$orderItems.product",
                'count': { $sum: "$orderItems.quantity" }
            }
        },
        {
            $sort: {
                count: -1
            }
        },
        {
            $lookup: {
                from: Product.collection.name,
                localField: "_id",
                foreignField: "_id",
                as: "product"
            }
        },
        {
            $project: {
                _id: 0,
                count: 1,
                product: 1
            }
        },
        {
            $addFields: {
                "product": { $first: "$product" }
            }
        },
        {
            $limit: 5
        }
    ]).exec((err, products) => {
        if (err) {
            return res.status(500).send({msg: "unable to find top products"})
        }

        return res.status(200).send(products);
    })
})

router.post(`/`, uploadOptions.single('image'), async (req, res) => {
    const category = await Category.findOne({ "name": req.body.category });
    if (!category) {
        return res.status(400).send('Invalid Category');
    }

    const file = req.file;
    let fileName, basePath;
    if (file) {
        fileName = file.filename
        basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    }

    let product = new Product({
        image: file ? `${basePath}${fileName}` : null,
        name: req.body.name,
        brand: req.body.brand,
        price: req.body.price,
        countInStock: req.body.stock,
        description: req.body.description,
        category: mongoose.Types.ObjectId(category._id),
        business: mongoose.Types.ObjectId(req.body.business)
    })

    product = await product.save();

    if (!product) {
        return res.status(500).send('the product cannot be updated!')
    }

    res.send(product);
})

router.put('/:productId', uploadOptions.single('image'), async (req, res) => {
    const category = await Category.findOne({ "name": req.body.category });
    if (!category) {
        return res.status(400).send('Invalid Category');
    }

    const product = await Product.findById(mongoose.Types.ObjectId(req.params.productId));
    if (!product) {
        return res.status(400).send('Invalid Product!');
    }

    const file = req.file;
    let imagePath;

    if (file) {
        const fileName = file.filename
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        imagePath = `${basePath}${fileName}`;
    } else {
        imagePath = product.image
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        mongoose.Types.ObjectId(req.params.productId),
        {
            image: imagePath,
            name: req.body.name,
            brand: req.body.brand,
            price: req.body.price,
            countInStock: req.body.stock,
            description: req.body.description,
            category: mongoose.Types.ObjectId(category._id),
            business: mongoose.Types.ObjectId(req.body.business),
        },
        { new: true }
    )

    if (!updatedProduct) {
        return res.status(500).send('the product cannot be updated!')
    }

    res.send(updatedProduct);
})

router.put('/toggleShowOnMenu/:productId', async (req, res) => {
    
    const product = await Product.findByIdAndUpdate(
        mongoose.Types.ObjectId(req.params.productId),
        {
            showOnMenu: req.body.showOnMenu
        },
        { new: true }
    )

    if (!product) {
        return res.status(500).send('the product cannot be updated!')
    }

    res.send(product);
})

router.delete('/:productId', (req, res) => {
    Product.findByIdAndRemove(req.params.productId).then(product => {
        if (product) {
            return res.status(200).json({ success: true, message: 'the product is deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "product not found!" })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
    })
})

module.exports = router;