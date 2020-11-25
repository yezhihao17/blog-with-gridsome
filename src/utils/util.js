export default {
  // s<=r<e
  randomInt (s, e) {
    let d = e - s
    if (d < 0) {
        return s
    }
    let r = Math.random() * d + s
    r = parseInt(r, 10)
    return r
  },

  formatTime(time) {
    let it = parseInt(time)
    let m = parseInt(it / 60)
    let s = parseInt(it % 60)

    return (m < 10 ? '0' : '') + parseInt(it / 60) + ':' + (s < 10 ? '0' : '') + parseInt(it % 60)
  },

  addHttp(url){
    return (url.match(/https?:\/\//i) ? '' : 'https://') + url
  }
}
