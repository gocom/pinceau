.PHONY: all rebuild clean help install lint package start test watch

RUN = docker-compose run --rm build

all: build

build: node_modules
	$(RUN) npm run project:build

rebuild: node_modules
	$(RUN) npm run project:build

clean:
	$(RUN) rm -rf build dist node_modules package-lock.json

install:
	@$(RUN) bash -c 'read -r -p "Are you sure you want to try to install pinceau to your Firefox profile? This will overwrite files on your system and you may lose data. Proceed (Yes/no)? " answer && [[ "$answer" == [Yy]* ]]'
	@$(RUN) rm -rf node_modules package-lock.json
	npm install
	npm run project:install

lint: node_modules
	$(RUN) npm run lint

node_modules:
	$(RUN) npm install

package: build
	$(RUN) npm run project:pack

start: build
	docker-compose up

test: node_modules
	$(RUN) npm run test

watch: node_modules
	$(RUN) npm run watch

help:
	@echo "Manage project"
	@echo ""
	@echo "Usage:"
	@echo "  $$ make [command]"
	@echo ""
	@echo "Commands:"
	@echo ""
	@echo "  $$ make build"
	@echo "  Install dependencies and build project"
	@echo ""
	@echo "  $$ make rebuild"
	@echo "  Rebuilds the project"
	@echo ""
	@echo "  $$ make clean"
	@echo "  Clean installed dependencies and artifacts"
	@echo ""
	@echo "  $$ make install"
	@echo "  Install to your Firefox installation profiles"
	@echo ""
	@echo "  $$ make lint"
	@echo "  Lint code style"
	@echo ""
	@echo "  $$ make package"
	@echo "  Package build result to a distributable ZIP file"
	@echo ""
	@echo "  $$ make start"
	@echo "  Start server that allows registering OpenSearch providers"
	@echo ""
	@echo "  $$ make test"
	@echo "  Run tests"
	@echo ""
	@echo "  $$ make watch"
	@echo "  Watch files for changes and trigger build automatically"
	@echo "  and install new build to Firefox profiles"
	@echo ""
