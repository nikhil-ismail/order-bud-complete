const { User } = require('../models/user');
const { Friend } = require('../models/friend');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/search/:userId', (req, res) => {
    const query = req.query.searchTerm;
    
    User.aggregate([
        {
            $match: {
                $or: [
                    {
                        "name": { $regex: new RegExp(query, "i") },
                    },
                    {
                        "email": { $regex: new RegExp(query, "i") }
                    }
                ]
            }
        },
        {
            $project: {
                name: 1,
                email: 1,
            }
        }
    ])
    .exec((err, userMatches) => {
        if (err) {
            return res.send(500).send({ msg: "Error retrieving users" });
        }
        Friend.aggregate([
            {
                $match: {
                    $or: [
                        {
                            "requester": mongoose.Types.ObjectId(req.params.userId)
                        },
                        {
                            "recipient": mongoose.Types.ObjectId(req.params.userId)
                        }
                    ]
                }
            },
            {
                $project: {
                    requester: 1,
                    recipient: 1,
                    status: 1
                }
            }
        ])
        .exec((err, friends) => {
            if (err) {
                return res.status(500).send("error retrieving friends")
            }

            let userSentRequest = [];
            let userRecievedRequest = [];
            let userAlreadyFriends = [];
            let userNoInteraction = [];

            console.log(friends)
    
            for (let j = 0; j < userMatches.length; j++) {
                for (let i = 0; i < friends.length; i++) {
                    if (userMatches[j]._id.equals(req.params.userId)) {
                        console.log("same user")
                        break;
                    } else if (friends[i].status === "pending" && friends[i].recipient.equals(userMatches[j]._id)) {
                        userSentRequest.push({
                            user: userMatches[j],
                            friendId: friends[i]
                        })
                        break;
                    } else if (friends[i].status === "pending" && friends[i].requester.equals(userMatches[j]._id)) {
                        userRecievedRequest.push({
                            user: userMatches[j],
                            friendId: friends[i]
                        })
                        break;
                    } else if (friends[i].status === "friends" && (friends[i].recipient.equals(userMatches[j]._id) || 
                                friends[i].requester.equals(userMatches[j]._id))) {
                        userAlreadyFriends.push({
                            user: userMatches[j],
                            friendId: friends[i]
                        })
                        break;
                    } else if (i === friends.length - 1) {
                        userNoInteraction.push({
                            user: userMatches[j],
                            friendId: null
                        })
                        break;
                    }
                }
            }

            return res.status(200).send({
                userSentRequest,
                userRecievedRequest,
                userAlreadyFriends,
                userNoInteraction
            })
        })
    })
})

router.post('/addFriend', async (req, res) => {
    const requesterIsUser = await User.findOne({ "_id": mongoose.Types.ObjectId(req.body.requester) });

    if (!requesterIsUser) {
        return res.status(500).send("Provided requester is not a user")
    }

    const recipientIsUser = await User.findOne({ "_id": mongoose.Types.ObjectId(req.body.recipient) });

    if (!recipientIsUser) {
        return res.status(500).send("Provided recipient is not a user")
    }

    let friendship = new Friend({
        requester: mongoose.Types.ObjectId(req.body.requester),
        recipient: mongoose.Types.ObjectId(req.body.recipient),
        status: "pending"
    })

    friendship = await friendship.save();

    if (!friendship) {
        return res.status(500).send("Error occurred creating friend request")
    }

    res.send(friendship);
})

router.put('/acceptFriendRequest', async (req, res) => {

    const friend = await Friend.findById(mongoose.Types.ObjectId(req.body.friendId._id))

    if (!friend) {
        return res.status(500).send("Error occurred accepting friend request")
    }

    const acceptFriendRequest = await Friend.findByIdAndUpdate(
        mongoose.Types.ObjectId(req.body.friendId._id),
        {
            requester: req.body.friendId.requester,
            recipient: req.body.friendId.recipient,
            status: "friends"
        },
        { new: true }
    )

    if (!acceptFriendRequest) {
        return res.status(500).send('An error occurred updating friendship')
    }

    res.send(acceptFriendRequest);
})

module.exports = router;