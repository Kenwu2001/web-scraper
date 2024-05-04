const PORT = 8000
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();
const url = "https://www.timeanddate.com/worldclock/"

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

            // $('.my-city__seconds', html).each(function() {
            //     const seconds = $(this).text()
            //     articles.push({
            //         seconds
            //     })
            // })
            const seconds = $('.my-city__seconds', html).first().text();
            articles.push({
                seconds
            });
            console.log(articles)
        }).catch(err => console.log(err))
}

// 執行 fetchWebsite 函數每 1 秒
setInterval(fetchWebsite, 1000);

app.listen(PORT, () => console.log(`server running on PORT ${PORT} `))