(module
 (type $0 (func (param f64 f64 f64) (result f64)))
 (type $1 (func (param f64 f64 f64 f64 f64) (result f64)))
 (type $2 (func (param i32 i32 i32 i32)))
 (type $3 (func (param i32)))
 (import "env" "abort" (func $~lib/builtins/abort (param i32 i32 i32 i32)))
 (global $~argumentsLength (mut i32) (i32.const 0))
 (memory $0 1)
 (data $0 (i32.const 1036) "\9c")
 (data $0.1 (i32.const 1048) "\02\00\00\00\8a\00\00\00L\00e\00a\00d\00 \00t\00i\00m\00e\00,\00 \00a\00n\00n\00u\00a\00l\00 \00d\00e\00m\00a\00n\00d\00,\00 \00a\00n\00d\00 \00w\00o\00r\00k\00i\00n\00g\00 \00d\00a\00y\00s\00 \00m\00u\00s\00t\00 \00b\00e\00 \00g\00r\00e\00a\00t\00e\00r\00 \00t\00h\00a\00n\00 \00z\00e\00r\00o\00.")
 (data $1 (i32.const 1196) "L")
 (data $1.1 (i32.const 1208) "\02\00\00\008\00\00\00s\00r\00c\00/\00a\00s\00s\00e\00t\00s\00/\00a\00s\00s\00e\00m\00b\00l\00y\00/\00i\00n\00d\00e\00x\00.\00t\00s")
 (export "calculateEOQ" (func $src/assets/assembly/index/calculateEOQ))
 (export "calculateTotalCost" (func $src/assets/assembly/index/calculateTotalCost))
 (export "calculateReorderPoint" (func $src/assets/assembly/index/calculateReorderPoint@varargs))
 (export "memory" (memory $0))
 (export "__setArgumentsLength" (func $~setArgumentsLength))
 (func $src/assets/assembly/index/calculateEOQ (param $0 f64) (param $1 f64) (param $2 f64) (result f64)
  local.get $0
  local.get $0
  f64.add
  local.get $1
  f64.mul
  local.get $2
  f64.div
  f64.sqrt
 )
 (func $src/assets/assembly/index/calculateTotalCost (param $0 f64) (param $1 f64) (param $2 f64) (param $3 f64) (param $4 f64) (result f64)
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
 (func $src/assets/assembly/index/calculateReorderPoint@varargs (param $0 f64) (param $1 f64) (param $2 f64) (result f64)
  block $1of1
   block $0of1
    block $outOfRange
     global.get $~argumentsLength
     i32.const 2
     i32.sub
     br_table $0of1 $1of1 $outOfRange
    end
    unreachable
   end
   f64.const 365
   local.set $2
  end
  local.get $1
  f64.const 0
  f64.le
  local.get $0
  f64.const 0
  f64.le
  i32.or
  local.get $2
  f64.const 0
  f64.le
  i32.or
  if
   i32.const 1056
   i32.const 1216
   i32.const 32
   i32.const 5
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $1
  f64.mul
  local.get $2
  f64.div
 )
 (func $~setArgumentsLength (param $0 i32)
  local.get $0
  global.set $~argumentsLength
 )
)
