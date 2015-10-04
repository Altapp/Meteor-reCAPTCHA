reCAPTCHA = {
    settings: {},
    config: function(settings) {
        return _.extend(this.settings, settings);
    },
    verifyCaptcha: function(clientIP, response) {
        var captcha_data = {
            secret: this.settings.privatekey,
            remoteip: clientIP,
            response: response
        };

        var serialized_captcha_data =
            'secret=' + captcha_data.secret +
            '&remoteip=' + captcha_data.remoteip +
            '&response=' + captcha_data.response;
        var captchaVerificationResult;
        var success = false; // used to process response string

        try {
            captchaVerificationResult = HTTP.call("POST", "https://www.google.com/recaptcha/api/siteverify", {
                content: serialized_captcha_data.toString('utf8'),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': serialized_captcha_data.length
                }
            });
        } catch (e) {
            console.log(e);
            return {
                'success': false,
                'error': 'Service Not Available'
            };
        }

        if (!captchaVerificationResult || !captchaVerificationResult.content) {
            return {
                'success': false,
                'error': 'Entered Text Does Not Match'
            };
        }

        captchaVerificationResult = EJSON.parse(captchaVerificationResult.content);
        return captchaVerificationResult;
    }
};