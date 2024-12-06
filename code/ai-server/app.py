from flask import Flask, request
import random

#AI imports
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

app = Flask(__name__)


base_model_id = "unsloth/Llama-3.2-3B-Instruct-bnb-4bit"

device = "cuda" if torch.cuda.is_available() else "cpu"

tokenizer = AutoTokenizer.from_pretrained(base_model_id)
model = AutoModelForCausalLM.from_pretrained(
    base_model_id,
    device_map=device).to(device)


model.load_adapter("train/loras/sentiment-llama3-full", adapter_name="sentiment")
model.load_adapter("train/loras/negativeattr-llama3-full", adapter_name="negative")
model.load_adapter("train/loras/posattr-llama3-full", adapter_name="positive")

special_tokens = {
    "begin_of_text": "<|begin_of_text|>,",
    "start_header_id": "<|start_header_id|>",
    "end_header_id": "<|end_header_id|>",
    "eot_id": "<|eot_id|>"
}

model.config.pad_token_id = tokenizer.pad_token_id
model.config.eos_token_id = tokenizer.eos_token_id

def predict(custom_prompt, comments, adapters_on, adapter_name):
    model.disable_adapters()

    if adapters_on:
        model.enable_adapters()
        model.set_adapter(adapter_name)

    # Construct the prompt
    prompt = (
        f"{special_tokens['begin_of_text']}{special_tokens['start_header_id']}system{special_tokens['end_header_id']}\n"
        "You are a helpful assistant."
        f"{special_tokens['eot_id']}{special_tokens['start_header_id']}user{special_tokens['end_header_id']}\n"
        f"{custom_prompt}{comments}"
        f"{special_tokens['eot_id']}{special_tokens['start_header_id']}assistant{special_tokens['end_header_id']}"
    )

    # Tokenize and prepare inputs
    inputs = tokenizer(prompt, return_tensors="pt").to(device)
    
    # Generate output
    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            do_sample=False,
            max_new_tokens=10000,
            # temperature=0.7,
            # top_k=50,
            # top_p=0.9
        )

    # Decode generated text
    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=False)

    # Find the ai's response start
    assistant_start = f"{special_tokens['start_header_id']}assistant{special_tokens['end_header_id']}"
    response_start_idx = generated_text.rfind(assistant_start) + len(assistant_start)

    # Extract only the ai's response
    response = generated_text[response_start_idx:].strip()

    # Clean up residual special tokens
    for token in special_tokens.values():
        response = response.replace(token, "").strip()

    return response


@app.post('/summary')
def summary():
    request_data = request.get_json()
    prompt = request_data.get("prompt")

    custom_prompt = 'You are about to be provided a series of reviews for a professor written by their students. Please provide a detailed summary to the professor in question. Reviews: '

    # Get sentiment score
    res = predict(custom_prompt, prompt, False, "") # Last attribute left blank because there is no LoRa being used for summarization
    
    response = {"data": [{"response":res}]}
    return response, 201

@app.post('/semantic')
def semantic():
    request_data = request.get_json()
    comments = request_data.get("comment")

    sentiment_prompt = 'Provide a sentiment score for the following comment. The score should be either 0 or 1 (For negative or positive). Output just the score and nothing more. Comment: '
    positive_prompt = 'Provide an attribute for the following comment. The attribute should one of the following: knowledgeable, engaging, supportive, clear, passionate. Output just the attribute and nothing more. Comment: '
    negative_prompt = 'Provide an attribute for the following comment. The attribute should one of the following: confusing, unfair, boring, unhelpful, disorganized. Output just the attribute and nothing more. Comment: '
    
    positive_attributes = ['knowledgeable', 'engaging', 'supportive', 'clear', 'passionate']
    negative_attributes = ['confusing', 'unfair', 'boring', 'unhelpful', 'disorganized']

    # Get sentiment score
    sentiment = predict(sentiment_prompt, comments, True, "sentiment")
    if("0" in sentiment):
        sentiment = 0
    elif("1" in sentiment):
        sentiment = 1
    else:
        sentiment = None
    
    # Get attribute based on sentiment score
    attribute = "other"
    if(sentiment == 1):
        attribute_temp = predict(positive_prompt, comments, True, "positive")
        for attr in positive_attributes:
            if attr in attribute_temp:
                attribute = attr
                break
    elif(sentiment == 0):
        attribute_temp = predict(negative_prompt, comments, True, "negative")
        for attr in negative_attributes:
            if attr in attribute_temp:
                attribute = attr
                break
    
    response = {"data": [{"attribute": attribute, "Sentiment": sentiment}]}
    return response, 201


# TEST ENDPOINTS
# Below are test endpoints. They are stand ins for the real endpoints but do not require the LLMs to be active. Used for testing purposes.

@app.post('/summary-test')
def summary_test():
    request_data = request.get_json()
    response = {"data": [{"response":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}]}
    return response, 201

@app.post('/semantic-test')
def semantic_test():
    request_data = request.get_json()

    sentiment = random.randint(0,1)

    attribute = "confusing"
    if(sentiment == 1):
        attribute = "knowledgeable"
    
    response = {"data":[{"attribute": attribute, "Sentiment": sentiment}]}
    return response, 201
