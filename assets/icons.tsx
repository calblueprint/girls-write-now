import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { SvgXml } from 'react-native-svg';

export type IconType =
  | 'home_outline'
  | 'back_icon'
  | 'document_outline'
  | 'search_outline'
  | 'close_modal_button'
  | 'red_x'
  | 'green_check'
  | 'hide_password'
  | 'grey_dot'
  | 'settings_gear';

const IconSvgs: Record<IconType, React.ReactElement> = {
  home_outline: <Ionicons name="home-outline" size={23} />,
  back_icon: <Ionicons name="chevron-back-outline" size={15} />,
  search_outline: <Ionicons name="search-outline" size={23} />,
  document_outline: <Ionicons name="document-outline" size={23} />,
  settings_gear: <Ionicons name="settings-outline" size={32} />,
  close_modal_button: (
    <SvgXml
      xml={`<svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="menu / close_big">
          <path
            id="coolicon"
            d="M17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41L17.59 5Z"
            fill="#A7A5A5"
          />
        </g>
      </svg>`}
    />
  ),
  red_x: (
    <SvgXml
      xml={`<svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="bx:x">
            <path
              id="Vector"
              d="M12.144 4.75806L8.96173 7.93956L5.78023 4.75806L4.71973 5.81856L7.90123 9.00006L4.71973 12.1816L5.78023 13.2421L8.96173 10.0606L12.144 13.2421L13.2045 12.1816L10.023 9.00006L13.2045 5.81856L12.144 4.75806Z"
              fill="#EB563B"
            />
          </g>
        </svg>`}
    />
  ),
  green_check: (
    <SvgXml
      xml={`<svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="material-symbols:check">
            <path
              id="Vector"
              d="M7.16245 13.5L2.88745 9.22495L3.9562 8.1562L7.16245 11.3625L14.0437 4.4812L15.1125 5.54995L7.16245 13.5Z"
              fill="#5A7906"
            />
          </g>
        </svg>`}
    />
  ),
  hide_password: (
    <SvgXml
      xml={`<svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="formkit:hidden">
            <path
              id="Vector"
              d="M8 11.5C6.35 11.5 5 10.15 5 8.5C5 6.85 6.35 5.5 8 5.5C9.65 5.5 11 6.85 11 8.5C11 10.15 9.65 11.5 8 11.5ZM8 6.5C6.9 6.5 6 7.4 6 8.5C6 9.6 6.9 10.5 8 10.5C9.1 10.5 10 9.6 10 8.5C10 7.4 9.1 6.5 8 6.5Z"
              fill="#2D2D2D"
            />
            <path
              id="Vector_2"
              d="M8 13.5C4.81 13.5 2.01 11.56 1.03 8.66C0.990031 8.55708 0.990031 8.44292 1.03 8.34C2.01 5.45 4.82 3.5 8 3.5C11.18 3.5 13.99 5.44 14.97 8.34C15.01 8.44 15.01 8.56 14.97 8.66C13.99 11.55 11.18 13.5 8 13.5ZM2.03 8.5C2.92 10.9 5.3 12.5 8 12.5C10.7 12.5 13.07 10.9 13.97 8.5C13.08 6.1 10.7 4.5 8 4.5C5.3 4.5 2.93 6.1 2.03 8.5Z"
              fill="#2D2D2D"
            />
            <path
              id="Vector_3"
              d="M14 15C13.9344 15.0008 13.8694 14.9879 13.8091 14.962C13.7489 14.9362 13.6946 14.898 13.65 14.85L1.65 2.84999C1.45 2.64999 1.45 2.33999 1.65 2.13999C1.85 1.93999 2.16 1.93999 2.36 2.13999L14.35 14.15C14.55 14.35 14.55 14.66 14.35 14.86C14.25 14.96 14.12 15.01 14 15.01V15Z"
              fill="#2D2D2D"
            />
          </g>
        </svg>`}
    />
  ),
  grey_dot: (
    <SvgXml
      xml={`<svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Frame 88">
            <path
              id="Vector"
              d="M6.99992 10.9998C7.27421 10.9998 7.53288 10.9478 7.77593 10.8436C8.01897 10.7394 8.23077 10.5971 8.41132 10.4165C8.59187 10.236 8.73596 10.0224 8.84359 9.77593C8.95123 9.52941 9.00331 9.27074 8.99984 8.99992C8.99984 8.72215 8.94776 8.46348 8.84359 8.22391C8.73943 7.98433 8.59708 7.77254 8.41653 7.58852C8.23598 7.4045 8.02245 7.26041 7.77593 7.15624C7.52941 7.05208 7.27074 7 6.99992 7C6.72215 7 6.46348 7.05208 6.22391 7.15624C5.98433 7.26041 5.77254 7.40276 5.58852 7.58331C5.4045 7.76386 5.26041 7.97565 5.15624 8.2187C5.05208 8.46175 5 8.72215 5 8.99992C5 9.27421 5.05208 9.53288 5.15624 9.77593C5.26041 10.019 5.40276 10.2308 5.58331 10.4113C5.76386 10.5919 5.97565 10.736 6.2187 10.8436C6.46175 10.9512 6.72215 11.0033 6.99992 10.9998Z"
              fill="#797979"
            />
          </g>
        </svg>`}
    />
  ),
};
type Props = {
  className?: string;
  type: IconType;
};

const Icon: React.FC<Props> = ({ className, type }: Props) =>
  React.cloneElement(IconSvgs[type], {
    className,
  });

export default Icon;
