import { verticalScale } from "@/helpers/responsiveScaling";

interface EventMapProps {
  latitude: number;
  longitude: number;
}

export default function EventMap({ latitude, longitude }: EventMapProps) {
  const delta = 0.01;
  const longitudeMin = longitude - delta;
  const longitudeMax = longitude + delta;
  const latitudeMin = latitude - delta;
  const latitudeMax = latitude + delta;
  return (
    <iframe
      width="100%"
      height={verticalScale(140)}
      src={`https://www.openstreetmap.org/export/embed.html?bbox=${longitudeMin},${latitudeMin},${longitudeMax},${latitudeMax}&layer=mapnik&marker=${latitude},${longitude}`}
      style={{
        border: "none",
      }}
    />
  );
}
