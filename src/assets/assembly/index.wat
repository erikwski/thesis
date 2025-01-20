(module
 (type $0 (func (param f64 f64 f64) (result f64)))
 (type $1 (func (param f64 f64 f64 f64 f64) (result f64)))
 (type $2 (func (param f64 f64) (result f64)))
 (memory $0 0)
 (export "calculateEOQ" (func $assembly/index/calculateEOQ))
 (export "calculateTotalCost" (func $assembly/index/calculateTotalCost))
 (export "calculateReorderPoint" (func $assembly/index/calculateReorderPoint))
 (export "memory" (memory $0))
 (func $assembly/index/calculateEOQ (param $0 f64) (param $1 f64) (param $2 f64) (result f64)
  local.get $0
  local.get $0
  f64.add
  local.get $1
  f64.mul
  local.get $2
  f64.div
  f64.sqrt
 )
 (func $assembly/index/calculateTotalCost (param $0 f64) (param $1 f64) (param $2 f64) (param $3 f64) (param $4 f64) (result f64)
  local.get $0
  local.get $1
  f64.mul
  local.get $4
  f64.div
  local.get $4
  local.get $2
  f64.mul
  f64.const 0.5
  f64.mul
  f64.add
  local.get $0
  local.get $3
  f64.mul
  f64.add
 )
 (func $assembly/index/calculateReorderPoint (param $0 f64) (param $1 f64) (result f64)
  local.get $0
  local.get $1
  f64.mul
  f64.const 365
  f64.div
 )
)
