"use client";
import ReactFlow, {
  Background,
  Edge,
  Node,
  EdgeProps,
  getBezierPath,
  BaseEdge,
  EdgeLabelRenderer,
} from 'reactflow';
import 'reactflow/dist/style.css';

function AnimatedDashedEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      {/* Glowing background path */}
      <BaseEdge
        id={`${id}-glow`}
        path={edgePath}
        style={{
          ...style,
          strokeWidth: 6,
          opacity: 0.15,
          strokeDasharray: 'none',
          filter: 'blur(3px)',
        }}
      />
      {/* Dashed animated path */}
      <path
        id={id}
        d={edgePath}
        fill="none"
        strokeDasharray="6 4"
        strokeLinecap="round"
        style={{
          ...style,
          strokeWidth: 2,
          animation: 'dashmove 1.6s linear infinite',
        }}
      />
      <style>{`
        @keyframes dashmove {
          to { stroke-dashoffset: -40; }
        }
      `}</style>
    </>
  );
}

const edgeTypes = { animatedDash: AnimatedDashedEdge };

const baseStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: '8px',
  fontWeight: 600,
  fontSize: '13px',
  width: '160px',
  textAlign: 'center',
  padding: '10px 16px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
};

const nodes: Node[] = [
  {
    id: '1',
    data: { label: 'Main Branch' },
    position: { x: 190, y: 20 },
    style: { ...baseStyle, background: '#1d4ed8', color: 'white' },
  },
  {
    id: '2',
    data: { label: 'Working with files' },
    position: { x: 30, y: 140 },
    style: { ...baseStyle, background: '#15803d', color: 'white' },
  },
  {
    id: '3',
    data: { label: 'Reading files' },
    position: { x: 350, y: 140 },
    style: { ...baseStyle, background: '#7c3aed', color: 'white' },
  },
  {
    id: '4',
    data: { label: 'Writing & saving' },
    position: { x: 30, y: 270 },
    style: { ...baseStyle, background: '#c2410c', color: 'white' },
  },
  {
    id: '5',
    data: { label: ' Edit file content' },
    position: { x: 350, y: 270 },
    style: { ...baseStyle, background: '#b91c1c', color: 'white' },
  },
  {
    id: '6',
    data: { label: ' Upload on social' },
    position: { x: 190, y: 400 },
    style: { ...baseStyle, background: '#7c3aed', color: 'white' },
  },
];

const edges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'animatedDash',
    style: { stroke: '#2563eb' },
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    type: 'animatedDash',
    style: { stroke: '#8b5cf6' },
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    type: 'animatedDash',
    style: { stroke: '#16a34a' },
  },
  {
    id: 'e3-5',
    source: '3',
    target: '5',
    type: 'animatedDash',
    style: { stroke: '#dc2626' },
  },
  {
    id: 'e4-6',
    source: '4',
    target: '6',
    type: 'animatedDash',
    style: { stroke: '#ea580c' },
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
    type: 'animatedDash',
    style: { stroke: '#9333ea' },
  },
];

export default function WorkflowFlow() {
  return (
    <div className="w-full h-[520px] bg-slate-100/90 dark:bg-[#0e0e10] rounded-xl border border-slate-200 dark:border-[#262626] relative overflow-hidden transition-colors duration-300 shadow-xl dark:shadow-none">
      <div
        className="absolute inset-0 opacity-40 dark:opacity-20 bg-[radial-gradient(circle,#94a3b8_1px,transparent_1px)] dark:bg-[radial-gradient(circle,#333_1px,transparent_1px)] bg-[size:22px_22px]"
      />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        panOnScroll={false}
        zoomOnPinch={false}
        panOnDrag={false}
        proOptions={{ hideAttribution: true }}
        fitView
        fitViewOptions={{ padding: 0.2 }}
      />
    </div>
  );
}
