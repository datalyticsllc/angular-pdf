# angular-pdf

This is a work in progress...

Angular module for [Mozilla's](https://github.com/mozilla/pdf.js/) PDF.js implementation.  This is just
a starting point for developing a full-featured PDF viewer in Angular.JS.

## PDF.js

PDF.js is Portable Document Format (PDF) viewer that is built with HTML5.

PDF.js is community-driven and supported by Mozilla Labs. Our goal is to
create a general-purpose, web standards-based platform for parsing and
rendering PDFs.

## Getting Started

### Online demo (Mozilla)

+ http://mozilla.github.io/pdf.js/web/viewer.html

## Building and running angular-pdf

+ Use Grunt to build the project into the /dist folder
+ Start the node.js web server: node ./server/web-server.js
+ Set the document you want to display in the viewer.js file
+ Open up the viewer.html page and enjoy

### CORS considerations

The sample pdf I'm using is hosted on Amazon's S3 service.  This is an ideal place to stream PDFs from, since
they have CORS support for the buckets.  In order to enable CORS on a bucket perform the following steps:

+ Log into your Amazon S3 account
+ Navigate to the bucket you wish to enable CORS
+ Go to the Properties -> Permissions section
+ Click "Edit CORS Configuration" button
+ Add the following configuration below (edit the AllowedOrigin to your site) and click save.  [Amazon Ref](http://docs.aws.amazon.com/AmazonS3/latest/dev/cors.html)

```
<CORSConfiguration>
 <CORSRule>
   <AllowedOrigin>http://www.example.com</AllowedOrigin>

   <AllowedMethod>PUT</AllowedMethod>
   <AllowedMethod>POST</AllowedMethod>
   <AllowedMethod>DELETE</AllowedMethod>

   <AllowedHeader>*</AllowedHeader>
 </CORSRule>
 <CORSRule>
   <AllowedOrigin>*</AllowedOrigin>
   <AllowedMethod>GET</AllowedMethod>
 </CORSRule>
</CORSConfiguration>
```

You should now be able to view the PDF in the webpage :-)



