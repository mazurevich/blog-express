//backbone views
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
}


var PostLinkView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#postLink-tmp').html()),
  events: {
    'click a': 'handleClick'
  },

  handleClick: function(e){
    e.preventDefault();
    postRouter.navigate($(e.currentTarget).attr('href'), {trigger: true});
  },

  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

var PostListsView = Backbone.View.extend({
  template: _.template($('#postLinks-tmp').html()),

  events:{
    'click .js-newPost': 'handleClick'
  },

  handleClick: function(){
    postRouter.navigate('posts/new', {trigger: true});
  },

  render: function(){
    this.$el.html( this.template());
    var ul = this.$el.find('ul');

    _.each(this.collection.toArray(), function(post){

      console.log(post);
      ul.append(new PostLinkView({
        model: post
      }).render().el);

    });
    return this;
  }
});

var PostView = Backbone.View.extend({
  
  template: _.template($('#postView-tmp').html()),
  
  events: {
    'click a': 'handleClick'
  },
  
  render: function(){
    var model = this.model.toJSON();

    model.pubDate = moment(model.pubDate).utc().format('DD/MM/YYYY hh:mm');
    this.$el.html(this.template(model));
    return this;
  },

  handleClick: function(e){
    e.preventDefault();
    postRouter.navigate($(e.currentTarget).attr('href'), {trigger: true});
    return false;
  }
});

var PostFormView = Backbone.View.extend({
  tagName: 'form',
  template: _.template($('#postFormView').html()),
  initialize: function(options){
    this.posts = options.posts;
  },
  events: {
    'click button': 'createPost'
  },
  render: function(){
    this.$el.html(this.template());
    return this;
  },
  createPost: function(e){
    var postAttrs = {
      id: this.getFreeId()+1,
      title : $('#postTitle').val(),
      content : $('#postText').val(),
      pubDate: new Date()
    }
    
    this.posts.create(postAttrs);
    this.posts.sync();
    postRouter.navigate('/', {trigger: true});
    return false;
  },

  getFreeId: function(){
    return Math.max(this.posts.toArray().map(function(e){
      return e.id;
    }))
    
  }
})