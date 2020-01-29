// Dependencies
var Boom    = require('boom');
var Joi     = require('joi');
var Path    = require('path');
var Hapi    = require('hapi');
var Vision 	= require('vision');
var Inert 	= require('inert');

// Template Engine
var Handlerbars = require('handlebars');
var HandlebarsLayouts = require('handlebars-layouts');
HandlebarsLayouts.register(Handlerbars);

// Nodemailer
let nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
				user: "defiglobalco@gmail.com",
				pass: "NhT6u9Lp44!"
		}
});

// HTTP Server
var server = Hapi.server({
	 	port: 8002,
	  routes: {
			cors: {
				credentials: true
			}
	 }
});

// HTTP Server Initialization Configuration
var initialization = async function() {

	// Register modules
	await server.register(Vision);
	await server.register(Inert);

	// Setup view rendering
	server.views({
			engines: {
					html: {
						module: Handlerbars
					}
			},
			relativeTo: Path.join(__dirname, 'public'),
			path: './views',
			partialsPath: './views'
	});

	// Handles public file routing
	server.route({
	    method: 'GET',
	    path: '/static/{param*}',
	    handler: {
	        directory: {
	            path: 'public',
	            listing: true
	        }
	    }
	});

	// Base HTTP route
	server.route({
			method: 'GET',
			path: '/',
			handler: function(request, reply)
			{
					return reply.view('embed-base', {});
			}
	});

	// Sends contact email
	server.route({
			method: 'POST',
			path: '/form/submit',
			handler: function(request, reply)
			{
					let email = request.payload.email || ""
					let category = request.payload.category || ""
					let inquiry = request.payload.inquiry || ""

					if (email && category && inquiry) {
							let info =  transporter.sendMail({
									from: 'defiglobalco@gmail.com', // sender address
									to: 'business@defiglobal.co', // list of receivers
									subject: '[' + category + '] DeFi Global Contact <> ' + email, // Subject line
									text: inquiry, // plain text body
									html: 'Contact us inquiry by <strong>' + email + '</strong><br><p>' + inquiry + '</p>' // html body
							});
							info
								.then(function(data) {
								})
								.catch(function() {
								})
					}

					return {sent: true}
			}
	});

	// Base HTTP route
	server.route({
			method: 'GET',
			path: '/{param*}',
			handler: function(request, reply)
			{
					return reply.view('embed-base', {});
			}
	});

	// Attempt to start the HTTP Server
	try {
			await server.start();
			console.log("DEFI GLOBAL SERVER RUNNING");
	}
	catch (err) {
			process.exit(1);
	}
};

// Initilize HTTP Server
initialization();
