# Task: Crash / Exception

> **Quick Ref**: !analyze -v → exception type and faulting thread | .exr -1 for exception record | !pe for detailed exception info | !clrstack -p for managed stack with params | Check inner exceptions | Verify crash is not OOM first

## Commands
- `!analyze -v`
- `.ecxr`
- `k`
- `lmv m <faulting-module-if-known>`

## Deliver
- Faulting exception context.
- Faulting module and top stack path.
- Most likely crash trigger and confidence.
