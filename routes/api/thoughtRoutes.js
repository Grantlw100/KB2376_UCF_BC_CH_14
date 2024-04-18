const router = require("express").Router();

const {
    GetThoughts,
    GetThought,
    CreateThought,
    PutThought,
    DeleteThought,
    CreateReaction,
    DeleteReaction
} = require("../../controllers/ThoughtController");

router.route("/").get(GetThoughts).post(CreateThought);

router.route("/:id").get(GetThought).put(PutThought).delete(DeleteThought);

router.route("/:thoughtId/reactions").post(CreateReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(DeleteReaction);

module.exports = router;