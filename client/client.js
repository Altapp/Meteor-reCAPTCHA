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

Template.reCAPTCHA.created = function () {
    var url = 'https://www.google.com/recaptcha/api.js';
    if (reCAPTCHA.settings.hl)
        url += 'hl=' + reCAPTCHA.settings.hl;
        
    $.getScript(url);
}
