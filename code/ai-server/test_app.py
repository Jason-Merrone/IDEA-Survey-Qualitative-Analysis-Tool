import json
from flask_testing import TestCase
from app import app

class TestFlaskAPI(TestCase):
    def create_app(self):
        app.config['TESTING'] = True
        return app

    def test_summary_endpoint(self):
        # This tests the real summary endpoint if needed. Commented out because it requires the full model to run.
        # response = self.client.post('/summary', data=json.dumps({"prompt": "Some professor reviews"}),
        #                             content_type='application/json')
        # self.assertEqual(response.status_code, 201)
        # self.assertIn('response', response.json['data'][0])

        # This tests the test endpoint for the summary function
        response = self.client.post('/summary-test', data=json.dumps({"prompt": "Some professor reviews"}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertTrue("Lorem ipsum dolor sit amet" in response.json['data'][0]['response'])

    def test_semantic_endpoint(self):
        # This tests the real semantic endpoint if needed. Commented out because it requires the full model to run.
        # response = self.client.post('/semantic', data=json.dumps({"comment": "The professor was great"}),
        #                             content_type='application/json')
        # self.assertEqual(response.status_code, 201)
        # self.assertIsNotNone(response.json['data'][0]['attribute'])
        # self.assertIsNotNone(response.json['data'][0]['Sentiment'])

        # This tests the test endpoint for the semantic function
        response = self.client.post('/semantic-test', data=json.dumps({"comment": "The professor was great"}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 201)
        expected_attributes = ['confusing', 'unfair', 'boring', 'unhelpful', 'disorganized','knowledgeable', 'engaging', 'supportive', 'clear', 'passionate','other']
        actual_data = response.json['data'][0]
        self.assertIn(actual_data['attribute'], expected_attributes)
        self.assertTrue(actual_data['Sentiment'] in [0, 1, None])

if __name__ == '__main__':
    import pytest
    pytest.main()
