# Functions
IS_DARWIN := $(filter Darwin,$(shell uname -s))

define set_env
	sed $(if $(IS_DARWIN),-i "",-i) -e "s/^#*\($(1)=\).*/$(if $(2),,#)\1$(2)/" .env
endef

# Environment
.PHONY: default
default: init up

.PHONY: init
init:
	test -f .env || cp .env.example .env
	$(call set_env,USER_ID,$(shell id -u))

.PHONY: up
up:
	DOCKER_BUILDKIT=1 docker compose up -d --build

.PHONY: down
down:
	docker compose down

.PHONY: shell
shell:
	docker compose exec app zsh

# Project
.PHONY: deps
run:
	docker compose exec app npm ci

.PHONY: run
run:
	docker compose exec app npm run start
