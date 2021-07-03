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
    
            for (let i = 0; i < friends.length; i++) {
                for (let j = 0; j < userMatches.length; j++) {
                    if (userMatches[j]._id.equals(req.params.userId)) {
                        continue;
                    } else if (friends[i].status === "pending" && friends[i].recipient.equals(userMatches[j]._id)) {
                        userSentRequest.push(userMatches[j])
                    } else if (friends[i].status === "pending" && friends[i].requester.equals(userMatches[j]._id)) {
                        userRecievedRequest.push(userMatches[j])
                    } else if (friends[i].status === "friends" && (friends[i].recipient.equals(userMatches[j]._id) || 
                                friends[i].requestor.equals(userMatches[j]._id))) {
                        userAlreadyFriends.push(userMatches[j])
                    } else {
                        userNoInteraction.push(userMatches[j])
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

module.exports = router;