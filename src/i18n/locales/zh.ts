export const zh = {
  // Header
  appTitle: 'EasyTier 配置助手',
  wizardMode: '向导模式',
  expertMode: '专家模式',
  resetConfig: '重置配置',

  // Platform
  linux: 'Linux',
  windows: 'Windows',
  macos: 'macOS',
  linuxDesc: '服务器 / 容器 / 树莓派等',
  windowsDesc: 'Windows 10 / 11 / Server',
  macosDesc: 'Mac 台式机或笔记本',
  platformTitle: '选择平台',
  platformDesc: '你打算在哪个操作系统上运行 EasyTier？这会影响日志路径等默认配置。',

  // Network
  networkIdentity: '网络身份',
  networkName: '网络名称',
  networkSecret: '网络密钥',
  instanceName: '实例名称',
  hostname: '主机名',
  randomGenerate: '随机生成',
  emptyMeansNoPassword: '留空表示无密码',
  hide: '隐藏',
  show: '显示',
  networkIdentityDesc: '设置你的网络身份，这是加入 EasyTier 网络的基础信息。',

  // IP
  ipSettings: 'IP 设置',
  enableDhcp: '启用 DHCP 自动分配 IP',
  ipv4Address: 'IPv4 地址',
  requiredWhenDhcpOff: '禁用 DHCP 时必填',
  ipv6Address: 'IPv6 地址',
  ipv6Provider: '作为 IPv6 公网地址提供者',
  ipSettingsDesc: '配置虚拟网络的 IP 分配方式。',
  staticIpv4: '静态 IPv4 地址',

  // Connections
  connections: '连接方式',
  networkingMethod: '组网方式',
  manualConfig: '手动配置',
  standaloneMode: '独立模式',
  manualConfigPeers: '手动配置 Peers',
  peers: 'Peers',
  peerDesc: '对等节点地址',
  peerDescExpert: '对等节点地址，如 tcp://host:11010',
  addPeer: '添加 Peer',
  listeners: 'Listeners',
  localListenAddr: '本地监听地址',
  addListener: '添加 Listener',
  mappedListeners: 'Mapped Listeners',
  mappedListenAddr: '映射监听地址',
  addMappedListener: '添加 Mapped Listener',
  connectionsDesc: '选择组网方式并配置连接节点。',
  noPeersWarning: '未填写任何 Peers，该节点将无法主动连接其他节点，可能无法组网。',

  // Proxy & Routes
  proxyAndRoutes: '代理与路由',
  proxyNetworks: '代理网络',
  proxyNetworkDesc: '需要代理的网段 CIDR',
  proxyNetworkDescExpert: '代理网段 CIDR，如 192.168.1.0/24',
  addNetwork: '添加网段',
  manualRoutes: '手动路由',
  routeDesc: '额外的路由 CIDR',
  routeDescExpert: '额外路由 CIDR',
  addRoute: '添加路由',
  exitNodes: '出口节点',
  exitNodeDesc: '指定流量出口节点',
  exitNodeDescExpert: '指定出口节点 IP',
  addExitNode: '添加出口节点',
  proxyRoutesDesc: '配置代理网络和路由（可选）。',

  // VPN Portal
  vpnPortal: 'VPN Portal',
  enableVpnPortal: '启用 WireGuard VPN Portal',
  clientCidr: '客户端网段',
  listenAddress: '监听地址',

  // Port Forward
  portForward: '端口转发',
  localBind: '本地绑定',
  dstAddress: '目标地址',
  protocol: '协议',
  addPortForwardRule: '添加端口转发规则',

  // Advanced
  advancedOptions: '高级选项',
  defaultProtocol: '默认协议',
  encryptionAlgorithm: '加密算法',
  mtu: 'MTU',
  threadCount: '多线程数',
  compression: '压缩算法',
  none: '无',
  tunDeviceName: 'TUN 设备名',
  leaveEmptyForDefault: '留空使用默认',
  enableEncryption: '启用加密',
  enableIpv6: '启用 IPv6',
  latencyFirst: '延迟优先',
  latencyFirstRoute: '延迟优先路由',
  enableExitNode: '作为出口节点',
  disableTun: '禁用 TUN',
  useSmoltcp: '使用 smoltcp',
  enableP2p: '启用 P2P',
  p2pOnly: '仅 P2P',
  enableUpnp: '启用 UPnP',
  kcpProxy: 'KCP 代理',
  quicProxy: 'QUIC 代理',
  magicDns: 'Magic DNS',
  privateMode: '私有模式',
  udpBroadcastRelay: 'UDP 广播中继',
  advancedDesc: '根据需要调整高级选项，新手可保持默认。',

  // Logging
  logging: '日志',
  consoleLogLevel: '控制台日志级别',
  fileLogLevel: '文件日志级别',
  logDir: '日志文件目录',
  logFileName: '日志文件名',

  // Toml Preview
  tomlPreview: 'TOML 预览',
  noConfig: '# 暂无配置',
  copied: '已复制',
  copy: '复制',
  download: '下载',

  // Validation
  requiredField: '此字段必填。',
  invalidIpv4Cidr: '请输入有效的 IPv4 CIDR，例如 192.168.1.0/24。',
  cidrHostBitsMustBeZero: 'CIDR 主机位必须为 0。你是不是想填 {{suggestion}}？',
  invalidIpv4Address: '请输入有效的 IPv4 地址，可选带前缀长度。',
  invalidIpAddress: '请输入有效的 IP 地址。',
  invalidSocketAddr: '请输入有效的监听地址，例如 0.0.0.0:11010。',
  invalidUrl: '请输入有效的 URL，例如 tcp://host:11010。',
  fixValidationErrorsBeforeDownload: '请先修复校验错误，再复制或下载配置。',

  // Wizard Controls
  prevStep: '上一步',
  nextStep: '下一步',
  finish: '完成',
  stepCounter: '第 {{current}} / {{total}} 步',

  // Wizard Review
  reviewDesc: '配置已完成！你可以预览、复制或下载 TOML 配置文件。',

  // Expert Nav
  expertNav: {
    networkIdentity: '网络身份',
    ipSettings: 'IP 设置',
    connections: '连接方式',
    proxyRoutes: '代理与路由',
    vpnPortal: 'VPN Portal',
    portForward: '端口转发',
    advanced: '高级选项',
    logging: '日志',
  },

  // RepeatableField
  add: '添加',
};
