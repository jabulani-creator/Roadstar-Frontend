import type { Vehicle } from "@/lib/types";
import { FleetCarousel } from "@/components/fleet/FleetCarousel";
import { AccentWord } from "@/components/ui/AccentWord";

/** Prefer photo vehicles when any exist — avoids mixed photo + icon row. */
function homeFleetVehicles(vehicles: Vehicle[]): Vehicle[] {
  const withPhoto = vehicles.filter((v) => Boolean(v.photo?.trim()));
  return withPhoto.length > 0 ? withPhoto : vehicles;
}

export function HomeFleet({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <FleetCarousel
      vehicles={homeFleetVehicles(vehicles)}
      variant="home"
      heading={
        <>
          Our <AccentWord>training</AccentWord> fleet
        </>
      }
      subheading="Real Roadstar vehicles. See the class, transmission, and branch before you book — so you know exactly what you’ll train in."
    />
  );
}
