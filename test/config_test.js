/**
 * @file Config文件单测
 * @author weiyanyan(weiyanyan@baidu.com)
 */
var configObj = require('../index.js');
var assert = require('assert');
var fs = require('fs');

/**
 * 测试读取JSON配置文件
 */
function testReadJsonFile() {
    var confObj = new configObj('./data/jsondemo.json');
    var res = confObj.getConfig('key1');
    assert.equal(res, 'abc123');
}

/**
 * 测试读取JSON配置文件
 */
function testReadIniFile() {
    var confObj = new configObj('./data/inidemo.ini');
    var res = confObj.getConfig('iniconfig_url');
    assert.equal(res, 'www.baidu.com');
}

/**
 * 文件变更回调测试
 */
function testChangedCallback() {
    var isCallBackCalled = false;
    // 注册事件
    function fileChanged(event, file) {
        console.log('file changed with Callback.');
        isCallBackCalled = true;
    }
    // 文件变化监控
    var filePath = './data/jsondemo.json';
    var confObj = new configObj(filePath, true, fileChanged);

    // 先写文件key1=abc
    var jsonData = {
        "key1": "abc"
    };
    fs.writeFileSync(filePath, JSON.stringify(jsonData), 'utf8');

    // 重写文件会造成重新加载配置文件，key1=abc123
    jsonData = {
        "key1": "abc123"
    };
    fs.writeFileSync(filePath, JSON.stringify(jsonData), 'utf8');

    // 更改后检查其值
    var res = confObj.getConfig('key1');
    assert.equal(res, 'abc123');

    // 检查回调函数是否被调用（考虑到回调为异步的，故采用Sleep方式检查）
    var ASSERT_SLEEP_COUNT = 5000;
    setTimeout(function() {
        assert.equal(isCallBackCalled, true);
    }, ASSERT_SLEEP_COUNT);

}

// 调用测试方法
testReadIniFile();
testReadJsonFile();
testChangedCallback();
