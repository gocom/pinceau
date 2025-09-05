.PHONY: all build clean help install lint package shell start test watch
.ONESHELL:
.SHELLFLAGS = -ec

NPM = npm

all: build

build:
	@. ./dev/hook/nvm.sh
	@$(MAKE) -s node_modules
	$(NPM) run project:build

build-once:
ifeq (,$(wildcard build))
	$(MAKE) build
endif

clean:
	rm -rf build dist node_modules package-lock.json

install:
	@. ./dev/hook/nvm.sh
	read -r -p "Are you sure you want to try to install pinceau to your Firefox profile? This requires that node and npm are installed on the host system. This will overwrite files on your system and you may lose data. Proceed (Yes/no)? " answer

	case "$$answer" in
		y*|Y*) ;;
		*) exit 1 ;;
	esac

	@$(MAKE) -s node_modules
	@$(MAKE) -s build-once
	$(NPM) run project:install

lint:
	@. ./dev/hook/nvm.sh
	$(NPM) run lint

node_modules:
ifeq (,$(wildcard node_modules))
	@. ./dev/hook/nvm.sh
	$(NPM) install
endif

package:
	@. ./dev/hook/nvm.sh
	@$(MAKE) -s build-once
	$(NPM) run project:pack

start:
	@. ./dev/hook/nvm.sh
	@$(MAKE) -s node_modules
	$(NPM) run start

test:
	@. ./dev/hook/nvm.sh
	@$(MAKE) -s node_modules
	$(NPM) run test

watch:
	@. ./dev/hook/nvm.sh
	@$(MAKE) -s node_modules
	$(NPM) run watch

help:
	@echo "Manage project"
	@echo ""
	@echo "Usage:"
	@echo "  $$ make [command] ["
	@echo "    [FIREFOX_PROFILES=<path>]"
	@echo "  ]"
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
	@echo "Environment variables:"
	@echo ""
	@echo "  FIREFOX_PROFILES"
	@echo "  Path to the parent directory containing Firefox profile directories."
	@echo ""
