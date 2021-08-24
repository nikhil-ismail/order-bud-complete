const { Order } = require('../models/order');
const { OrderItem } = require('../models/order-item');
const { Product } = require('../models/product');
const { Friend } = require('../models/friend');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get(`/:userId`, async (req, res) => {
    const orderList = await Order.find({ "user": mongoose.Types.ObjectId(req.params.userId) })
        .populate({
            path: 'orderItems',
            populate: {
                path: 'product',
                select: {
                    'name': 1,
                    'price': 1
                }
            }
        })
        .populate('user', 'name')
        .populate('business', {
            coverImage: 1,
            name: 1,
            ratings: 1,
            reviewCount: 1
        })

    if (!orderList) {
        res.status(500).json({ success: false })
    }

    res.send(orderList);
})

router.get(`/:friendId`, async (req, res) => {
    const orderList = await Order.find({ "user": mongoose.Types.ObjectId(req.params.friendId) })
        .populate({
            path: 'orderItems',
            populate: {
                path: 'product',
                select: {
                    'name': 1,
                    'price': 1
                }
            }
        })
        .populate('user', 'name')
        .populate('business', {
            coverImage: 1,
            name: 1,
            ratings: 1,
            reviewCount: 1

        })

    if (!orderList) {
        res.status(500).json({ success: false })
    }

    res.send(orderList);
})

router.get(`/friendOrders/:userId`, async (req, res) => {
    Friend.aggregate([
        {
            $match: {
                $and: [
                    {
                        $or: [
                            {
                                "requester": mongoose.Types.ObjectId(req.params.userId)
                            },
                            {
                                "recipient": mongoose.Types.ObjectId(req.params.userId)
                            }
                        ]
                    },
                    {
                        "status": "friends"
                    }
                ]
            },
        },
        {
            $project: {
                _id: 0,
                friendId: {
                    $cond: {
                        if: { "$eq": ["$requester", mongoose.Types.ObjectId(req.params.userId)]},
                        then: "$recipient",
                        else: "$requester"
                    }
                }
            }
        }
    ])
    .exec(async (err, friends) => {
        if (err) {
            return res.status(500).send({ msg: "Unable to find user's friends" });
        }

        friendList = []
        friends.forEach(friend => {
            friendList.push(friend.friendId)
        })

        const orders = await Order.find({'user': { $in: friendList } })
        .populate({
            path: 'orderItems',
            populate: {
                path: 'product',
                select: {
                    'name': 1,
                    'price': 1
                }
            }
        })
        .populate('user', 'name')
        .populate('business', {
            coverImage: 1,
            name: 1,
            ratings: 1,
            reviewCount: 1
        })
        .sort({date: -1})


        return res.status(200).send(orders)
    })
})

router.get('/business/:businessId', async (req, res) => {
    const orders = await Order.find({ "business": mongoose.Types.ObjectId(req.params.businessId) })
        .populate({
            path: 'orderItems',
            populate: {
                path: 'product',
                select: {
                    'name': 1,
                    'image': 1,
                    'price': 1
                }
            }
        })
        .populate('user', {
            'name': 1,
            'email': 1,
            'phone': 1
        })
        .sort({ _id: 1 })

    if (!orders) {
        return res.status(400).send('the order cannot be created!')
    }

    const salesVolume = orders.length > 0 ?
        orders.map(order => order.totalPrice)
            .reduce((accumulator, currValue) => accumulator + currValue) : 0.00;
    const orderVolume = orders.length;

    res.send({ orders, salesVolume, orderVolume });
})

router.post('/', async (req, res) => {
    const orderItemsIds = Promise.all(req.body.order.orderItems.map(async (orderItem) => {
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: mongoose.Types.ObjectId(orderItem.id)
        })

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }))

    const orderItemsIdsResolved = await orderItemsIds;

    let order = new Order({
        business: mongoose.Types.ObjectId(req.body.order.business),
        orderItems: orderItemsIdsResolved,
        shippingAddress1: req.body.order.shippingAddress1,
        phone: req.body.order.phone,
        isDelivery: req.body.order.isDelivery,
        totalPrice: req.body.order.totalPrice,
        totalQuantity: req.body.order.totalQuantity,
        user: mongoose.Types.ObjectId(req.body.order.user),
    })

    order = await order.save();

    if (!order) {
        return res.status(400).send('the order cannot be created!')
    }

    for (let i = 0; i < req.body.order.orderItems.length; i++) {
        const product = await Product.findById(mongoose.Types.ObjectId(req.body.order.orderItems[i].id))

        await Product.findByIdAndUpdate(
            mongoose.Types.ObjectId(req.body.order.orderItems[i].id),
            {
                countInStock: product.countInStock - req.body.order.orderItems[i].quantity
            },
            { new: true }
        )
    }

    res.send(order);
})

router.put('/rated/:orderId', async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.orderId,
        {
            rated: true
        },
        { new: true }
    )

    if (!order)
        return res.status(400).send('the order cannot be updated!')

    res.send(order);
})

router.put('/:id', async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        mongoose.Types.ObjectId(req.params.id),
        {
            status: req.body.status
        },
        { new: true }
    )

    if (!order)
        return res.status(400).send('the order cannot be update!')

    res.send(order);
})

router.delete('/:id', (req, res) => {
    Order.findByIdAndRemove(req.params.id).then(async order => {
        if (order) {
            await order.orderItems.map(async orderItem => {
                await OrderItem.findByIdAndRemove(orderItem)
            })
            return res.status(200).json({ success: true, message: 'the order is deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "order not found!" })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
    })
})

module.exports = router;