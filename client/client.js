reCAPTCHA = {
    settings: {
        theme: 'clean'
    },
    config: function(settings) {
        return _.extend(this.settings, settings);
    }
}


Template.reCAPTCHA.rendered = function() {
    $.getScript('https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit', function() {
    });
}