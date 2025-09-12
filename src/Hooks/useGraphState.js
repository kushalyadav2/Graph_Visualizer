import { useState, useEffect, useCallback } from 'react';
import parseGraphInput from '../Hooks/DataFetch';
import { validateGraphInput } from '../utils';
import { GRAPH_TYPES, WEIGHT_TYPES, ERROR_MESSAGES } from '../constants';

/**
 * Custom hook for managing graph state and configuration
 * Handles graph data, validation, and type changes
 */
export const useGraphState = () => {
  // Graph data state
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [adjList, setAdjList] = useState({});
  
  // Graph configuration state
  const [isDirected, setIsDirected] = useState(GRAPH_TYPES.UNDIRECTED);
  const [isWeighted, setIsWeighted] = useState(WEIGHT_TYPES.UNWEIGHTED);
  const [inputText, setInputText] = useState('');
  
  // Validation state
  const [inputErrors, setInputErrors] = useState([]);
  const [isValidGraph, setIsValidGraph] = useState(false);

  /**
   * Parse and validate graph input
   */
  const parseAndValidateInput = useCallback((input, directed, weighted) => {
    try {
      // Validate input format
      const validation = validateGraphInput(input, weighted);
      
      if (!validation.isValid) {
        setInputErrors(validation.errors);
        setIsValidGraph(false);
        setNodes([]);
        setLinks([]);
        setAdjList({});
        return;
      }

      // Clear validation errors
      setInputErrors([]);
      setIsValidGraph(true);

      // Parse graph data
      const { nodes, links, adjList } = parseGraphInput(input, directed, weighted);
      setNodes(nodes);
      setLinks(links);
      setAdjList(adjList);

    } catch (error) {
      console.error('Error parsing graph input:', error);
      setInputErrors([ERROR_MESSAGES.INVALID_INPUT]);
      setIsValidGraph(false);
      setNodes([]);
      setLinks([]);
      setAdjList({});
    }
  }, []);

  // Parse graph input whenever input text or graph type changes
  useEffect(() => {
    if (inputText.trim()) {
      parseAndValidateInput(inputText, isDirected, isWeighted);
    } else {
      // Clear everything if input is empty
      setInputErrors([]);
      setIsValidGraph(false);
      setNodes([]);
      setLinks([]);
      setAdjList({});
    }
  }, [inputText, isDirected, isWeighted, parseAndValidateInput]);

  /**
   * Handle input text changes
   * @param {Event} e - Input change event
   */
  const handleInputChange = useCallback((e) => {
    setInputText(e.target.value);
  }, []);

  /**
   * Set graph direction type
   * @param {boolean} directed - Whether graph is directed
   */
  const setGraphDirected = useCallback((directed) => {
    setIsDirected(directed);
  }, []);

  /**
   * Set graph weight type
   * @param {boolean} weighted - Whether graph is weighted
   */
  const setGraphWeighted = useCallback((weighted) => {
    setIsWeighted(weighted);
  }, []);

  /**
   * Clear all graph data
   */
  const clearGraph = useCallback(() => {
    setInputText('');
    setNodes([]);
    setLinks([]);
    setAdjList({});
    setInputErrors([]);
    setIsValidGraph(false);
  }, []);

  /**
   * Get graph statistics
   */
  const getGraphStats = useCallback(() => {
    return {
      nodeCount: nodes.length,
      edgeCount: links.length,
      isConnected: nodes.length > 0 && links.length >= nodes.length - 1,
      density: nodes.length > 1 ? (2 * links.length) / (nodes.length * (nodes.length - 1)) : 0,
    };
  }, [nodes, links]);

  /**
   * Check if algorithm can run with current graph
   * @param {string} algorithmType - Type of algorithm
   * @param {string} sourceNode - Source node (if required)
   */
  const canRunAlgorithm = useCallback((algorithmType, sourceNode = null) => {
    if (!isValidGraph || nodes.length === 0) {
      return { canRun: false, reason: ERROR_MESSAGES.EMPTY_GRAPH };
    }

    switch (algorithmType) {
      case 'dfs':
      case 'bfs':
      case 'dijkstra':
        if (!sourceNode) {
          return { canRun: false, reason: ERROR_MESSAGES.MISSING_SOURCE };
        }
        if (!nodes.some(node => node.id === sourceNode)) {
          return { canRun: false, reason: 'Source node does not exist in the graph' };
        }
        break;
        
      case 'scc':
        if (!isDirected) {
          return { canRun: false, reason: 'Strongly Connected Components requires a directed graph' };
        }
        break;
        
      case 'prims':
      case 'kruskals':
        if (isDirected) {
          return { canRun: false, reason: 'MST algorithms require an undirected graph' };
        }
        if (!isWeighted) {
          return { canRun: false, reason: 'MST algorithms require a weighted graph' };
        }
        break;
        
      default:
        break;
    }

    return { canRun: true };
  }, [isValidGraph, nodes, isDirected, isWeighted]);

  return {
    // Graph data
    nodes,
    links,
    adjList,
    setNodes,
    setLinks,
    
    // Graph configuration
    isDirected,
    isWeighted,
    inputText,
    setGraphDirected,
    setGraphWeighted,
    handleInputChange,
    
    // Validation
    inputErrors,
    isValidGraph,
    
    // Utilities
    clearGraph,
    getGraphStats,
    canRunAlgorithm,
  };
};
