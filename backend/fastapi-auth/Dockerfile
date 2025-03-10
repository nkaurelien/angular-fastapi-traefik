# Use the official Python image from the Docker Hub
FROM python:3.12.5

# Set the working directory in the container
WORKDIR /tmp

# Install any needed packages specified in requirements.txt
RUN pip install poetry

# Configure poetry to not create a virtual environment
RUN poetry config virtualenvs.create false

# Install the project dependencies
COPY ./pyproject.toml ./poetry.lock* /tmp/
RUN poetry install

WORKDIR /code

# Copy the current directory contents into the container at /app
COPY app /code/src/app

WORKDIR /code/src

# Command to run the application using uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
