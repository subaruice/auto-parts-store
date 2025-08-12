import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Skeleton from "./UI/Skeleton";
import { memo } from "react";

const Map = memo(() => {
    const API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
    const center = { lat: 47.905694, lng: 33.429583 };
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: API_KEY,
    });
    if (loadError) return <div>Ошибка</div>;
    if (!isLoaded) return <Skeleton />;
    return (
        <GoogleMap mapContainerClassName="w-full h-100 border border-black/20 rounded-xl" center={center} zoom={14}>
            <Marker position={center} />
        </GoogleMap>
    );
});

export default Map;
