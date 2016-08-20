reCAPTCHA = {
    settings: {},
    config: function(settings) {
        return _.extend(this.settings, settings);
    }
}

Template.reCAPTCHA.helpers({
    sitekey: function() {
        return reCAPTCHA.settings.publickey;
    }
});

Template.reCAPTCHA.onCreated(function () {
    if ('hl' in reCAPTCHA.settings) {
        $.getScript('https://www.google.com/recaptcha/api.js?hl=' + reCAPTCHA.settings.hl);
    } else {
        $.getScript('https://www.google.com/recaptcha/api.js');
    }
});
