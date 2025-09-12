/**
 * Application constants and configuration
 */

// Graph configuration options
export const GRAPH_TYPES = {
  DIRECTED: true,
  UNDIRECTED: false,
};

export const WEIGHT_TYPES = {
  WEIGHTED: true,
  UNWEIGHTED: false,
};

// Graph type options for UI
export const GRAPH_TYPE_OPTIONS = [
  { value: GRAPH_TYPES.UNDIRECTED, label: 'Undirected' },
  { value: GRAPH_TYPES.DIRECTED, label: 'Directed' }
];

export const WEIGHT_OPTIONS = [
  { value: WEIGHT_TYPES.UNWEIGHTED, label: 'Unweighted' },
  { value: WEIGHT_TYPES.WEIGHTED, label: 'Weighted' }
];

// Algorithm categories for better organization
export const ALGORITHM_CATEGORIES = {
  TRAVERSAL: 'traversal',
  ANALYSIS: 'analysis',
  MST: 'mst',
  PATH: 'path',
};

// Default node colors
export const NODE_COLORS = {
  DEFAULT: '#4f46e5',
  VISITED: '#10b981',
  CURRENT: '#f59e0b',
  PATH: '#ef4444',
  START: '#8b5cf6',
  END: '#06b6d4',
};

// Animation speeds
export const ANIMATION_SPEEDS = {
  SLOW: 1000,
  NORMAL: 500,
  FAST: 200,
  INSTANT: 0,
};

// Speed control commands
export const SPEED_COMMANDS = {
  FAST: 'fast',
  SKIP: 'skip',
  NORMAL: 'normal',
};

// Graph visualization settings
export const VISUALIZATION_CONFIG = {
  DEFAULT_WIDTH: 800,
  DEFAULT_HEIGHT: 600,
  NODE_RADIUS: {
    MOBILE: 25,
    DESKTOP: 15,
  },
  FONT_SIZE: {
    MOBILE: '20px',
    DESKTOP: '12px',
  },
  FORCE_SETTINGS: {
    LINK_DISTANCE: 100,
    CHARGE_STRENGTH: -200,
    CENTER_STRENGTH: 0.05,
  },
};

// Input validation patterns
export const VALIDATION_PATTERNS = {
  NODE_ID: /^[a-zA-Z0-9_-]+$/,
  EDGE_UNWEIGHTED: /^\s*(\S+)\s+(\S+)\s*$/,
  EDGE_WEIGHTED: /^\s*(\S+)\s+(\S+)\s+(\d+(?:\.\d+)?)\s*$/,
};

// Error messages
export const ERROR_MESSAGES = {
  INVALID_INPUT: 'Invalid input format. Please check your edge definitions.',
  MISSING_SOURCE: 'Please specify a start node for this algorithm.',
  INVALID_GRAPH_TYPE: 'This algorithm requires a different graph type.',
  ALGORITHM_ERROR: 'An error occurred while running the algorithm.',
  EMPTY_GRAPH: 'Please add some edges to create a graph.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  ALGORITHM_COMPLETE: 'Algorithm completed successfully!',
  RESULT_READY: 'Algorithm result is ready! Click "Show Result" to view details.',
};

// UI breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
};

// Local storage keys
export const STORAGE_KEYS = {
  DARK_MODE: 'dark-mode',
  LAST_GRAPH_INPUT: 'last-graph-input',
  USER_PREFERENCES: 'user-preferences',
};
