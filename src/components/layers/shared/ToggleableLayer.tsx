import { CircleLayerSpecification, FillLayerSpecification, Layer, LineLayerSpecification, RasterLayerSpecification, SymbolLayerSpecification } from "react-map-gl/maplibre";
import { useAppSelector } from "../../../app/hooks";

interface ToggleableLayerProps {
    group?: string;
}

export default function ToggleableLayer(props: (FillLayerSpecification | LineLayerSpecification | SymbolLayerSpecification | CircleLayerSpecification | RasterLayerSpecification) & ToggleableLayerProps ) {

    const { layerVisiblity } = useAppSelector((state) => state.map);

    const id = props.group ? props.group : props.id;

    const visible = layerVisiblity[id] ?? false;

    if(props.layout)
        props.layout.visibility = visible ? "visible" : "none"
    else
        props = {...props, layout: {visibility: visible ? "visible" : "none"}}

    return (<Layer {...props}></Layer>);
}

