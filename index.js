const PORT = 8000
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
// const nodemailer = require('nodemailer');
const fs = require('fs'); // 引入 fs 模組

const app = express();
const url = "https://www.timeanddate.com/worldclock/"

// 建立一個 transporter 物件，用於發送郵件
// let transporter = nodemailer.createTransport({
//     service: 'gmail', // 使用 Gmail 服務
//     auth: {
//         user: 'successken2001@gmail.com', // 你的 Gmail 帳號
//         pass: process.env.PASSWORD // 你的 Gmail 密碼
//     }
// });

const fetchWebsite = () => {
    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []

            // $('.my-city__city', html).each(function () {
            //     const city = $(this).text()
            //     // const url = $(this).find('a').attr('href')
            //     articles.push({
            //         city
            //     })
            // })

            const seconds = $('.my-city__seconds', html).first().text();
            articles.push({
                seconds
            });

            // 如果 seconds 為 10，則發送郵件
            // if (seconds === '10' || seconds === '30' || seconds === '50') {
            //     let mailOptions = {
            //         from: process.env.EMAIL, // 發送者的郵件地址
            //         to: 'imeukg2001@gmail.com', // 接收者的郵件地址
            //         subject: 'Seconds is 10', // 郵件主題
            //         text: 'The seconds value is 10.' // 郵件內容
            //     };

            //     transporter.sendMail(mailOptions, function(error, info){
            //         if (error) {
            //             console.log(error);
            //         } else {
            //             console.log('Email sent: ' + info.response);
            //         }
            //     });
            // }
            
            // 將 seconds 寫入一個文本文件
            fs.appendFile('seconds.txt', seconds + '\n', function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
            console.log(articles)
        }).catch(err => console.log(err))
}

// 執行 fetchWebsite 函數每 1 秒
setInterval(fetchWebsite, 1000);

app.listen(PORT, () => console.log(`server running on PORT ${PORT} `))