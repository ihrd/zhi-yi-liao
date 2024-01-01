'use strict';  

exports.main = async (event, context) => {  
    //event为客户端上传的参数  
    console.log('event : ', event)   
    const {  
        data: {  
            choices  
        },  
        status,  
        statusText  
    } = await uniCloud.httpclient.request('https://api.openai-proxy.com/v1/completions', {  
        method: 'POST',  
        data: {
            model: "text-davinci-003",  
            prompt: `input:${"你是一个妇产科医生，我下面要问你问题！" + event.body}?  
      output:`,  
            max_tokens: 300,  
            temperature: 0.6,  
            stop: ['output:']  
        },  
        headers: {  
            Authorization: `Bearer ${'sk-VlwygUGI2CEDFoEPEMRNT3BlbkFJFUmxG3TXyFQ2cWHoOq'}`  
        },  
        timeout: 10000,  
        contentType: 'json', // 指定以application/json发送data内的数据  
        dataType: 'json' // 指定返回值为json格式，自动进行parse  
    })  
    //返回数据给客户端  
    return {  
        data: choices,  
        errCode: status,  
        errMsg: statusText  
    }  
};