const dayjs = require('dayjs')
const AdvancedFormat = require('dayjs/plugin/customParseFormat')

dayjs.extend(AdvancedFormat)


export default ({}, inject) => {
    inject('dayjs', dayjs);
  }
