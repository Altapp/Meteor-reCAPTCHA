# Meteor reCAPTCHA v2
This is an implementation of the Google reCAPTCHA v2 API (i.e. "I'm not a robot") for Meteor sites. reCAPTCHA is a free CAPTCHA service provided by Google that authenticates real users while attempting to block bots.

reCAPTCHA is at https://developers.google.com/recaptcha/

Package is an upgraded version of Meteor-reCAPTCHA provided by Altapp (https://github.com/Altapp/Meteor-reCAPTCHA).

## Installation

``` sh
$ meteor add yuea:recaptcha
```

## Setup

### Obtain reCAPTCHA Keys From Google

Register at https://www.google.com/recaptcha/admin to obtain your private and public key needed for reCAPTCHA to function.

###On The Client

Add your reCAPTCHA public key (from Google) to the package. Do this in client-side code.

``` javascript
Meteor.startup(function() {
    reCAPTCHA.config({
        publickey: 'your_public_key_from_google'
    });
});
```

###On The Server

Add your reCAPTCHA private key (from Google) to the package. Do this in server-only code (not just an 'isServer' block) to keep your key secret.

``` javascript
Meteor.startup(function() {
    reCAPTCHA.config({
        privatekey: 'your_private_key_from_google'
    });
});
```

## Usage

###On The Client

Include the `{{> reCAPTCHA}}` template block in your form template.

``` html
<template name="myTemplate">
    <form>
    	<!-- your form fields... -->

    	{{> reCAPTCHA}}

    	<button type="submit">Submit</button>
    </form>
</template>
```

In your submit event, include the reCAPTCHA data in your method call.

``` javascript
Template.myTemplate.events({
    'submit form': function(e) {
        e.preventDefault();

        var formData = {
            //get the data from your form fields
        };

        //get the captcha data
        var captchaData = {
            captcha_challenge_id: Recaptcha.get_challenge(),
            captcha_solution: Recaptcha.get_response()
        };

        Meteor.call('formSubmissionMethod', formData, captchaData, function(error, result) {
            if (error) {
                console.log('There was an error: ' + error.reason);
            } else {
                console.log('Success!');
            }
        });
    }
});
```

###On The Server

In the server method, pass the captcha data and the user's IP address to `reCAPTCHA.verifyCaptcha(clientIP, captchaData)` to verify that the user entered the correct text.

``` javascript
Meteor.methods({
    formSubmissionMethod: function(formData, captchaData) {

        var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(this.connection.clientAddress, captchaData);

        if (!verifyCaptchaResponse.success) {
            console.log('reCAPTCHA check failed!', verifyCaptchaResponse);
            throw new Meteor.Error(422, 'reCAPTCHA Failed: ' + verifyCaptchaResponse.error);
        } else
            console.log('reCAPTCHA verification passed!');

        //do stuff with your formData

        return true;
    }
});
```