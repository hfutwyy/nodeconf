/**
 * @file CommUtil文件单测
 * @author weiyanyan(weiyanyan@baidu.com)
 */
var CommUtil = require('../lib/common_util.js');
var assert   = require('assert');
var path = require('path');

// 常量定义--INI配置文件路径
var TEST_INI_FILE_PATH = './data/inidemo.ini';
// 常量定义--不存在的INI配置文件路径
var TEST_INI_NOT_EXISTS_PATH = './data/inidemonotexists.ini';

/**
 * Mock Path类resolve方法
 *
 * @param {string} mockReturn Mock返回结果
 */
function mockPathResolve(mockReturn) {
    path.resolve = function () {
        return mockReturn;
    };
}

/**
 * @file 测试获取文件绝对路径
 * @author weiyanyan(weiyanyan@baidu.com)
 */
function testGetAbsolutePath() {
    var myPath = TEST_INI_FILE_PATH;
    var absolutePath = CommUtil.getAbsolutePath(myPath);
    assert.notEqual(absolutePath, '');

    var mockPath = TEST_INI_NOT_EXISTS_PATH;
    mockPathResolve(mockPath);

    absolutePath = CommUtil.getAbsolutePath(myPath);
    assert.equal(absolutePath, mockPath);
}

/**
 * 判断文件是否存在
 */
function testIsFileExists() {
    // 文件存在
    var isFileRes = CommUtil.isFileExists(TEST_INI_FILE_PATH);
    assert.equal(isFileRes, true);

    // 文件不存在
    isFileRes = CommUtil.isFileExists(TEST_INI_NOT_EXISTS_PATH);
    assert.notEqual(isFileRes, true);

    // 传入文件夹路径
    isFileRes = CommUtil.isFileExists('./data/');
    assert.equal(isFileRes, false);
}

/**
 * 获取文件扩展名
 */
function testGetFileExtension() {
    // 能获取到扩展名
    var isFileRes = CommUtil.getFileExtension(TEST_INI_FILE_PATH);
    assert.equal(isFileRes, '.ini');

    // 调用方法时传入异常
    isFileRes = CommUtil.getFileExtension();
    assert.equal(isFileRes, false);

    // 调用方法时传入文件夹
    isFileRes = CommUtil.getFileExtension('./');
    assert.equal(isFileRes, false);

    // 调用方法时传入文件未带扩展名（会返回空串）
    isFileRes = CommUtil.getFileExtension('./data/otherdemo');
    assert.equal(isFileRes, '');
}

// 调用测试方法
testGetAbsolutePath();
testIsFileExists();
testGetFileExtension();
