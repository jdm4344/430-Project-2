const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.Post.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Post.make);
  app.get('/browse', mid.requiresSecure, controllers.Browse.displayPosts);
  app.get('/edit', mid.requiresLogin, controllers.Post.editPage);
  app.post('/edit', mid.requiresLogin, controllers.Post.editPost);
  app.get('/account', mid.requiresLogin, controllers.Account.accountPage);
  app.post('/change', mid.requiresLogin, controllers.Account.changePassword);
  app.post('/deletePost', mid.requiresLogin, controllers.Post.deletePost);
  app.get('/', mid.requiresSecure, controllers.Browse.displayPosts);
};

module.exports = router;
