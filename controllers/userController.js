import { Answer } from "../models/answer";
import { Visitor } from "../models/visitor";
import Youtube from "youtube-node";
import dotenv from "dotenv";

dotenv.config();

const youtube = new Youtube();
youtube.setKey(process.env.YOUTUBE_KEY);

module.exports = {
    visitHome:  async(req, res, next) => {       
       const visitor = new Visitor({regDt: new Date()});
       console.log('visit ::',visitor);
       visitor.save((err, response) => {
           if(err) {
               console.log('❌visit err',err);
               return res.json({success: false, err});
            }
           console.log('✅visit success');
           return res.status(200).json({success: true});
       });
    },
    submitAnswer: async(req, res, next) => {
        console.log(req.body);
        const answer = new Answer(req.body);
        answer.regDt = new Date();
        console.log('answer ::', answer);
        answer.save((err, response) => {
            if(err) {
                console.log('❌submit err', err);
                return res.json({success: false}, err);
            }
            console.log('✅submit success');


            /*
            Answer.find({answer: answer.answer}, (err, result) => {
                if(err) {
                    console.log('❌result err', err);
                    return res.json({success: false}, err);
                }

                if(result.length==0) {
                    // 일치율 낮춰서 재전송
                }
                console.log('✅result success');
                return res.status(200).json(result);
            })
            */

            return res.status(200).json(response);
        });
    },
    searchMusic: async(req, res, next) => {
        console.log('body => ', req.body);
        var pageToken = req.body.pageToken;
        youtube.addParam('order', 'relevance'); // 관련성 순서
        youtube.addParam('type', 'video'); // 타입 지정 
        youtube.addParam('part', 'snippet');
        youtube.addParam('regionCode', 'KR');
        youtube.addParam('safeSearch', 'moderate');
        youtube.addParam('pageToken', pageToken);
        var limit = 3;
        var word = req.body.keyword;

        console.log('검색어 : '+word);
        ///*
        console.log('=======================================')
        youtube.search(word, limit, function (err, result) { // 검색 실행 
            if (err) { 
                console.log(err); 
                return; 
            } // 에러일 경우 에러공지하고 빠져나감 
            //console.log(JSON.stringify(result, null, 2)); // 받아온 전체 리스트 출력 
            var nextPageToken = result.nextPageToken;
            var prevPageToken = result.prevPageToken;
            console.log('nextPage', nextPageToken);
            console.log('prevPage', prevPageToken);
            var items = result["items"]; // 결과 중 items 항목만 가져옴 
            var list = [];
            for (var i in items) { var it = items[i]; 
                var title = it["snippet"]["title"]; 
                var video_id = it["id"]["videoId"]; 
                var url = "https://www.youtube.com/watch?v=" + video_id; 
                list.push({title: title, video_id: video_id, url: url});
                console.log("제목 : " + title); 
                console.log("URL : " + url); 
                console.log("-----------"); 
            }
            var info = {item:list, nextPage:nextPageToken, prevPage:prevPageToken};
            return res.status(200).json(info);
        });
        //*/
    }
}
