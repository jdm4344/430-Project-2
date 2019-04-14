const models = require('../models');

const Post = models.Post;

const makerPage = (req, res) => {
  Post.PostModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), posts: docs });
  });
};

const makePost = (req, res) => {
  if (!req.body.title || !req.body.content) {
    return res.status(400).json({ error: 'Both title and content are required' });
  }

  const postData = {
    title: req.body.title,
    content: req.body.content,
    ownerName: req.session.account.username,
    owner: req.session.account._id,
  };

  const newPost = new Post.PostModel(postData);

  const postPromise = newPost.save();

  postPromise.then(() => res.json({ redirect: '/maker' }));

  postPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Post with this title already exists' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return postPromise;
};

const editPage = (req, res) => {
    
};

const editPost = (req, res) => {
  if (!req.body.title || !req.body.content) {
    return res.status(400).json({ error: 'Both title and content are required' });
  }


};

module.exports.makerPage = makerPage;
module.exports.make = makePost;
module.exports.editPage = editPage;
module.exports.editPost = editPost;
