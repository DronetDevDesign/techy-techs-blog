const router = require('express').Router();
const { Comment } = require('../../models');


// =========== GET ALL COMMENTS ===========
router.get('/', (req, res) => {
  Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// =========== CREATE A NEW COMMENT ===========
router.post('/', (req, res) => {
  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.session.user_id,
    post_id: req.body.id
  })
    .then(dbCommentData => {
      res.redirect(`/post/${req.body.id}`)
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});


// =========== DELETE A COMMENT WITH THE ID OF: ===========
router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No comment found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;