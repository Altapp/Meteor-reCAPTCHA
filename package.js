Package.describe({
    name: "yuea:recaptcha",
    summary: "Google recAPTCHA v2 package for Meteor",
    git: "https://github.com/yuea/Meteor-reCAPTCHA.git",
    version: "2.0.0"
});

Package.onUse(function(api) {

    api.versionsFrom('0.9.0');

    api.use([
        'templating',
        'handlebars',
    ], 'client');
    api.use([
        'http',
    ], 'server');

    api.addFiles(['server/server.js'], 'server');
    api.addFiles(['client/client.html', 'client/client.js'], 'client');
    api.export && api.export('reCAPTCHA', ['client', 'server']);
});