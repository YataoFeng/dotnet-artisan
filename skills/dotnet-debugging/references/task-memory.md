# Task: Memory Pressure / Leak Suspicion

> **Quick Ref**: !dumpheap -stat for type/size overview | !gcroot on large objects | !eeheap -gc for GC heap segments | !objsize for retained memory | !finalizequeue for pending finalizers | SOH vs LOH separation matters | Check for pinned objects

## Commands
- `!address -summary`
- `!heap -s`
- `lm`

## Deliver
- Memory growth area and likely owner.
- Heap summary interpretation.
- Whether evidence indicates leak vs transient pressure.
