/** @jest-environment jsdom */
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../habits.html'), 'utf8');

describe('Display data', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    describe('display section contents', () => {
        test('Expect habit instance', () => {
            let habit = document.querySelector('.habit');
            expect(habit).toBeTruthy();
        });
    });

    describe('habit instance contents', () => {
        test('Expect habit to contain name, freq, time, and optional comment', () => {
            let habits = document.querySelectorAll('.habit');
            let children = [];
            habits.forEach(child => {
                switch (child.className) {
                    case "name", "freq", "time", "comment":
                        children.push(child.className);
                        break;
                    default:
                        break;
                }
            });
            expect(children.sort()).toEqual(["name", "freq", "time", "comment"].sort());
        });
    });

});


describe('Display Metric data', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    describe('metric data display accordion exists', () => {
        test('accordion opens on mouse click', () => {
            const test = document.querySelector('#metric-accordion');
            expect(test).toBeTruthy()
        });
    });

    // describe('open metric accordion', () => {
    //     test('accordion opens on mouse click', () => {
    //         const btn = document.querySelector('.accordion-button collapsed');
    //         const test = document.querySelector('.accordion-button collapsed');
    //         btn.onclick(
    //         );
            
    //     });
    // });
});

