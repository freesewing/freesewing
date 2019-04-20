These are the breaking changes after switching to the monorepo:

 - freesewing is now @freesewing/core
 - @freesewing/patterns no longer includes @freesewing/examples (the pattern holding examples for the documentation)
 - @freesewing/patterns no longer includes @freesewing/plugin-bundle (our bundle of build-time plugins)
   FIXME: Won't this break things, and if so don't we need all plugins patterns depend on (like plugin-butons or plugin-bust)
 - We no longer build pure browser (IIFE) versions, only node (CommonJS) and module (ES) versions
