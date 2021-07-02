const { Business } = require('../models/business');
const { Category } = require('../models/category');
const { User } = require('../models/user');

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

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
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const uploadOptions = multer({ storage: storage });

router.get(`/`, async (req, res) => {
    const businessList = await Business.find()
    .populate('categories', 'name')

    if (!businessList) {
        res.status(500).json({ success: false })
    }

    console.log(businessList);
    
    res.status(200).send(businessList);
})

router.get('/:userId', async (req, res) => {
    const user = await User.findById(mongoose.Types.ObjectId(req.params.userId));
    let business;

    if (user.isAdmin) {
        business = await Business.findOneAndUpdate(
            { "owner": req.params.userId },
            {   },
            { upsert: true, new: true }
        )
        .populate('categories', {
            'name': 1,
            "_id": 0
        })

        if (!business) {
            return res.status(500).json({ message: 'The business with the given ID was not found.' })
        }

        return res.status(200).send(business);
    }
    
    return res.status(500).send({msg: "You are not a store owner"})
})

router.put('/rating/:id', async (req, res) => {
    businessRatings = req.body.businessRatings;
    reviewCount = req.body.reviewCount;
    userRating = req.body.userRating;

    businessRatings.push(userRating)
    console.log(businessRatings);

    let total = 0;
    for (let i = 0; i < businessRatings.length; i++) {
        total += businessRatings[i];
    }
    let averageRating = total / businessRatings.length;
    averageRating = Math.round(averageRating * 10) / 10

    const business = await Business.findByIdAndUpdate(req.params.id, {
            reviewCount: reviewCount+1,
            ratings: businessRatings,
            rating: averageRating
        },
        { new: true }
    )

    if (!business) {
        res.status(500).json({ message: 'The business with the given ID was not found.' })
    }
    res.status(200).send(business);
})

router.put('/:id', uploadOptions.single('image'), async (req, res) => {

    const business = await Business.findById(req.params.id);
    if (!business) {
        return res.status(400).send('Invalid Business!');
    }

    let categoriesResolved = [];
    if (req.body.categories.length > 2) {
        const categoriesArray = req.body.categories.substr(1, req.body.categories.length - 2).split(",");
        const formattedCategoriesArray = categoriesArray.map(category => {
            return category.substr(1, category.length - 2)
        })

        standardizedCategories = formattedCategoriesArray.map(category => {
            return category.substr(0, 1).toUpperCase() + category.substr(1).toLowerCase();
        })

        const categories = Promise.all(standardizedCategories.map(async category => {
            let checkCategory = await Category.findOneAndUpdate(
                { "name": category },
                {  },
                { upsert: true, new: true }
            )

            return mongoose.Types.ObjectId(checkCategory._id);
        }))

        categoriesResolved = await categories;
    }

    const file = req.file;
    let imagePath;
    
    if (file) {
        const fileName = file.filename
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        imagePath = `${basePath}${fileName}`;
    } else {
        imagePath = business.coverImage
    }

    const updatedBusiness = await Business.findByIdAndUpdate(
        mongoose.Types.ObjectId(req.params.id),
        {
            coverImage: imagePath,
            name: req.body.name,
            fullAddress: req.body.fullAddress,
            addressPrimaryText: req.body.addressPrimaryText,
            addressSecondaryText: req.body.addressSecondaryText,
            addressPlaceId: req.body.addressPlaceId,
            delivery: req.body.delivery,
            pickup: req.body.pickup,
            categories: categoriesResolved,
        },
        { new: true }
    )

    if (!updatedBusiness) {
        return res.status(400).send('the business cannot be updated!')
    }

    res.send(updatedBusiness);
})

router.delete('/:id', (req, res) => {
    Business.findByIdAndRemove(req.params.id).then(business => {
        if (business) {
            return res.status(200).json({ success: true, message: 'the business is deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "business not found!" })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
    })
})

module.exports = router;