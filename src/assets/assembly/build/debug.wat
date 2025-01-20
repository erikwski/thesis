(module
 (type $0 (func (param i32 i32 i32 i32)))
 (type $1 (func (param f64 f64 f64) (result f64)))
 (import "env" "abort" (func $~lib/builtins/abort (param i32 i32 i32 i32)))
 (global $~lib/memory/__data_end i32 (i32.const 188))
 (global $~lib/memory/__stack_pointer (mut i32) (i32.const 32956))
 (global $~lib/memory/__heap_base i32 (i32.const 32956))
 (memory $0 1)
 (data $0 (i32.const 12) "\\\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00L\00\00\00D\00,\00 \00S\00,\00 \00a\00n\00d\00 \00H\00 \00m\00u\00s\00t\00 \00b\00e\00 \00g\00r\00e\00a\00t\00e\00r\00 \00t\00h\00a\00n\00 \00z\00e\00r\00o\00.\00")
 (data $1 (i32.const 108) "L\00\00\00\00\00\00\00\00\00\00\00\02\00\00\008\00\00\00s\00r\00c\00/\00a\00s\00s\00e\00t\00s\00/\00a\00s\00s\00e\00m\00b\00l\00y\00/\00i\00n\00d\00e\00x\00.\00t\00s\00\00\00\00\00")
 (table $0 1 1 funcref)
 (elem $0 (i32.const 1))
 (export "calculateEOQ" (func $src/assets/assembly/index/calculateEOQ))
 (export "memory" (memory $0))
 (func $src/assets/assembly/index/calculateEOQ (param $D f64) (param $S f64) (param $H f64) (result f64)
  (local $x f64)
  local.get $D
  f64.const 0
  f64.le
  if (result i32)
   i32.const 1
  else
   local.get $S
   f64.const 0
   f64.le
  end
  if (result i32)
   i32.const 1
  else
   local.get $H
   f64.const 0
   f64.le
  end
  if
   i32.const 32
   i32.const 128
   i32.const 3
   i32.const 5
   call $~lib/builtins/abort
   unreachable
  end
  block $~lib/math/NativeMath.sqrt|inlined.0 (result f64)
   f64.const 2
   local.get $D
   f64.mul
   local.get $S
   f64.mul
   local.get $H
   f64.div
   local.set $x
   local.get $x
   f64.sqrt
   br $~lib/math/NativeMath.sqrt|inlined.0
  end
  return
 )
)
