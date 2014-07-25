Package.describe({
    summary: "Form bot proteciton for Meteor."
});

Package.on_use(function(api) {
    api.use([
        'templating',
        'handlebars',
    ], 'client');

    api.add_files(['server/server.js'], 'server');
    api.add_files(['client/client.js', 'client/client.html'], 'client');
    api.export && api.export('reCAPTCHA', ['client', 'server']);
});