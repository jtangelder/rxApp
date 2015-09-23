function getJSON(jsonFile) {
  return window.fetch(`https://hacker-news.firebaseio.com/v0/${jsonFile}`)
      .then(response => response.json());
}

export function getTopStories() {
  return getJSON('topstories.json');
}

export function getItemById(itemId) {
  return getJSON(`item/${itemId}.json`);
}