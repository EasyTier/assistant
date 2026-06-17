export const en = {
  // Header
  appTitle: 'EasyTier Assistant',
  wizardMode: 'Wizard',
  expertMode: 'Expert',
  resetConfig: 'Reset',

  // Platform
  linux: 'Linux',
  windows: 'Windows',
  macos: 'macOS',
  linuxDesc: 'Server / Container / Raspberry Pi',
  windowsDesc: 'Windows 10 / 11 / Server',
  macosDesc: 'Mac Desktop or Laptop',
  platformTitle: 'Select Platform',
  platformDesc: 'Which OS will run EasyTier? This affects default paths like log directory.',

  // Network
  networkIdentity: 'Network Identity',
  networkName: 'Network Name',
  networkSecret: 'Network Secret',
  instanceName: 'Instance Name',
  hostname: 'Hostname',
  randomGenerate: 'Random',
  emptyMeansNoPassword: 'Leave empty for no password',
  hide: 'Hide',
  show: 'Show',
  networkIdentityDesc: 'Set your network identity. This is the basic info for joining an EasyTier network.',

  // IP
  ipSettings: 'IP Settings',
  enableDhcp: 'Enable DHCP',
  ipv4Address: 'IPv4 Address',
  requiredWhenDhcpOff: 'Required when DHCP is off',
  ipv6Address: 'IPv6 Address',
  ipv6Provider: 'Act as IPv6 public address provider',
  ipSettingsDesc: 'Configure IP allocation for the virtual network.',
  staticIpv4: 'Static IPv4 Address',

  // Connections
  connections: 'Connections',
  networkingMethod: 'Networking Method',
  manualConfig: 'Manual',
  standaloneMode: 'Standalone',
  manualConfigPeers: 'Manual Peers',
  peers: 'Peers',
  peerDesc: 'Peer addresses',
  peerDescExpert: 'Peer addresses, e.g. tcp://host:11010',
  addPeer: 'Add Peer',
  listeners: 'Listeners',
  localListenAddr: 'Local listen addresses',
  addListener: 'Add Listener',
  mappedListeners: 'Mapped Listeners',
  mappedListenAddr: 'Mapped listen addresses',
  addMappedListener: 'Add Mapped Listener',
  connectionsDesc: 'Choose networking method and configure connection nodes.',
  noPeersWarning: 'No peers added. This node cannot actively connect to others and may fail to form a network.',

  // Proxy & Routes
  proxyAndRoutes: 'Proxy & Routes',
  proxyNetworks: 'Proxy Networks',
  proxyNetworkDesc: 'Proxy network CIDRs',
  proxyNetworkDescExpert: 'Proxy network CIDR, e.g. 192.168.1.0/24',
  addNetwork: 'Add Network',
  manualRoutes: 'Manual Routes',
  routeDesc: 'Additional route CIDRs',
  routeDescExpert: 'Additional route CIDR',
  addRoute: 'Add Route',
  exitNodes: 'Exit Nodes',
  exitNodeDesc: 'Specify traffic exit nodes',
  exitNodeDescExpert: 'Specify exit node IP',
  addExitNode: 'Add Exit Node',
  proxyRoutesDesc: 'Configure proxy networks and routes (optional).',

  // VPN Portal
  vpnPortal: 'VPN Portal',
  enableVpnPortal: 'Enable WireGuard VPN Portal',
  clientCidr: 'Client CIDR',
  listenAddress: 'Listen Address',

  // Port Forward
  portForward: 'Port Forward',
  localBind: 'Local Bind',
  dstAddress: 'Destination Address',
  protocol: 'Protocol',
  addPortForwardRule: 'Add Port Forward Rule',

  // Advanced
  advancedOptions: 'Advanced',
  defaultProtocol: 'Default Protocol',
  encryptionAlgorithm: 'Encryption Algorithm',
  mtu: 'MTU',
  threadCount: 'Thread Count',
  compression: 'Compression',
  none: 'None',
  tunDeviceName: 'TUN Device Name',
  leaveEmptyForDefault: 'Leave empty for default',
  enableEncryption: 'Enable Encryption',
  enableIpv6: 'Enable IPv6',
  latencyFirst: 'Latency First',
  latencyFirstRoute: 'Latency First Routing',
  enableExitNode: 'Act as Exit Node',
  disableTun: 'Disable TUN',
  useSmoltcp: 'Use smoltcp',
  enableP2p: 'Enable P2P',
  p2pOnly: 'P2P Only',
  enableUpnp: 'Enable UPnP',
  kcpProxy: 'KCP Proxy',
  quicProxy: 'QUIC Proxy',
  magicDns: 'Magic DNS',
  privateMode: 'Private Mode',
  udpBroadcastRelay: 'UDP Broadcast Relay',
  advancedDesc: 'Adjust advanced options as needed. Beginners can keep defaults.',

  // Logging
  logging: 'Logging',
  consoleLogLevel: 'Console Log Level',
  fileLogLevel: 'File Log Level',
  logDir: 'Log Directory',
  logFileName: 'Log File Name',

  // Toml Preview
  tomlPreview: 'TOML Preview',
  noConfig: '# No config yet',
  copied: 'Copied',
  copy: 'Copy',
  download: 'Download',

  // Validation
  requiredField: 'This field is required.',
  invalidIpv4Cidr: 'Enter a valid IPv4 CIDR, e.g. 192.168.1.0/24.',
  cidrHostBitsMustBeZero: 'CIDR host bits must be zero. Did you mean {{suggestion}}?',
  invalidIpv4Address: 'Enter a valid IPv4 address, optionally with a prefix length.',
  invalidIpAddress: 'Enter a valid IP address.',
  invalidSocketAddr: 'Enter a valid socket address, e.g. 0.0.0.0:11010.',
  invalidUrl: 'Enter a valid URL, e.g. tcp://host:11010.',
  fixValidationErrorsBeforeDownload: 'Fix validation errors before copying or downloading the config.',

  // Wizard Controls
  prevStep: 'Previous',
  nextStep: 'Next',
  finish: 'Finish',
  stepCounter: 'Step {{current}} / {{total}}',

  // Wizard Review
  reviewDesc: 'All done! You can preview, copy, or download the TOML config file.',

  // Expert Nav
  expertNav: {
    networkIdentity: 'Network Identity',
    ipSettings: 'IP Settings',
    connections: 'Connections',
    proxyRoutes: 'Proxy & Routes',
    vpnPortal: 'VPN Portal',
    portForward: 'Port Forward',
    advanced: 'Advanced',
    logging: 'Logging',
  },

  // RepeatableField
  add: 'Add',
};
