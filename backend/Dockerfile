# Backend Dockerfile
FROM python:3.9-slim

WORKDIR /app

# Copy the requirements.txt file from the parent directory
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the rest of the application code
COPY backend/ .

EXPOSE 8001

CMD ["python", "manage.py", "runserver", "0.0.0.0:8001"]
