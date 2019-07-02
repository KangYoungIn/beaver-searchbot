//날씨검색을 위한 API KEY 정의
const lat1 = 37.536474; //강영인위도
const long1 = 127.136067;  //강영인경도
const lat2 = 37.511906; //윤지원위도
const long2 = 126.852236; //윤지원경도
const weather_key = "4f4e4dc58fbb0eff96c49739ee97bed3";
const request = require('request');
const bodyparser = require('body-parser');

//날씨정보 수신 기능 정의
function weather1(callback) {
    request(`https://api.darksky.net/forecast/${weather_key}/${lat1},${long1}?lang=ko&units=si`,{json:true},(err,res,body) => {
        if (err) {return console.log(err);}
        var w1 = body.currently.summary
        var w2 = body.currently.temperature + "º"
        var w3 = body.currently.humidity * 100 + "%"
        var weatherValue = "강영인님 집 위치 기준 현재날씨정보입니다." + "\n날씨:" + w1 + "\n기온:" + w2 + "\n습도:" + w3
        callback(weatherValue);
        });
    };

function weather2(callback) {
    request(`https://api.darksky.net/forecast/${weather_key}/${lat2},${long2}?lang=ko&units=si`,{json:true},(err,res,body) => {
        if (err) {return console.log(err);}
        var w1 = body.currently.summary
        var w2 = body.currently.temperature + "º"
        var w3 = body.currently.humidity * 100 + "%"
        var weatherValue = "윤지원님 집 위치 기준 현재날씨정보입니다." + "\n날씨:" + w1 + "\n기온:" + w2 + "\n습도:" + w3
        callback(weatherValue);
        });
    };

function weather3(callback) {
    request(`https://api.darksky.net/forecast/${weather_key}/37.517910,126.990758?lang=ko&units=si`,{json:true},(err,res,body) => {
        if (err) {return console.log(err);}
        var w1 = body.currently.summary
        var w2 = body.currently.temperature + "º"
        var w3 = body.currently.humidity * 100 + "%"
        var w4 = body.daily.summary
        var weatherValue = "서울 날씨 정보입니다." + "\n현재날씨:" + w1 + "\n현재기온:" + w2 + "\n현재습도:" + w3+ "\n일일날씨요약:" + w4
        callback(weatherValue);
        });
    };


//쿼리스플릿
function convert(input) {
    let query = extract(input);
    return "https://www.google.co.kr/search?q=" + query;
}

//const gubun 
function extract(input) {
    		return input.split("구글:")[1]
        	.replace(/(^\s*)|(\s*$)/gi, "")
        	.split(" ")
        	.join("+")
}
	
//네이버 Papago NMT API 예제
//function translate(callback){
//	var express = require('express');
//	var app = express();
//	var client_id = 'qfYtuIdLWEw6wnkT3oRX';
//	var client_secret = '6h6qFyzLzR';
//        console.log(senten);
//	let query2 = extract2(senten);
// //       console.log(query);
//	var trans_result = "" ;
//
//	app.get('/translate', function (req, res) {
//        	var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
//		var request2 = require('request');
//        	var options = {
//      			url: api_url,
//      			form: {'source':'en', 'target':'ko', 'text':query2},
//      			headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
//   		};
//		console.log("test");
//  		request2.post(options, function (error, response, body) {
//			if (!error && response.statusCode == 200) {
//				//var dyoni = JSON.parse(response.body);
//				var v1 = response.body.message.result.translatedText;
//                    console.log(v1);
//                    trans_result = "번역:" + v1
//      				res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
//      				res.end(trans_result);
//                    //console.log(trans_result);
//    			} 
//			else {
//      				res.status(response.statusCode).end();
//      				console.log('error = ' + response.statusCode);
//    			}
//  		});
//	});
//    //console.log(trans_result);
//	//callback(trans_result);
//	app.listen(3000, function () {
//  		console.log('http://127.0.0.1:3000/translate app listening on port 3000!');
//	})
//}

function extract2(input){
    		return input.split("번역:")[1]
}

const { RTMClient } = require('@slack/client');
const { WebClient } = require('@slack/client');
const dotenv = require('dotenv');
const token = process.env.TOKEN;

if (!token) {
    console.log('토큰이 올바르게 동작하지 않습니다.');
    process.exitCode = 1;
    return;
}

const rtm = new RTMClient(token);
const web = new WebClient(token);
rtm.start();

/**
rtm.on('message',(message) => {
    const text = message.text
    if (text.includes('검색!'){
        if (text.includes(' ')){
            const text2 = text.replace(/ /gi, "+");
            rtm.sendMessage("https://www.google.co.kr/search?q=" + text2, message.channel);
        }
        else {
            rtm.sendMessage("https://www.google.co.kr/search?q=" + text, message.channel);
        }
    }
    else {
        return;
        }
});
**/
var senten = "";
rtm.on('message',(message) => {
    if(message.text.includes("요니네날씨")){
        weather1(function(body){rtm.sendMessage(body,message.channel);})
       }

    if(message.text.includes("됴니네날씨")){
        weather2(function(body){rtm.sendMessage(body,message.channel);})
       }
    
    if(message.text.includes("서울날씨")){
        weather3(function(body){rtm.sendMessage(body,message.channel);})
       }
    if(message.text.includes("번역:")){
        senten = message.text;
        var express = require('express');
        var app = express();
        var client_id = 'qfYtuIdLWEw6wnkT3oRX';
        var client_secret = '6h6qFyzLzR';
        console.log(senten);
        let query2 = extract2(senten);
        var trans_result = "" ;

        app.get('/translate', function (req, res) {
            var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
            var request2 = require('request');
            var options = {
                url: api_url,
                form: {'source':'en', 'target':'ko', 'text':query2},
                headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
            };
            console.log("test");
            request2.post(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var v1 = response.body.message.result.translatedText;
                    console.log(v1);
                    trans_result = "번역:" + v1
                    res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
                    res.end(trans_result);
                } 
                else {
                    res.status(response.statusCode).end();
                    console.log('error = ' + response.statusCode);
                }
            });
        });
        app.listen(3000, function () {
            console.log('http://127.0.0.1:3000/translate app listening on port 3000!');
        })
	}
});

rtm.on('message', (message) => {
    if(!message.text.includes("구글:")){
        return;
    }
    let queryURI = convert(message.text);
    if(queryURI){
        web.chat.postMessage({
            channel : message.channel,
            text : queryURI,
            as_user : true
        });
    }
});
/*
rtm.on('message', (message) => {
    if(!message.text.includes("번역:")){
        return;
    }
    let ask  = extract2(message.text);
  :  if(ask){
        web.chat.postMessage({
            channel : message.channel,
            text : ask,
            as_user : true
        });
    }
});
*/
