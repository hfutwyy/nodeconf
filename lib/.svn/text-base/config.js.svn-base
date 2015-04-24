/**
 * @file Node.js配置文件读取类
 *       1.支持json及ini类型文件解析及读取
 *       2.相同路径的配置文件内存中缓存，避免不必要的文件IO
 *       3.支持文件变动时热加载
 *       4.支持文件变动时回调
 * @author weiyanyan(weiyanyan@baidu.com)
 */
var fs = require('fs');
var configStorage = require('./common_util.js');
var jsonUtil   = require('./json_util.js');
var iniUtil    = require('./ini_util.js');
var storage    = require('./storage.js');

/**
 * 配置管理类构造函数
 *
 * @param {string} filePath 要读取的配置文件地址
 * @param {boolean=} isReloadOnChange 配置文件变化时是否自动重新加载文件
 * @param {Function=} changeCallback  配置文件变化时工作进程回调函数(不传此参数时不回调工作进程)
 * @class
 */
function Config(filePath, isReloadOnChange, changeCallback) {

    // 由filepath，计算绝对路径，并判断文件是否存在
    this.absolutePath = configStorage.getAbsolutePath(filePath);
    var isConfigFileExists = configStorage.isFileExists(this.absolutePath);
    if (!isConfigFileExists) {
        // 文件不存在异常
        throw new Error('传入的配置文件不存在.');
    }

    // 配置文件变化时，是否重新加载配置文件
    this.isReloadOnChange = !!isReloadOnChange;
    if (this.isReloadOnChange) {
        // 保存this指针,便于文件变动回调函数使用
        var self = this;
        fs.watch(this.absolutePath, function (event) {
            if (event === 'change') {
                var configs = self.parseConfigFile(self.absolutePath);
                storage.set(self.storageKey, configs);
            }
        });
    }

    // 配置文件变化时，工作进展回调函数
    if (typeof changeCallback === 'function') {
        var monitorRes = configStorage.attachFileMonitor(this.absolutePath, changeCallback);
        if (!monitorRes) {
            throw new Error('对文件:' + this.absolutePath + ',添加监控错误.');
        }
    }

    // 根本传入的配置文件路径，变化时是否重新加载构造存储时对应的Key
    this.storageKey = this.generateStorageKey();
    // 当已经将配置信息读取之后，再次读取时，会直接走内存缓存
    if (!storage.isFileCached(this.storageKey)) {
        var configs = this.parseConfigFile(this.absolutePath);
        storage.set(this.storageKey, configs);
    }
}

/**
 * 根据配置文件绝对路径、变动时是否重新加载，生成存储时对应的唯一Key
 *
 * @return {string} 生成的唯一key
 */
Config.prototype.generateStorageKey = function () {
    return [this.absolutePath, '*', this.isReloadOnChange].join('_');
};

/**
 * 解析配置文件信息
 *
 * @param {string} filePath 要读取的配置文件地址
 * @return {Object} 配置结果
 */
Config.prototype.parseConfigFile = function (filePath) {
    // 根据文件扩展名，解析不同类型文件
    var fileExtension = configStorage.getFileExtension(filePath).toLowerCase();

    switch (fileExtension) {

        case '.ini':
            return iniUtil.parseFile(filePath);
            break;

        case '.json':
            return jsonUtil.parseFile(filePath);
            break;

        default :
            throw new Error('不支持的配置文件类型' + fileExtension + ',只支持.json及.ini类型配置文件.');

    }
};

/**
 * 根据配置键获取值
 *
 * @param {string} configKey 配置项key
 * @return {Object|string} 配置项值
 */
Config.prototype.getConfig = function (configKey) {
    return storage.get(this.storageKey, configKey);
};

exports.Config = Config;