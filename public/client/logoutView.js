Shortly.createLogoutView = Backbone.View.extend({
  className: 'logout',

  template: Templates['logout'],

  render: function() {
    document.cookie = "";
    console.log(this.template());
    this.$el.html(this.template());
    return this;
  }
});
