.PHONY: all build install package test start watch

all:
	@$(MAKE) install

build:
	npm run project:build

install:
	npm run project:build
	npm run project:install

package:
	npm run test
	npm run project:build
	npm run project:pack

test:
	npm run test

start:
	npm run start

watch:
	npm run watch
