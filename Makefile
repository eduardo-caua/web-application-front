PROJECT = "Web Application Front"

all: install test build serve
.PHONY: all

clean: ;@echo "Cleaning node_modules" \
	rm -rf node_modules
.PHONY: clean

test: ;@echo "Testing ${PROJECT}..."; \
	export NODE_PATH=.; \
	yarn run test
.PHONY: test

install: ;@echo "Installing ${PROJECT}..."; \
	npm install
.PHONY: install

dev: ;@echo "Installing ${PROJECT}..."; \
	yarn run start
.PHONY: dev

build: ;@echo "Building ${PROJECT}..."; \
	git pull --rebase; \
	yarn run build
.PHONY: build

serve: ;@echo "Starting ${PROJECT}..."; \
	export NODE_PATH=.; \
	yarn run serve
.PHONY: serve