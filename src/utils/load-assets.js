const loadImage = src => new Promise(resolve => {
  const img = new Image()
  img.onload = resolve
  img.onerror = resolve
  img.src = src
})

export default () => Promise.all([
  require('assets/slides/1-browse.png'),
  require('assets/slides/2-manage.png'),
  require('assets/slides/3-edit.png'),
  require('assets/slides/4-customize.png'),
  require('assets/slides/5-send.png'),
].map(loadImage))
