import { useAppDispatch } from "../../app/hooks";
import { update } from "../../features/gossip/gossipSlice";

const GossipUpdater = () => {
  const dispatch = useAppDispatch();

  // running in a chrome extension or getting data provided from Chrome
  try{
    if (chrome && chrome.runtime)
      chrome.runtime.onMessageExternal.addListener(function (request) {
        dispatch(update(request));
      });
  } catch {

  }

  return <></>;
};

export default GossipUpdater;
