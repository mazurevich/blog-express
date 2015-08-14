_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
}

var Post = Backbone.Model.extend({});
var Posts = Backbone.Collection.extend({
  model: Post,
  url:"/posts"
});


// ROUTER
var PostRouter = Backbone.Router.extend({

  initialize: function(options){
    this.posts = options.posts;
    this.main = options.main;
  },

  routes: {
    '': 'index',
    'posts/view/:id': 'singlePost',
    'posts/new': 'newPost'
  },

  index: function(){
    var pv = new PostListsView({collection: this.posts});
    this.main.html(pv.render().el);
  },

  singlePost: function(id){
    console.log("view post" + id);
    var post = this.posts.get(id);
    var pv = new PostView({model: post});
    this.main.html(pv.render().el);
  },

  newPost: function(){
    var newPostForm = new PostFormView({posts: this.posts});
    this.main.html(newPostForm.render().el);
  }
});

//COMMENTS
var Comment = Backbone.Model.extend({});

var Comments = Backbone.Collection.extend({
  initialize: function(models, options){
    this.post = options.post;
  },
  url: function(){
    return this.post.url()+"/comments";
  }
})




var postRouter;

//application loaded
$(function(){
  var posts = new Posts();
  
  posts.fetch().success(function(){

    // var postList = new PostListsView({collection: posts});
    // $('#main').append(
    //   postList.render().el
    //   );|

    postRouter = new PostRouter({
      posts: posts,
      main: $('#main')
    });

    Backbone.history.start({pushState: true});
  });



})