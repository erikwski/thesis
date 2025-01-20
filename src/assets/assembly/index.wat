(module
 (type $0 (func (param f64 f64 f64) (result f64)))
 (type $1 (func (param f64 f64 f64 f64 f64) (result f64)))
 (type $2 (func (param f64 f64) (result f64)))
 (type $3 (func (param i32) (result f64)))
 (memory $0 0)
 (export "calculateEOQ" (func $assembly/index/calculateEOQ))
 (export "calculateTotalCost" (func $assembly/index/calculateTotalCost))
 (export "calculateReorderPoint" (func $assembly/index/calculateReorderPoint))
 (export "benchmarkCalculations" (func $assembly/index/benchmarkCalculations))
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
 (func $assembly/index/benchmarkCalculations (param $0 i32) (result f64)
  (local $1 i32)
  (local $2 f64)
  loop $for-loop|0
   local.get $0
   local.get $1
   i32.gt_s
   if
    local.get $2
    f64.const 20698.217653523912
    f64.add
    local.set $2
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|0
   end
  end
  local.get $2
 )
)
