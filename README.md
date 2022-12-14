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
    RISPOSTA : content-type: application/json; charset=utf-8
- Esercizio_9 : A test-driven HTTP response
    Our integration test in app.test.js expects a JSON response.
    Change the test to expect an HTML response header: Content-Type: text/html
    Change the test to expect this HTML in response.text:
    Welcome to the World Wide Web!
    Run the test with npm test — it should fail.
    Update the code in app.js to send the HTTP response the test expects.
    Run the test with npm test — it should pass.
- Esercizio_10 : Use a method with a callback
    Create a script that uses the Node.js core fs.writeFile() (callback API) method to write a text file. The documentation for this method is on the Node.js File system page:
    https://nodejs.org/api/fs.html#fswritefilefile-data-options-callback
- Esercizio_11 : Promises lucky draw
    The `luckyDraw` function returns a promise. Create a promise chain where the function is called for each of the players: Joe, Caroline and Sabrina
    Log out the resolved value for each promise and handle any promise rejections in the chain.
    ```
    function luckyDraw(player) {
        return new Promise((resolve, reject) => {
            const win = Boolean(Math.round(Math.random()));
            process.nextTick(() => {
                if (win) {
                    resolve(`${player} won a prize in the draw!`);
                } else {
                    reject(new Error(`${player} lost the draw.`));
                }
            });
        });
    }
    ```
- Esercizio_12 : await the lucky draw results
    Create a getResults function that uses async and await. Inside of the function, call the luckyDraw function for each of the players: Tina, Jorge, Julien
    Log out the resolved value for each promise and handle any promise rejections.
    function luckyDraw(player) {
        return new Promise((resolve, reject) => {
            const win = Boolean(Math.round(Math.random()));

            process.nextTick(() => {
            if (win) {
                resolve(`${player} won a prize in the draw!`);
            } else {
                reject(new Error(`${player} lost the draw.`));
            }
            });
        });
    }
- Esercizio_13 : Create your own HTTP server
    Use the techniques you've learnt so far to create your own HTTP server with Express. Your server should:
    _ Automatically recompile and restart when you make changes
    _ Have a GET route that sends a JSON response
    _ Have an integration test for the GET route
    _ Use an environment variable to configure the server port

    "main": "exportedFunction.js",
- Esercizio_14 : Use console methods to complete the challenges in this script:
    // Challenge 1:
    // Use 2 different techniques to output the value of this variable with
    // a label, so we can easily identify it in the script output.

    const surprisingFact = "The bumblebee bat is the world's smallest mammal";

    // Challenge 2:
    // Use 2 different techniques to output a formatted version
    // of this complete object.

    const familyTree = [
    {
        name: "Person 1",
        children: [
        {
            name: "Person 2",
            children: [
            {
                name: "Person 3",
                children: [
                {
                    name: "Person 4",
                },
                ],
            },
            ],
        },
        ],
    },
    ];

    // Challenge 3:
    // Output a count value every time the importantTask function is called.
    // Reset the count value after 4 function calls.

    function importantTask() {}

    importantTask();
    importantTask();
    importantTask();
    importantTask();
    importantTask();
    importantTask();
- Esercizio_15 : Create a database and Prisma model
    In this exercise you'll build on what you created in 'Exercise: Create your own HTTP server'.
    Create a database for your application and configure Prisma to use it. Then create a Prisma model and a migration. Choose your own theme for the model.
- Esercizio_16 : Retrieve all resources
    In this exercise you'll build on what you created in 'Unit 12, Exercise 1: Create a database and Prisma model'.
    Add a route to your API that retrieves all resources.