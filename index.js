import puppeteer from 'puppeteer';
import fs from 'fs';

import constants from './constants.js';

(async () => {
    const flights = [];

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(constants.URL);
    await page.setViewport({ width: 1080, height: 1024 });

    try {
        const flightsData = await page.$$('.Fxw9 > [data-resultid]');

        for (const flight of flightsData) {
            const price = await page.evaluate(el => el.querySelector('.f8F1-price-text').textContent, flight);

            const duration = await page.evaluate(
                el => el.textContent.match(/(0?[0-9]|1[0-9]|2[0-3])h\s\d\dm/i)[0],
                flight
            );

            const time = await page.evaluate(el => {
                return el.querySelector('.VY2U > div:first-child').textContent;
            }, flight);

            let [departTime, arrivalTime] = time.split('–');

            arrivalTime = arrivalTime.split('+')[0] ?? arrivalTime;

            const noOfStops = await page.evaluate(el => {
                const text = el.querySelector('.JWEO-stops-text').textContent;
                return text === 'direct' ? 0 : text.slice(0, 1);
            }, flight);

            const flightClass = await page.evaluate(el => el.querySelector('.aC3z-name').textContent, flight);

            const operator = await page.evaluate(
                el => el.querySelector('.J0g6-operator-text').textContent,
                flight
            );

            flights.push({
                price,
                duration,
                departTime,
                arrivalTime,
                noOfStops,
                class: flightClass,
                operator
            });
        }
    } catch (error) {
        console.log(error);
    }

    fs.writeFile('flights.json', JSON.stringify(flights), err => {
        if (err) throw err;
        console.log('Successfully saved JSON');
    });

    console.log(flights);
})();
