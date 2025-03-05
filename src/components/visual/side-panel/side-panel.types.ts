export enum SidePanelTypeEnum {
  LEFT = 'left',
  RIGHT = 'right'
}

export interface ISidePanelProps {
  /**
   * Whether the panel is open
   */
  isOpen: boolean;

  /**
   * Which side the panel slides from
   */
  side: SidePanelTypeEnum;

  /**
   * Optional class name for the panel content
   */
  panelClassName?: string;
} 