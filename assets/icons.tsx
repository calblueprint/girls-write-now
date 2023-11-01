import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { SvgXml } from 'react-native-svg';

export type IconType =
  | 'home_outline'
  | 'document_outline'
  | 'search_outline'
  | 'close_modal_button';

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
