import { EventEmitter } from 'events';
import Rx from 'rx';
import React from 'react';
import RootView from './view';
import { getTopStories, getItemById } from './api';

const eventEmitter = new EventEmitter();

const selectedItemIdStream = Rx.Observable.fromEvent(eventEmitter, 'select', itemId => itemId)
    .startWith(null);

const itemsStream = Rx.Observable.fromPromise(getTopStories())
    .map(itemIds => itemIds.filter((item, index)=> index < 15))
    .flatMap(itemIds => Promise.all(itemIds.map(getItemById)))
    .map(items => items.filter(item => !item.deleted));

const listStateStream = Rx.Observable.combineLatest(itemsStream, selectedItemIdStream);

listStateStream.subscribe(([items, selectedItemId])=> {
  React.render(
      <RootView
          items={items}
          selectedItemId={selectedItemId}
          onItemSelect={itemId => eventEmitter.emit('select', itemId)}
      />,
      document.querySelector('#app'));
});