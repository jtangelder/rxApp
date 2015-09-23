import { EventEmitter } from 'events';
import Rx from 'rx';
import React from 'react';
import RootView from './view';
import { getTopStories, getItemById } from './api';

const eventEmitter = new EventEmitter();

const selectItemStream = Rx.Observable.fromEvent(eventEmitter, 'select', itemId => itemId)
    .startWith(null);

const itemsStream = Rx.Observable.fromPromise(getTopStories())
    .map(itemIds => itemIds.filter((item, index)=> index < 15))
    .flatMap(itemIds => Promise.all(itemIds.map(getItemById)))
    .map(items => items.filter(item => !item.deleted))
    .startWith(null);

const stateStream = Rx.Observable.combineLatest(itemsStream, selectItemStream);
stateStream.subscribe(([items, selectedItemId])=> {
  if (selectedItemId === null && items && items.length) {
    selectedItemId = items[0].id;
  }

  React.render(
      <RootView
          items={items}
          selectedItemId={selectedItemId}
          onItemSelect={itemId => eventEmitter.emit('select', itemId)}
      />,
      document.querySelector('#app'));
});