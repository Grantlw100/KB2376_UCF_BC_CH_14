const router = require("express").Router();

const {
    GetUsers,
    GetUser,
    CreateUser,
    PutUser,
    DeleteUser,
    newFriend,
    deleteFriend
} = require("../../controllers/UserController");

router.route("/").get(GetUsers).post(CreateUser);

router.route("/:id").get(GetUser).put(PutUser).delete(DeleteUser);

router.route("/:userId/friends/:friendId").post(newFriend).delete(deleteFriend);

module.exports = router;