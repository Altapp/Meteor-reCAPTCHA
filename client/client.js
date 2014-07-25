reCAPTCHA = {
    settings: {},
    config: function(settings) {
        return _.extend(this.settings, settings);
    }
}


Template.reCAPTCHA.rendered = function() {

    $.getScript('http://www.google.com/recaptcha/api/js/recaptcha_ajax.js', function() {
        Recaptcha.create(reCAPTCHA.settings.publickey, 'rendered-captcha-container', {
            theme: 'red',
            callback: Recaptcha.focus_response_field
        });
    });

}