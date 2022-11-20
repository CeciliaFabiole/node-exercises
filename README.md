# node-exercises
- Esercizio_1 : Create a sum script
    Create a script that outputs the total of 5 + 6 when you run it with Node.js.
- Esercizio_2 : Explore with the Node.js REPL
    Use the Node.js REPL to list the methods provided by the Node.js core crypto module. Use one of these methods to generate a random ID.
- Esercizio_3 : Create and use CommonJS modules
    Create a script that uses module.exports to export a function.
    Create another script that uses require() to import the function and then calls it.
- Esercizio_4 : Create and use ECMAScript modules
    Create a script that uses export default to export a function.
    Create another script that uses import to import the function and then calls it.
- Esercizio_5 : Change the HTML response
    Our HTTP server sends an HTML response body.
    Replace the text in the HTML with your own message. Run the server and use your web browser to test your changes.
- Esercizio_6 : Change the JSON response
    Our HTTP server now sends a JSON response body.
    Change the location in the response to "Mars". Run the server and make a request to it with curl using the --verbose flag. What is the value of the Content-Length response header?
- Esercizio_7 : Command-line art
    Create a new Node.js project and install the figlet package (https://www.npmjs.com/package/figlet). Write a script that uses the function from this package to output some text based art (the figlet package README has a 'Quick Start' section). Run the script with Node.js.
- Esercizio_8 : Inspect an HTTP response with curl
    Make an HTTP request with curl that shows the response headers for this URL: https://jsonplaceholder.typicode.com/posts/1/comments
    What is the value of the content-type response header? 
    content-type: application/json; charset=utf-8
- Esercizio_9 : A test-driven HTTP response
    Our integration test in app.test.js expects a JSON response.
    Change the test to expect an HTML response header: Content-Type: text/html
    Change the test to expect this HTML in response.text:
    Welcome to the World Wide Web!
    Run the test with npm test — it should fail.
    Update the code in app.js to send the HTTP response the test expects.
    Run the test with npm test — it should pass.