from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import transformers
from transformers import pipeline

app = Flask(__name__)

CORS(app)

captioning_pipeline = pipeline("image-to-text", model="nlpconnect/vit-gpt2-image-captioning")

def caption_generation(image_url):

    data = captioning_pipeline(image_url)

    caption = data[0]['generated_text']

    return caption

@app.route('/generate_caption', methods = ['POST'])
def generate_image_caption():

    data = request.get_json()

    if 'image_url' not in data:
        return jsonify({"error":"No Image URL provided"}),400

    image_url = data['image_url']


    caption = caption_generation(image_url)

    return jsonify({'caption': caption})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)