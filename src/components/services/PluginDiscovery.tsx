import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { discovered } from "../../features/gossip/pluginSlice";
import { pluginDefinitionSchema } from "../../interfaces/plugins";
import { initSettings } from "../../features/gossip/pluginSettingsSlice";

const pluginPrefix = "data-albp-";

const PluginDiscovery = () => {
  const dispatch = useAppDispatch();
  const { settings } = useAppSelector((state) => state.pluginSettings);

  useEffect(() => {
    try {
      if (chrome && chrome.runtime)
        chrome.runtime.onMessageExternal.addListener(function (
          message,
          sender
        ) {
          console.log("got message from the plugin", sender, message);
        });
    } catch {
      // if chrome top level variable is missing, the app might crash
    }

    for (let i = 0; i < document.documentElement.attributes.length; i++) {
      const attr = document.documentElement.attributes[i];

      if (!attr.name.startsWith(pluginPrefix)) continue;

      const id = attr.name.substring(pluginPrefix.length);

      const pluginDefinition = pluginDefinitionSchema.safeParse(
        JSON.parse(attr.value)
      );

      if (!pluginDefinition.success) {
        console.error(
          `Failed to load plugin definition with ID: ${id} due to parsing errors`,
          pluginDefinition.error
        );
        continue;
      }

      if (settings[id] === undefined) {
        dispatch(initSettings({ plugin: id, type: pluginDefinition.data.type }));
      }

      dispatch(discovered({ id: id, ...pluginDefinition.data }));
    }
  });

  return false;
};

export default PluginDiscovery;
