BIN = ./node_modules/.bin
TESTS = test/*.test.js
TEST_OPTIONS = --coverage

all: test docs
.PHONY: all

lint:
	@echo "Linting..."
	@$(BIN)/eslint .
lint-fix:
	@echo "Linting with fix flag..."
	@$(BIN)/eslint --fix .
lint-json:
	@echo "Linting JSON..."
	@$(BIN)/jsonlint -q package.json .esdoc.json
.PHONY: lint lint-fix lint-json

test: lint lint-json
	@echo "Testing..."
	$(BIN)/jest $(TEST_OPTIONS)
.PHONY: test test-cov

docs: docs-clean
	$(BIN)/esdoc
docs-clean:
	rm -rf docs
docs-open: docs
	open docs/index.html
.PHONY: docs docs-clean docs-open
