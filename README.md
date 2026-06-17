# EasyTier Assistant

> A modern, browser-based TOML configuration generator for [EasyTier](https://github.com/EasyTier/EasyTier).

EasyTier Assistant helps you create valid EasyTier configuration files without memorizing every TOML field. Use the guided wizard for common setups, switch to expert mode for advanced options, preview the generated TOML in real time, then copy or download the final config.

## Features

- **Wizard mode** for step-by-step configuration
- **Expert mode** for direct access to advanced EasyTier options
- **Live TOML preview** with one-click copy and download
- **Valid EasyTier output** with CIDR normalization for network fields
- **Peer and listener configuration** for client and center-node setups
- **Proxy routes, VPN portal, port forwarding, and logging options**
- **Multi-language UI** with English and Chinese support
- **Cross-platform defaults** for Linux, Windows, and macOS

## Quick Start

```bash
pnpm install
pnpm dev
```

Open the local development URL printed by Vite, then start building your EasyTier config.

## Build

```bash
pnpm build
```

The production build is emitted to `dist/` and can be served by any static hosting provider.

## Usage

1. Choose **Wizard** for a guided flow or **Expert** for full control.
2. Configure network identity, IP allocation, peers, listeners, proxy networks, routes, VPN portal, and logging.
3. Review the live TOML preview.
4. Copy the TOML or download it as `easytier-config.toml`.
5. Use the generated file with EasyTier.

Example generated output:

```toml
instance_name = "my-network"
hostname = "center-node"
dhcp = true
listeners = ["tcp://0.0.0.0:11010", "udp://0.0.0.0:11010"]

[network_identity]
network_name = "my-network"
network_secret = "change-me"

[[proxy_network]]
cidr = "192.168.1.0/24"

[vpn_portal_config]
client_cidr = "192.168.0.0/24"
wireguard_listen = "0.0.0.0:11011"
```

## Tech Stack

- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [i18next](https://www.i18next.com/)
- [smol-toml](https://github.com/squirrelchat/smol-toml)

## Deployment

EasyTier Assistant is a static web app. After running `pnpm build`, deploy the `dist/` directory to platforms such as:

- Cloudflare Pages
- Vercel
- Netlify
- GitHub Pages
- Any static file server

## Development

```bash
pnpm lint
pnpm build
```

## License

MIT
