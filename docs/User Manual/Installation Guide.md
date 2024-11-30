# IDEA Ideas Installation Guide

## Table of Contents

## Introduction
Welcome to the IDEA Ideas web application! This installation guide will walk you through all the steps of installating and hosting IDEA Ideas on your local machine.

## System Requirements and Recommendations
IDEA Ideas uses a local generative AI model to help process student feedback from course surveys. The AI model does require either a discrete graphics card (GPU) with 4GB of VRAM or a machine with at least 8GB of RAM (using a GPU is highly recommended to using a CPU).

## Software Prerequisites
### Node.js
IDEA Ideas runs on the Node.js JavaScript runtime environment. Node.js v22.11.0 (LTS) is the recommended and supported version of Node.js for running IDEA Ideas. Node.js can be downloaded from the official [Node.js website](https://nodejs.org/en/download/package-manager). We also recommend using Node Version Manager (`nvm`) when installing multiple versions of Node.js on the same system. Instructions for downloading and installing `nvm` can be found on the official [Node Version Manager GitHub](https://github.com/nvm-sh/nvm).

### Bun
Bun is the Node.js package manager used for IDEA Ideas. Bun will need to be installed on your system. Installation instructions can be found on the [Bun website](https://bun.sh/).

### Docker
The database for IDEA Ideas is hosted in a Docker container. In order to use Docker containers, you need to install Docker Desktop on your machine. The installer download and snstallation instructions for Docker Desktop can be found on the [official Docker website](https://www.docker.com/products/docker-desktop/).

### Python
The AI model is run through a Python Flask server. In order to use the AI model, you need to have Python installed on your machine. You can find Python downloads and installation instructions on the [Python website](https://www.python.org/). When installing Python, please make sure to install `pip` when installing Python. IDEA Ideas requires a Python 3.8 or newer.

## Getting Started
Please follow the given steps to start all of the individual services and servers that are required for IDEA Ideas to run.

### Cloning the Git Repository
The Git repository for IDEA Ideas can be cloned through SSH or HTTPS
```bash
git clone git@gitlab.cs.usu.edu:a02297804/cs3450-team-1-project.git idea-ideas
```
or
```bash
git clone https://gitlab.cs.usu.edu/a02297804/cs3450-team-1-project.git idea-ideas
```

### Setting Up the AI Model
In your current terminal window, navigate to the directory with the AI model code. Once you are in the directory, use the following commands to create a virtual Python environment and install the correct dependencies.

Creating the Virtual Environment:
```bash
python3 -m venv env
source env/bin/activate    # On macOS and Linux
env\Scripts\activate       # On Windows
```

Installing Dependencies:
```bash
pip3 install -r requirements.txt
```

From the AI directory, navigate to `/train/loras`. In this directory, run the following command to uncompress the AI model training files:
```bash
tar -xzf loras.tar.gz
```

After uncompressing the training files, return to the AI model base directory and run the following command to download the AI model and start the Flask server hosting the model:
```bash
flask run
```

### USU Single Sign-On Setup
In a new terminal window (leave the previous terminal windows open and running), navigate to the directory with the SSO server code. Once you are in the directory, copy the contents of `.env.example` to a new file in the directory named `.env`.

From the SSO directory, run the following commands to install the required dependencies:
```bash
bun install
```

To run the SSO server, run
```bash
bun run start
```

### Setting Website Environment Variables
In a new terminal window (leave the previous terminal windows open and running), navigate to the directory with the website code. Once you are in the directory, copy the contents of `.env.example` to a new file in the directory named `.env`.

### Setting Up the Website
In the same terminal window as the previous step, navigate to the directory with the website code (if you are not already there). From that directory, run `bun install`. This should install any neccessary Node.js packages.
```bash
bun install
```

### Setting Up the Database
In a new terminal window (leave the previous terminal windows open and running), navigate to the directory with the website code. Make sure Docker Desktop is running an configured for your system, and run the database setup script in the website code directory `/start-database.sh`. This will create the Docker container and run it.
```bash
./start-database.sh
```

After creating the Docker container and verifying that it is running, run `bun db:push` in your terminal.
```bash
bun db:push
```

### Starting the Web Server
From the previous terminal window with the website directory open, you can run `bun dev` to start the web server. The terminal should tell you which URL the website is accessible on (by default the URL is `localhost:3000`).
```bash
bun dev
```

## Common Issues
- `bun db:push` not working:
   - If `bun db:push` gives an error, run `bun install` again before trying `bun db:push` again. This error can occur if you change any environment variable in `.env` after running `bun install`.