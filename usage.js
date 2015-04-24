/**
 * @file 演示如何使用nodeconf
 * @author weiyanyan(weiyanyan@baidu.com)
 */
var Config = require('./');


/**
 * 使用演示--读取.json配置文件
 *
 * @param {string} filePath 文件路径
 * @param {string} configKey 待获取配置Key
 */
function readJsonConfigFile(filePath, configKey) {
    var confJsonObj = new Config(filePath);
    var configValue = confJsonObj.getConfig(configKey);
    console.log('配置结果为:' + configValue);
}

/**
 * 使用演示--读取.ini配置文件
 *
 * @param {string} filePath 文件路径
 * @param {string} configKey 待获取配置Key
 */
function readIniConfigFile(filePath, configKey) {
    var confIniObj = new Config(filePath);
    var configValue = confIniObj.getConfig(configKey);
    console.log('配置结果为:' + configValue);
}

/**
 * 使用演示--读取配置文件，并且当文件修改后重新加载
 * 注：由于在某些IDE（如WebStorm）中直接更改文件，被认为是两次rename，不会触发配置更改
 * 实测：不借助IDE修改文件，及文件直接替换都会触发重新加载
 *
 * @param {string} filePath 文件路径
 * @param {string} configKey 待获取配置Key
 */
function fileChangedReload(filePath, configKey) {
    var confWithReload = new Config(filePath, true);
    var configValue = confWithReload.getConfig(configKey);
    console.log('before change :' + configValue);

    // 延迟调用
    var DELAY_MICROSECOND = 50000;
    setTimeout(function () {
        var confRes = confWithReload.getConfig(configKey);
        console.log('after change : ' + confRes);
    }, DELAY_MICROSECOND);
}

/**
 * 使用演示--文件变更回调
 *
 * @param {string} filePath 文件路径
 * @param {string} configKey 待获取配置Key
 */
function fileChangedCallback(filePath, configKey) {
    function fileChanged(event, file) {
        console.log('file be changed : ' + file);
    }
    var confWithCallback = new Config(filePath, false, fileChanged);
    var configValue = confWithCallback.getConfig(configKey);
    console.log('配置值为：' + configValue);
}