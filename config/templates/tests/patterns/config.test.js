// This file is auto-generated.
// Changes you make will be overwritten.
const {{ Pattern }}  = require('../dist')
const testPatternConfig = require('../../../tests/patterns/config')

// The pattern's metadata from package.json
const meta = {{ metadata }}

// Test config
testPatternConfig('{{ pattern }}', new {{ Pattern }}(), meta)
