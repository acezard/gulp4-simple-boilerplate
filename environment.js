import { argv } from 'yargs'

const isProd = process.env.NODE_ENV === 'PROD' || argv.prod

export default isProd