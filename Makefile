version?=dev
name=lawpilotfoundation

.PHONY: deps
deps:
	yarn install

.PHONY: run
run:
	yarn dev

.PHONY: develop
develop: deps
	yarn dev

.PHONY: preview
preview: deps build
	yarn preview

.PHONY: build
build: deps
	yarn build

.PHONY: clean
clean:
	rm -rf node_modules dist out

# Back-compat similar to Caramil naming
.PHONY: develop-site preview-site build-site
develop-site: develop
preview-site: preview
build-site: build
