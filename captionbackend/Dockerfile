# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy requirements file to the working directory
COPY requirements.txt ./

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Download the Hugging Face model during the build phase
RUN python -c "from transformers import pipeline; captioning_pipeline = pipeline('image-to-text', model='nlpconnect/vit-gpt2-image-captioning')"

# Copy the current directory contents into the container at /usr/src/app
COPY app.py .

# Expose port 5000
EXPOSE 8000


# Run app.py when the container launches
CMD ["python", "./app.py"]
