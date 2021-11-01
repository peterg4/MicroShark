import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  508: alpha('#919EAB', 0.08),
  512: alpha('#919EAB', 0.12),
  516: alpha('#919EAB', 0.16),
  524: alpha('#919EAB', 0.24),
  532: alpha('#919EAB', 0.32),
  548: alpha('#919EAB', 0.48),
  556: alpha('#919EAB', 0.56),
  580: alpha('#919EAB', 0.8)
};

const PRIMARY = {
  lighter: '#C8FACD',
  light: '#5BE584',
  main: '#016699',
  dark: '#007B55',
  darker: '#005249',
  contrastText: '#fff'
};
const SECONDARY = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#f5f5f5',
  dark: '#1939B7',
  darker: '#091A7A',
  contrastText: '#fff'
};
const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
  contrastText: '#fff'
};
const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
  contrastText: GREY[800]
};
const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
  contrastText: GREY[800]
};
const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
  contrastText: '#fff'
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main)
};

const CHART_COLORS = {
  violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
  blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
  green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
  yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
  red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4']
};

const palette = {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  grey: GREY,
  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: GREY[524],
  text: { primary: '#fff', secondary: GREY[400], disabled: GREY[500], dark: GREY[600] },
  background: { paper: '#C9ECF8', default: '#1b9cc6', neutral: GREY[200], body: '#2c2c2c'},
  action: {
    active: GREY[600],
    hover: GREY[508],
    selected: GREY[516],
    disabled: GREY[580],
    disabledBackground: GREY[524],
    focus: GREY[524],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48
  }
};

export default palette;
