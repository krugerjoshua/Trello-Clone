FROM elixir:1.19.5-slim

RUN apt-get update -y && apt-get install -y build-essential git curl \
    && apt-get clean && rm -f /var/lib/apt/lists/*_*

RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs

WORKDIR /app

RUN mix local.hex --force && mix local.rebar --force

ENV MIX_ENV="prod"

COPY mix.exs mix.lock ./
RUN mix deps.get --only $MIX_ENV
RUN mkdir config
COPY config/config.exs config/${MIX_ENV}.exs config/

RUN mix deps.compile

COPY assets/package.json assets/package-lock.json ./assets/
RUN npm install --prefix assets

COPY priv priv
COPY assets assets
RUN mix assets.deploy

COPY lib lib
RUN mix compile

COPY config/runtime.exs config/
COPY rel rel
RUN mix release

ENV PHX_SERVER=true

RUN chmod +x /app/_build/prod/rel/phoenix_trello/bin/migrate \
    && chmod +x /app/_build/prod/rel/phoenix_trello/bin/server \
    && chmod +x /app/_build/prod/rel/phoenix_trello/bin/phoenix_trello

CMD /app/_build/prod/rel/phoenix_trello/bin/migrate && /app/_build/prod/rel/phoenix_trello/bin/server