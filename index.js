/**
 * @file  Node.js配置文件读取类
 *        1.支持json及ini类型文件解析及读取
 *        2.相同路径的配置文件内存中缓存，避免不必要的文件IO
 *        3.支持文件变动时热加载
 *        4.支持文件变动时回调（）
 * @author weiyanyan(weiyanyan@baidu.com)
 */

module.exports = require('./lib/config.js').Config;