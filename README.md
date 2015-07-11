# Meteor reCAPTCHA
Google's reCAPTCHA is a free CAPTCHA service that protects your site against spam, malicious registrations and other forms of attacks where computers try to disguise themselves as a human. In addition to protecting your site, reCAPTCHA also helps digitize old books and newspapers.

reCAPTCHA is at https://developers.google.com/recaptcha/

Package made with the help of this [StackOverflow question](http://stackoverflow.com/questions/22253196/working-example-of-recaptcha-in-meteor).

## Installation

``` sh
$ meteor add altapp:recaptcha
```

## Setup

### On The Client

Add your reCAPTCHA public key (from Google) to the package. Do this in client-side code.

``` javascript
Meteor.startup(function() {
    reCAPTCHA.config({
        publickey: 'your_public_key_from_google'
    });
});
```

### On The Server

Add your reCAPTCHA private key (from Google) to the package. Do this in server-only code (not just an 'isServer' block) to keep your key secret.

``` javascript
Meteor.startup(function() {
    reCAPTCHA.config({
        privatekey: 'your_private_key_from_google'
    });
});
```

## Usage

### On The Client

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
        var captchaData = grecaptcha.getResponse();

        Meteor.call('formSubmissionMethod', formData, captchaData, function(error, result) {
            // reset the captcha
            grecaptcha.reset();

            if (error) {
                console.log('There was an error: ' + error.reason);
            } else {
                console.log('Success!');
            }
        });
    }
});
```

### On The Server

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