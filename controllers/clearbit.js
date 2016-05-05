'use strict';

var settings = require('../config/settings.js');
var clearbit = require('clearbit')(settings.clearbit_key);
var validator = require('validator');

module.exports.typeahead = function (req, res){
	var term = req.query.text.trim();
	if (!term) {
	    res.json([{
	      title: '<i>(Enter an Email ID)</i>',
	      text: ''
	    }]);
	    return;
	  }

	if (validator.isEmail(term)){
		res.json([{
	      title: term,
	      text: term
	    }]);	
	    return;	
	}
	else {
		res.json([{
	      title: '<i>(Enter a valid Email ID)</i>',
	      text: ''
	    }]);
	    return;
	}
}

module.exports.resolver = function (req, res){
	var emailID = req.query.text.trim();

	if (!emailID){
		res.json({
	      body: '<i>Enter an Email ID</i>'
	    });
	}
	else if (!validator.isEmail(emailID)){
		res.json({
	      body: '<i>Email ID not valid</i>'
	    });
	    return;
	}
	else {
		clearbit.Enrichment.find({email: emailID, stream: true})
	  	  .then(function (response) {
			res.json({
		      body: createHTMLString(response.person, response.company)
		    });
		    return;
		  })
		  .catch(function (err) {
		    console.error('err' , err);
		    res.json({
		      body: '<i>Clearbit API Error</i>'
		    });
		    return;
		  });
	}
}

function createHTMLString(person, company){
	var returnStr = '';
	if (!person && !company){
		returnStr = "<i>No data found</i>";
	}
	if (person){
		returnStr += '<div><div style="float:left;"><h2>Person</h2>'
		if (person.name && person.name.fullName){
			returnStr += '<p>' + person.name.fullName + '</p>';
		}
		if (person.email){
			returnStr += '<p>' + person.email + '</p>';
		}
		if (person.location){
			returnStr += '<p>' + person.location + '</p>';
		}
		returnStr += "</div>";
		if (person.avatar){
			returnStr += '<div style="float:right;width: 25%;text-align: right;"><img src="' + person.avatar + '" height="100" width="100" /></div>';
		}
		returnStr += '</div><div style="clear:both"></div>';
		if (person.twitter.handle || person.linkedin.handle || person.facebook.handle || person.googleplus.handle){
			returnStr += '<div>';
			if (person.twitter.handle){
				returnStr += '<a href="' + 'http://www.twitter.com/' + person.twitter.handle + '"><img style=" float:left;"  src="' + settings.icon_links.twitter + '" alt="Twitter"  height="50" width="50" /></a>';
			}
			if (person.linkedin.handle){
				returnStr += '<a href="' + 'http://www.linkedin.com/' + person.linkedin.handle + '"><img style=" float:left;"  src="' + settings.icon_links.linkedin + '" alt="LinkedIn"  height="50" width="50" /></a>';
			}
			if (person.facebook.handle){
				returnStr += '<a href="' + 'http://www.facebook.com/' + person.facebook.handle + '"><img style=" float:left;"  src="' + settings.icon_links.facebook + '" alt="Facebook"  height="50" width="50" /></a>';
			}
			if (person.googleplus.handle){
				returnStr += '<a href="' + 'http://www.google.com/+' + person.googleplus.handle + '"><img style=" float:left;"  src="' + settings.icon_links.googleplus + '" alt="Google Plus"  height="50" width="50" /></a>';
			}
			returnStr += '</div><br/>';
		}
	}
	if (company){
		returnStr += '<div><div style="float:left;"><h2>Company</h2>'
		if (company.name){
			returnStr += '<p>' + company.name + '</p>';
		}
		if (company.url){
			returnStr += '<p>' + company.url + '</p>';
		}
		if (company.location){
			returnStr += '<p>' + company.location + '</p>';
		}
		returnStr += "</div>";
		if (company.logo){
			returnStr += '<div style="float:right;width: 25%;text-align: right;"><img src="' + company.logo + '" height="80" width="80" /></div>';
		}
		returnStr += '</div><div style="clear:both"></div>';
	}
	return returnStr;
}