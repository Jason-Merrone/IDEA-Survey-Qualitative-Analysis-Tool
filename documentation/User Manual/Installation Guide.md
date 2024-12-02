# IDEA Ideas Installation Guide

## Table of Contents
1. [Introduction](#introduction)
2. [System Requirements and Recommendations](#system-requirements-and-recommendations)
3. [Software Prerequisites](#software-prerequisites)
   - [Node.js](#nodejs)
   - [Bun](#bun)
   - [Docker](#docker)
   - [Python](#python)
4. [Getting Started](#getting-started)
   - [Cloning the Git Repository](#cloning-the-git-repository)
   - [Setup Script](#setup-script)
   - [Setting Up the AI Model](#setting-up-the-ai-model)
   - [USU Single Sign-On Setup](#usu-single-sign-on-setup)
   - [Setting Website Environment Variables](#setting-website-environment-variables)
   - [Setting Up the Website](#setting-up-the-website)
   - [Setting Up the Database](#setting-up-the-database)
   - [Starting the Web Server](#starting-the-web-server)

## Introduction
Welcome to the IDEA Ideas web application! This installation guide will walk you through all the steps of installing and hosting IDEA Ideas on your local machine.

## System Requirements and Recommendations
IDEA Ideas uses a local generative AI model to help process student feedback from course surveys. The AI model requires either a discrete graphics card (GPU) with 4GB of VRAM or a machine with at least 8GB of RAM (using a GPU is highly recommended over using a CPU).

## Software Prerequisites
### Node.js
IDEA Ideas runs on the Node.js JavaScript runtime environment. Node.js v22.11.0 (LTS) is the recommended and supported version of Node.js for running IDEA Ideas. Node.js can be downloaded from the official [Node.js website](https://nodejs.org/en/download/package-manager). We also recommend using the Node Version Manager (`nvm`) when installing multiple versions of Node.js on the same system. Instructions for downloading and installing `nvm` can be found on the official [Node Version Manager GitHub](https://github.com/nvm-sh/nvm).

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash  # Linux and MacOS
```

### Bun
Bun is the Node.js package manager used for IDEA Ideas. Bun will need to be installed on your system. Installation instructions can be found on the [Bun website](https://bun.sh/).

```bash
curl -fsSL https://bun.sh/install | bash     # Linux and MacOS
powershell -c "irm bun.sh/install.ps1 | iex" # Windows
```

### Docker
The database for IDEA Ideas is hosted in a Docker container. In order to use Docker containers, you need to install Docker Desktop on your machine. The installer download and installation instructions for Docker Desktop can be found on the [official Docker website](https://www.docker.com/products/docker-desktop/).

### Python
The AI model is run through a Python Flask server. In order to use the AI model, you need to have Python installed on your machine. You can find Python downloads and installation instructions on the [Python website](https://www.python.org/). When installing Python, please make sure to install `pip` along with Python. IDEA Ideas requires Python 3.8 or newer.

## Getting Started
Please follow the given steps to start all of the individual services and servers that are required for IDEA Ideas to run.

### Cloning the Git Repository
The Git repository for IDEA Ideas can be cloned through SSH or HTTPS
```bash
git clone --single-branch --branch master git@gitlab.cs.usu.edu:a02297804/cs3450-team-1-project.git idea-ideas
```
or
```bash
git clone --single-branch --branch master https://gitlab.cs.usu.edu/a02297804/cs3450-team-1-project.git idea-ideas
```

### Setting Up the AI Model

**IMPORTANT NOTE FOR THE IN-CLASS DEMO ONLY**: Given the large file sizes and required processing power, the AI will be hosted on a separate server for the demonstration, which will not require you to install and run the AI model on your local machine. Following the instructions in the [Setting Website Environment Variables](#setting-website-environment-variables) section will point your server to the correct server hosting the AI model. You may [skip this step](#usu-single-sign-on-setup) and move on with the installation guide.

In your current terminal window, navigate to `code/ai-server` (the AI server directory) in the project repository. Once you are in the correct directory, use the following commands to create a virtual Python environment and install the necessary dependencies.

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

From the AI server directory (`code/ai-server`), navigate to `/train/loras`. 

Due to the large file size, you will need to download the compressed Lora files from [Box](https://usu.box.com/s/lkhwa4i88vzo97z94eiahzrned3xg5q3) and place the downloaded file in `code/ai-server/train/loras`.

In this directory (`code/ai-server/train/loras`), run the following command to uncompress the AI model training files:
```bash
tar -xzf loras.tar.gz
```

After uncompressing the training files, return to the AI server directory (`code/ai-server`) and run the following command to download the AI model and start the Flask server hosting the model:
```bash
flask run
```

## Setup Script
In the `code` directory, there is a bash script titled `start.sh`. This script will set up the SSO server, web server, and database automatically for you. It is supported for MacOS and Linux (or WSL).

Apart from the software prerequisites listed above, the following packages are **required** to be install on your operating system for the script to run successfully.
- `tmux`
- `unzip`

After cloing the repository, you will need to run the following command to make the script executable:
```bash
chmod +x start.sh
```

After running the script, you should be able to use IDEA Ideas by accessing the website at `http://localhost:3000`.

If you run into any issues with the script, I would recommend moving on with the manual setup instructions below.

**Common Issue with the Startup Script**: After creating the MySQL database in a Docker container, the script waits 30 seconds for the database to be ready before attemping to push the database schema to it. If 30 seconds is not enough, this step will fail and you will need to run `bun db:push` in the `code/web-server` directory.

### USU Single Sign-On Setup
In a new terminal window (leave the previous terminal windows open and running), navigate to `code/sso-server` (the directory with the SSO server code). Once you are in the directory, copy the contents of `.env.example` to a new file in the directory named `.env`.

From the SSO directory, run the following commands to install the required dependencies:
```bash
bun install
```

To run the SSO server, run
```bash
bun run start
```

### Setting Website Environment Variables
In a new terminal window (leave the previous terminal windows open and running), navigate to `code/web-server` (the directory with the website code). Once you are in the directory, copy the contents of `.env.example` to a new file in the directory named `.env`.

### Setting Up the Website
In the same terminal window as the previous step, navigate to the directory with the website code (`code/web-server` if you are not already there). From that directory, run `bun install`. This should install any necessary Node.js packages.
```bash
bun install
```

### Setting Up the Database
In a new terminal window (leave the previous terminal windows open and running), navigate to the directory with the website code (`code/web-server`). Make sure Docker Desktop is running and configured for your system, and run the database setup script in the website code directory `/start-database.sh`. This will create the Docker container and run it.
```bash
./start-database.sh
```

After creating the Docker container and verifying that it is running, run `bun install` and `bun db:push` in your terminal.
```bash
bun install
bun db:push
```

If `bun db:push` fails, wait a few seconds for the Docker container to start up, run `bun install` again, then run `bun db:push` again.

### Starting the Web Server
From the previous terminal window with the website directory (`code/web-server`) open, you can run `bun dev` to start the web server. The terminal should tell you which URL the website is accessible on (by default, the URL is `localhost:3000`).
```bash
bun dev
```