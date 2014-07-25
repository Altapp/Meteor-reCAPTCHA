Package.describe({
    summary: "Form bot proteciton for Meteor."
});

Package.on_use(function(api) {
    api.add_files('server/server.js', ['server']);
    api.add_files('client/client.html', ['client']);
    api.add_files('client/client.js', ['client']);
});