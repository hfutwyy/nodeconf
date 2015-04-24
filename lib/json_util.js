/**
 * @file JSON文件读取与解析通用方法
 * @author weiyanyan(weiyanyan@baidu.com)
 */
var fs = require('fs');

// 方法导出
var jsonUtil = exports;

/**
 * 解析Json文件，并返回结果
 *
 * @param {string} filePath 文件路径
 * @param {string=} encoding 文件编码
 * @return {Object} 解析结果
 */
jsonUtil.parseFile = function (filePath, encoding) {
    encoding = encoding || 'utf8';
    var fileContent = fs.readFileSync(filePath, encoding);

    return JSON.parse(fileContent);
};