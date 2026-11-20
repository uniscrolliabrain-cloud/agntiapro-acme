import {TOOLS,createToolDispatcher} from './tool-catalog.mjs';
/** Adapter seam: use official MCP SDK, bind ListTools/CallTool handlers here. */
export function createMcpService(dependencies){
 return {tools:TOOLS,callTool:createToolDispatcher(dependencies),async start(){throw new Error('MCP transport and identity provider not wired');}};
}
