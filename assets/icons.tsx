import { Ionicons } from '@expo/vector-icons';
import React from 'react';

export type IconType =
  | 'home_outline'
  | 'search_outline'
  | 'document_outline'
  | 'notifications_outline';

const IconSvgs: Record<IconType, React.ReactElement> = {
  home_outline: <Ionicons name="home-outline" size={23} />,
  search_outline: <Ionicons name="search-outline" size={23} />,
  document_outline: <Ionicons name="document-outline" size={23} />,
  notifications_outline: <Ionicons name="notifications-outline" size={23} />,
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
