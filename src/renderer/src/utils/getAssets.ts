const rootPath = '../assets/'

type GlobData = () => Promise<{ default: unknown }>

const assetsInfo = {
  image: import.meta.glob('../assets/image/*') as Recordable<string, GlobData>,
  audio: import.meta.glob('../assets/audio/*') as Recordable<string, GlobData>,
  animation: import.meta.glob('../assets/animation/*') as Recordable<string, GlobData>
}

type AssetsType = keyof typeof assetsInfo

const getAssetsData = <T = unknown>(
  type: AssetsType,
  name: string,
  lang: string,
  mime: string
): Promise<T> => {
  const filePath = rootPath + type + '/' + name + '.' + mime
  const langPath = rootPath + type + '/' + lang + '-' + name + '.' + mime
  const fn = assetsInfo[type][langPath] || assetsInfo[type][filePath]
  return fn ? fn().then((res) => res.default as T) : Promise.reject()
}

export const getAnimationData = (name: string, lang = '', mime = 'json') => {
  return <Promise<object>>getAssetsData('animation', name, lang, mime)
}

export const getAudioData = (name: string, lang = '', mime = 'wav') => {
  return <Promise<string>>getAssetsData('audio', name, lang, mime)
}

export const getImageData = (name: string, lang = '', mime = 'png') => {
  return <Promise<string>>getAssetsData('image', name, lang, mime)
}
