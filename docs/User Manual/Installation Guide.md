# IDEA Ideas Installation Guide

## Table of Contents
1. [Introduction](#introduction)
2. [System Requirements and Recommendations](#system-requirements-and-recommendations)
3. [Software Prerequisites](#software-prerequisites)
   - [Node.js](#nodejs)
   - [Bun](#bun)
   - [Docker](#docker)
4. [Getting Started](#getting-started)
   - [Website Setup](#website-setup)
   - [Database Setup](#database-setup)
   - [AI Setup](#ai-setup)
   - [USU Single Sign-On (SSO) Setup](#usu-single-sign-on-sso-setup)
5. [Common Issues](#common-issues)

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
The AI model is run through a Python Flask server. In order to use the AI model, you need to have Python installed on your machine. You can find Python downloads and installation instructions on the [Python website](https://www.python.org/). When installing Python, please make sure to install `pip` when installing Python.

## Getting Started
### Website Setup
Once you have downloaded the repository with the IDEA Ideas code, navigate to the directory with the website code. Once you are in the directory, copy the contents of `.env.example` to a file named `.env`. After copying the enivronmental variables, run `bun install`. This should install any neccessary Node.js packages.
```bash
bun install
```

After installing all `Node.js` packages, you can run `bun dev` to start the web server. The terminal should tell you which URL the website is accessible on (by default the URL is `localhost:3000`).
```bash
bun dev
```

### Database Setup
Once you have downloaded the repository with the IDEA Ideas code, navigate to the directory with the website code. Make sure Docker Desktop is running an configured for your system, and run the database setup script in the website code directory `/start-database.sh`. This will create the Docker container and run it.
```bash
./start-database.sh
```

After creating the Docker container and verifying that it is running, run `bun db:push` in your terminal.
```bash
bun db:push
```

### AI Setup


### USU Single Sign-On (SSO) Setup

## Common Issues