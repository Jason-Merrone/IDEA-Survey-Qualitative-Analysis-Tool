#!/bin/bash

for cmd in tmux unzip docker; do
    if ! command -v $cmd &>/dev/null; then
        echo "$cmd not found. Please install before proceeding."
        echo "tmux can be installed with `brew install tmux (MacOS)` or `sudo apt install tmux (Linux)`"
        echo "unzip can be installed with `brew install unzip (MacOS)` or `sudo apt install unzip (Linux)`"
        echo "Docker Desktop can be installed from from https://www.docker.com"
        exit 1
    fi
done

if [ -s "$HOME/.nvm/nvm.sh" ]; then
    source "$HOME/.nvm/nvm.sh"
elif [ -s "/usr/local/nvm/nvm.sh" ]; then
    source "/usr/local/nvm/nvm.sh"
fi

echo "Checking for nvm..."
if ! command -v nvm &> /dev/null; then
  echo "nvm not found, installing..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
  source ~/.nvm/nvm.sh
fi

echo "Checking for bun..."
if ! command -v bun &>/dev/null; then
    echo "bun not found, installing..."
    curl -fsSL https://bun.sh/install | bash
fi

echo "Installing Node.js v22.11.0 (LTS) via nvm..."
nvm install 22.11.0
nvm use 22.11.0

TMUX_SESSION="IDEA-Ideas"
tmux kill-session -t $TMUX_SESSION 2>/dev/null

tmux has-session -t $TMUX_SESSION 2>/dev/null || tmux new-session -d -s $TMUX_SESSION

tmux new-window -t $TMUX_SESSION -n 'SSO Server'
tmux send-keys -t $TMUX_SESSION:1 "cd $(pwd)/sso-server && cp .env.example .env && bun install && bun run start" C-m

tmux new-window -t $TMUX_SESSION -n 'Web Server Setup'
tmux send-keys -t $TMUX_SESSION:2 "cd $(pwd)/web-server && cp .env.example .env && bun install" C-m

tmux new-window -t $TMUX_SESSION -n 'Database'
tmux send-keys -t $TMUX_SESSION:3 "cd $(pwd)/web-server && ./start-database.sh" C-m
echo "Waiting 30 seconds for the database to be ready..."
sleep 30
tmux send-keys -t $TMUX_SESSION:3 "bun db:push" C-m

tmux new-window -t $TMUX_SESSION -n 'Web Server'
tmux send-keys -t $TMUX_SESSION:4 "cd $(pwd)/web-server && bun dev" C-m

echo "All services are running in tmux. Attaching to the session..."
tmux attach-session -t $TMUX_SESSION