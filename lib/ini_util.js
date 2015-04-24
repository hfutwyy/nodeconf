/**
 * @file JSON文件读取与解析通用方法
 * @author weiyanyan(weiyanyan@baidu.com)
 */
var fs = require('fs');
var iniUtil = exports;

/**
 * 解析Ini文件，并返回结果
 *
 * @param {string} filePath 文件路径
 * @param {string=} encoding 文件编码
 * @return {Object} 配置信息
 */
iniUtil.parseFile = function (filePath, encoding) {
    encoding = encoding || 'utf8';

    var fileContent = fs.readFileSync(filePath, encoding);
    var regex = {
        section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
        param: /^\s*([\w\.\-\_]+)\s*=\s*(.*?)\s*$/,
        comment: /^\s*;.*$/
    };
    var configValue = {};
    var lines = fileContent.split(/\r\n|\r|\n/);
    var section = null;

    lines.forEach(function (line) {
        if (regex.comment.test(line)) {
            return;
        }

        if (regex.param.test(line)) {
            var match = line.match(regex.param);
            if (section) {
                configValue[section][match[1]] = match[2];
            }
            else {
                configValue[match[1]] = match[2];
            }
        }
        else if (regex.section.test(line)) {
            var match = line.match(regex.section);
            configValue[match[1]] = {};
            section = match[1];
        }
        else if (line.length === 0 && section) {
            section = null;
        }

    });

    return configValue;
};