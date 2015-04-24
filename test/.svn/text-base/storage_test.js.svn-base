/**
 * @file storage文件单测
 * @author weiyanyan(weiyanyan@baidu.com)
 */
var storage = require('../lib/storage.js');
var assert = require('assert');


/**
 * 测试设置及读取配置信息
 */
function testSetAndGetConfig() {
    storage.set('filePath1', {key1: 'abc', key2: 'def'});

    var key1Value = storage.get('filePath1', 'key1');
    assert.equal(key1Value, 'abc');

    var key2Value = storage.get('filePath1', 'key2');
    assert.equal(key2Value, 'def');
}

/**
 * 测试文件是否被缓存
 */
function testIsFileCached() {
    storage.set('cachedFilePath', {key1: 'abc', key2: 'def'});

    var cachedRes = storage.isFileCached('cachedFilePath');
    assert.equal(cachedRes, true);

    var notCachedRes = storage.isFileCached('notCachedFilePath');
    assert.notEqual(notCachedRes, true);
}

// 调用测试方法
testSetAndGetConfig();
testIsFileCached();