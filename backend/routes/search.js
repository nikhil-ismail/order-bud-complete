const { Product } = require('../models/product');
const { Category } = require('../models/category');
const { Business } = require('../models/business');

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const query = req.query.searchTerm;

    Product.aggregate([
        {
            $lookup: {
                from: Category.collection.name,
                localField: "category",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $lookup: {
                from: Business.collection.name,
                localField: "business",
                foreignField: "_id",
                as: "business"
            }
        },
        {
            $match: {
                $or: [
                    {
                        "category.name": { $regex: new RegExp(query, "i") }
                    },
                    {
                        "name": { $regex: new RegExp(query, "i") }
                    },
                    {
                        "brand": { $regex: new RegExp(query, "i") }
                    }
                ]
            }
        },
        {
            $sort: {
                "rating": -1,
            }
        },
        {
            $project: {
                description: 1,
                image: 1,
                brand: 1,
                price: 1,
                rating: 1,
                numReviews: 1,
                name: 1,
                business: { $arrayElemAt: ["$business", 0] },
                category: 1,
                countInStock: 1
            }
        }
    ])
        .exec((err, productMatches) => {
            if (err) {
                return res.send(500).send({ msg: "Unable to reconcile categories" });
            }

            Business.aggregate([
                {
                    $match: {
                        "name": { $regex: new RegExp(query, "i") }
                    }
                },
                {
                    $lookup: {
                        from: Category.collection.name,
                        localField: "categories",
                        foreignField: "_id",
                        as: "categories"
                    }
                },
                {
                    $sort: {
                        "rating": -1
                    }
                }
            ])
                .exec((err, businessMatches) => {
                    if (err) {
                        return res.status(500).send({ msg: "Unable to reconcile business names" });
                    }
                    
                    return res.status(200).send({
                        productMatches,
                        businessMatches
                    })
                })
        })
})

router.get('/category', (req, res) => {
    const query = req.query.category;

    Product.aggregate([
        {
            $lookup: {
                from: Category.collection.name,
                localField: "category",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $lookup: {
                from: Business.collection.name,
                localField: "business",
                foreignField: "_id",
                as: "business"
            }
        },
        {
            $match: {
                "category.name": query
            }
        },
        {
            $project: {
                description: 1,
                image: 1,
                brand: 1,
                price: 1,
                rating: 1,
                numReviews: 1,
                name: 1,
                business: { $arrayElemAt: ["$business", 0] },
                category: 1,
                countInStock: 1
            }
        }
    ]).exec((err, matches) => {
        if (err) {
            return res.send(500).send({ msg: "Unable to reconcile categories" });
        }
        res.status(200).send(matches);
    });
})

module.exports = router;