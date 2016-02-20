$(document).ready(function() {

  var UserGist = React.createClass({
    getInitialState: function() {
      return {
        username: '',
        lastGistUrl: ''
      };
    },

    componentDidMount: function() {
      this.serverRequest = $.get(this.props.source, function (result) {
        var self = this;
        var lastGist = result[0];
        this.setState({
          username: lastGist.owner.login,
          lastGistUrl: lastGist.html_url
        });

        $.ajax({
          url: '/welcome/comments',
          method: 'get'
        }).done(function(data) {
          self.setState({first_comment: data[0]['comment']});
        });
      }.bind(this));
    },

    componentWillUnmount: function() {
      this.serverRequest.abort();
    },

    render: function() {
      return (
        <div>
          {this.state.username}'s last gist is&nbsp;
          <a href={this.state.lastGistUrl}>here</a>.
          <div class="comments">
            {this.state.first_comment}
          </div>
        </div>
      );
    }
  });

  ReactDOM.render(
    <UserGist source="https://api.github.com/users/octocat/gists" />,
    document.getElementById('content')
  );

  ReactDOM.render(
    <h1>Yes we do. Hello, world!</h1>,
    document.getElementById('example')
  );

});

