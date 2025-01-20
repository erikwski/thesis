(module
 (type $0 (func (param i32 i32 i32 i32)))
 (type $1 (func (param f64 f64 f64) (result f64)))
 (import "env" "abort" (func $~lib/builtins/abort (param i32 i32 i32 i32)))
 (memory $0 1)
 (data $0 (i32.const 1036) "\\")
 (data $0.1 (i32.const 1048) "\02\00\00\00L\00\00\00D\00,\00 \00S\00,\00 \00a\00n\00d\00 \00H\00 \00m\00u\00s\00t\00 \00b\00e\00 \00g\00r\00e\00a\00t\00e\00r\00 \00t\00h\00a\00n\00 \00z\00e\00r\00o\00.")
 (data $1 (i32.const 1132) "L")
 (data $1.1 (i32.const 1144) "\02\00\00\008\00\00\00s\00r\00c\00/\00a\00s\00s\00e\00t\00s\00/\00a\00s\00s\00e\00m\00b\00l\00y\00/\00i\00n\00d\00e\00x\00.\00t\00s")
 (export "calculateEOQ" (func $src/assets/assembly/index/calculateEOQ))
 (export "memory" (memory $0))
 (func $src/assets/assembly/index/calculateEOQ (param $0 f64) (param $1 f64) (param $2 f64) (result f64)
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
   i32.const 1152
   i32.const 3
   i32.const 5
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $0
  f64.add
  local.get $1
  f64.mul
  local.get $2
  f64.div
  f64.sqrt
 )
)
