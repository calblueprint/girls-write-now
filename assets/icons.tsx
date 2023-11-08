import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { SvgXml } from 'react-native-svg';

export type IconType =
  | 'home_outline'
  | 'document_outline'
  | 'search_outline'
  | 'close_modal_button'
  | 'red_x'
  | 'green_check'
  | 'hide_password';

const IconSvgs: Record<IconType, React.ReactElement> = {
  home_outline: <Ionicons name="home-outline" size={23} />,
  search_outline: <Ionicons name="search-outline" size={23} />,
  document_outline: <Ionicons name="document-outline" size={23} />,
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
