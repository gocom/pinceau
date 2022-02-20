.PHONY: all build check-build clean help install lint package start test watch

all: build-clean

build: node_modules
	npm run project:build

check-build: node_modules
ifeq (,$(wildcard ./build))
	npm run project:build
endif

clean:
	rm -rf build dist node_modules package-lock.json

install: check-build
	npm run project:install

lint: node_modules
	npm run lint

node_modules:
	npm install

package: check-build
	npm run project:pack

start: check-build
	npm run start

test: node_modules
	npm run test

watch: node_modules
	npm run watch

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
