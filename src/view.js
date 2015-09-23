import React from 'react';
import classNames from 'classnames';

export default class extends React.Component {
  static propTypes = {
    items: React.PropTypes.array,
    selectedItemId: React.PropTypes.number,
    onItemSelect: React.PropTypes.func.isRequired
  };

  onItemSelect(itemId, ev) {
    ev.preventDefault();
    this.props.onItemSelect(itemId);
  }

  renderListItem(item) {
    const className = classNames({
      'list-group-item': true,
      'active': item.id === this.props.selectedItemId
    });

    const badge = (item.type !== 'story') ? <span className="badge">{item.type}</span> : null;
    return (
      <a key={item.id}
         href={`https://news.ycombinator.com/item?id=${item.id}`}
         className={className}
         onClick={this.onItemSelect.bind(this, item.id)}
      >
        {badge}
        {item.title}
      </a>
    );
  }

  renderList() {
    if (!this.props.items) {
      return;
    }
    return (
      <div className="list-group">
        {this.props.items.map(this.renderListItem.bind(this))}
      </div>
    );
  }

  renderDetails() {
    const item = this.props.items.find(item => item.id === this.props.selectedItemId);
    return (
      <article>
        <h1>#{item.id}: {item.title}</h1>
        <p><em>Posted at {new Date(item.time * 1000).toLocaleString()} by {item.by}.</em></p>
        <p>
          This post has <strong>{item.score}</strong> points and
          contains <strong>{item.descendants}</strong> comments.
        </p>
        {item.url && <h4><a href={item.url}>{item.url}</a></h4>}
        {item.text && <div>{item.text}</div>}
        <hr />
        <p>
          <a className="btn btn-primary btn-small" href={`https://news.ycombinator.com/item?id=${item.id}`}>
            Open on news.ycombinator.com.
          </a>
        </p>
      </article>
    );
  }

  render() {
    if (!this.props.items) {
      return (
        <div className="container-fluid text-center">
          <p>Loading...</p>
        </div>
      );
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4">
            {this.renderList()}
          </div>
          <div className="col-sm-8">
            {this.renderDetails()}
          </div>
        </div>
      </div>
    );
  }
}