version?=dev
name=lawpilotfoundation

.PHONY: deps
deps:
	npm install --no-audit --no-fund

.PHONY: develop
develop: deps
	npm run dev

.PHONY: preview
preview: deps
	npm run build && npm run preview

.PHONY: build
build: deps
	npm run build

.PHONY: clean
clean:
	rm -rf node_modules dist

# Back-compat similar to Caramil naming
.PHONY: develop-site preview-site build-site
develop-site: develop
preview-site: preview
build-site: build


