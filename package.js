Package.describe({
    summary: "Form bot protection for Meteor.",
    git: "https://github.com/manybothans/Meteor-reCAPTCHA.git",
    version: "1.1.0",
    name: "jplatimer:recaptcha",
});

Package.onUse(function(api) {
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