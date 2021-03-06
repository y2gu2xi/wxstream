import xs from '../lib/xstream/index'

const SIZE = {
  ORIGINAL: ['original'],
  COMPRESSED: ['compressed'],
  BOTH: ['original', 'compressed']
}

const SOURCE = {
  ALBUM: ['album'],
  CAMERA: ['camera'],
  BOTH: ['album', 'camera']
}

let image =  {
  SIZE: SIZE,
  SOURCE: SOURCE
}

image.choose = (count=9, size=SIZE.BOTH, soure=SOURCE.BOTH) => {
  const producer = {
    start: listener => {
      wx.chooseImage({
        count: count,
        sizeType: size,
        sourceType: soure,
        success: res => listener.next(res),
        fail: res => listener.error(new Error(res.errMsg)),
        complete: () => listener.complete()
      })
    },
    stop: () => {}
  }
  return xs.create(producer)
}

image.preview = (urls=[], current='') => {
  const producer = {
    start: listener => {
      wx.previewImage({
        current: current,
        urls: urls,
        success: res => listener.next(res),
        fail: res => listener.error(new Error(res.errMsg)),
        complete: () => listener.complete()
      })
    },
    stop: () => {}
  }
  return xs.create(producer)
}

image.info = (src='') => {
  const producer = {
    start: listener => {
      wx.getImageInfo({
        src: src,
        success: res => listener.next(res),
        fail: res => listener.error(new Error(res.errMsg)),
        complete: () => listener.complete()
      })
    },
    stop: () => {}
  }
  return xs.create(producer)
}

module.exports = {
  image: image
}