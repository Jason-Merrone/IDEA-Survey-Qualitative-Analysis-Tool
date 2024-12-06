# Testing Design Report

- **Challenging features to test**:
  - **Interface between different modules of the app:** Difficult to test because it is difficult to control for every forseeable input. Many features of the app require several servers to be running before tests can even be run. Testing these modules independently brings little value because many of these modules don't _do_ anything independently.
   - **AI:** The responses returned from AI models are not deterministic. The quality of these responses is subjective. For these reasons, it is difficult to automate tests of AI.

## System Level Tests

### Authentication

#### Overview

When attempting to visit the webpage while not logged in you should be redirected to the login page (the application should automatically redirect to the login screen and not allow any other endpoints until authenticated).

#### Preconditions

Make sure that you are logged out of the application before attempting to test these routes.

#### Steps

1. Visit the `/` route
2. Visit the `/dashboard` route
3. Visit the `/chat` route

#### Expected Results

For each of the routes visited in the steps above, you should be redirected to the `/login` route. If you open your browser developer tools and navigate to the website cookie store, there should be a cookie named `idea-ideas`.

### Create Account

#### Overview

You should be able to create an account and then be automatically logged in to the newly created account.

#### Preconditions

Make sure that you are logged out of the application before testing.

#### Steps

1. Visit the `/login` route
2. Press the button that says "Create Account"
3. Fill out the form with your information
4. Once you have filled out the form, press the button that says "Create Account"

#### Expected Results

- You should see a confirmation message that confirms the acccount was created
- You should be redirected to the `/` route

#### Unexpected Results

- You should not be able to submit the form if you do not fill out all of the fields

### Login

#### Overview

You should be able to login to your account with the A-Number you provided when you created your account.

#### Preconditions

Make sure that you have created an account and are logged out of the application before testing.

#### Steps

1. Visit the `/login` route
2. Fill out the form with your A-Number
3. Press the button that says "Login"

#### Expected Results

- You should see a confirmation message that confirms you are logged in
- You should be redirected to the `/` route
- You should see "logout" in the navigation bar once you are logged in
- You should be able to verify that you are logged in to your account by seeing your name in the top right corner of the page

#### Unexpected Results

- You should not see "login" in the navigation bar once you are logged in

### Single-Sign On

#### Overview

You should be able to login with your USU credentials from the USU sign-on portal.

#### Preconditions

Make sure you have a USU A-Number and are not currently signed into any USU sites.

#### Steps

1. Visit the `login` route
2. Click on the `Sign-in with SSO` button
3. After being redirected to the USU sign-on portal, enter your USU credentials and complete the multi-factor authentication

#### Expected Results

- You should be redirected to the `/` route
- You should see "logout" in the navigation bar once you are logged in
- You should be able to verify that you are logged in to your account by seeing your name in the top right corner of the page

#### Unexpected Results

- You should not see "login" in the navigation bar once you are logged in

### PDF Upload

#### Overview

You should be able to upload your IDEA surveys and then view your uploaded surveys.

#### Preconditions

You must have an account and be logged in to the application before testing.

#### Steps

1. Visit the `/upload` route
2. Fill out the form with details about your survey
3. Press the button that says "Upload IDEA Survey"
4. Select the file you want to upload

#### Expected Results

1. You should see a confirmation message that confirms the upload was successful
2. You should see the name of the file you uploaded in the list of uploaded files on the same page

### Generate Report

#### Overview

You should be able to generate a new report based on the uploaded surveys.

#### Preconditions

You must be logged in to the application and have uploaded at least one survey before testing.

#### Steps

1. Visit the `/dashboard` route
2. Fill out the form with the semesters and classes you want to generate a report for
3. Press the button that says "Generate Report"

#### Expected Results

1. You should see a report generated based on the surveys you uploaded that answers the following questions:;
   - What is the general overview of the comments?
   - What are things students liked about the course?
   - How can I improve the course?

### Chat

#### Overview

You should be able to chat with AI about selected IDEA surveys.

#### Preconditions

You must be logged in to the application and have uploaded at least one survey before testing.

#### Steps

1. Visit the `/chat` route
2. Fill out the form with the semesters and classes you want to chat about
3. Press the button that says "Create New Chat"
4. Send a message to the AI

#### Expected Results

You should see a message from the AI in the chat window based on the surveys you uploaded that responds to the message you sent.

### History

#### Overview

You should be able to see reports you've previously generated and recent chats you've had with the AI.

#### Preconditions

You must be logged in to the application and have generated at least one report and chat before testing.

#### Steps

1. Visit the `/` route.

#### Expected Results

You should see a list of reports and chats you've generated and chatted with the AI in boxes labeled as such.

### Navigation

#### Overview

You should be able to navigate between the different pages of the application using the navigation bar.

#### Preconditions

You must be logged in to the application before testing.

#### Steps

1. Press "home" in the navigation bar
2. Press "upload" in the navigation bar
3. Press "dashboard" in the navigation bar
4. Press "chat" in the navigation bar

#### Expected Results

You should be directed to the following routes respectively:

1. The `/` route
2. The `/upload` route
3. The `/dashboard` route
4. The `/chat` route

### Logout

#### Overview

You should be able to logout of your account

#### Preconditions

You must be logged in to the application before testing.

#### Steps

1. Press the "logout" button in the navigation bar

#### Expected Results

- You should be redirected to the `/login` route
- You should see confirmation that you have been logged out

### Download Report

#### Overview

You should be able to download a report you've generated.

#### Preconditions

You must be logged in to the application and have generated at least one report before testing.

#### Steps

1. Visit the page that contains the report you want to download (a link to the report will be displayed on the home page)
2. Press the "Download Report" button

#### Expected Results

You should be given the option to download the report as a PDF file.

## PDF Parsing

The PDF parsing is currently tested manually. A PDF is input, and using print statements to log to the console, we are able to check that the output is correctly parsed and split.

This testing revealed that PDFs are much harder to effectively parse than we originally thought. The formatting of the document does not necessarily provide any useful information about how comments are broken up or where things are located. Through testing and tweaking our code, however, we were able to effectively cut out unnecessary data from the PDFs and parse the useful comments out of their respective sections into an array to feed our AI.

## Manual Tests

### AI Summarize

#### Overview

You should be able to provide paragraphs of text and receive a summary of the text.

#### Preconditions

The Flask server must be running.

#### Steps

1. Send a POST request to `/summary-test` with the `Content-Type` header set to `application/json` and the following body:
   ```json
   {
       "prompt": "Professor Smith is extremely knowledgeable and passionate about the subject, which made the course engaging and enjoyable. The material was challenging, but the professor explained concepts clearly and provided ample office hours for additional support. The course was well-structured, with assignments and exams aligning closely with the learning objectives, and the feedback on assignments was detailed and constructive, helping me improve. I appreciated the inclusion of real-world examples, which made the material relatable, and the effective use of technology, though the online platform occasionally had issues that could be addressed. While the lectures were informative, adding more interactive activities and slowing down during some rushed topics could enhance engagement and comprehension. Overall, this course was challenging but fair, and the professor's accessibility and clear communication made it a rewarding experience."
   }
   ```

#### Expected Results

The server replies with a 201 and a summary of the provided text is returned in the following format:
```json
{
   "data": [{ "response": "Lorem ipsum dolor sit amet" }]
}
```

### AI Semantic Analysis

#### Overview

You should be able to provide sentences of text and receive a keyword representing the tone of the text.

#### Preconditions

The Flask server must be running.

#### Steps

1. Send a POST request to `/semantic-test` with the `Content-Type` header set to `application/json` and the following body:
   ```json
   {
       "comment": "Professor Smith is extremely knowledgeable and passionate about the subject, which made the course engaging and enjoyable."
   }
   ```

#### Expected Results

The server replies with a 201 and an attribute of the provided text is returned in the following format:
```json
{
   "data": [{ "attribute": "ATTRIBUTE GOES HERE", "Sentiment": 0 }]
}
```
The returned attribute must be one of the following and must correspond to the respective sentiment number:

| Sentiment     | Attributes                                                |
|---------------|-----------------------------------------------------------|
| 0             | confusing, unfair, boring, unhelpful, disorganized        |
| 1             | knowledgeable, engaging, supportive, clear, passionate    |

## Running Automated AI Tests

To run the automated AI tests, navigate to the root `ai-server` directory, install the required dependencies by running `pip install -r requirements.txt`, and then run the tests using `pytest`.

## Automated Tests for AI

### Summary Function Test

- **Functionality Tested**: `/summary-test` endpoint
- **Expected Results**: A successful response with a placeholder summary.
- **Implementation**:
    ```python
    def test_summary_endpoint(self):
        response = self.client.post('/summary-test', data=json.dumps({"prompt": "Some professor reviews"}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertTrue("Lorem ipsum dolor sit amet" in response.json['data'][0]['response'])
    ```

### Semantic Analysis Test

- **Functionality Tested**: `/semantic-test` endpoint
- **Expected Results**: A successful response with a valid attribute and sentiment value.
- **Implementation**:
    ```python
    def test_semantic_endpoint(self):
        response = self.client.post('/semantic-test', data=json.dumps({"comment": "The professor was great"}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 201)
        expected_attributes = ['confusing', 'unfair', 'boring', 'unhelpful', 'disorganized', 'knowledgeable', 'engaging', 'supportive', 'clear', 'passionate', 'other']
        actual_data = response.json['data'][0]
        self.assertIn(actual_data['attribute'], expected_attributes)
        self.assertTrue(actual_data['Sentiment'] in [0, 1, None])
    ```