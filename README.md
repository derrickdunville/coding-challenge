# Ambassador Coding Challenge API
A REST API build with NodeJS, using express, mongoose, apidocs. Tested with mocha and chai.

http://api.ambassador.derrickdunville.com

This repository solves the back-end track of the problem description below. It doesn't contain a "Browsable API" but as a substitute it contains documentation about the various API endpoints. These endpoints can be tested using curl or postman. Just click the link above to read the apidocs. All REST requests should be made with the above root url. ie. http://api.ambassador.derrickdunville.com/users

## Problem Description
The year is 1991, and Tim Berners-Lee has just invented the World Wide Web. As his best friend, he turns to you for help growing this crazy new thing. You decide referral marketing is the most effective way to grow support for Tim’s invention and plan to bring word of mouth to the web in the form of a simple, automated referral system.

The system you’ve dreamt up is very straightforward. It only needs two pages to satisfy Tim’s needs: one to create, edit, delete, and track referral links and another to serve as a landing page for the links that promotes the World Wide Web.

### Functional spec
The link page is where Tim will manage his referral links. This page should be located at the root of your domain i.e. {your_url}. There should be a form to add links. It only needs one field, which is the unique title of the link e.g. spartans or wolverines. This title will form the referral url e.g. {your_url}/spartans or {your_url}/wolverines. Below this form should be a list of the active referral links with options to edit or delete links. The # of times a link has been clicked should be tracked and displayed next to each link in the list. The link title should link to the Landing Page.

![Link Page](https://lh4.googleusercontent.com/E03q_HNyAyBCgyuiLN_UMkqmygSH4k1n2sZAG5p4EyothDtwXIh81nuXF0--JUsJs3PQaJJV_oIKvVqIPlNSU96Q4zT3N1f6E6Pl0XJk7wdqruNi69RlV7yUd_FhztzJEbZUkA)

The landing page is where each referral link should redirect. This page should be located at its own unique url i.e. {your_url}/landing. The content of this page is not important, though you should feel free to use it as a canvas to promote and express your feelings toward the World Wide Web for Tim. When each referral link redirects to the landing page, the link title must be appended as a query parameter in the url e.g. {your_url}/landing/?link={link_title}. The link title should be grabbed from the query parameter and displayed somewhere on the landing page, which is the only content you actually have to include.

![Landing Page](https://lh3.googleusercontent.com/HFEsNHwWaII66dB_Pa5nm8WZgPOp3F-jSyMxwFAwyO04O7dFlHovFW9hKovR6IbL6eaxCxKlq4iK30r2lVM8-ykjnllC0Ga85MtEenmZ52DnhR3ZhiGRFV_mY44HZClXD8TGIw)

### Technical spec
Full-Stack - I chose to do the Full-Stack track of this challenge.

#### Back-end
Your task is to build a REST API that can support the functionality described for the Link and Landing pages in the functional spec. Your API should be able to:

-	Perform CRUD actions for Link pages
-	Track the number of visits to the Landing Page

I opted to use NodeJS to build this backend REST API because I have been working with javascript for a little over a year and a half and that is currently the language I'm most comfortable working with.

#### Front-end
The accompanying Front-end implementation can be found here.

https://github.com/derrickdunville/coding-challenge-client

It is also build using NodeJS. It uses Express, React, Redux, and Material-UI. There are also a number of other npm packages that were used to support additional functionality.

In addition to building the referral application, complete the HTML/CSS challenge which can be found in the `/html-css-exercise` [folder in the repo](https://github.com/GetAmbassador/coding-challenge/tree/master/html-css-exercise).

The html-css-exercise is actually a part of this repository since it was easier for me to serve it as a static html page from this REST API's server.

http://api.ambassador.derrickdunville.com/html-css-exercise

### Deployment
This REST API is currently deployed to AWS. Its running on an Ubuntu 14.04 EC2 Instance with an NGINX web server. It can be found here

http://api.ambassador.derrickdunville.com

## Other projects!

### Material-UI
https://github.com/derrickdunville/material-ui

I have been working on this project for a few months now.  It was forked from material-dashboard-react by creativetimofficial.

https://github.com/creativetimofficial/material-dashboard-react

All work on this repository since I forked it has been done by me. My goal with this project is to push a React Front-End for a company I co-founded called Ascend Trading. It will be replacing our current Wordpress website and will utilize Stripe, SendGrid and Twilio.
