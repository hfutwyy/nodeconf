/**
 * @file 配置存储
 * @author weiyanyan(weiyanyan@baidu.com)
 */

// 存储配置信息
var configStorage = {};
var storage = exports;

/**
 * 配置文件路径作为Key对应的其值
 *
 * @param {string} filePathKey 配置文件生成的相应 Key
 * @param {Object} configValues 配置值
 */
storage.set = function (filePathKey, configValues) {
    configStorage[filePathKey] = configValues;
};

/**
 * 判断文件配置键是否已经存在
 *
 * @param {string} filePathKey 配置文件生成的相应 Key
 * @return {boolean} 存在返回true，不存在返回false
 */
storage.hasKey = function (filePathKey) {
    return configStorage.hasOwnProperty(filePathKey);
};

/**
 * 获取特定配置键对应的值
 *
 * @param {string} filePathKey 配置文件生成的相应 Key
 * @param {string} configKey 要获取的值
 * @return {object|string} 配置信息
 */
storage.get = function (filePathKey, configKey) {
    if (this.hasKey(filePathKey)) {
        return configStorage[filePathKey][configKey];
    }
    else {
        throw new Error('读取不存在的文件配置:' + filePathKey);
    }
};

/**
 * 相应的文件是否已缓存
 *
 * @param {string} filePathKey 配置文件生成的相应 Key
 * @return {boolean} 已缓存为true,否则为false
 */
storage.isFileCached = function (filePathKey) {
    return this.hasKey(filePathKey);
};