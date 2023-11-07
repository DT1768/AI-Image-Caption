import json
import transformers
from transformers import pipeline

def caption_generation(image_url):

    captioning_pipeline = pipeline("image-to-text", model="nlpconnect/vit-gpt2-image-captioning")

    data = captioning_pipeline(image_url)

    caption = data[0]['generated_text']

    return caption
