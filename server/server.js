reCAPTCHA = {
    settings: {},
    config: function(settings) {
        return _.extend(this.settings, settings);
    },
    verifyCaptcha: function(recaptchaResponse, clientIP) {
        var captcha_data = {
            secret: this.settings.privatekey, // for prod: process.env.RECAPTCHA_PRIVATE_KEY,
            remoteip: clientIP,
            response: recaptchaResponse
        };

        var serialized_captcha_data =
            'secret=' + captcha_data.secret +
            '&remoteip=' + captcha_data.remoteip +
            '&response=' + captcha_data.response;
        var captchaVerificationResult = null;
        var success, parts; // used to process response string

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

        parts = captchaVerificationResult.content.split('\n');
        success = parts[1];

        if (success.indexOf('true') < 0) {
            return {
                'success': false,
                'error': 'reCAPTCHA verification failed'
            };
        }

        return {
            'success': true
        };
    }
}