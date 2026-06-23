"use client";
import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type Connection,
  Background,
  Controls,
  Panel,
} from "@xyflow/react";
import { nodeComponents } from "@/config/react-flow";

import { useSuspenseWorkflowbyId } from "@/features/editor/hooks/use-get-workflow-by-id";
import "@xyflow/react/dist/style.css";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import NodeSelector from "@/components/workflow-node/node-selector";

export default function EditorView({ workflowId }: { workflowId: string }) {
  const { data } = useSuspenseWorkflowbyId(workflowId);
  const [nodes, setNodes] = useState<Node[]>(data.nodes);
  const [edges, setEdges] = useState<Edge[]>(data.connections);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  return (
    <div className="size-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeComponents}
        fitView
      >
        <Controls />
        <Background />
        <Panel position={"top-right"}>
          <NodeSelector asChild>
            <Button variant={"secondary"}>
              <PlusIcon />
            </Button>
          </NodeSelector>
        </Panel>
      </ReactFlow>
    </div>
  );
}
