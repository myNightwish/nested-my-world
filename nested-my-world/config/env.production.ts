export default {
  // 服务基本配置
  SERVICE_CONFIG: {
    // 端口
    port: 9876,
  },

  // 数据库配置
  DATABASE_CONFIG: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root1234',
    database: '用户身份系统',
    autoLoadEntities: true,
    synchronize: true,
  },
};
