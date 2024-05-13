export function getUserMedia(
  constraints: MediaStreamConstraints
): Promise<undefined | MediaStream> {
  return new Promise((resolve, reject) => {
    let count = 5
    const catchFn = (err) => {
      if (count <= 0) return reject(err)
      console.error('第', 5 - count + 1, '次尝试重新加载')
      count--
      getMedia()
    }
    const getMedia = () => {
      getStream(constraints)
        .then((res) => resolve(res))
        .catch(() => setTimeout(catchFn, 200))
    }
    getMedia()
  })
}

const getStream = (config): Promise<MediaStream> => {
  return new Promise((resolve, reject) => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error(
        '系统没有找到获取视频流的方法 !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia'
      )
      return
    }
    navigator.mediaDevices
      .getUserMedia(config)
      .then(function (stream) {
        resolve(stream)
      })
      .catch((err) => {
        reject(err)
        console.log('获取视频流失败', err)
      })
  })
}

export function setVideoStream(videoDom: HTMLVideoElement, stream: MediaStream) {
  if (!videoDom) {
    stream.getTracks().forEach((tack) => tack.stop())
    return
  }
  videoDom.srcObject = stream
  videoDom.onloadedmetadata = function () {
    videoDom.play()
    videoDom.onloadedmetadata = null
  }
  return true
}

export function setVideoStreamPromise(
  videoDom: HTMLVideoElement,
  stream: MediaStream
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (!videoDom) {
      stream.getTracks().forEach((tack) => tack.stop())
      reject(false)
      return
    }
    videoDom.srcObject = stream
    videoDom.onloadedmetadata = function () {
      videoDom.play()
      videoDom.onloadedmetadata = null
      resolve(true)
    }
  })
}

export function removeMediaDom(videoDom: HTMLVideoElement | HTMLAudioElement | null) {
  if (!videoDom) return
  videoDom.pause()
  // @ts-ignore
  videoDom.srcObject?.getTracks().forEach((tack) => tack.stop())
  videoDom.srcObject = null
  videoDom.removeAttribute('srcObject')
  videoDom.removeAttribute('src')
  videoDom.load()
  videoDom.onloadedmetadata = null
  videoDom.remove()
  videoDom = null
}
