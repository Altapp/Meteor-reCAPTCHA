reCAPTCHA = {
    settings: {},
    config: function(settings) {
        return _.extend(this.settings, settings);
    },
    verifyCaptcha: function(clientIP, data) {
        var captcha_data = {
            privatekey: this.settings.privatekey,
            remoteip: clientIP,
            challenge: data.captcha_challenge_id,
            response: data.captcha_solution
        };

        var serialized_captcha_data =
            'privatekey=' + captcha_data.privatekey +
            '&remoteip=' + captcha_data.remoteip +
            '&challenge=' + captcha_data.challenge +
            '&response=' + captcha_data.response;
        var captchaVerificationResult = null;
        var success, parts; // used to process response string

        try {
            captchaVerificationResult = HTTP.call("POST", "http://www.google.com/recaptcha/api/verify", {
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
                'error': 'google_service_not_accessible'
            };
        }

        parts = captchaVerificationResult.content.split('\n');
        success = parts[0];

        if (success !== 'true') {
            return {
                'success': false,
                'error': 'captcha_verification_failed'
            };
        }

        return {
            'success': true
        };
    }
}


// Meteor.methods({
//     "submitMySecuredForm": function(data) {

//         //!add code here to separate captcha data from form data.

//         var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(this.connection.clientAddress, data);

//         if (!verifyCaptchaResponse.success) {
//             console.log('Captcha check failed! Responding with: ', verifyCaptchaResponse);
//             return verifyCaptchaResponse;
//         }

//         console.log('Captcha verification passed!');

//         //!add code here to process form data

//         return {
//             success: true
//         };
//     }
// });