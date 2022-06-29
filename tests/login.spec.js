/** @jest-environment jsdom */
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../login&registration.html'), 'utf8');

describe('registration', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    describe('register form', () => {
        test('Expect a register form', () => {
            let form = document.querySelector('#register-form');
            expect(form).toBeTruthy();
        });
    });

    describe('register form information', () => {
        test('Expect a input for email', () => {
            let input = document.querySelector('#register-email');
            expect(input).toBeTruthy();
        });

        test('Expect a input for username', () => {
            let input = document.querySelector('#register-username');
            expect(input).toBeTruthy();
        });

        test('Expect a input for password', () => {
            let input = document.querySelector('#register-password');
            expect(input).toBeTruthy();
        });

        test('Expect password and password-confirm to match', () => {
            let pass1 = document.querySelector('#register-password');
            let pass2 = document.querySelector('#register-password-confirm');
            expect(pass1.value).toEqual(pass2.value);
        });
    });
});

describe('login', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    describe('login form', () => {
        test('Expect a login form', () => {
            let form = document.querySelector('#login-form');
            expect(form).toBeTruthy();
        });
    });

    describe('login form', () => {
        test('Expect a input for username', () => {
            let input = document.querySelector('#login-username');
            expect(input).toBeTruthy();
        });

        test('Expect a input for password', () => {
            let input = document.querySelector('#login-password');
            expect(input).toBeTruthy();
        });
    });
});
