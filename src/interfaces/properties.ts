import { GossipPlugin } from "../features/gossip/pluginSlice";

export interface ActorPinProperties {
  size?: number;
  color?: string;
}

export interface PluginMenuItemProps<T extends GossipPlugin> {
  plugin: T;
}
