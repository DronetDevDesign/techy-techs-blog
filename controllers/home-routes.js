const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
  console.log(req.session);
  Post.findAll({
    limit: 5,
    order: [['created_at', 'DESC']],
    // attributes: [
    //   'id',
    //   'title',
    //   'created_at',
    //   'content'
    // ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      // pass a single post object into the homepage template
      res.render('homepage', { posts });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// post detail page
router.get('/post/:id', (req, res) => {
  console.log(req.session);
  Post.findAll({
    limit: 5,
    attributes: [
      'id',
      'title',
      'content',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ],
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      // pass a single post object into the homepage template
      res.render('post', posts[0]);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// LOGIN route:
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


// dashboard route
router.get('/dashboard', (req, res) => {
  const userid = req.session.user_id;
  console.log(req.session);
  console.log(req.session.user_id);
  Post.findAll({
    limit: 5,
    attributes: [
      'id',
      'title',
      'created_at',
      'content'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ],
    where: {
      user_id: userid
    }
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      // pass a single post object into the homepage template
      res.render('dashboard', { posts });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// SIGNUP route:
router.get('/signup', (req, res) => {
  res.render('signup');
});


// EDIT route:
router.get('/dashboard/:id', (req, res) => {
  Post.findAll({
    limit: 5,
    attributes: [
      'id',
      'title',
      'content',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ],
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      // pass a single post object into the homepage template
      res.render('edit', { post_id: req.params.id, ...posts[0] });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.redirect('/')
    });
  }
  else {
    res.redirect('/')
  }
});

module.exports = router;