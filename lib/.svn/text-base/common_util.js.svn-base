/**
 * @file nodeconf通用方法
 * @author weiyanyan(weiyanyan@baidu.com)
 */
var path = require('path');
var fs = require('fs');

var commUtil = exports;

/**
 * 获取绝对路径
 *
 * @param {string} filePath 文件路径，当不存在时，获取当前目录的绝对路径
 * @return {string} 文件绝对路径
 */
commUtil.getAbsolutePath = function (filePath) {
    return path.resolve(filePath || './');
};

 /**
 * 判断文件是否存在（当传入文件夹时，返回假）
  *
 * @param {string} filePath 文件路径
 * @return {boolean} 成功返回true,否则返回false
 */
commUtil.isFileExists = function (filePath) {
    if (!filePath) {
        return false;
    }
    var existsRes = fs.existsSync(filePath);
    if (!existsRes) {
        return false;
    }
    // 当为文件夹时返回false
    var stat = fs.lstatSync(filePath);

    return !stat.isDirectory();
};

/**
 * 获取文件扩展名
 *
 * @param {string} filePath 文件路径
 * @return {boolean|string} 失败返回false,成功返回文件扩展名
 */
commUtil.getFileExtension = function (filePath) {
    // 判断文件是否存在，不存在时返回false
    if (!this.isFileExists(filePath)) {
        return false;
    }

    return path.extname(filePath);
};

/**
 * 监控文件变化
 *
 * @param {string} filePath 文件路径
 * @param {Function} onChangeCallback 变化时回调函数
 * @return {boolean} 监控成功返回true,否则返回false
 */
commUtil.attachFileMonitor = function (filePath, onChangeCallback) {
    if (!this.isFileExists(filePath) || typeof onChangeCallback !== 'function') {
        return false;
    }
    // 进行文件检测
    fs.watch(filePath, onChangeCallback);

    return true;
};
