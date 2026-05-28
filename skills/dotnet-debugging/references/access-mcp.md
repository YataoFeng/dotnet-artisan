# Access WinDbg MCP

> **Quick Ref**: WinDbg MCP server must be running before commands | Connect via mcp__mcp-windbg__run_windbg_cmd | Test connection with basic command first | All WinDbg commands go through MCP tools | MCP handles symbol path and session management

## 1. Install Prerequisites
- Follow [mcp setup](./mcp-setup.md) to install `uvx` and `cdb.exe`.

## 2. Configure MCP Server
Register WinDbg MCP in your MCP config (for example `mcp.json`) using:

```bash
uvx --from git+https://github.com/svnscha/mcp-windbg mcp-windbg
```

## 3. Verify MCP Access
Confirm WinDbg MCP tools are callable:
- `mcp_mcp-windbg_list_windbg_dumps`
- `mcp_mcp-windbg_open_windbg_dump`
- `mcp_mcp-windbg_open_windbg_remote`

If these tools are unavailable, reload chat/session after MCP config changes.
