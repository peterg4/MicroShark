import React, { useEffect, useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import axios from 'axios';

import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from 'react-flow-renderer';

import initialElements from './initial-elements';

const onLoad = (reactFlowInstance) => {
  console.log('flow loaded:', reactFlowInstance);
};

const FlowWrapper = styled('div')(({ theme }) => ({
    height: 506
}));

const FlowDiagram = () => {
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));
const style = {
    background: '#242424',
    borderRadius: 16
}
  useEffect(() => {
    axios.get(`/api/passports/`)
    .then(res => {
        console.log(res.data.FlowDiagram)
        setElements(res.data.FlowDiagram);
    })
  }, []);



  return (
    <FlowWrapper>
        <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        onLoad={onLoad}
        defaultPosition={[100,60]}
        defaultZoom={1.2}
        style={style}
        >
        <Background color="#242424" gap={16} />
        </ReactFlow>
    </FlowWrapper>
  );
};

export default FlowDiagram;