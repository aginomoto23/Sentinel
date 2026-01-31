export const APP_NAME = "Sentinel";

export const ROUTES = {
  DASHBOARD: '/',
  SIMULATE: '/simulate',
  CHECK: '/check',
  MARK: '/mark',
  SETTINGS: '/settings',
};

export const MOCK_ADDRESSES = {
  SAFE: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984", // Uniswap
  CAUTION: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // WETH (Simulated as caution for demo)
  DANGER: "0xdead000000000000000042069scam00000000000",
};