import React from 'react';
import classNames from 'classnames';

export default class extends React.Component {
  static propTypes = {
    items: React.PropTypes.array,
    selectedItemId: React.PropTypes.number,
    onItemSelect: React.PropTypes.func
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
    console.log(item);
    return (
      <a key={item.id} href="#" className={className}
         onClick={this.onItemSelect.bind(this, item.id)}
      >
        <span className="badge">{item.kids.length}</span>
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
    if (!this.props.selectedItemId) {
      return <p>Pick an item.</p>;
    }

    const item = this.props.items.find(item => item.id === this.props.selectedItemId);
    return (
      <article>
        <h1>#{item.id}: {item.title}</h1>
        <p><em>Posted at {new Date(item.time * 1000).toLocaleString()} by {item.by}.</em></p>
        {item.url && <p><a href={item.url}>{item.url}</a></p>}
        {item.text && <div>{item.text}</div>}
      </article>
    );
  }

  render() {
    if (!this.props.items) {
      return (
        <div className="container-fluid">
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