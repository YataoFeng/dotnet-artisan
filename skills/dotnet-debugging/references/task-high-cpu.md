# Task: High CPU

> **Quick Ref**: !runaway to find CPU-consuming threads | !clrstack on top consumers | ~Ns to switch to thread | !dumpstack for native frames | Tight loop vs GC pressure vs JIT | Check !threadpool queue depth

## Commands
- `!runaway`
- `~* kb`
- `~<thread> kv` for top CPU thread

## Deliver
- Hot thread(s) and owning module.
- Why CPU is consumed (loop, wait-spin, heavy work).
- Next command if more evidence is needed.
