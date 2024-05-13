export const modeList = {
  mode: 'product',
  urlList: [
    {
      env: '开发环境',
      mode: 'development',
      baseUrl: 'https://amp-devi.resthour.net',
      imgUrl: 'https://amp-dev.oss-cn-hangzhou.aliyuncs.com'
    },
    {
      env: '测试环境',
      mode: 'test',
      baseUrl: 'https://test-api.woxiangzhu.com.cn',
      imgUrl: 'https://amp-test1.oss-cn-hangzhou.aliyuncs.com'
    },
    {
      env: 'uat环境',
      mode: 'uat',
      baseUrl: 'http://192.168.2.226:9201',
      imgUrl: 'https://amp-test1.oss-cn-hangzhou.aliyuncs.com'
    },
    {
      env: '正式环境',
      mode: 'product',
      baseUrl: 'https://api.woxiangzhu.com.cn',
      imgUrl: 'https://amp-prod.oss-cn-hangzhou.aliyuncs.com'
    },
    {
      env: '自定义环境',
      mode: 'custom',
      baseUrl: 'http://192.168.2.223:9201',
      imgUrl: 'https://amp-dev.oss-cn-hangzhou.aliyuncs.com'
    }
  ]
}
