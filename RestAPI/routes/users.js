const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt")

//update user
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        // if user wants to update password then we will create its hash then update the req.body.password then our db is further updated below
        if (req.body.password) {
            try {
                req.body.password = await bcrypt.hash(req.body.password, 10)
            } catch (error) {
                res.status(500).json(error)
            }
        } 
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            })
            res.status(200).json("Account Updated")
            } catch (error) {
            res.status(500).json(error)
            }
    } else {
        res.status(403).json("you can update only your account")
    }
})
//delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete({ _id: req.params.id })
            res.status(200).json("Account deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("you can delete only your account")
    }
})
//get a user
// we will use query ie lh:3000/users?username=anjali
// or
// lh:3000/users?userId=2837298489739
router.get("/", async (req, res) => {
    const userId = req.query.userId
    const username = req.query.username
    try {
        const user = userId ? await User.findOne({_id:userId}) : await User.findOne({ username: username })
        // below line means that we are extracting password and updatedAt from user where user._doc means user is an object from mongoose document .then by writting ...other means we are copying other remaining properties from "user" to "other" 
        const { password, updatedAt, ...other } = user._doc
        !user && res.status(404).json("user not found")
        res.status(200).json(other)
    } catch (error) {
        res.status(500).json(error)
    }
})
//follow a user
router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            // we are currentUser and who we want to follow is user .If we are already in their follower list then it will say "you already follow this user"
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({
                    $push: { followers: req.body.userId }
                })
                await currentUser.updateOne({
                    $push: { following: req.params.id }
                })
                res.status(200).json("You are following that user")
            } else {
                res.status(403).json("You already follow this user")
            }

        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("You cant follow yourself")
    }
})
//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            // we are currentUser and who we want to unfollow is user .If we are not in their follower list then it will say "you already dont follow this user"
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({
                    $pull: { followers: req.body.userId }
                })
                await currentUser.updateOne({
                    $pull: { following: req.params.id }
                })
                res.status(200).json("You have unfollowed that user")
            } else {
                res.status(403).json("You dont follow this user")
            }

        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("You cant unfollow yourself")
    }
})
//get friends
router.get("/friends/:userId",async(req,res)=>{
    try {
        const user=await User.findById(req.params.userId)
        const friends= await Promise.all(
            user.following.map(friendId=>{
                return User.findById(friendId)
            })
            
        )
        let friendList=[];
        friends.map(friend=>{
            const{_id,username,profilePicture}=friend
            friendList.push({_id,username,profilePicture})
        })
        res.status(200).json(friendList)

    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router