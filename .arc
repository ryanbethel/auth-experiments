@app
begin-app

@plugins
enhance/arc-plugin-enhance
arc-plugin-oauth

@bundles
@enhance-styles

@ws

@oauth
use-mock true
mock-list auth/mock-allow.mjs
allow-list auth/allow.mjs

@tables
magicsessions
  id *String

singletable
  pk *String
  sk **String

@tables-indexes
singletable
  gs1pk *String
  gs1sk **String


@events
create-magic-link
