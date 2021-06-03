/*
(c) Copyright 2019 Akamai Technologies, Inc. Licensed under Apache 2 license.
Version: 0.1

Change base path, set main page and remove pragmas
*/


import {Cookies} from 'cookies';

export function onClientRequest (request) {

	// Define variables and constants
	const original_path = request.path;
	var dest_path = "";

	// select path
	if (original_path == "/") {
		dest_path = "/index.html";
	} else {
		dest_path = original_path;
	}

	if (!request.device.isMobile && !request.device.isTablet) {
		dest_path= "/desktop" + dest_path;
	}

	request.route({path: "/745799"+dest_path});

	// Remove pragma headers unless a cookie is sent
	let cookies = new Cookies(request.getHeader('Cookie'));
	var cookie_pragma = cookies.get('pragma');
	if (!cookie_pragma || cookie_pragma != "show_debug") {
		request.removeHeader('Pragma');	
	}

}

export function onClientResponse (request, response) {

	if (request.device.isMobile || request.device.isTablet) {
		response.addHeader('Mobile','served');
	}

}