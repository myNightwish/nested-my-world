import development from './env.development';
import production from './env.production';

const configs = {
  development,
  production,
};

const env = configs[process.env.NODE_ENV || 'development'];
export { env };
