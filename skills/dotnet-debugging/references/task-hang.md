# Task: Hang / UI Unresponsive

> **Quick Ref**: !syncblk for lock contention | !dlk for deadlock detection | ~*e!clrstack to see all thread stacks | !threadpool for thread pool starvation | !dumpheap -type WaitHandle for async hangs | Check if GC is blocking

## Commands
- `!analyze -hang`
- `~* kb`
- `!uniqstack -pn`
- `!locks`
- `~<thread> kv` for key threads

## Deliver
- Blocked UI or primary thread.
- Blocking/callee path.
- Deadlock vs synchronous wait-chain classification.
