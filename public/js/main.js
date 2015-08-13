_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
}

var Post = Backbone.Model.extend({});
var Posts = Backbone.Collection.extend({
  model: Post,
  url:"/posts"
});



var PostView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#postLink-tmp').html()),

  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

var PostListsView = Backbone.View.extend({
  template: _.template($('#postLinks-tmp').html()),

  render: function(){
    this.$el.html( this.template());
    var ul = this.$el.find('ul');
    
    _.each(this.collection.toArray(), function(post){
      
      console.log(post);
      ul.append(new PostView({
        model: post
      }).render().el);

    });
    return this;
  }
});

var PostRouter = Backbone.Router.extend({
  initialize: function(options){
    this.posts = options.posts;
    this.main = options.main;
  },
  routes: {
    '': 'index',
    'posts/:id':'singlePost'
  },
  index: function(){
    var pv = new PostListsView({collection: this.posts});
    this.main.html(pv.render().el);
  },

  singlePost: function(id){
    console.log("view post" + id);
  }
});


//application loaded
$(function(){
  var posts = new Posts();
  
  posts.fetch().success(function(){
    var postList = new PostListsView({collection: posts});
    $('#main').append(
      postList.render().el
      );

  })

})