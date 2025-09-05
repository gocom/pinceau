if ! [ "$NVM_DIR" ]; then
  NVM_DIR="$HOME/.nvm"
fi

NVM="$NVM_DIR/nvm.sh"

if [ -e "$NVM" ]; then
  . "$NVM"

  if ! nvm use; then
    nvm install
    nvm use
  fi
else
  echo "nvm not found at $NVM" >&2
  echo "Will use any node and npm from PATH" >&2
fi
