Package.describe({
    summary: "Form bot protection for Meteor."
});

Package.on_use(function(api) {
    api.use([
        'templating',
        'handlebars',
    ], 'client');
    api.use([
        'http',
    ], 'server');

    api.add_files(['server/server.js'], 'server');
    api.add_files(['client/client.html', 'client/client.js'], 'client');
    api.export && api.export('reCAPTCHA', ['client', 'server']);
});