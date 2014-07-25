# Meteor reCAPTCHA
Google's reCAPTCHA is a free CAPTCHA service that protects your site against spam, malicious registrations and other forms of attacks where computers try to disguise themselves as a human. In addition to protecting your site, reCAPTCHA also helps us digitize old books and newspapers.

reCAPTCHA is at https://developers.google.com/recaptcha/

## Installation

``` sh
$ mrt add recaptcha
```

## How to use


``` javascript
encrypted = CryptoJS.AES.encrypt('Message', 'Passphrase');
console.log(encrypted.toString());
// U2FsdGVkX18Hpf311+ZPEcnB/e2rP3vSHoACIBv0Lq8=

decrypted = CryptoJS.AES.decrypt(encrypted, 'Passphrase');
console.log(decrypted.toString(CryptoJS.enc.Utf8));
// Message
```
