from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

from caption_generation import caption_generation

app = Flask(__name__)

CORS(app)

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